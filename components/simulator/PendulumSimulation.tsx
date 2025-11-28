'use client'

import { useEffect, useRef, useState } from 'react'

interface PendulumSimulationProps {
    className?: string
}

export default function PendulumSimulation({ className = "" }: PendulumSimulationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    // State cho các thông số
    const [amplitude, setAmplitude] = useState(45) // góc lệch tính bằng độ
    const [frequency, setFrequency] = useState(1)
    const [damping, setDamping] = useState(0.01)
    const [pendulumLength, setPendulumLength] = useState(150) // chiều dài con lắc
    const [showMeasure, setShowMeasure] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number
        let time = 0

        const render = () => {
            if (!ctx || !isPlaying) return

            // Clear canvas
            ctx.fillStyle = '#f9fafb'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const centerX = canvas.width / 2
            const centerY = 100 // điểm treo con lắc

            // Tính góc lệch theo thời gian: θ = θ₀ * cos(ωt) * e^(-βt)
            const currentAmplitude = amplitude * Math.cos(2 * Math.PI * frequency * time) * Math.exp(-damping * time)
            const angle = (currentAmplitude * Math.PI) / 180 // chuyển sang radian

            // Tính tọa độ quả nặng
            const bobX = centerX + pendulumLength * Math.sin(angle)
            const bobY = centerY + pendulumLength * Math.cos(angle)

            // Vẽ thước đo biên độ nếu được bật
            if (showMeasure) {
                drawAmplitudeMeasure(ctx, centerX, centerY, amplitude, pendulumLength)
            }

            // Vẽ giá đỡ
            ctx.strokeStyle = '#8b5a2b'
            ctx.lineWidth = 8
            ctx.beginPath()
            ctx.moveTo(centerX - 80, centerY)
            ctx.lineTo(centerX + 80, centerY)
            ctx.stroke()

            // Vẽ điểm treo
            ctx.fillStyle = '#4b5563'
            ctx.beginPath()
            ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI)
            ctx.fill()

            // Vẽ dây treo
            ctx.strokeStyle = '#6b7280'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(bobX, bobY)
            ctx.stroke()

            // Vẽ quả nặng
            ctx.fillStyle = '#3b82f6'
            ctx.beginPath()
            ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI)
            ctx.fill()

            // Vẽ viền quả nặng
            ctx.strokeStyle = '#1d4ed8'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI)
            ctx.stroke()

            // Vẽ đường biên độ hiện tại
            ctx.strokeStyle = '#ef4444'
            ctx.lineWidth = 1
            ctx.setLineDash([5, 3])
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(bobX, bobY)
            ctx.stroke()
            ctx.setLineDash([])

            // Hiển thị góc lệch hiện tại
            ctx.fillStyle = '#dc2626'
            ctx.font = '14px Arial'
            ctx.fillText(`Góc lệch: ${Math.abs(currentAmplitude).toFixed(1)}°`, 10, 30)

            time += 0.016
            animationId = requestAnimationFrame(render)
        }

        if (isPlaying) {
            animationId = requestAnimationFrame(render)
        }

        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [amplitude, frequency, damping, pendulumLength, showMeasure, isPlaying])

    // Hàm vẽ thước đo biên độ
    const drawAmplitudeMeasure = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, maxAmplitude: number, length: number) => {
        const radius = length

        // Vẽ cung tròn biên độ
        ctx.strokeStyle = '#9ca3af'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, -Math.PI / 2 - (maxAmplitude * Math.PI / 180), -Math.PI / 2 + (maxAmplitude * Math.PI / 180))
        ctx.stroke()

        // Vẽ các vạch chia độ
        ctx.strokeStyle = '#6b7280'
        ctx.lineWidth = 1
        ctx.font = '12px Arial'
        ctx.fillStyle = '#4b5563'

        for (let angle = -maxAmplitude; angle <= maxAmplitude; angle += 10) {
            const rad = (angle * Math.PI) / 180
            const startX = centerX + (radius - 10) * Math.sin(rad)
            const startY = centerY + (radius - 10) * Math.cos(rad)
            const endX = centerX + radius * Math.sin(rad)
            const endY = centerY + radius * Math.cos(rad)

            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)
            ctx.stroke()

            // Hiển thị số độ
            if (angle !== 0 && Math.abs(angle) % 20 === 0) {
                const textX = centerX + (radius - 25) * Math.sin(rad)
                const textY = centerY + (radius - 25) * Math.cos(rad)
                ctx.fillText(`${Math.abs(angle)}°`, textX - 10, textY + 4)
            }
        }

        // Vạch 0 độ
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY + radius - 15)
        ctx.lineTo(centerX, centerY + radius)
        ctx.stroke()
        ctx.fillText('0°', centerX - 8, centerY + radius - 20)
    }

    const resetAnimation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
        setIsPlaying(true)
    }

    const formatValue = (value: number) => {
        return value.toFixed(2)
    }

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    ⏰ Mô phỏng Con Lắc Đơn
                </h3>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        {isPlaying ? '⏸️ Tạm dừng' : '▶️ Tiếp tục'}
                    </button>
                    <button
                        onClick={resetAnimation}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Biên độ: {amplitude}°
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="80"
                        step="5"
                        value={amplitude}
                        onChange={(e) => setAmplitude(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>10°</span>
                        <span>80°</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tần số: {formatValue(frequency)} Hz
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="2.0"
                        step="0.1"
                        value={frequency}
                        onChange={(e) => setFrequency(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0.1</span>
                        <span>2.0</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Giảm chấn: {formatValue(damping)}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="0.05"
                        step="0.005"
                        value={damping}
                        onChange={(e) => setDamping(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0</span>
                        <span>0.05</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Chiều dài: {pendulumLength} px
                    </label>
                    <input
                        type="range"
                        min="100"
                        max="250"
                        step="10"
                        value={pendulumLength}
                        onChange={(e) => setPendulumLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>100</span>
                        <span>250</span>
                    </div>
                </div>
            </div>

            {/* Toggle Controls */}
            <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showMeasure}
                        onChange={(e) => setShowMeasure(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị thước đo</span>
                </label>
            </div>

            {/* Canvas */}
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mb-4">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                />
            </div>

            {/* Thông tin và công thức */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">📊 Thông số hiện tại:</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Biên độ cực đại:</span>
                            <span className="font-mono text-blue-600 dark:text-blue-400">{amplitude}°</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Tần số:</span>
                            <span className="font-mono text-green-600 dark:text-green-400">{formatValue(frequency)} Hz</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Giảm chấn:</span>
                            <span className="font-mono text-red-600 dark:text-red-400">{formatValue(damping)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Chiều dài:</span>
                            <span className="font-mono text-purple-600 dark:text-purple-400">{pendulumLength} px</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">📐 Công thức con lắc:</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p><strong>Phương trình góc lệch:</strong></p>
                        <p>θ(t) = {amplitude}° × cos(2π×{formatValue(frequency)}t) × e^(-{formatValue(damping)}t)</p>
                        <p className="mt-2"><strong>Chu kỳ lý thuyết:</strong></p>
                        <p>T = 2π√(L/g) ≈ {formatValue(2 * Math.PI * Math.sqrt(pendulumLength / 300))}s</p>
                    </div>
                </div>
            </div>

            {/* Chú thích */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Quả nặng</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Đường biên độ</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                    <span>Thước đo</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Dây treo</span>
                </div>
            </div>
        </div>
    )
}