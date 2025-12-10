'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Exercise {
  id: number
  lessonId: string
  lessonTitle: string
  type: 'multiple-choice' | 'calculation' | 'true-false'
  question: string
  options?: string[]
  correctAnswer: string | number | boolean
  explanation: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  category: string
}

export default function PracticePage() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState<boolean[]>([])
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [showFinalResult, setShowFinalResult] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch exercises từ database
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/exercises')
        const data = await response.json()
        
        if (data.success && data.exercises) {
          // Lấy ngẫu nhiên 6 câu cho mỗi bài (4 bài, tổng 24 câu)
          const selectedExercises: Exercise[] = []
          
          for (let lessonId = 1; lessonId <= 4; lessonId++) {
            const lessonExercises = data.exercises.filter(
              (ex: Exercise) => ex.lessonId === lessonId.toString()
            )
            
            // Shuffle và lấy 6 câu ngẫu nhiên
            const shuffled = [...lessonExercises].sort(() => Math.random() - 0.5)
            const selected = shuffled.slice(0, 6)
            selectedExercises.push(...selected)
          }
          
          // Shuffle tất cả các câu đã chọn
          const finalExercises = selectedExercises.sort(() => Math.random() - 0.5)
          setExercises(finalExercises)
          setCompleted(new Array(finalExercises.length).fill(false))
        }
      } catch (error) {
        console.error('Error fetching exercises:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExercises()
  }, [])

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('physics-book-theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.className = savedTheme
    setStartTime(new Date())
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.className = newTheme
    localStorage.setItem('physics-book-theme', newTheme)
  }

  const handleAnswerSelect = (answer: string | number) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (showResult) return
    
    const exercise = exercises[currentExercise]
    if (exercise.type === 'multiple-choice' && exercise.options) {
      const key = parseInt(e.key)
      if (key >= 1 && key <= exercise.options.length) {
        handleAnswerSelect(key - 1)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentExercise, showResult, exercises])

  const handleSubmit = () => {
    if (selectedAnswer === '') return

    const exercise = exercises[currentExercise]
    const isCorrect = selectedAnswer === exercise.correctAnswer
    
    if (isCorrect) {
      setScore(score + 1)
    }

    const newCompleted = [...completed]
    newCompleted[currentExercise] = true
    setCompleted(newCompleted)

    setShowResult(true)
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer('')
      setShowResult(false)
    } else {
      setShowFinalResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setSelectedAnswer('')
      setShowResult(false)
    }
  }

  const handleRestart = () => {
    setCurrentExercise(0)
    setSelectedAnswer('')
    setShowResult(false)
    setScore(0)
    setShowFinalResult(false)
    setStartTime(new Date())
    
    // Fetch lại exercises mới
    const fetchExercises = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/exercises')
        const data = await response.json()
        
        if (data.success && data.exercises) {
          const selectedExercises: Exercise[] = []
          
          for (let lessonId = 1; lessonId <= 4; lessonId++) {
            const lessonExercises = data.exercises.filter(
              (ex: Exercise) => ex.lessonId === lessonId.toString()
            )
            
            const shuffled = [...lessonExercises].sort(() => Math.random() - 0.5)
            const selected = shuffled.slice(0, 6)
            selectedExercises.push(...selected)
          }
          
          const finalExercises = selectedExercises.sort(() => Math.random() - 0.5)
          setExercises(finalExercises)
          setCompleted(new Array(finalExercises.length).fill(false))
        }
      } catch (error) {
        console.error('Error fetching exercises:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExercises()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'text-green-600 dark:text-green-400'
      case 'intermediate': return 'text-yellow-600 dark:text-yellow-400'
      case 'advanced': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'Cơ bản'
      case 'intermediate': return 'Thông hiểu'
      case 'advanced': return 'Vận dụng cao'
      default: return difficulty
    }
  }

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Đang tải bài tập...</p>
        </div>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Không có bài tập nào</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    )
  }

  if (showFinalResult) {
    const percentage = Math.round((score / exercises.length) * 100)
    const totalTime = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0
    const minutes = Math.floor(totalTime / 60)
    const seconds = totalTime % 60

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              🎉 Hoàn thành bài luyện tập!
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Số câu đúng:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {score}/{exercises.length}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Điểm số:</span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {percentage}%
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Thời gian:</span>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Làm lại
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const exercise = exercises[currentExercise]
  const progress = ((currentExercise + 1) / exercises.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-24"></div>
          
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Luyện tập</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Câu {currentExercise + 1}/{exercises.length}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => router.push('/lessons')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            📚 Danh sách bài học
          </button>
          <div className="flex-1"></div>
          <button
            onClick={handlePrevious}
            disabled={currentExercise === 0}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            ← Câu trước
          </button>
          <button
            onClick={handleNext}
            disabled={currentExercise === exercises.length - 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Câu sau →
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Exercise Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          {/* Exercise Info */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {exercise.lessonTitle}
            </span>
            <span className={`text-sm font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
              {getDifficultyLabel(exercise.difficulty)}
            </span>
          </div>

          {/* Question */}
          <div className="mb-6">
            <p className="text-lg text-gray-800 dark:text-white leading-relaxed">
              {exercise.question}
            </p>
          </div>

          {/* Answer Options */}
          {exercise.type === 'multiple-choice' && exercise.options && (
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                (Nhấn phím 1-{exercise.options.length} để chọn nhanh)
              </p>
              {exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === exercise.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : showResult && index === exercise.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-center leading-8 mr-3 font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-gray-800 dark:text-white">{option}</span>
                </button>
              ))}
            </div>
          )}

          {exercise.type === 'calculation' && (
            <div className="mb-6">
              <input
                type="number"
                step="0.01"
                value={selectedAnswer}
                onChange={(e) => handleAnswerSelect(parseFloat(e.target.value) || '')}
                disabled={showResult}
                placeholder="Nhập đáp án..."
                className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === exercise.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
            }`}>
              <p className={`font-semibold mb-2 ${
                selectedAnswer === exercise.correctAnswer
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-red-700 dark:text-red-400'
              }`}>
                {selectedAnswer === exercise.correctAnswer ? '✓ Chính xác!' : '✗ Sai rồi!'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Đáp án đúng:</strong> {exercise.correctAnswer}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Giải thích:</strong> {exercise.explanation}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">

            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === ''}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Kiểm tra
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {currentExercise === exercises.length - 1 ? 'Hoàn thành' : 'Tiếp theo →'}
              </button>
            )}
          </div>
        </div>

        {/* Score */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Điểm hiện tại: <span className="font-bold text-blue-600 dark:text-blue-400">{score}/{currentExercise + (showResult ? 1 : 0)}</span></p>
        </div>
      </div>
    </div>
  )
}
