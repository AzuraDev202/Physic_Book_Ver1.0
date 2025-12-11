import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Exercise from '@/models/Exercise'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Verify admin token
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string }
    if (decoded.role !== 'admin') {
      return null
    }
    return decoded
  } catch (error) {
    return null
  }
}

// POST - Add new exercise
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      lessonId,
      lessonTitle,
      type,
      question,
      options,
      correctAnswer,
      explanation,
      difficulty,
      category
    } = body

    // Validation
    if (!lessonId || !type || !question || !correctAnswer || !explanation || !difficulty || !category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (type === 'multiple-choice' && (!options || options.length < 2)) {
      return NextResponse.json(
        { success: false, message: 'Multiple choice questions must have at least 2 options' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Get the highest id to create new id
    const lastExercise = await Exercise.findOne().sort({ id: -1 }).limit(1)
    const newId = lastExercise ? lastExercise.id + 1 : 1

    const newExercise = await Exercise.create({
      id: newId,
      lessonId,
      lessonTitle,
      type,
      question,
      options: type === 'multiple-choice' ? options : undefined,
      correctAnswer,
      explanation,
      difficulty,
      category
    })

    return NextResponse.json({
      success: true,
      message: 'Exercise added successfully',
      exercise: newExercise
    })
  } catch (error) {
    console.error('Error adding exercise:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
