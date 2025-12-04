import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Chapter from '@/models/Chapter'

// Định nghĩa interface cho simulation slide
interface SimulationSlide {
    id: number
    title: string
    type: string
    content: string
    simulationType: string
    formulas: string[]
    notes: string
}

// Định nghĩa type cho simulationSlides object
interface SimulationSlidesMap {
    [key: string]: SimulationSlide
}

export async function POST() {
    try {
        await dbConnect()

        const simulationSlides: SimulationSlidesMap = {
            "1": {
                id: 7,
                title: "Mô phỏng Vòng tròn Lượng giác",
                type: "simulation",
                content: "<h3>Mối quan hệ giữa chuyển động tròn và dao động điều hòa</h3><p>Mọi dao động điều hòa đều có thể được biểu diễn như hình chiếu của một chuyển động tròn đều.</p><p><strong>Quan sát:</strong></p><ul><li>Hình chiếu lên trục x cho đồ thị cos</li><li>Hình chiếu lên trục y cho đồ thị sin</li><li>Biên độ bằng bán kính vòng tròn</li></ul>",
                simulationType: "CircularMotionGraph",
                formulas: [
                    "x = A \\\\cos(\\\\omega t)",
                    "y = A \\\\sin(\\\\omega t)",
                    "\\\\theta = \\\\omega t"
                ],
                notes: "So sánh hình chiếu trên các trục với đồ thị dao động"
            },
            "2": {
                id: 6,
                title: "Mô phỏng Con lắc Đơn",
                type: "simulation",
                content: "<h3>Dao động của con lắc đơn</h3><p>Con lắc đơn gồm một vật nhỏ khối lượng m, treo vào đầu một sợi dây không dãn, khối lượng không đáng kể.</p><p><strong>Chu kỳ con lắc đơn:</strong> T = 2π√(L/g)</p><ul><li>L: Chiều dài dây treo</li><li>g: Gia tốc trọng trường</li><li>m: Khối lượng vật nặng</li></ul>",
                simulationType: "PendulumSimulation",
                formulas: [
                    "T = 2\\\\pi \\\\sqrt{\\\\frac{L}{g}}",
                    "\\\\omega = \\\\sqrt{\\\\frac{g}{L}}",
                    "\\\\theta = \\\\theta_0 \\\\cos(\\\\omega t + \\\\varphi)"
                ],
                notes: "Quan sát ảnh hưởng của chiều dài và biên độ đến chu kỳ dao động"
            },
            "3": {
                id: 5,
                title: "Mô phỏng Bảo toàn Năng lượng",
                type: "simulation",
                content: "<h3>Bảo toàn năng lượng trong dao động điều hòa</h3><p>Trong dao động điều hòa, cơ năng được bảo toàn và chuyển hóa qua lại giữa thế năng và động năng.</p><p><strong>Định luật bảo toàn cơ năng:</strong> W = Wₜ + Wₜ = const</p><ul><li>Động năng cực đại khi qua vị trí cân bằng</li><li>Thế năng cực đại tại biên</li><li>Tổng cơ năng không đổi</li></ul>",
                simulationType: "EnergySimulation",
                formulas: [
                    "W_\\\\text{đ} = \\\\frac{1}{2} m v^2",
                    "W_\\\\text{t} = \\\\frac{1}{2} k x^2",
                    "W = W_\\\\text{đ} + W_\\\\text{t} = \\\\text{const}"
                ],
                notes: "Quan sát sự chuyển hóa năng lượng trong quá trình dao động"
            },
            "4": {
                id: 5,
                title: "Mô phỏng Hiện tượng Cộng hưởng",
                type: "simulation",
                content: "<h3>Hiện tượng cộng hưởng cơ học</h3><p>Cộng hưởng xảy ra khi tần số của ngoại lực bằng với tần số riêng của hệ dao động, dẫn đến biên độ dao động tăng lên rất lớn.</p><p><strong>Điều kiện cộng hưởng:</strong> f_ngoại = f_riêng</p><ul><li>Biên độ đạt cực đại</li><li>Năng lượng hệ nhận được lớn nhất</li><li>Có thể gây nguy hiểm cho công trình</li></ul>",
                simulationType: "ResonanceSimulation",
                formulas: [
                    "A = \\\\frac{F_0}{\\\\sqrt{(\\\\omega_0^2 - \\\\omega^2)^2 + (2\\\\beta\\\\omega)^2}}",
                    "\\\\omega_\\\\text{cộng hưởng} = \\\\sqrt{\\\\omega_0^2 - 2\\\\beta^2}",
                    "A_\\\\text{max} = \\\\frac{F_0}{2m\\\\beta\\\\omega_0}"
                ],
                notes: "Điều chỉnh tần số ngoại lực để quan sát hiện tượng cộng hưởng"
            }
        }

        const chapter = await Chapter.findOne({ _id: "692337190f8e82dc9ec65e22" })

        if (!chapter) {
            return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })
        }

        // Cập nhật từng lesson - sử dụng type assertion
        for (const lesson of chapter.lessons) {
            const lessonId = lesson.id as string
            if (simulationSlides[lessonId]) {
                // Kiểm tra xem slide simulation đã tồn tại chưa
                const existingSlide = lesson.slides.find((slide: any) =>
                    slide.type === 'simulation' && slide.simulationType === simulationSlides[lessonId].simulationType
                )

                if (!existingSlide) {
                    lesson.slides.push(simulationSlides[lessonId])
                    console.log(`Added simulation slide to lesson ${lessonId}`)
                } else {
                    console.log(`Simulation slide already exists in lesson ${lessonId}`)
                }
            }
        }

        await chapter.save()

        return NextResponse.json({
            message: 'Simulations added successfully',
            updatedLessons: chapter.lessons.map((l: any) => l.id)
        })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: 'Failed to add simulations' }, { status: 500 })
    }
}