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

interface AIAnalysis {
  overview: string;
  strengths: string[];
  weaknesses: string[];
  studyPlan: Array<{
    topic: string;
    time: string;
    resources: string[];
  }>;
  weekGoal: string;
}

interface ExerciseResult {
  id: number;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lesson: number;
  correct: boolean;
  selectedAnswer: string | number;
  correctAnswer: string | number;
  explanation: string;
}

export default function PracticePage() {

  //State for AI
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [exerciseResults, setExerciseResults] = useState<ExerciseResult[]>([])
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | number }>({})


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

    // Lưu kết quả của câu hỏi hiện tại
    const newExerciseResults = [...exerciseResults.filter(Boolean)]
    newExerciseResults.push({
      id: exercise.id,
      question: exercise.question,
      difficulty: exercise.difficulty,
      lesson: exercise.lesson,
      correct: isCorrect,
      selectedAnswer: selectedAnswer,
      correctAnswer: exercise.correctAnswer,
      explanation: exercise.explanation
    })
    setExerciseResults(newExerciseResults)

    // Lưu đáp án người dùng
    setUserAnswers(prev => ({
      ...prev,
      [exercise.id]: selectedAnswer
    }))

    const newCompleted = [...completed]
    newCompleted[currentExercise] = true
    setCompleted(newCompleted)

    setShowResult(true)
  }

  //AI analyze
  const analyzeWithAI = async () => {
    console.log("đã tới đây")
    if (exerciseResults.length === 0) return


    setIsAnalyzing(true)
    try {
      // ==================== DỮ LIỆU SIÊU TỐI GIẢN ====================
      // Chỉ gửi 6 con số quan trọng nhất
      const progressData = {
        total: exercises.length,
        score: score,
        percentage: Math.round((score / exercises.length) * 100),
        timeMinutes: startTime ? Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60) : 0,

        // Bài học có tỷ lệ đúng thấp nhất (chỉ cần lesson number và rate)
        weakestLesson: (() => {
          const lessonMap = new Map<number, { total: number, correct: number }>()

          exercises.forEach(ex => {
            const result = exerciseResults.find(r => r.id === ex.id)
            const current = lessonMap.get(ex.lesson) || { total: 0, correct: 0 }
            current.total++
            if (result?.correct) current.correct++
            lessonMap.set(ex.lesson, current)
          })

          let worstLesson = 0
          let worstRate = 100

          lessonMap.forEach((stats, lesson) => {
            const rate = Math.round((stats.correct / stats.total) * 100)
            if (rate < worstRate) {
              worstRate = rate
              worstLesson = lesson
            }
          })

          return worstLesson > 0 ? { lesson: worstLesson, correctRate: worstRate } : null
        })(),

        // Độ khó có tỷ lệ đúng thấp nhất
        weakestDifficulty: (() => {
          const diffMap = new Map<string, { total: number, correct: number }>()

          exercises.forEach(ex => {
            const result = exerciseResults.find(r => r.id === ex.id)
            const current = diffMap.get(ex.difficulty) || { total: 0, correct: 0 }
            current.total++
            if (result?.correct) current.correct++
            diffMap.set(ex.difficulty, current)
          })

          let worstDiff = ''
          let worstRate = 100

          diffMap.forEach((stats, diff) => {
            const rate = Math.round((stats.correct / stats.total) * 100)
            if (rate < worstRate) {
              worstRate = rate
              worstDiff = diff
            }
          })

          return worstDiff ? {
            difficulty: worstDiff,
            correctRate: worstRate
          } : null
        })()
      }

      // Debug: in kích thước dữ liệu
      const dataSize = JSON.stringify(progressData).length
      console.log(`📊 Data size: ${dataSize} bytes (${Math.round(dataSize / 1024)} KB)`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // Timeout 10s

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        console.log("data respone: ", data)
        if (data.success && data.analysis) {
          console.log("🔥 SETTING AI ANALYSIS:", data.analysis);
          setAiAnalysis(data.analysis)
          setShowAIAnalysis(true)
          return
        }
      }

      // Fallback: nếu API lỗi, dùng phân tích cục bộ
      throw new Error('API error')

    } catch (error) {
      console.error('AI Analysis error:', error)
      setShowAIAnalysis(true)
    } finally {
      setIsAnalyzing(false)
    }
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

  //loading state
  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              AI đang phân tích...
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Đang phân tích kết quả và đề xuất lộ trình học tập tối ưu cho bạn
            </p>
          </div>
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hoàn thành bài luyện tập!
            </h1>

            <div className="mb-8">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(percentage)}`}>
                {score}/{exercises.length}
              </div>
              <div className={`text-2xl font-semibold mb-2 ${getScoreColor(percentage)}`}>
                {percentage}%
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-300">
                {getScoreMessage(percentage)}
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

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(score / timeTaken * 60) || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Điểm/giờ
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Thêm nút phân tích AI */}
              <button

                onClick={analyzeWithAI}
                disabled={isAnalyzing}
                className={`w-full px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${isAnalyzing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang phân tích...</span>
                  </>
                ) : (
                  <>
                    <span>🤖</span>
                    <span>Phân tích AI chi tiết</span>
                  </>
                )}
              </button>
              
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
                onClick={() => router.push('/lessons')}
                className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                📚 Quay lại bài học
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
        {/* AI Analysis Modal */}
        {showAIAnalysis && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl max-h-[80vh] overflow-y-auto">


              {!aiAnalysis ? (
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Đang tải dữ liệu AI...
                </p>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <span className="mr-2">🤖</span>
                      Phân tích học tập AI
                    </h2>
                    <button
                      onClick={() => setShowAIAnalysis(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Overview */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      📊 Tổng quan
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {aiAnalysis.overview}
                    </p>
                  </div>

                  {/* Strengths */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center">
                        <span className="mr-2">✅</span>
                        Điểm mạnh
                      </h3>
                      <ul className="space-y-2">
                        {aiAnalysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">✓</span>
                            <span className="text-green-700 dark:text-green-400">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center">
                        <span className="mr-2">📝</span>
                        Cần cải thiện
                      </h3>
                      <ul className="space-y-2">
                        {aiAnalysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span className="text-red-700 dark:text-red-400">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Study Plan */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <span className="mr-2">📅</span>
                      Kế hoạch học tập đề xuất
                    </h3>
                    <div className="space-y-3">
                      {aiAnalysis.studyPlan.map((plan, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">{plan.topic}</h4>
                            <span className="text-sm text-blue-600 dark:text-blue-400">{plan.time}</span>
                          </div>
                          {plan.resources.length > 0 && (
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-medium">Tài nguyên: </span>
                              {plan.resources.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Week Goal */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                      <span className="mr-2">🎯</span>
                      Mục tiêu tuần này
                    </h3>
                    <p className="text-blue-700 dark:text-blue-400">{aiAnalysis.weekGoal}</p>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    )
  }

  const exercise = exercises[currentExercise]
  const progress = ((currentExercise + 1) / exercises.length) * 100

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎯</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Luyện tập tổng hợp
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Câu {currentExercise + 1}/{exercises.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Điểm: <span className="font-bold text-blue-600">{score}/{currentExercise + (showResult ? 1 : 0)}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {theme === 'light' ? '🌙' : theme === 'dark' ? '☀️' : '🌅'}
              </button>
            </div>
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
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 w-full h-1 bg-gray-200 dark:bg-gray-700 z-40">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${((currentExercise + (showResult ? 1 : 0)) / exercises.length) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-3xl mx-auto p-6">
          {/* Exercise Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Exercise Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  Bài {exercise.lesson}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${exercise.difficulty === 'easy'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                  : exercise.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                  {exercise.difficulty === 'easy' ? 'Dễ' : exercise.difficulty === 'medium' ? 'TB' : 'Khó'}
                </span>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Câu {currentExercise + 1}/{exercises.length}
              </div>
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

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {exercise.type === 'multiple-choice' && exercise.options && (
                exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${selectedAnswer === index
                      ? showResult
                        ? isCorrect
                          ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300'
                          : 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300'
                        : 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-300'
                      : showResult && index === exercise.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-medium mr-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </button>
                ))
              )}

              {exercise.type === 'true-false' && (
                <>
                  <button
                    onClick={() => handleAnswerSelect('true')}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${selectedAnswer === 'true'
                      ? showResult
                        ? isCorrect
                          ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300'
                          : 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300'
                        : 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-300'
                      : showResult && exercise.correctAnswer === 'true'
                        ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                  >
                    ✅ Đúng
                  </button>
                  <button
                    onClick={() => handleAnswerSelect('false')}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${selectedAnswer === 'false'
                      ? showResult
                        ? isCorrect
                          ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300'
                          : 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300'
                        : 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-300'
                      : showResult && exercise.correctAnswer === 'false'
                        ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                  >
                    ❌ Sai
                  </button>
                </>
              )}

              {exercise.type === 'calculation' && (
                <div className="space-y-4">
                  <input
                    type="number"
                    value={selectedAnswer}
                    onChange={(e) => handleAnswerSelect(parseFloat(e.target.value) || 0)}
                    disabled={showResult}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập đáp án của bạn..."
                  />
                  {showResult && (
                    <div className={`p-4 rounded-lg ${isCorrect
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                      }`}>
                      Đáp án đúng: {exercise.correctAnswer}
                    </div>
                  )}
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

            {/* Result and Explanation */}
            {showResult && (
              <div className={`mb-6 p-4 rounded-lg ${isCorrect
                ? 'bg-green-50 border border-green-200 dark:bg-green-900/10 dark:border-green-800'
                : 'bg-red-50 border border-red-200 dark:bg-red-900/10 dark:border-red-800'
                }`}>
                <div className={`flex items-center mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                  }`}>
                  <span className="text-xl mr-2">{isCorrect ? '✅' : '❌'}</span>
                  <span className="font-semibold">
                    {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {exercise.explanation}
                </p>
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

              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === ''}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${selectedAnswer === ''
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                  Kiểm tra
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  {currentExercise < exercises.length - 1 ? 'Câu tiếp theo →' : 'Hoàn thành 🎉'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>


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
