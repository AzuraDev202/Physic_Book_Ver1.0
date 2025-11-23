'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MathFormula } from '@/components/Math'
import SlidePresentation, { SlidePresentationRef } from '@/components/SlidePresentation'
import { useProgress } from '@/hooks/useProgress'
import Toast from '@/components/Toast'
import OscillationSimulation from '@/components/OscillationSimulation'
import axios from 'axios'

interface Slide {
  id: number
  title: string
  content: string
  type: 'intro' | 'defination' | 'example' | 'summary'
  formulas?: string[]
  images?: string[]
  notes?: string
}

interface LessonContent {
  id: number
  title: string
  slides: Slide[]
}

export default function LessonPage() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCompletionToast, setShowCompletionToast] = useState(false)
  const slideRef = useRef<SlidePresentationRef>(null)
  const router = useRouter()
  const params = useParams()
  const lessonId = params?.id as string
  const { updateProgress } = useProgress()
  const [isUpdating, setIsUpdating] = useState(false)

  const toNumberSafe = (val: any) => {
    try {
      if (val == null) return NaN
      // Prefer calling .toString() on the value if available (works for String objects and primitives)
      const s = typeof (val as any)?.toString === 'function' ? (val as any).toString() : String(val)
      return Number(s)
    } catch (e) {
      return NaN
    }
  }

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('physics-book-theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.className = savedTheme

    // Load lesson content
    async function fetchLesson() {
      setLoading(true)
      try {
        const res = await axios.get(`/api/chapters`)
        const chapters = res.data
        const chapter = Array.isArray(chapters) ? chapters[0] : chapters
        const lesson = chapter.lessons.find((l: any) => l.id === lessonId)
        setLessonContent(lesson || null)
      } catch (err) {
        setLessonContent(null)
      }
      setLoading(false)
    }
    fetchLesson()
  }, [lessonId])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Chỉ hiện sidebar khi chuột ở rất gần edge trái (trong vòng 5px)
      const threshold = 5
      if (e.clientX <= threshold) {
        setShowSidebar(true)
      } else if (e.clientX > 320) { // Hide when mouse moves away from sidebar area
        setShowSidebar(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Re-render MathJax when content changes
    if (typeof window !== 'undefined' && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise?.()
    }
  }, [lessonContent])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'sepia' : 'light'
    setTheme(newTheme)
    document.documentElement.className = newTheme
    localStorage.setItem('physics-book-theme', newTheme)
  }

  const handleBackToLessons = () => {
    router.push('/lessons')
  }

  const handleNextLesson = async () => {
    const currentId = toNumberSafe(lessonId)
    if (Number.isNaN(currentId)) {
      // fallback: navigate without marking progress
      console.warn('Invalid lessonId, navigating without updating progress:', lessonId)
      if (typeof lessonId === 'string' && +lessonId >= 4) router.push('/practice')
      else router.push(`/lesson/${(Number(lessonId) || 0) + 1}`)
      return
    }

    setIsUpdating(true)
    try {
      await updateProgress?.(currentId, true)
    } catch (err) {
      console.error('Failed to update progress for lesson', currentId, err)
    } finally {
      setIsUpdating(false)
      if (currentId < 4) {
        router.push(`/lesson/${currentId + 1}`)
      } else {
        router.push('/practice')
      }
    }
  }

  const handlePrevLesson = () => {
    const currentId = toNumberSafe(lessonId)
    if (!Number.isNaN(currentId) && currentId > 1) {
      router.push(`/lesson/${currentId - 1}`)
    }
  }

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }

  const handleLessonComplete = () => {
    // Show completion toast and navigate back to lessons
    setShowCompletionToast(true)
    setTimeout(() => {
      router.push('/lessons')
    }, 2000)
  }

  const getSlideTypeIcon = (type: string) => {
    switch (type) {
      case 'intro': return '📚'
      case 'defination': return '💡'
      case 'example': return '🔍'
      case 'summary': return '📋'
      default: return '📄'
    }
  }

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!lessonContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Bài học không tồn tại
          </h1>
          <button
            onClick={handleBackToLessons}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Quay lại danh sách bài học
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors lg:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    Bài {lessonId}: {lessonContent.title}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Chương 1: Dao động</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? '🌙' : theme === 'dark' ? '☀️' : '🌅'}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar with precise edge detection */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 z-40">
        {/* Edge indicator - chỉ hiện khi cần */}
        {showSidebar && !sidebarOpen && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-blue-500/50 rounded-r-full transition-all duration-200"></div>
        )}
        
        {/* Actual sidebar */}
        <div className={`h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 shadow-xl ${
          sidebarOpen || showSidebar ? 'translate-x-0' : '-translate-x-72'
        }`}>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Slides bài học
            </h2>
            <div className="space-y-2 text-sm">
              {lessonContent?.slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    slideRef.current?.goToSlide(index)
                    setCurrentSlide(index)
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === currentSlide
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">{getSlideTypeIcon(slide.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{slide.title}</div>
                      <div className="text-xs opacity-75 capitalize">{slide.type}</div>
                    </div>
                    <span className="text-xs opacity-60">{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Quick navigation */}
            <div className="mt-8 space-y-2">
              <button
                onClick={() => router.push('/lessons')}
                className="w-full p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-colors text-sm"
              >
                📚 Danh sách bài học
              </button>
              <button
                onClick={() => router.push('/practice')}
                className="w-full p-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-medium transition-colors text-sm"
              >
                🎯 Luyện tập
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="transition-all duration-300 pt-16 ml-0">
        <div className="max-w-4xl mx-auto p-6">
          {/* Navigation breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
            <button 
              onClick={() => router.push('/')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Trang chủ
            </button>
            <span>›</span>
            <button 
              onClick={handleBackToLessons}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Danh sách bài học
            </button>
            <span>›</span>
            <span className="text-blue-600 dark:text-blue-400">
              Bài {lessonId}
            </span>
          </div>

          {/* Slide Presentation */}
          <div className="h-[calc(100vh-8rem)]">
            <SlidePresentation 
              ref={slideRef}
              slides={lessonContent.slides} 
              lessonTitle={`Bài ${lessonContent.id}: ${lessonContent.title}`}
              lessonId={toNumberSafe(lessonId)}
              onSlideChange={handleSlideChange}
              onLessonComplete={handleLessonComplete}
            />
          </div>

          {/* Navigation buttons */}
          <div id="navigation-buttons" className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrevLesson}
              disabled={toNumberSafe(lessonId) <= 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                toNumberSafe(lessonId) <= 1
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Bài trước
            </button>

            <button
              onClick={handleBackToLessons}
              className="px-6 py-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-colors"
            >
              📚 Danh sách bài học
            </button>

            <button
              onClick={handleNextLesson}
              disabled={isUpdating}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${isUpdating ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {toNumberSafe(lessonId) >= 4 ? '🎯 Luyện tập' : 'Bài tiếp theo'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Completion Toast */}
      <Toast
        message={`Chúc mừng! Bạn đã hoàn thành bài ${lessonId}: ${lessonContent?.title}`}
        type="success"
        isVisible={showCompletionToast}
        onClose={() => setShowCompletionToast(false)}
        duration={2000}
      />
    </div>
  )
}