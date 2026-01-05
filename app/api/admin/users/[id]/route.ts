
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';


async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return null;
  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    await dbConnect();
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') return null;
    return user;
  } catch (err) {
    return null;
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    await dbConnect();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: 'Không tìm thấy tài khoản!' }, { status: 404 });
    }
    if (user.role === 'admin') {
      return NextResponse.json({ message: 'Không thể xóa tài khoản admin!' }, { status: 400 });
    }
    await User.deleteOne({ _id: params.id });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: 'Lỗi server', error: String(err) }, { status: 500 });
  }
}
