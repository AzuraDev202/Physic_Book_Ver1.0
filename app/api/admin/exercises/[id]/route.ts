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

// PUT - Update exercise
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    await dbConnect()

    const exercise = await Exercise.findById(params.id)
    if (!exercise) {
      return NextResponse.json(
        { success: false, message: 'Exercise not found' },
        { status: 404 }
      )
    }

    // Update fields
    exercise.lessonId = lessonId || exercise.lessonId
    exercise.lessonTitle = lessonTitle || exercise.lessonTitle
    exercise.type = type || exercise.type
    exercise.question = question || exercise.question
    exercise.options = type === 'multiple-choice' ? options : undefined
    exercise.correctAnswer = correctAnswer || exercise.correctAnswer
    exercise.explanation = explanation || exercise.explanation
    exercise.difficulty = difficulty || exercise.difficulty
    exercise.category = category || exercise.category

    await exercise.save()

    return NextResponse.json({
      success: true,
      message: 'Exercise updated successfully',
      exercise
    })
  } catch (error) {
    console.error('Error updating exercise:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete exercise
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    await dbConnect()

    const exercise = await Exercise.findByIdAndDelete(params.id)
    if (!exercise) {
      return NextResponse.json(
        { success: false, message: 'Exercise not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Exercise deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting exercise:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
