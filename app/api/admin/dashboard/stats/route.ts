import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import UserProgress from '@/models/UserProgress';
import Chapter from '@/models/Chapter';

async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    
    await dbConnect();
    const user = await User.findById(decoded.userId);
    
    if (!user || user.role !== 'admin') {
      return null;
    }
    
    return user;
  } catch (error) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    // Get user statistics (không tính admin)
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
    const activeUsers = await User.countDocuments({ isActive: true, role: { $ne: 'admin' } });
    // Get users created this month (không tính admin)
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = await User.countDocuments({
      createdAt: { $gte: firstDayOfMonth },
      role: { $ne: 'admin' }
    });

    // Get chapter statistics
    const totalChapters = await Chapter.countDocuments();
    const publishedChapters = await Chapter.countDocuments({ isPublished: true });
    const draftChapters = totalChapters - publishedChapters;

    // Get lesson statistics (tổng số bài học trong tất cả các chương)
    const allChapters = await Chapter.find();
    let totalLessons = 0;
    allChapters.forEach(chap => {
      if (Array.isArray(chap.lessons)) totalLessons += chap.lessons.length;
    });

    // Get progress statistics

    // Lấy danh sách user thường (không phải admin)
    const normalUsers = await User.find({ role: { $ne: 'admin' } }).select('_id');
    const normalUserIds = normalUsers.map(u => u._id.toString());

    // Chỉ lấy progress của user thường
    const totalProgress = await UserProgress.countDocuments({ userId: { $in: normalUserIds } });
    const usersWithProgress = await UserProgress.distinct('userId', { userId: { $in: normalUserIds } });

    // Calculate average completion chỉ cho user thường
    const progressData = await UserProgress.find({ userId: { $in: normalUserIds } });
    let totalCompletion = 0;
    let completionCount = 0;

    progressData.forEach((progress) => {
      if (progress.chapters) {
        progress.chapters.forEach((chapter: any) => {
          if (chapter.totalSections > 0) {
            const rate = (chapter.completedSections / chapter.totalSections) * 100;
            totalCompletion += rate;
            completionCount++;
          }
        });
      }
    });

    const averageCompletion = completionCount > 0 
      ? Math.round(totalCompletion / completionCount) 
      : 0;

    return NextResponse.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          active: activeUsers,
          newThisMonth
        },
        chapters: {
          total: totalChapters,
          published: publishedChapters,
          drafts: draftChapters
        },
        lessons: {
          total: totalLessons
        },
        progress: {
          totalRecords: totalProgress,
          averageCompletion,
          activeUsers: usersWithProgress.length
        }
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
