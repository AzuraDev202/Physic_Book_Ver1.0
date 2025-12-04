'use client'

import { useEffect, useRef, useState } from 'react'

interface EnergySimulationProps {
    className?: string
}

export default function EnergySimulation({ className = "" }: EnergySimulationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const animationRef = useRef<number>()

    // State cho các thông số
    const [amplitude, setAmplitude] = useState(0.8)
    const [frequency, setFrequency] = useState(1.0)
    const [mass, setMass] = useState(1.0)
    const [springConstant, setSpringConstant] = useState(2.0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [showEnergyBars, setShowEnergyBars] = useState(true)

    // WebGL shaders
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

        // Tạo shader program
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

        // Lấy uniform locations
        const colorLocation = gl.getUniformLocation(program, 'u_color')
        const pointSizeLocation = gl.getUniformLocation(program, 'u_pointSize')

        // Tạo buffer
        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

        // Lấy attribute location
        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
        gl.enableVertexAttribArray(positionAttributeLocation)
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

        // Thiết lập viewport
        gl.viewport(0, 0, canvas.width, canvas.height)

        let time = 0
        const energyHistory: { kinetic: number; potential: number; total: number }[] = []

        const render = () => {
            if (!gl || !isPlaying) return

            // Clear canvas
            gl.clearColor(0.95, 0.95, 0.95, 1.0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            const omega = 2 * Math.PI * frequency
            const k = springConstant
            const m = mass

            // Tính toán vị trí, vận tốc và năng lượng
            const x = amplitude * Math.cos(omega * time)
            const v = -amplitude * omega * Math.sin(omega * time)

            const kineticEnergy = 0.5 * m * v * v
            const potentialEnergy = 0.5 * k * x * x
            const totalEnergy = kineticEnergy + potentialEnergy

            // Lưu lịch sử năng lượng
            energyHistory.push({ kinetic: kineticEnergy, potential: potentialEnergy, total: totalEnergy })
            if (energyHistory.length > 200) energyHistory.shift()

            // === VẼ VẬT DAO ĐỘNG ===
            gl.uniform4f(colorLocation, 0.2, 0.5, 1.0, 1.0) // Màu xanh
            gl.uniform1f(pointSizeLocation, 20.0)

            const positions = new Float32Array([x, 0])
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
            gl.drawArrays(gl.POINTS, 0, 1)

            // === VẼ LÒ XO ===
            gl.uniform4f(colorLocation, 0.5, 0.5, 0.5, 1.0) // Màu xám
            gl.uniform1f(pointSizeLocation, 2.0)

            const springPoints = []
            const springSegments = 20
            for (let i = 0; i <= springSegments; i++) {
                const t = i / springSegments
                const springX = -0.8 + (x + 0.8) * t
                const springY = 0.1 * Math.sin(t * Math.PI * 4)
                springPoints.push(springX, springY)
            }

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(springPoints), gl.STATIC_DRAW)
            gl.drawArrays(gl.LINE_STRIP, 0, springPoints.length / 2)

            // === VẼ BIỂU ĐỒ NĂNG LƯỢNG ===
            if (showEnergyBars) {
                // Kinetic Energy (màu xanh lá)
                gl.uniform4f(colorLocation, 0.0, 0.8, 0.0, 0.7)
                const kineticBarHeight = Math.min(kineticEnergy / totalEnergy * 0.8, 0.8)
                const kineticBar = [-0.9, -0.9, -0.9, -0.9 + kineticBarHeight, -0.8, -0.9 + kineticBarHeight, -0.8, -0.9]
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(kineticBar), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINE_LOOP, 0, 4)

                // Potential Energy (màu cam)
                gl.uniform4f(colorLocation, 1.0, 0.5, 0.0, 0.7)
                const potentialBarHeight = Math.min(potentialEnergy / totalEnergy * 0.8, 0.8)
                const potentialBar = [-0.7, -0.9, -0.7, -0.9 + potentialBarHeight, -0.6, -0.9 + potentialBarHeight, -0.6, -0.9]
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(potentialBar), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINE_LOOP, 0, 4)

                // Total Energy (màu tím)
                gl.uniform4f(colorLocation, 0.6, 0.2, 0.8, 0.7)
                const totalBarHeight = 0.8
                const totalBar = [-0.5, -0.9, -0.5, -0.9 + totalBarHeight, -0.4, -0.9 + totalBarHeight, -0.4, -0.9]
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(totalBar), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINE_LOOP, 0, 4)
            }

            // === VẼ ĐỒ THỊ NĂNG LƯỢNG THEO THỜI GIAN ===
            if (energyHistory.length > 1) {
                const graphPoints: number[] = []

                // Kinetic energy (xanh lá)
                gl.uniform4f(colorLocation, 0.0, 0.8, 0.0, 0.8)
                energyHistory.forEach((energy, index) => {
                    const x = -0.3 + (index / energyHistory.length) * 0.6
                    const y = -0.9 + (energy.kinetic / totalEnergy) * 0.8
                    graphPoints.push(x, y)
                })
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(graphPoints), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINE_STRIP, 0, graphPoints.length / 2)

                // Potential energy (cam)
                gl.uniform4f(colorLocation, 1.0, 0.5, 0.0, 0.8)
                const potentialPoints: number[] = []
                energyHistory.forEach((energy, index) => {
                    const x = -0.3 + (index / energyHistory.length) * 0.6
                    const y = -0.9 + (energy.potential / totalEnergy) * 0.8
                    potentialPoints.push(x, y)
                })
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(potentialPoints), gl.STATIC_DRAW)
                gl.drawArrays(gl.LINE_STRIP, 0, potentialPoints.length / 2)
            }

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
    }, [amplitude, frequency, mass, springConstant, isPlaying, showEnergyBars])

    const resetAnimation = () => {
        setIsPlaying(true)
    }

    const formatValue = (value: number) => {
        return value.toFixed(2)
    }

    // Tính toán các giá trị năng lượng
    const omega = 2 * Math.PI * frequency
    const kineticEnergy = 0.5 * mass * Math.pow(amplitude * omega, 2)
    const potentialEnergy = 0.5 * springConstant * Math.pow(amplitude, 2)
    const totalEnergy = kineticEnergy + potentialEnergy

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    ⚡ Mô phỏng Năng lượng Dao động
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
                        Biên độ: {formatValue(amplitude)}
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="1.5"
                        step="0.1"
                        value={amplitude}
                        onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tần số: {formatValue(frequency)} Hz
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
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Khối lượng: {formatValue(mass)} kg
                    </label>
                    <input
                        type="range"
                        min="0.5"
                        max="3.0"
                        step="0.1"
                        value={mass}
                        onChange={(e) => setMass(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Độ cứng lò xo: {formatValue(springConstant)}
                    </label>
                    <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.1"
                        value={springConstant}
                        onChange={(e) => setSpringConstant(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>
            </div>

            {/* Toggle Controls */}
            <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showEnergyBars}
                        onChange={(e) => setShowEnergyBars(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị biểu đồ năng lượng</span>
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

            {/* Thông tin năng lượng */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="text-green-600 dark:text-green-400 font-semibold">Động năng</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {formatValue(kineticEnergy)} J
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Wₜ = ½mv²
                    </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                    <div className="text-orange-600 dark:text-orange-400 font-semibold">Thế năng</div>
                    <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                        {formatValue(potentialEnergy)} J
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                        Wₜ = ½kx²
                    </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="text-purple-600 dark:text-purple-400 font-semibold">Cơ năng</div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {formatValue(totalEnergy)} J
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                        W = Wₜ + Wₜ = const
                    </div>
                </div>
            </div>

            {/* Chú thích */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Vật dao động</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Động năng</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span>Thế năng</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span>Cơ năng</span>
                </div>
            </div>
        </div>
    )
}