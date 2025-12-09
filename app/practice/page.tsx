'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Exercise {
  id: number
  type: 'multiple-choice' | 'calculation' | 'true-false'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  lesson: number
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
  const router = useRouter()

  // Hàm random số trong khoảng
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
  const randomFloat = (min: number, max: number, decimals: number = 1) => 
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals))

  // Hàm tạo bài tập ngẫu nhiên
  const generateExercises = (): Exercise[] => {
    const newExercises: Exercise[] = []

    // Bài 1: Mô tả dao động - 6 câu
    // Câu 1: Cơ bản - Tính tần số từ số dao động
    const n1 = randomInt(10, 30)
    const t1 = randomInt(5, 15)
    const f1 = n1 / t1
    newExercises.push({
      id: 1,
      type: 'calculation',
      question: `Một vật thực hiện được ${n1} dao động trong ${t1} giây. Tần số dao động của vật là bao nhiêu? (Hz, làm tròn 1 chữ số thập phân)`,
      correctAnswer: parseFloat(f1.toFixed(1)),
      explanation: `Tần số f = n/t = ${n1}/${t1} = ${f1.toFixed(1)} Hz`,
      difficulty: 'easy',
      lesson: 1
    })

    // Câu 2: Cơ bản - Tính tần số từ chu kỳ
    const T2 = randomFloat(0.2, 0.8, 1)
    const f2 = 1 / T2
    newExercises.push({
      id: 2,
      type: 'calculation',
      question: `Một dao động có chu kì T = ${T2}s. Tìm tần số dao động. (Hz, làm tròn 1 chữ số thập phân)`,
      correctAnswer: parseFloat(f2.toFixed(1)),
      explanation: `Tần số f = 1/T = 1/${T2} = ${f2.toFixed(1)} Hz`,
      difficulty: 'easy',
      lesson: 1
    })

    // Câu 3: Thông hiểu - Tính số chu kỳ
    const f3 = randomInt(3, 8)
    const t3 = randomInt(2, 5)
    const n3 = f3 * t3
    newExercises.push({
      id: 3,
      type: 'calculation',
      question: `Một vật dao động với tần số f = ${f3} Hz. Trong ${t3} giây, vật thực hiện được bao nhiêu chu kỳ dao động?`,
      correctAnswer: n3,
      explanation: `Số chu kỳ n = f × t = ${f3} × ${t3} = ${n3} chu kỳ`,
      difficulty: 'medium',
      lesson: 1
    })

    // Câu 4: Thông hiểu - Tính số chu kỳ trong khoảng thời gian
    const T4 = randomFloat(0.1, 0.3, 1)
    const t0_4 = randomInt(1, 3)
    const t1_4 = t0_4 + randomFloat(1.5, 3.5, 1)
    const dt4 = t1_4 - t0_4
    const n4 = Math.floor(dt4 / T4)
    newExercises.push({
      id: 4,
      type: 'calculation',
      question: `Một dao động có chu kì T = ${T4}s. Từ thời điểm t₀ = ${t0_4}s đến t₁ = ${t1_4}s, vật thực hiện được bao nhiêu chu kỳ?`,
      correctAnswer: n4,
      explanation: `Khoảng thời gian Δt = ${t1_4} - ${t0_4} = ${dt4.toFixed(1)}s. Số chu kỳ n = Δt/T = ${dt4.toFixed(1)}/${T4} = ${n4} chu kỳ`,
      difficulty: 'medium',
      lesson: 1
    })

    // Câu 5: Vận dụng cao - Hai dao động
    const f5_1 = randomInt(3, 6)
    const f5_2 = f5_1 + randomInt(2, 4)
    const n5_1 = randomInt(6, 12)
    const t5 = n5_1 / f5_1
    const n5_2 = f5_2 * t5
    newExercises.push({
      id: 5,
      type: 'calculation',
      question: `Hai dao động có tần số f₁ = ${f5_1} Hz và f₂ = ${f5_2} Hz. Khi dao động 1 hoàn thành ${n5_1} chu kỳ thì dao động 2 hoàn thành bao nhiêu chu kỳ?`,
      correctAnswer: n5_2,
      explanation: `Dạng 2a - Nhiều dao động. Thời gian dao động 1: t = n₁/f₁ = ${n5_1}/${f5_1} = ${t5.toFixed(1)}s. Số chu kỳ dao động 2: n₂ = f₂ × t = ${f5_2} × ${t5.toFixed(1)} = ${n5_2} chu kỳ`,
      difficulty: 'hard',
      lesson: 1
    })

    // Câu 6: Vận dụng cao - Kết hợp
    const T6_1 = randomFloat(0.3, 0.5, 1)
    const f6_1 = 1 / T6_1
    const f6_2 = f6_1 * randomInt(2, 3)
    const t6 = randomInt(4, 8)
    const n6 = f6_2 * t6
    newExercises.push({
      id: 6,
      type: 'calculation',
      question: `Dao động 1 có chu kỳ T₁ = ${T6_1}s và tần số f₁ = ${f6_1.toFixed(1)} Hz. Dao động 2 có tần số gấp ${(f6_2/f6_1).toFixed(0)} lần dao động 1. Trong ${t6} giây, dao động 2 thực hiện được bao nhiêu chu kỳ?`,
      correctAnswer: n6,
      explanation: `Dạng 2b - Kết hợp. Tần số dao động 2: f₂ = ${(f6_2/f6_1).toFixed(0)}f₁ = ${(f6_2/f6_1).toFixed(0)} × ${f6_1.toFixed(1)} = ${f6_2.toFixed(1)} Hz. Số chu kỳ: n₂ = f₂ × t = ${f6_2.toFixed(1)} × ${t6} = ${n6} chu kỳ`,
      difficulty: 'hard',
      lesson: 1
    })

    // Bài 2: Phương trình dao động - 6 câu
    // Câu 7: Cơ bản
    newExercises.push({
      id: 7,
      type: 'multiple-choice',
      question: 'Trong phương trình dao động điều hòa x = Acos(ωt + φ), đại lượng (ωt + φ) được gọi là:',
      options: ['Biên độ', 'Pha dao động', 'Tần số góc', 'Li độ'],
      correctAnswer: 1,
      explanation: 'Đại lượng (ωt + φ) được gọi là pha dao động, biểu thị trạng thái dao động tại thời điểm t.',
      difficulty: 'easy',
      lesson: 2
    })

    // Câu 8: Cơ bản - Biên độ
    const A8 = randomInt(4, 10)
    newExercises.push({
      id: 8,
      type: 'calculation',
      question: `Một dao động điều hòa có phương trình x = ${A8}cos(4πt) cm. Biên độ dao động là bao nhiêu? (cm)`,
      correctAnswer: A8,
      explanation: `Từ phương trình x = Acos(ωt + φ), ta có A = ${A8} cm`,
      difficulty: 'easy',
      lesson: 2
    })

    // Câu 9: Thông hiểu - Tần số góc
    const omega9 = randomInt(4, 8) * Math.PI
    newExercises.push({
      id: 9,
      type: 'calculation',
      question: `Dao động có phương trình x = 8cos(${omega9/Math.PI}πt + π/6) cm. Tần số góc của dao động là bao nhiêu? (rad/s, làm tròn 2 chữ số thập phân)`,
      correctAnswer: parseFloat(omega9.toFixed(2)),
      explanation: `Từ phương trình, tần số góc ω = ${omega9/Math.PI}π ≈ ${omega9.toFixed(2)} rad/s`,
      difficulty: 'medium',
      lesson: 2
    })

    // Câu 10: Thông hiểu - Pha ban đầu
    const phi10_options = ['π/6', 'π/4', 'π/3', '-π/3', '-π/4', '-π/6']
    const phi10_choice = phi10_options[randomInt(0, phi10_options.length - 1)]
    const phi10_values: {[key: string]: number} = {
      'π/6': Math.PI/6, 'π/4': Math.PI/4, 'π/3': Math.PI/3,
      '-π/3': -Math.PI/3, '-π/4': -Math.PI/4, '-π/6': -Math.PI/6
    }
    newExercises.push({
      id: 10,
      type: 'calculation',
      question: `Dao động có phương trình x = 10cos(2πt ${phi10_choice}) cm. Pha ban đầu của dao động là bao nhiêu? (rad, làm tròn 2 chữ số thập phân)`,
      correctAnswer: parseFloat(phi10_values[phi10_choice].toFixed(2)),
      explanation: `Pha ban đầu φ = ${phi10_choice} ≈ ${phi10_values[phi10_choice].toFixed(2)} rad`,
      difficulty: 'medium',
      lesson: 2
    })

    // Câu 11: Vận dụng cao - Dạng 3d
    const A11 = randomInt(6, 10)
    const x11 = A11 / 2
    newExercises.push({
      id: 11,
      type: 'calculation',
      question: `Một vật dao động điều hòa có biên độ A = ${A11} cm. Tại thời điểm t₁, vật có li độ x₁ = ${x11} cm và đang chuyển động về vị trí cân bằng. Tại thời điểm t₂ = t₁ + T/4, li độ của vật gần giá trị nào nhất? (cm, làm tròn 1 chữ số thập phân)`,
      correctAnswer: parseFloat((-x11 * Math.sqrt(3)).toFixed(1)),
      explanation: `Dạng 3d. Tại t₁: x₁ = ${x11} = ${A11}cos(φ₁) → φ₁ = π/3. Sau T/4: φ₂ = φ₁ + π/2 = 5π/6. Li độ: x₂ = ${A11}cos(5π/6) ≈ ${(-x11 * Math.sqrt(3)).toFixed(1)} cm`,
      difficulty: 'hard',
      lesson: 2
    })

    // Câu 12: Vận dụng cao - Dạng 4a
    const A12 = randomInt(5, 8)
    const x12_1 = A12 / 2
    const x12_2 = parseFloat((-A12 * Math.sqrt(3) / 2).toFixed(1))
    newExercises.push({
      id: 12,
      type: 'calculation',
      question: `Hai dao động điều hòa có phương trình x₁ = ${A12}cos(4πt) cm và x₂ = ${A12}cos(4πt + π/2) cm. Khi dao động 1 có li độ x₁ = ${x12_1} cm và đang tăng, dao động 2 có li độ bao nhiêu? (cm, làm tròn 1 chữ số thập phân)`,
      correctAnswer: x12_2,
      explanation: `Dạng 4a. Khi x₁ = ${x12_1}: φ₁ = π/3 (đang tăng). Pha dao động 2: φ₂ = π/3 + π/2 = 5π/6. Li độ: x₂ = ${A12}cos(5π/6) ≈ ${x12_2} cm`,
      difficulty: 'hard',
      lesson: 2
    })

    // Bài 3: Năng lượng - 6 câu
    // Câu 13: Cơ bản
    newExercises.push({
      id: 13,
      type: 'multiple-choice',
      question: 'Cơ năng trong dao động điều hòa được tính theo công thức nào?',
      options: ['W = ½mv²', 'W = ½kx²', 'W = ½kA²', 'W = ½mω²x²'],
      correctAnswer: 2,
      explanation: 'Cơ năng dao động điều hòa: W = ½kA² = ½mω²A² = const',
      difficulty: 'easy',
      lesson: 3
    })

    // Câu 14: Cơ bản
    newExercises.push({
      id: 14,
      type: 'true-false',
      question: 'Động năng của vật dao động điều hòa đạt cực đại tại vị trí cân bằng.',
      correctAnswer: 'true',
      explanation: 'Đúng. Tại vị trí cân bằng (x = 0), vận tốc đạt cực đại nên động năng cực đại.',
      difficulty: 'easy',
      lesson: 3
    })

    // Câu 15: Thông hiểu
    const k15 = randomInt(60, 120)
    const A15 = randomFloat(0.03, 0.08, 2)
    const W15 = 0.5 * k15 * A15 * A15
    newExercises.push({
      id: 15,
      type: 'calculation',
      question: `Một lò xo có độ cứng k = ${k15} N/m, vật dao động với biên độ A = ${A15}m. Cơ năng dao động là bao nhiêu? (J, làm tròn 2 chữ số thập phân)`,
      correctAnswer: parseFloat(W15.toFixed(2)),
      explanation: `Cơ năng W = ½kA² = ½ × ${k15} × (${A15})² = ${W15.toFixed(2)} J`,
      difficulty: 'medium',
      lesson: 3
    })

    // Câu 16: Thông hiểu
    const m16 = randomFloat(0.1, 0.3, 1)
    const omega16 = randomInt(8, 12)
    const A16 = randomFloat(0.03, 0.06, 2)
    const Wd16 = 0.5 * m16 * omega16 * omega16 * A16 * A16
    newExercises.push({
      id: 16,
      type: 'calculation',
      question: `Vật m = ${m16} kg dao động điều hòa với tần số góc ω = ${omega16} rad/s, biên độ A = ${A16}m. Động năng cực đại của vật là bao nhiêu? (J, làm tròn 2 chữ số thập phân)`,
      correctAnswer: parseFloat(Wd16.toFixed(2)),
      explanation: `Động năng cực đại = Cơ năng: Wđmax = W = ½mω²A² = ½ × ${m16} × ${omega16}² × (${A16})² = ${Wd16.toFixed(2)} J`,
      difficulty: 'medium',
      lesson: 3
    })

    // Câu 17: Vận dụng cao
    const A17 = randomInt(8, 12)
    const x17 = A17 / 2
    newExercises.push({
      id: 17,
      type: 'calculation',
      question: `Một vật dao động điều hòa với biên độ A = ${A17} cm, cơ năng W = 0,02 J. Tại vị trí có động năng bằng 3 lần thế năng, li độ của vật là bao nhiêu? (cm)`,
      correctAnswer: x17,
      explanation: `Dạng 3 ứng dụng năng lượng. Wđ = 3Wt và W = Wđ + Wt = 4Wt → Wt = W/4. Có Wt = ½kx² và W = ½kA² → x²/A² = 1/4 → x = A/2 = ${x17} cm`,
      difficulty: 'hard',
      lesson: 3
    })

    // Câu 18: Vận dụng cao
    const W18 = randomFloat(0.4, 0.6, 1)
    const Wd18_1 = randomFloat(0.25, 0.35, 2)
    const Wt18_1 = W18 - Wd18_1
    const Wd18_2 = Wt18_1
    newExercises.push({
      id: 18,
      type: 'calculation',
      question: `Vật m = 0,5 kg dao động với ω = 5 rad/s, cơ năng W = ${W18} J. Tại thời điểm t₁ có Wđ = ${Wd18_1} J. Tại thời điểm t₂ = t₁ + π/10 (s), động năng của vật là bao nhiêu? (J, làm tròn 2 chữ số thập phân)`,
      correctAnswer: parseFloat(Wd18_2.toFixed(2)),
      explanation: `Tại t₁: Wt₁ = W - Wđ₁ = ${W18} - ${Wd18_1} = ${Wt18_1.toFixed(2)} J. Sau Δt = π/10 s, pha thay đổi: Δφ = 5 × π/10 = π/2. Khi pha lệch π/2, năng lượng đảo vai trò: Wđ₂ = Wt₁ = ${Wd18_2.toFixed(2)} J`,
      difficulty: 'hard',
      lesson: 3
    })

    // Bài 4: Dao động tắt dần và cộng hưởng - 6 câu
    newExercises.push({
      id: 19,
      type: 'multiple-choice',
      question: 'Nguyên nhân gây ra dao động tắt dần là:',
      options: ['Lực đàn hồi', 'Lực ma sát', 'Trọng lực', 'Lực quán tính'],
      correctAnswer: 1,
      explanation: 'Dao động tắt dần do lực ma sát làm tiêu hao năng lượng của hệ dao động.',
      difficulty: 'easy',
      lesson: 4
    })

    newExercises.push({
      id: 20,
      type: 'multiple-choice',
      question: 'Hiện tượng cộng hưởng xảy ra khi:',
      options: [
        'Tần số ngoại lực bằng tần số riêng của hệ',
        'Biên độ dao động đạt cực tiểu',
        'Vật ngừng dao động',
        'Ma sát rất lớn'
      ],
      correctAnswer: 0,
      explanation: 'Cộng hưởng xảy ra khi tần số của ngoại lực bằng tần số riêng của hệ, biên độ dao động đạt cực đại.',
      difficulty: 'easy',
      lesson: 4
    })

    newExercises.push({
      id: 21,
      type: 'true-false',
      question: 'Dao động duy trì là dao động tắt dần được bổ sung năng lượng để giữ biên độ không đổi.',
      correctAnswer: 'true',
      explanation: 'Đúng. Dao động duy trì được bổ sung năng lượng đúng bằng phần năng lượng mất đi do ma sát.',
      difficulty: 'medium',
      lesson: 4
    })

    newExercises.push({
      id: 22,
      type: 'multiple-choice',
      question: 'Trong các ứng dụng sau, ứng dụng nào LÀ LỢI ÍCH của hiện tượng cộng hưởng?',
      options: [
        'Đàn guitar phát ra âm thanh to hơn nhờ hộp cộng hưởng',
        'Cầu sập do binh lính đi đồng bộ',
        'Nhà cao tầng bị rung lắc do động đất',
        'Máy móc bị hỏng do rung động'
      ],
      correctAnswer: 0,
      explanation: 'Hộp cộng hưởng trong đàn guitar giúp khuếch đại âm thanh là ứng dụng có lợi của cộng hưởng.',
      difficulty: 'medium',
      lesson: 4
    })

    // Câu 23: Vận dụng cao
    const f23 = randomInt(2, 5)
    newExercises.push({
      id: 23,
      type: 'calculation',
      question: `Một hệ dao động với tần số riêng f₀ = ${f23} Hz chịu ngoại lực F = F₀cos(2πft) N. Để biên độ dao động đạt cực đại, tần số f của ngoại lực phải là bao nhiêu? (Hz)`,
      correctAnswer: f23,
      explanation: `Dạng 4 - ứng dụng cộng hưởng. Biên độ dao động đạt cực đại khi xảy ra cộng hưởng, tức là f = f₀ = ${f23} Hz`,
      difficulty: 'hard',
      lesson: 4
    })

    // Câu 24: Vận dụng cao
    const A24_0 = randomInt(10, 15)
    const percent24 = randomInt(4, 8)
    const n24 = randomInt(8, 12)
    const ratio24 = (100 - percent24) / 100
    const A24 = A24_0 * Math.pow(ratio24, n24)
    newExercises.push({
      id: 24,
      type: 'calculation',
      question: `Một vật dao động tắt dần với biên độ ban đầu A₀ = ${A24_0} cm. Sau mỗi chu kỳ, biên độ giảm ${percent24}%. Sau ${n24} chu kỳ, biên độ dao động còn lại là bao nhiêu? (cm, làm tròn 1 chữ số thập phân)`,
      correctAnswer: parseFloat(A24.toFixed(1)),
      explanation: `Dạng ứng dụng dao động tắt dần. Sau mỗi chu kỳ, biên độ còn ${100-percent24}% = ${ratio24} lần. Sau ${n24} chu kỳ: A = A₀ × (${ratio24})^${n24} = ${A24_0} × ${Math.pow(ratio24, n24).toFixed(4)} ≈ ${A24.toFixed(1)} cm`,
      difficulty: 'hard',
      lesson: 4
    })

    return newExercises
  }

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('physics-book-theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.className = savedTheme
    
    // Tạo bài tập ngẫu nhiên
    const newExercises = generateExercises()
    setExercises(newExercises)
    setCompleted(new Array(newExercises.length).fill(false))
    setStartTime(new Date())
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'sepia' : 'light'
    setTheme(newTheme)
    document.documentElement.className = newTheme
    localStorage.setItem('physics-book-theme', newTheme)
  }

  const handleAnswerSelect = (answer: string | number) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

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

  const handleRestart = () => {
    // Tạo bài tập mới
    const newExercises = generateExercises()
    setExercises(newExercises)
    setCurrentExercise(0)
    setScore(0)
    setSelectedAnswer('')
    setShowResult(false)
    setShowFinalResult(false)
    setCompleted(new Array(newExercises.length).fill(false))
    setStartTime(new Date())
  }

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setSelectedAnswer('')
      setShowResult(false)
    }
  }

  const handleSkip = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer('')
      setShowResult(false)
    }
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400'
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Xuất sắc! 🏆'
    if (percentage >= 80) return 'Tốt! 👏'
    if (percentage >= 70) return 'Khá! 👍'
    if (percentage >= 60) return 'Trung bình! 📚'
    return 'Cần cố gắng hơn! 💪'
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (showFinalResult) {
    const percentage = Math.round((score / exercises.length) * 100)
    const timeTaken = startTime ? Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60) : 0

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
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {timeTaken}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Phút hoàn thành
                </div>
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
              <button
                onClick={handleRestart}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                🔄 Làm lại
              </button>
              
              <button
                onClick={() => router.push('/lessons')}
                className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                📚 Quay lại bài học
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                🏠 Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const exercise = exercises[currentExercise]
  const isCorrect = selectedAnswer === exercise.correctAnswer

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
          </div>
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
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  exercise.difficulty === 'easy' 
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

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                {exercise.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {exercise.type === 'multiple-choice' && exercise.options && (
                exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswer === index
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
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswer === 'true'
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
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswer === 'false'
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
                    <div className={`p-4 rounded-lg ${
                      isCorrect 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}>
                      Đáp án đúng: {exercise.correctAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Result and Explanation */}
            {showResult && (
              <div className={`mb-6 p-4 rounded-lg ${
                isCorrect 
                  ? 'bg-green-50 border border-green-200 dark:bg-green-900/10 dark:border-green-800'
                  : 'bg-red-50 border border-red-200 dark:bg-red-900/10 dark:border-red-800'
              }`}>
                <div className={`flex items-center mb-2 ${
                  isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
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

            {/* Action Buttons */}
            <div className="flex justify-between gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => router.push('/lessons')}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  ← Thoát
                </button>

                {!showResult && currentExercise > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                  >
                    ← Câu trước
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {!showResult && currentExercise < exercises.length - 1 && (
                  <button
                    onClick={handleSkip}
                    className="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Bỏ qua →
                  </button>
                )}

                {!showResult ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === ''}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      selectedAnswer === ''
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
        </div>
      </main>
    </div>
  )
}