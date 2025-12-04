'use client'

import { useEffect, useRef, useState } from 'react'

interface ResonanceSimulationProps {
    className?: string
}

export default function ResonanceSimulation({ className = "" }: ResonanceSimulationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const animationRef = useRef<number>()

    // State cho các thông số
    const [naturalFrequency, setNaturalFrequency] = useState(1.0)
    const [drivingFrequency, setDrivingFrequency] = useState(1.0)
    const [drivingAmplitude, setDrivingAmplitude] = useState(0.5)
    const [damping, setDamping] = useState(0.05)
    const [isPlaying, setIsPlaying] = useState(true)
    const [showAmplitudeCurve, setShowAmplitudeCurve] = useState(true)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Khởi tạo WebGL
        const gl = canvas.getContext('webgl')
        if (!gl) {
            console.error('WebGL not supported')
            return
        }
        glRef.current = gl

        // WebGL shaders và setup (tương tự component trên)
        const vertexShaderSource = `
      attribute vec2 a_position;
      uniform float u_pointSize;
      void main() {
        gl_PointSize = u_pointSize;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

        const fragmentShaderSource = `
      precision mediump float;
      uniform vec4 u_color;
      void main() {
        gl_FragColor = u_color;
      }
    `

        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type)!
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            return shader
        }

        const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
            const program = gl.createProgram()!
            gl.attachShader(program, vertexShader)
            gl.attachShader(program, fragmentShader)
            gl.linkProgram(program)
            return program
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
        const program = createProgram(gl, vertexShader, fragmentShader)
        gl.useProgram(program)

        const colorLocation = gl.getUniformLocation(program, 'u_color')
        const pointSizeLocation = gl.getUniformLocation(program, 'u_pointSize')

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
        gl.enableVertexAttribArray(positionAttributeLocation)
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

        gl.viewport(0, 0, canvas.width, canvas.height)

        let time = 0
        let amplitude = 0
        const amplitudeHistory: number[] = []

        const render = () => {
            if (!gl || !isPlaying) return

            gl.clearColor(0.95, 0.95, 0.95, 1.0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            // Tính toán biên độ cộng hưởng
            const frequencyRatio = drivingFrequency / naturalFrequency
            const resonanceAmplitude = drivingAmplitude /
                Math.sqrt(Math.pow(1 - frequencyRatio * frequencyRatio, 2) +
                    Math.pow(2 * damping * frequencyRatio, 2))

            // Dao động cưỡng bức
            const x = resonanceAmplitude * Math.cos(2 * Math.PI * drivingFrequency * time - Math.atan2(
                2 * damping * frequencyRatio,
                1 - frequencyRatio * frequencyRatio
            ))

            amplitudeHistory.push(resonanceAmplitude)
            if (amplitudeHistory.length > 300) amplitudeHistory.shift()

            // === VẼ HỆ DAO ĐỘNG ===
            gl.uniform4f(colorLocation, 0.2, 0.5, 1.0, 1.0)
            gl.uniform1f(pointSizeLocation, 20.0)

            const positions = new Float32Array([x * 0.8, 0])
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
            gl.drawArrays(gl.POINTS, 0, 1)

            // === VẼ LỰC CƯỠNG BỨC ===
            gl.uniform4f(colorLocation, 1.0, 0.3, 0.3, 1.0)
            gl.uniform1f(pointSizeLocation, 8.0)

            const forceX = 0.6
            const forceY = 0.3 * Math.cos(2 * Math.PI * drivingFrequency * time)
            const forcePositions = new Float32Array([forceX, forceY])
            gl.bufferData(gl.ARRAY_BUFFER, forcePositions, gl.STATIC_DRAW)
            gl.drawArrays(gl.POINTS, 0, 1)

            // Vẽ mũi tên lực
            gl.uniform4f(colorLocation, 1.0, 0.3, 0.3, 0.7)
            gl.uniform1f(pointSizeLocation, 2.0)
            const arrowPoints = [
                forceX, forceY,
                forceX - 0.1, forceY,
                forceX - 0.08, forceY + 0.02,
                forceX - 0.08, forceY - 0.02,
                forceX - 0.1, forceY
            ]
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrowPoints), gl.STATIC_DRAW)
            gl.drawArrays(gl.LINE_STRIP, 0, arrowPoints.length / 2)

            // === VẼ ĐƯỜNG CONG CỘNG HƯỞNG ===
            if (showAmplitudeCurve) {
                gl.uniform4f(colorLocation, 0.8, 0.2, 0.2, 0.8)
                gl.uniform1f(pointSizeLocation, 2.0)

                const curvePoints: number[] = []
                for (let f = 0.1; f <= 2.0; f += 0.05) {
                    const ratio = f / naturalFrequency
                    const amp = drivingAmplitude /
                        Math.sqrt(Math.pow(1 - ratio * ratio, 2) + Math.pow(2 * damping * ratio, 2))

                    const x = -0.9 + f * 0.9
                    const y = -0.7 + Math.min(amp, 2.0) * 0.3
                    curvePoints.push(x, y)
                }

                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(curvePoints), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINE_STRIP, 0, curvePoints.length / 2)

                // Điểm hiện tại trên đường cong
                const currentX = -0.9 + frequencyRatio * 0.9
                const currentY = -0.7 + Math.min(resonanceAmplitude, 2.0) * 0.3

                gl.uniform4f(colorLocation, 1.0, 0.0, 0.0, 1.0)
                gl.uniform1f(pointSizeLocation, 8.0)
                const currentPoint = new Float32Array([currentX, currentY])
                gl.bufferData(gl.ARRAY_BUFFER, currentPoint, gl.STATIC_DRAW)
                gl.drawArrays(gl.POINTS, 0, 1)
            }

            // === VẼ TRỤC TẦN SỐ ===
            gl.uniform4f(colorLocation, 0.3, 0.3, 0.3, 1.0)
            gl.uniform1f(pointSizeLocation, 1.0)
            const frequencyAxis = [-0.9, -0.75, 0.9, -0.75]
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(frequencyAxis), gl.STATIC_DRAW)
            gl.drawArrays(gl.LINES, 0, 2)

            time += 0.016
            animationRef.current = requestAnimationFrame(render)
        }

        if (isPlaying) {
            animationRef.current = requestAnimationFrame(render)
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [naturalFrequency, drivingFrequency, drivingAmplitude, damping, isPlaying, showAmplitudeCurve])

    const resetAnimation = () => {
        setIsPlaying(true)
    }

    const formatValue = (value: number) => {
        return value.toFixed(2)
    }

    // Tính toán hệ số cộng hưởng
    const frequencyRatio = drivingFrequency / naturalFrequency
    const resonanceFactor = 1 / Math.sqrt(
        Math.pow(1 - frequencyRatio * frequencyRatio, 2) +
        Math.pow(2 * damping * frequencyRatio, 2)
    )
    const currentAmplitude = drivingAmplitude * resonanceFactor

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    🎯 Hiện tượng Cộng hưởng
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

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tần số riêng: {formatValue(naturalFrequency)} Hz
                    </label>
                    <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={naturalFrequency}
                        onChange={(e) => setNaturalFrequency(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tần số ngoại lực: {formatValue(drivingFrequency)} Hz
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.1"
                        value={drivingFrequency}
                        onChange={(e) => setDrivingFrequency(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Biên độ ngoại lực: {formatValue(drivingAmplitude)}
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={drivingAmplitude}
                        onChange={(e) => setDrivingAmplitude(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Hệ số giảm chấn: {formatValue(damping)}
                    </label>
                    <input
                        type="range"
                        min="0.01"
                        max="0.2"
                        step="0.01"
                        value={damping}
                        onChange={(e) => setDamping(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>
            </div>

            {/* Toggle Controls */}
            <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showAmplitudeCurve}
                        onChange={(e) => setShowAmplitudeCurve(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị đường cong cộng hưởng</span>
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

            {/* Thông tin cộng hưởng */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <div className="text-blue-600 dark:text-blue-400 font-semibold">Tỷ số tần số</div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {formatValue(frequencyRatio)}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        f_ngoại / f_riêng
                    </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="text-green-600 dark:text-green-400 font-semibold">Hệ số cộng hưởng</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {formatValue(resonanceFactor)}
                    </div>
                    <div className={`text-sm mt-1 ${resonanceFactor > 5 ? 'text-red-600 dark:text-red-400 font-bold' : 'text-green-600 dark:text-green-400'
                        }`}>
                        {resonanceFactor > 5 ? 'CỘNG HƯỞNG MẠNH!' : 'Bình thường'}
                    </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="text-purple-600 dark:text-purple-400 font-semibold">Biên độ đáp ứng</div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {formatValue(currentAmplitude)}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                        {formatValue(currentAmplitude / drivingAmplitude)}× biên độ gốc
                    </div>
                </div>
            </div>

            {/* Điều kiện cộng hưởng */}
            <div className={`p-4 rounded-lg text-center ${Math.abs(frequencyRatio - 1) < 0.1 && resonanceFactor > 2
                    ? 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                <div className={`font-semibold ${Math.abs(frequencyRatio - 1) < 0.1 && resonanceFactor > 2
                        ? 'text-red-700 dark:text-red-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                    {Math.abs(frequencyRatio - 1) < 0.1 && resonanceFactor > 2
                        ? '🎯 ĐANG XẢY RA CỘNG HƯỞNG! (f_ngoại ≈ f_riêng)'
                        : 'Điều kiện cộng hưởng: f_ngoại lực ≈ f_riêng của hệ'
                    }
                </div>
            </div>
        </div>
    )
}