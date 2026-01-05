'use client'

import { useEffect, useRef, useState } from 'react'

interface CircularMotionGraphProps {
    className?: string
}

export default function CircularMotionGraph({ className = "" }: CircularMotionGraphProps) {
    const circleCanvasRef = useRef<HTMLCanvasElement>(null)
    const graphCanvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    // State cho các thông số
    const [amplitude, setAmplitude] = useState(1.0)
    const [frequency, setFrequency] = useState(1.0)
    const [phase, setPhase] = useState(0)
    const [graphType, setGraphType] = useState<'cos' | 'sin'>('cos')
    const [isPlaying, setIsPlaying] = useState(true)
    const [showProjection, setShowProjection] = useState(true)

    useEffect(() => {
        const circleCanvas = circleCanvasRef.current
        const graphCanvas = graphCanvasRef.current
        if (!circleCanvas || !graphCanvas) return

        const circleCtx = circleCanvas.getContext('2d')
        const graphCtx = graphCanvas.getContext('2d')
        if (!circleCtx || !graphCtx) return

        let animationId: number
        let time = 0
        const graphData: { x: number; y: number }[] = []

        const render = () => {
            if (!circleCtx || !graphCtx || !isPlaying) return

            // Clear canvases
            circleCtx.fillStyle = '#f9fafb'
            circleCtx.fillRect(0, 0, circleCanvas.width, circleCanvas.height)

            graphCtx.fillStyle = '#f9fafb'
            graphCtx.fillRect(0, 0, graphCanvas.width, graphCanvas.height)

            const circleCenterX = circleCanvas.width / 2
            const circleCenterY = circleCanvas.height / 2
            const radius = 120

            // Tính góc và vị trí trên vòng tròn
            const angle = 2 * Math.PI * frequency * time + phase
            const pointX = circleCenterX + radius * amplitude * Math.cos(angle)
            const pointY = circleCenterY + radius * amplitude * Math.sin(angle)

            // === VẼ VÒNG TRÒN LƯỢNG GIÁC ===

            // Vẽ vòng tròn đơn vị
            circleCtx.strokeStyle = '#374151'
            circleCtx.lineWidth = 2
            circleCtx.beginPath()
            circleCtx.arc(circleCenterX, circleCenterY, radius, 0, 2 * Math.PI)
            circleCtx.stroke()

            // Vẽ trục tọa độ
            circleCtx.strokeStyle = '#6b7280'
            circleCtx.lineWidth = 1
            circleCtx.beginPath()
            circleCtx.moveTo(circleCenterX - radius - 20, circleCenterY)
            circleCtx.lineTo(circleCenterX + radius + 20, circleCenterY)
            circleCtx.moveTo(circleCenterX, circleCenterY - radius - 20)
            circleCtx.lineTo(circleCenterX, circleCenterY + radius + 20)
            circleCtx.stroke()

            // Vẽ nhãn trục
            circleCtx.fillStyle = '#4b5563'
            circleCtx.font = '12px Arial'
            circleCtx.fillText('x', circleCenterX + radius + 25, circleCenterY + 15)
            circleCtx.fillText('y', circleCenterX + 5, circleCenterY - radius - 10)

            // Vẽ bán kính
            circleCtx.strokeStyle = '#3b82f6'
            circleCtx.lineWidth = 2
            circleCtx.beginPath()
            circleCtx.moveTo(circleCenterX, circleCenterY)
            circleCtx.lineTo(pointX, pointY)
            circleCtx.stroke()

            // Vẽ điểm di chuyển
            circleCtx.fillStyle = '#ef4444'
            circleCtx.beginPath()
            circleCtx.arc(pointX, pointY, 8, 0, 2 * Math.PI)
            circleCtx.fill()

            // Vẽ hình chiếu nếu được bật
            if (showProjection) {
                // Hình chiếu lên trục x (cos)
                circleCtx.strokeStyle = '#10b981'
                circleCtx.lineWidth = 1
                circleCtx.setLineDash([5, 3])
                circleCtx.beginPath()
                circleCtx.moveTo(pointX, pointY)
                circleCtx.lineTo(pointX, circleCenterY)
                circleCtx.stroke()
                circleCtx.setLineDash([])

                // Hình chiếu lên trục y (sin)
                circleCtx.strokeStyle = '#f59e0b'
                circleCtx.lineWidth = 1
                circleCtx.setLineDash([5, 3])
                circleCtx.beginPath()
                circleCtx.moveTo(pointX, pointY)
                circleCtx.lineTo(circleCenterX, pointY)
                circleCtx.stroke()
                circleCtx.setLineDash([])

                // Điểm hình chiếu trên trục
                circleCtx.fillStyle = '#10b981'
                circleCtx.beginPath()
                circleCtx.arc(pointX, circleCenterY, 4, 0, 2 * Math.PI)
                circleCtx.fill()

                circleCtx.fillStyle = '#f59e0b'
                circleCtx.beginPath()
                circleCtx.arc(circleCenterX, pointY, 4, 0, 2 * Math.PI)
                circleCtx.fill()
            }

            // Hiển thị góc
            circleCtx.fillStyle = '#7c3aed'
            circleCtx.font = '14px Arial'
            const angleDeg = ((angle * 180) / Math.PI) % 360
            circleCtx.fillText(`θ = ${angleDeg.toFixed(1)}°`, circleCenterX - 100, 30)

            // === VẼ ĐỒ THỊ ===
            const graphCenterX = graphCanvas.width / 2
            const graphCenterY = graphCanvas.height / 2
            const graphWidth = graphCanvas.width - 100
            const graphHeight = 150

            // Vẽ trục đồ thị
            graphCtx.strokeStyle = '#374151'
            graphCtx.lineWidth = 2
            graphCtx.beginPath()
            graphCtx.moveTo(50, graphCenterY)
            graphCtx.lineTo(graphCanvas.width - 50, graphCenterY)
            graphCtx.moveTo(graphCenterX, 50)
            graphCtx.lineTo(graphCenterX, graphCanvas.height - 50)
            graphCtx.stroke()

            // Thêm dữ liệu mới vào đồ thị
            const graphValue = graphType === 'cos'
                ? amplitude * Math.cos(angle)
                : amplitude * Math.sin(angle)

            graphData.push({
                x: time,
                y: graphValue
            })

            // Giữ chỉ 300 điểm dữ liệu
            if (graphData.length > 300) {
                graphData.shift()
            }

            // Vẽ đồ thị
            graphCtx.strokeStyle = graphType === 'cos' ? '#10b981' : '#f59e0b'
            graphCtx.lineWidth = 2
            graphCtx.beginPath()

            graphData.forEach((point, index) => {
                const x = 50 + (point.x / 5) * (graphWidth - 100)
                const y = graphCenterY - point.y * 50

                if (index === 0) {
                    graphCtx.moveTo(x, y)
                } else {
                    graphCtx.lineTo(x, y)
                }
            })

            graphCtx.stroke()

            // Vẽ điểm hiện tại trên đồ thị
            const currentX = 50 + (time / 5) * (graphWidth - 100)
            const currentY = graphCenterY - graphValue * 50

            graphCtx.fillStyle = graphType === 'cos' ? '#10b981' : '#f59e0b'
            graphCtx.beginPath()
            graphCtx.arc(currentX, currentY, 5, 0, 2 * Math.PI)
            graphCtx.fill()

            // Hiển thị giá trị hiện tại
            graphCtx.fillStyle = '#4b5563'
            graphCtx.font = '12px Arial'
            graphCtx.fillText(
                `${graphType === 'cos' ? 'cos(θ)' : 'sin(θ)'} = ${graphValue.toFixed(2)}`,
                graphCanvas.width - 120,
                30
            )

            time += 0.016
            animationId = requestAnimationFrame(render)
        }

        if (isPlaying) {
            animationId = requestAnimationFrame(render)
        }

        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [amplitude, frequency, phase, graphType, isPlaying, showProjection])

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
                    📈 Vòng Tròn Lượng Giác & Đồ Thị
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
                        Biên độ (A): {formatValue(amplitude)}
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="2.0"
                        step="0.1"
                        value={amplitude}
                        onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0.1</span>
                        <span>2.0</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tần số (ω): {formatValue(frequency)} Hz
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.1"
                        value={frequency}
                        onChange={(e) => setFrequency(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0.1</span>
                        <span>3.0</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pha ban đầu (φ): {formatValue(phase)} rad
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={2 * Math.PI}
                        step="0.1"
                        value={phase}
                        onChange={(e) => setPhase(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0</span>
                        <span>2π</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Loại đồ thị
                    </label>
                    <select
                        value={graphType}
                        onChange={(e) => setGraphType(e.target.value as 'cos' | 'sin')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="cos">Hàm Cos (cosθ)</option>
                        <option value="sin">Hàm Sin (sinθ)</option>
                    </select>
                </div>
            </div>

            {/* Toggle Controls */}
            <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showProjection}
                        onChange={(e) => setShowProjection(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị hình chiếu</span>
                </label>
            </div>

            {/* Canvases */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Vòng tròn lượng giác */}
                <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-center">
                            🔄 Vòng Tròn Lượng Giác
                        </h4>
                    </div>
                    <canvas
                        ref={circleCanvasRef}
                        width={400}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>

                {/* Đồ thị */}
                <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-center">
                            📊 Đồ Thị {graphType === 'cos' ? 'Cos' : 'Sin'}
                        </h4>
                    </div>
                    <canvas
                        ref={graphCanvasRef}
                        width={400}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Thông tin và phương trình */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">📊 Thông số hiện tại:</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Biên độ:</span>
                            <span className="font-mono text-blue-600 dark:text-blue-400">{formatValue(amplitude)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Tần số góc:</span>
                            <span className="font-mono text-green-600 dark:text-green-400">{formatValue(frequency)} rad/s</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Pha ban đầu:</span>
                            <span className="font-mono text-purple-600 dark:text-purple-400">{formatValue(phase)} rad</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Chu kỳ:</span>
                            <span className="font-mono text-red-600 dark:text-red-400">{formatValue(2 * Math.PI / frequency)}s</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">📐 Phương trình dao động:</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <p><strong>Vị trí trên vòng tròn:</strong></p>
                        <p>x = {formatValue(amplitude)} × cos(2π×{formatValue(frequency)}t + {formatValue(phase)})</p>
                        <p>y = {formatValue(amplitude)} × sin(2π×{formatValue(frequency)}t + {formatValue(phase)})</p>
                        <p className="mt-2"><strong>Đồ thị {graphType === 'cos' ? 'cos' : 'sin'}:</strong></p>
                        <p>{graphType}(θ) = {formatValue(amplitude)} × {graphType}(2π×{formatValue(frequency)}t + {formatValue(phase)})</p>
                    </div>
                </div>
            </div>

            {/* Chú thích */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Điểm trên vòng tròn</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Bán kính (vector)</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Hình chiếu cos</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Hình chiếu sin</span>
                </div>
            </div>
        </div>
    )
}