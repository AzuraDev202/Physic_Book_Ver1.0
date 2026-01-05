import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Chapter from '@/models/Chapter'
import Exercise from '@/models/Exercise'

// Hàm random số
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const randomFloat = (min: number, max: number, decimals: number = 1) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals))

// Interface cho Exercise
interface IExercise {
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

// Hàm tạo bài tập cho từng bài học
function generateExercisesForLesson(lessonId: string, lessonTitle: string): IExercise[] {
  const exercises: IExercise[] = []
  let exerciseId = 1

  if (lessonId === '1') {
    // 20 câu lý thuyết
    const theoryQuestions = [
      { q: 'Dao động cơ học là gì?', opts: ['Chuyển động thẳng đều', 'Chuyển động có giới hạn trong không gian quanh vị trí cân bằng', 'Chuyển động tròn đều', 'Chuyển động rơi tự do'], ans: 1, exp: 'Dao động cơ học là chuyển động có giới hạn trong không gian của vật quanh vị trí cân bằng.' },
      { q: 'Dao động tuần hoàn là dao động mà:', opts: ['Vật chuyển động theo quỹ đạo tròn', 'Trạng thái chuyển động lặp lại như cũ sau những khoảng thời gian bằng nhau', 'Vật dao động với biên độ không đổi', 'Vật chịu tác dụng của lực ma sát'], ans: 1, exp: 'Dao động tuần hoàn là dao động mà trạng thái chuyển động (vị trí, vận tốc) được lặp lại như cũ sau những khoảng thời gian bằng nhau.' },
      { q: 'Chu kì dao động là gì?', opts: ['Số dao động trong một giây', 'Khoảng thời gian để vật thực hiện một dao động toàn phần', 'Độ lệch cực đại của vật khỏi vị trí cân bằng', 'Tọa độ của vật tại một thời điểm'], ans: 1, exp: 'Chu kì dao động (T) là khoảng thời gian để vật thực hiện được một dao động toàn phần, đơn vị là giây (s).' },
      { q: 'Tần số dao động là gì?', opts: ['Khoảng thời gian giữa hai dao động liên tiếp', 'Số dao động vật thực hiện được trong một giây', 'Góc mà vật quét được trong một giây', 'Li độ của vật tại thời điểm ban đầu'], ans: 1, exp: 'Tần số dao động (f) là số dao động mà vật thực hiện được trong một giây, đơn vị là héc (Hz).' },
      { q: 'Mối quan hệ giữa chu kì và tần số là:', opts: ['T = 2πf', 'T = 1/f', 'T = f', 'T = 2f'], ans: 1, exp: 'Chu kì và tần số có mối quan hệ nghịch đảo: T = 1/f hoặc f = 1/T.' },
      { q: 'Biên độ dao động là gì?', opts: ['Khoảng thời gian của một dao động', 'Độ lớn cực đại của li độ', 'Vận tốc cực đại của vật', 'Tần số của dao động'], ans: 1, exp: 'Biên độ dao động (A) là độ lớn cực đại của li độ, đo bằng mét (m) hoặc cm.' },
      { q: 'Li độ là gì?', opts: ['Khoảng cách từ vật đến điểm xuất phát', 'Tọa độ xác định vị trí của vật dao động so với VTCB', 'Quãng đường vật đi được', 'Thời gian vật dao động'], ans: 1, exp: 'Li độ là tọa độ xác định vị trí của vật dao động tại một thời điểm, với gốc tọa độ trùng với VTCB.' },
      { q: 'Dao động tự do là:', opts: ['Dao động chỉ chịu tác dụng của nội lực', 'Dao động chịu tác dụng của ngoại lực tuần hoàn', 'Dao động có biên độ giảm dần', 'Dao động với tần số thay đổi'], ans: 0, exp: 'Dao động tự do (dao động riêng) là dao động của hệ xảy ra dưới tác dụng chỉ của nội lực.' },
      { q: 'Trong một dao động toàn phần, vật qua vị trí cân bằng mấy lần?', opts: ['1 lần', '2 lần', '3 lần', '4 lần'], ans: 1, exp: 'Trong một dao động toàn phần (một chu kì), vật đi từ vị trí này trở lại vị trí đó theo cùng chiều, qua VTCB 2 lần.' },
      { q: 'Tần số góc ω có đơn vị là:', opts: ['Hz', 's', 'rad/s', 'm/s'], ans: 2, exp: 'Tần số góc ω có đơn vị là radian trên giây (rad/s), với ω = 2πf = 2π/T.' },
      { q: 'Chiều dài quỹ đạo của dao động điều hòa là:', opts: ['A', '2A', '4A', 'πA'], ans: 1, exp: 'Chiều dài quỹ đạo dao động điều hòa là L = 2A, từ biên âm đến biên dương.' },
      { q: 'Trong dao động điều hòa, đại lượng nào sau đây KHÔNG thay đổi theo thời gian?', opts: ['Li độ', 'Vận tốc', 'Biên độ', 'Pha dao động'], ans: 2, exp: 'Biên độ A, tần số góc ω, chu kì T, tần số f, và pha ban đầu φ₀ là các đại lượng không đổi trong dao động điều hòa.' },
      { q: 'Khi nói về dao động tuần hoàn, phát biểu nào SAI?', opts: ['Dao động tuần hoàn có chu kì xác định', 'Trạng thái dao động lặp lại sau mỗi chu kì', 'Mọi dao động tuần hoàn đều là dao động điều hòa', 'Dao động tuần hoàn có tần số xác định'], ans: 2, exp: 'SAI. Dao động điều hòa là một dạng đặc biệt của dao động tuần hoàn, nhưng không phải dao động tuần hoàn nào cũng là dao động điều hòa.' },
      { q: 'Ví dụ nào sau đây KHÔNG phải là dao động cơ học?', opts: ['Con lắc đồng hồ', 'Dây đàn guitar rung', 'Dòng điện xoay chiều', 'Lá cây rung trong gió'], ans: 2, exp: 'Dòng điện xoay chiều là dao động điện từ, không phải dao động cơ học.' },
      { q: 'Dao động tắt dần là do:', opts: ['Lực hướng tâm', 'Lực ma sát', 'Trọng lực', 'Lực đàn hồi'], ans: 1, exp: 'Dao động tắt dần do lực ma sát, lực cản tiêu hao năng lượng của hệ dao động.' },
      { q: 'Đơn vị của chu kì dao động là:', opts: ['Héc (Hz)', 'Giây (s)', 'Radian (rad)', 'Mét (m)'], ans: 1, exp: 'Chu kì dao động có đơn vị là giây (s).' },
      { q: 'Nếu tần số dao động tăng gấp đôi thì chu kì sẽ:', opts: ['Tăng gấp đôi', 'Giảm một nửa', 'Không đổi', 'Tăng gấp bốn'], ans: 1, exp: 'Vì T = 1/f, nên khi f tăng gấp đôi thì T giảm một nửa.' },
      { q: 'Vật dao động điều hòa với chu kì T. Trong khoảng thời gian T/4, vật đi được quãng đường tối đa là:', opts: ['A/2', 'A', 'A√2', '2A'], ans: 1, exp: 'Trong T/4, nếu vật xuất phát từ VTCB, vật đi được quãng đường tối đa là A.' },
      { q: 'Pha dao động cho biết:', opts: ['Biên độ dao động', 'Trạng thái dao động tại một thời điểm', 'Tần số dao động', 'Chu kì dao động'], ans: 1, exp: 'Pha dao động (ωt + φ) cho biết trạng thái dao động (vị trí, chiều chuyển động) tại một thời điểm.' },
      { q: 'Trong dao động điều hòa, vật đổi chiều chuyển động khi:', opts: ['Vật qua VTCB', 'Vật ở vị trí biên', 'Vận tốc đạt cực đại', 'Gia tốc bằng 0'], ans: 1, exp: 'Vật đổi chiều chuyển động khi ở vị trí biên (|x| = A), nơi vận tốc bằng 0.' }
    ]
    theoryQuestions.forEach((q, i) => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'multiple-choice', question: q.q, options: q.opts, correctAnswer: q.ans, explanation: q.exp, difficulty: 'basic', category: 'Lý thuyết cơ bản' })
    })

    // 10 câu thực tế
    const practicalQuestions = [
      { q: 'Bạn quan sát đồng hồ quả lắc treo tường nhà, thấy quả lắc đi hết một lượt (từ trái sang phải rồi quay về trái) mất 2 giây. Hỏi trong 1 phút, quả lắc dao động được bao nhiêu lần?', ans: 30, exp: 'Chu kì T = 2s (thời gian để quả lắc đi hết một lượt). Số dao động = 60s / 2s = 30 dao động' },
      { q: 'Khi gảy dây đàn guitar ở nốt La chuẩn, dây rung với tần số 440 Hz tạo ra âm thanh. Tính chu kì dao động của dây đàn này. (ms, làm tròn 2 chữ số thập phân)', ans: 2.27, exp: 'T = 1/f = 1/440 ≈ 0.00227s = 2.27ms. Đây là thời gian dây đàn hoàn thành 1 dao động' },
      { q: 'Bạn đo nhịp tim của mình bằng đồng hồ trong 1 phút, đếm được 75 nhịp đập. Tính tần số nhịp tim (số lần tim đập mỗi giây). (Hz, làm tròn 2 chữ số thập phân)', ans: 1.25, exp: 'Tần số f = 75 nhịp / 60s = 1.25 Hz. Đây là số lần tim đập trong 1 giây' },
      { q: 'Một con lắc lò xo treo đồ chơi dao động đều với tần số 2 Hz. Hỏi trong 5 giây, con lắc thực hiện được bao nhiêu dao động toàn phần?', ans: 10, exp: 'Số dao động = f × t = 2 Hz × 5s = 10 dao động' },
      { q: 'Tiếng vo ve của con muỗi phát ra do cánh muỗi vỗ rất nhanh với tần số 600 Hz. Tính thời gian cánh muỗi thực hiện 1 cái vỗ (1 dao động). (ms, làm tròn 2 chữ số thập phân)', ans: 1.67, exp: 'T = 1/f = 1/600 ≈ 0.00167s = 1.67ms. Cánh muỗi vỗ rất nhanh nên chu kì rất nhỏ' },
      { q: 'Xe ô tô chạy trên đường cao tốc có nhiều rãnh nối, cứ 0.5 giây thân xe rung lắc 1 lần. Nếu chạy trên đoạn đường này trong 10 giây, xe dao động bao nhiêu lần?', ans: 20, exp: 'Chu kì T = 0.5s. Số lần dao động = 10s / 0.5s = 20 lần' },
      { q: 'Bạn đứng ở bờ biển quan sát sóng, thấy khoảng cách giữa hai ngọn sóng liên tiếp là 5m và cứ 2 giây có một ngọn sóng đánh vào bờ. Hỏi trong 1 phút có bao nhiêu ngọn sóng đánh vào bờ?', ans: 30, exp: 'Chu kì sóng T = 2s. Số ngọn sóng trong 60s = 60s / 2s = 30 ngọn' },
      { q: 'Một tòa nhà chung cư cao tầng bị gió thổi làm rung nhẹ với tần số 0.2 Hz (người ở tầng cao cảm nhận được). Tính chu kì dao động của tòa nhà. (s)', ans: 5, exp: 'T = 1/f = 1/0.2 = 5s. Tòa nhà hoàn thành 1 dao động mất 5 giây' },
      { q: 'Động cơ xe máy có piston chuyển động lên xuống 3000 lần trong 1 phút khi đang chạy. Tính tần số dao động của piston (số lần chuyển động lên xuống mỗi giây). (Hz)', ans: 50, exp: 'f = 3000 lần / 60s = 50 Hz. Piston dao động 50 lần mỗi giây' },
      { q: 'Lá cây trước nhà bạn bị gió thổi lay động với chu kì 0.8 giây. Trong 2 phút gió thổi liên tục, lá cây dao động được bao nhiêu lần?', ans: 150, exp: 'Số dao động = 120s / 0.8s = 150 dao động. Lá cây lay động 150 lần trong 2 phút' }
    ]
    practicalQuestions.forEach(q => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question: q.q, correctAnswer: q.ans, explanation: q.exp, difficulty: 'intermediate', category: 'Bài tập thực tế' })
    })

    // 70 câu theo dạng bài tập
    const questionTemplates = [
      // Type 0: Tính tần số
      [`Một vật dao động thực hiện được {n} dao động trong thời gian {t} giây. Tính tần số dao động của vật. (Hz, làm tròn 2 chữ số thập phân)`,
        `Quan sát một vật dao động, đếm được {n} dao động hoàn thành trong khoảng thời gian {t} giây. Hỏi tần số dao động của vật là bao nhiêu? (Hz, làm tròn 2 chữ số thập phân)`,
        `Một con lắc thực hiện {n} dao động trong {t} giây. Xác định tần số dao động của con lắc. (Hz, làm tròn 2 chữ số thập phân)`,
        `Trong khoảng thời gian {t} giây, một vật thực hiện được {n} dao động. Tần số của dao động này là bao nhiêu? (Hz, làm tròn 2 chữ số thập phân)`,
        `Một vật dao động mất {t} giây để thực hiện {n} dao động. Tính tần số dao động của vật. (Hz, làm tròn 2 chữ số thập phân)`],
      // Type 1: Tính chu kì
      [`Một vật dao động với tần số f = {f} Hz. Tính chu kì dao động của vật. (s, làm tròn 2 chữ số thập phân)`,
        `Biết tần số dao động của một con lắc là {f} Hz. Xác định chu kì dao động của con lắc. (s, làm tròn 2 chữ số thập phân)`,
        `Một vật dao động với tần số {f} Hz. Hỏi chu kì dao động T của vật có giá trị là bao nhiêu? (s, làm tròn 2 chữ số thập phân)`,
        `Cho biết tần số dao động f = {f} Hz. Hỏi chu kì dao động là bao nhiêu? (s, làm tròn 2 chữ số thập phân)`,
        `Một dao động có tần số {f} Hz sẽ có chu kì dao động bằng bao nhiêu? (s, làm tròn 2 chữ số thập phân)`],
      // Type 2: Tính số dao động
      [`Một vật dao động với tần số {f} Hz. Trong thời gian {t} giây, vật thực hiện được bao nhiêu dao động toàn phần?`,
        `Cho một vật dao động có tần số f = {f} Hz. Hỏi trong khoảng thời gian {t} giây, vật dao động được bao nhiêu lần?`,
        `Một con lắc dao động với tần số {f} Hz. Tính số dao động mà con lắc thực hiện được trong khoảng thời gian {t} giây.`,
        `Một vật dao động {f} lần mỗi giây. Trong thời gian {t} giây, số dao động toàn phần của vật là bao nhiêu?`,
        `Với tần số dao động là {f} Hz, một vật sẽ dao động được bao nhiêu lần trong khoảng thời gian {t} giây?`],
      // Type 3: Số dao động giữa 2 thời điểm
      [`Một vật dao động với chu kì T = {T} giây. Từ thời điểm t₁ = {t1}s đến thời điểm t₂ = {t2}s, vật thực hiện được bao nhiêu dao động toàn phần?`,
        `Cho một dao động có chu kì T = {T}s. Tính số dao động hoàn thành mà vật thực hiện được từ thời điểm t = {t1}s đến thời điểm t = {t2}s.`,
        `Một vật dao động với chu kì {T} giây. Giữa hai thời điểm {t1}s và {t2}s, vật thực hiện được bao nhiêu dao động nguyên?`,
        `Biết chu kì dao động của một vật là T = {T}s. Từ giây thứ {t1} đến giây thứ {t2}, số dao động toàn phần mà vật thực hiện được là bao nhiêu?`,
        `Trong khoảng thời gian từ t₁ = {t1}s đến t₂ = {t2}s, một vật có chu kì dao động {T}s thực hiện được bao nhiêu dao động toàn phần?`],
      // Type 4: Hai dao động
      [`Hai vật dao động với tần số f₁ = {f1} Hz và f₂ = {f2} Hz. Trong thời gian vật thứ nhất thực hiện được {n1} dao động thì vật thứ hai thực hiện được bao nhiêu dao động toàn phần?`,
        `Vật A dao động với tần số f = {f1} Hz, vật B dao động với tần số f = {f2} Hz. Trong thời gian vật A thực hiện được {n1} dao động, vật B thực hiện được bao nhiêu dao động (nguyên)?`,
        `Cho hai dao động có tần số lần lượt là {f1} Hz và {f2} Hz. Khi dao động thứ nhất hoàn thành {n1} chu kỳ thì dao động thứ hai hoàn thành được bao nhiêu chu kỳ?`,
        `Hai con lắc dao động với tần số f₁ = {f1} Hz và f₂ = {f2} Hz. Tính số dao động của con lắc thứ hai khi con lắc thứ nhất thực hiện được {n1} dao động.`,
        `Vật thứ nhất dao động với tần số {f1} Hz, vật thứ hai dao động với tần số {f2} Hz. Khi vật thứ nhất dao động được {n1} lần, vật thứ hai dao động được bao nhiêu lần (nguyên)?`],
      // Type 5: Tần số từ tần số góc
      [`Một dao động có tần số góc ω = {n}π rad/s. Tính tần số dao động của vật. (Hz, làm tròn 1 chữ số thập phân)`,
        `Cho biết tần số góc của một dao động là ω = {n}π rad/s. Xác định tần số f của dao động. (Hz, làm tròn 1 chữ số thập phân)`,
        `Biết tần số góc của một vật dao động là {n}π rad/s. Hỏi tần số dao động bằng bao nhiêu? (Hz, làm tròn 1 chữ số thập phân)`,
        `Một vật dao động với tần số góc {n}π rad/s. Hỏi tần số f của dao động là bao nhiêu? (Hz, làm tròn 1 chữ số thập phân)`,
        `Từ tần số góc ω = {n}π rad/s, hãy tính tần số dao động f của vật. (Hz, làm tròn 1 chữ số thập phân)`],
      // Type 6: Bài tập kết hợp
      [`Dao động thứ nhất có chu kì T₁ = {T1}s, dao động thứ hai có chu kì T₂ = {T2}s. Trong thời gian {t} giây, tổng số dao động của cả hai vật là bao nhiêu?`,
        `Cho hai dao động có chu kì T₁ = {T1}s và T₂ = {T2}s. Tính tổng số dao động của hai vật này trong khoảng thời gian {t} giây.`,
        `Hai vật dao động với chu kì lần lượt là {T1}s và {T2}s. Hỏi tổng cộng cả hai vật dao động được bao nhiêu lần trong thời gian {t} giây?`,
        `Vật A dao động với chu kì T = {T1}s, vật B dao động với chu kì T = {T2}s. Số dao động mà cả A và B thực hiện được trong {t}s là bao nhiêu?`,
        `Trong khoảng thời gian {t} giây, hai dao động có chu kì {T1}s và {T2}s thực hiện được tổng cộng bao nhiêu dao động?`]
    ]

    for (let i = 0; i < 70; i++) {
      const type = i % 7
      const templateIndex = Math.floor(i / 7) % 5 // Chọn 1 trong 5 câu hỏi của mỗi dạng

      if (type === 0) {
        const n = randomInt(10, 50); const t = randomInt(5, 25); const f = n / t
        const template = questionTemplates[0][templateIndex]
        const question = template.replace('{n}', n.toString()).replace('{t}', t.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(f.toFixed(2)), explanation: `Tần số f = n/t = ${n}/${t} = ${f.toFixed(2)} Hz`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 1 - Tính tần số từ số dao động' })
      } else if (type === 1) {
        const f = randomFloat(0.5, 10, 1); const T = 1 / f
        const template = questionTemplates[1][templateIndex]
        const question = template.replace('{f}', f.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(T.toFixed(2)), explanation: `Chu kì T = 1/f = 1/${f} = ${T.toFixed(2)} s`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 1 - Tính chu kì từ tần số' })
      } else if (type === 2) {
        const f = randomInt(2, 12); const t = randomInt(3, 15); const n = f * t
        const template = questionTemplates[2][templateIndex]
        const question = template.replace('{f}', f.toString()).replace('{t}', t.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: n, explanation: `Số dao động n = f × t = ${f} × ${t} = ${n} dao động`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 2 - Tính số dao động' })
      } else if (type === 3) {
        const T = randomFloat(0.1, 0.5, 2); const t1 = randomInt(2, 8); const t2 = t1 + randomInt(3, 10); const dt = t2 - t1; const n = Math.floor(dt / T)
        const template = questionTemplates[3][templateIndex]
        const question = template.replace('{T}', T.toString()).replace('{t1}', t1.toString()).replace('{t2}', t2.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: n, explanation: `Δt = ${t2} - ${t1} = ${dt}s. Số dao động n = ⌊Δt/T⌋ = ⌊${dt}/${T}⌋ = ${n} dao động`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 2 - Số dao động giữa hai thời điểm' })
      } else if (type === 4) {
        const f1 = randomInt(3, 8); const f2 = f1 + randomInt(2, 6); const n1 = randomInt(8, 20); const t = n1 / f1; const n2 = Math.floor(f2 * t)
        const template = questionTemplates[4][templateIndex]
        const question = template.replace('{f1}', f1.toString()).replace('{f2}', f2.toString()).replace('{n1}', n1.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: n2, explanation: `Thời gian t = n₁/f₁ = ${n1}/${f1} = ${t.toFixed(2)}s. Số dao động vật 2: n₂ = ⌊f₂×t⌋ = ⌊${f2}×${t.toFixed(2)}⌋ = ${n2} dao động`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 3 - Hai dao động' })
      } else if (type === 5) {
        const n = randomInt(2, 8); const omega = n * Math.PI; const f = omega / (2 * Math.PI)
        const template = questionTemplates[5][templateIndex]
        const question = template.replace('{n}', n.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(f.toFixed(1)), explanation: `Tần số f = ω/(2π) = ${n}π/(2π) = ${f.toFixed(1)} Hz`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 4 - Tính tần số từ tần số góc' })
      } else {
        const T1 = randomFloat(0.2, 0.8, 1); const multiplier = randomInt(2, 5); const T2 = parseFloat((T1 / multiplier).toFixed(2)); const t = randomInt(5, 15); const n1 = Math.floor(t / T1); const n2 = Math.floor(t / T2)
        const template = questionTemplates[6][templateIndex]
        const question = template.replace('{T1}', T1.toString()).replace('{T2}', T2.toString()).replace('{t}', t.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: n1 + n2, explanation: `Số dao động vật 1: n₁ = ⌊${t}/${T1}⌋ = ${n1}. Số dao động vật 2: n₂ = ⌊${t}/${T2}⌋ = ${n2}. Tổng = ${n1 + n2} dao động`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 5 - Bài tập kết hợp' })
      }
    }
  }

  if (lessonId === '2') {
    // 20 câu lý thuyết
    const theoryQuestions = [
      { q: 'Phương trình dao động điều hòa có dạng:', opts: ['x = At + B', 'x = Acos(ωt + φ)', 'x = Ae^(ωt)', 'x = A + Bsin(t)'], ans: 1, exp: 'Phương trình dao động điều hòa: x = Acos(ωt + φ), trong đó A là biên độ, ω là tần số góc, φ là pha ban đầu.' },
      { q: 'Trong phương trình x = Acos(ωt + φ), đại lượng (ωt + φ) là:', opts: ['Biên độ', 'Pha dao động', 'Li độ', 'Vận tốc'], ans: 1, exp: 'Đại lượng (ωt + φ) được gọi là pha dao động, biểu thị trạng thái dao động tại thời điểm t.' },
      { q: 'Vận tốc trong dao động điều hòa có biểu thức:', opts: ['v = Aωsin(ωt + φ)', 'v = -Aωsin(ωt + φ)', 'v = Acos(ωt + φ)', 'v = -Acos(ωt + φ)'], ans: 1, exp: 'Vận tốc v = x\' = -Aωsin(ωt + φ), nhanh pha hơn li độ π/2.' },
      { q: 'Gia tốc trong dao động điều hòa có biểu thức:', opts: ['a = Aω²cos(ωt + φ)', 'a = -Aω²cos(ωt + φ)', 'a = Aωsin(ωt + φ)', 'a = -Aωsin(ωt + φ)'], ans: 1, exp: 'Gia tốc a = v\' = -ω²x = -Aω²cos(ωt + φ), ngược pha với li độ.' },
      { q: 'Vận tốc đạt cực đại khi:', opts: ['x = A', 'x = 0', 'x = A/2', 'x = A√2'], ans: 1, exp: 'Vận tốc đạt cực đại v_max = Aω khi vật qua vị trí cân bằng (x = 0).' },
      { q: 'Gia tốc đạt cực đại khi:', opts: ['x = 0', 'x = ±A', 'x = A/2', 'v = 0'], ans: 1, exp: 'Gia tốc đạt cực đại a_max = ω²A khi vật ở vị trí biên (x = ±A).' },
      { q: 'Pha ban đầu của dao động được xác định bởi:', opts: ['Biên độ', 'Điều kiện ban đầu', 'Tần số', 'Chu kì'], ans: 1, exp: 'Pha ban đầu φ được xác định bởi điều kiện ban đầu (vị trí và vận tốc tại t = 0).' },
      { q: 'Nếu tại t = 0, vật ở VTCB và chuyển động theo chiều dương thì φ =', opts: ['0', '-π/2', 'π/2', 'π'], ans: 1, exp: 'Tại t = 0: x = 0 và v > 0 → φ = -π/2.' },
      { q: 'Vận tốc và li độ trong dao động điều hòa có mối quan hệ:', opts: ['Cùng pha', 'Ngược pha', 'Lệch pha π/2', 'Lệch pha π/4'], ans: 2, exp: 'Vận tốc nhanh pha hơn li độ một góc π/2 (vuông pha).' },
      { q: 'Gia tốc và li độ trong dao động điều hòa có mối quan hệ:', opts: ['Cùng pha', 'Ngược pha', 'Lệch pha π/2', 'Lệch pha π/4'], ans: 1, exp: 'Gia tốc ngược pha với li độ (lệch pha π), có công thức a = -ω²x.' },
      { q: 'Đồ thị li độ - thời gian của dao động điều hòa là:', opts: ['Đường thẳng', 'Đường hình sin', 'Parabol', 'Hypebol'], ans: 1, exp: 'Đồ thị x-t của dao động điều hòa là đường hình sin hoặc cosin.' },
      { q: 'Đồ thị vận tốc - li độ của dao động điều hòa là:', opts: ['Đường thẳng', 'Đường tròn', 'Elip', 'Parabol'], ans: 2, exp: 'Đồ thị v-x là đường elip với phương trình: (x/A)² + (v/v_max)² = 1.' },
      { q: 'Trong dao động điều hòa, khi li độ tăng thì:', opts: ['Vận tốc tăng', 'Vận tốc giảm', 'Gia tốc tăng', 'Cả B và C đúng'], ans: 3, exp: 'Khi |x| tăng thì |v| giảm và |a| tăng theo công thức v² = ω²(A² - x²) và a = -ω²x.' },
      { q: 'Pha dao động của hai vật dao động điều hòa cùng tần số lệch nhau π thì hai dao động:', opts: ['Cùng pha', 'Ngược pha', 'Vuông pha', 'Lệch pha π/4'], ans: 1, exp: 'Hai dao động lệch pha π là hai dao động ngược pha.' },
      { q: 'Công thức độc lập thời gian của dao động điều hòa là:', opts: ['x² + v² = const', '(x/A)² + (v/v_max)² = 1', 'a = -ωv', 'x = At'], ans: 1, exp: 'Công thức độc lập thời gian: (x/A)² + (v/v_max)² = 1.' },
      { q: 'Tần số góc ω liên hệ với chu kì T theo công thức:', opts: ['ω = T', 'ω = 2πT', 'ω = 2π/T', 'ω = T/(2π)'], ans: 2, exp: 'Tần số góc: ω = 2π/T = 2πf.' },
      { q: 'Quỹ đạo chuyển động của vật dao động điều hòa là:', opts: ['Đường tròn', 'Đường thẳng', 'Đường elip', 'Parabol'], ans: 1, exp: 'Vật dao động điều hòa chuyển động qua lại trên một đoạn thẳng (quỹ đạo thẳng).' },
      { q: 'Trong T/4, quãng đường vật đi được phụ thuộc vào:', opts: ['Chỉ phụ thuộc biên độ', 'Phụ thuộc vị trí ban đầu', 'Phụ thuộc tần số', 'Phụ thuộc pha ban đầu'], ans: 1, exp: 'Quãng đường trong T/4 phụ thuộc vào vị trí ban đầu của vật.' },
      { q: 'Vật dao động điều hòa với biên độ A. Tốc độ trung bình trong một chu kì là:', opts: ['0', 'Aω', '2A/T', '4A/T'], ans: 3, exp: 'Trong một chu kì, vật đi được quãng đường 4A trong thời gian T nên v_tb = 4A/T.' },
      { q: 'Biểu thức liên hệ giữa vận tốc và li độ là:', opts: ['v = ±ω√(x² - A²)', 'v = ±ω√(A² - x²)', 'v = ωx', 'v = -ωx'], ans: 1, exp: 'Từ công thức độc lập thời gian: v = ±ω√(A² - x²).' }
    ]
    theoryQuestions.forEach(q => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'multiple-choice', question: q.q, options: q.opts, correctAnswer: q.ans, explanation: q.exp, difficulty: 'basic', category: 'Lý thuyết cơ bản' })
    })

    // 10 câu thực tế
    const fixedPractical = [
      { q: 'Bạn đứng trên cầu treo đi bộ Cầu Vàng (Đà Nẵng) và cảm nhận thấy cầu rung nhẹ với biên độ khoảng 5cm, chu kì dao động là 4 giây. Tính vận tốc cực đại của dao động này. (cm/s, làm tròn 1 chữ số thập phân)', ans: 7.9, exp: 'Vận tốc cực đại v_max = Aω = A(2π/T) = 5cm × (2π/4s) = 2.5π ≈ 7.9 cm/s' },
      { q: 'Khi đu đưa trên xích đu tại công viên, bạn dao động với biên độ 8cm (tính theo phương ngang) và tần số 2Hz. Tính vận tốc cực đại của bạn trong dao động này. (cm/s, làm tròn 1 chữ số thập phân)', ans: 100.5, exp: 'Vận tốc cực đại v_max = 2πfA = 2π × 2Hz × 8cm = 32π ≈ 100.5 cm/s' },
      { q: 'Một quả bóng treo trên dây cao su dao động, khi qua vị trí thấp nhất có vận tốc 60cm/s. Biết tần số góc dao động là 10rad/s. Tính biên độ dao động của quả bóng. (cm)', ans: 6, exp: 'Tại vị trí cân bằng, vận tốc đạt cực đại. A = v_max/ω = 60cm/s / 10rad/s = 6 cm' },
      { q: 'Một viên bi thép 200g gắn vào lò xo, kéo ra rồi thả cho dao động. Khi qua vị trí cân bằng bi có vận tốc 1m/s, tần số góc ω = 20rad/s. Tính biên độ dao động của bi thép. (cm)', ans: 5, exp: 'A = v_max/ω = 100cm/s / 20rad/s = 5 cm. Khối lượng không ảnh hưởng đến công thức này' },
      { q: 'Một chiếc quạt trần khi tắt dao động nhẹ theo phương trình x = 10cos(4πt) cm. Hỏi sau khi tắt được 1/8 giây, quạt lệch khỏi vị trí ban đầu bao nhiêu? (cm)', ans: 0, exp: 'x = 10cos(4π × 1/8) = 10cos(π/2) = 0 cm. Quạt đang ở vị trí cân bằng' },
      { q: 'Một cái bập bênh ở sân chơi, tại một thời điểm người ngồi cách mặt đất 3cm và đang chuyển động với vận tốc 40cm/s. Biết tần số góc dao động là 10rad/s. Tính biên độ dao động của bập bênh. (cm)', ans: 5, exp: 'A = √(x² + v²/ω²) = √(3² + 40²/10²) = √(9 + 16) = √25 = 5 cm' },
      { q: 'Xe khách chạy trên quốc lộ 1A có nhiều ổ gà, thân xe dao động với chu kì 1 giây và biên độ 3cm. Tính gia tốc cực đại mà hành khách phải chịu. (cm/s², làm tròn 1 chữ số thập phân)', ans: 118.4, exp: 'Gia tốc cực đại a_max = A(2π/T)² = 3cm × (2π/1s)² ≈ 118.4 cm/s²' },
      { q: 'Điện thoại smartphone khi có cuộc gọi đến sẽ rung với tần số 200Hz và biên độ 0.5mm. Tính vận tốc cực đại của dao động này. (cm/s, làm tròn 1 chữ số thập phân)', ans: 62.8, exp: 'v_max = 2πfA = 2π × 200Hz × 0.05cm ≈ 62.8 cm/s. Đây là lý do ta cảm nhận được điện thoại rung' },
      { q: 'Một máy massage cầm tay dao động với tần số 50Hz. Đo được vận tốc cực đại là 15.7cm/s. Tính biên độ dao động của đầu massage. (mm)', ans: 1, exp: 'A = v_max/(2πf) = 15.7cm/s / (2π×50Hz) = 0.05cm = 0.5mm ≈ 1mm' },
      { q: 'Loa Bluetooth phát nhạc EDM, màng loa rung với biên độ 0.2mm và tần số bass 1000Hz (tần số thấp). Tính gia tốc cực đại của màng loa khi phát âm này. (m/s², làm tròn 0 chữ số thập phân)', ans: 7896, exp: 'a_max = (2πf)²A = (2π×1000Hz)² × 0.0002m ≈ 7896 m/s². Gia tốc rất lớn nên tạo được âm thanh mạnh' }
    ]
    fixedPractical.forEach(q => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question: q.q, correctAnswer: q.ans, explanation: q.exp, difficulty: 'intermediate', category: 'Bài tập thực tế' })
    })

    // 70 câu theo dạng bài tập
    const questionTemplates2 = [
      // Type 0: Vận tốc cực đại
      [`Một vật DĐĐH có biên độ A = {A} cm, tần số góc ω = {omega} rad/s. Tính vận tốc cực đại. (cm/s)`,
        `Cho dao động với biên độ {A} cm và tần số góc {omega} rad/s. Xác định v_max. (cm/s)`,
        `Vật thực hiện DĐĐH với A = {A} cm, ω = {omega} rad/s. Tốc độ cực đại bằng? (cm/s)`,
        `Biết A = {A} cm, ω = {omega} rad/s. Hỏi vận tốc lớn nhất của vật là bao nhiêu? (cm/s)`,
        `Dao động có biên độ {A} cm, tần số góc {omega} rad/s. Giá trị v_max là? (cm/s)`],
      // Type 1: Gia tốc cực đại
      [`Vật dao động điều hòa với A = {A} cm, ω = {omega} rad/s. Tính gia tốc cực đại. (cm/s²)`,
        `Cho DĐĐH có biên độ {A} cm, tần số góc {omega} rad/s. Xác định a_max. (cm/s²)`,
        `Dao động với A = {A} cm và ω = {omega} rad/s có gia tốc cực đại là? (cm/s²)`,
        `Biết A = {A} cm, ω = {omega} rad/s. Tính độ lớn gia tốc lớn nhất. (cm/s²)`,
        `Một vật DĐĐH với biên độ {A} cm, tần số góc {omega} rad/s. Giá trị a_max bằng? (cm/s²)`],
      // Type 2: Tìm biên độ từ x và v
      [`Vật dao động với ω = {omega} rad/s. Khi x = {x} cm thì v = {v} cm/s. Tìm biên độ A. (cm, làm tròn 1 chữ số thập phân)`,
        `Cho ω = {omega} rad/s. Tại vị trí x = {x} cm, vận tốc v = {v} cm/s. Xác định A. (cm, làm tròn 1 chữ số thập phân)`,
        `Vật ở li độ {x} cm có tốc độ {v} cm/s, biết ω = {omega} rad/s. Biên độ dao động là? (cm, làm tròn 1 chữ số thập phân)`,
        `Tần số góc ω = {omega} rad/s. Khi x = {x} cm, v = {v} cm/s. Tính A. (cm, làm tròn 1 chữ số thập phân)`,
        `Tại một thời điểm, vật có x = {x} cm và v = {v} cm/s, với ω = {omega} rad/s. Biên độ bằng? (cm, làm tròn 1 chữ số thập phân)`],
      // Type 3: Vận tốc tại li độ x
      [`DĐĐH có A = {A} cm, ω = {omega} rad/s. Tính tốc độ khi vật ở x = {x} cm. (cm/s, làm tròn 1 chữ số thập phân)`,
        `Cho A = {A} cm, ω = {omega} rad/s. Khi vật qua vị trí x = {x} cm, vận tốc là bao nhiêu? (cm/s, làm tròn 1 chữ số thập phân)`,
        `Vật dao động với biên độ {A} cm, tần số góc {omega} rad/s. Tại li độ {x} cm, độ lớn vận tốc bằng? (cm/s, làm tròn 1 chữ số thập phân)`,
        `Biết A = {A} cm, ω = {omega} rad/s. Xác định |v| tại x = {x} cm. (cm/s, làm tròn 1 chữ số thập phân)`,
        `Dao động có A = {A} cm, ω = {omega} rad/s. Ở vị trí có li độ {x} cm, tốc độ của vật là? (cm/s, làm tròn 1 chữ số thập phân)`],
      // Type 4: Gia tốc tại li độ x
      [`Vật dao động với ω = {omega} rad/s. Tính độ lớn gia tốc tại x = {x} cm. (cm/s²)`,
        `Cho tần số góc ω = {omega} rad/s. Khi vật ở li độ {x} cm, gia tốc có độ lớn là? (cm/s²)`,
        `Vật DĐĐH với ω = {omega} rad/s. Tại vị trí x = {x} cm, |a| bằng bao nhiêu? (cm/s²)`,
        `Biết ω = {omega} rad/s. Xác định gia tốc khi x = {x} cm. (cm/s²)`,
        `Dao động với tần số góc {omega} rad/s. Ở li độ {x} cm, độ lớn gia tốc là? (cm/s²)`],
      // Type 5: Phân tích phương trình
      [`Cho phương trình x = {A}cos({n}πt) cm. Tính vận tốc cực đại của vật. (cm/s, làm tròn 1 chữ số thập phân)`,
        `Vật dao động theo PT x = {A}cos({n}πt) cm. Xác định v_max. (cm/s, làm tròn 1 chữ số thập phân)`,
        `Phương trình dao động x = {A}cos({n}πt) cm. Tốc độ cực đại bằng? (cm/s, làm tròn 1 chữ số thập phân)`,
        `Từ PT x = {A}cos({n}πt) cm, tìm giá trị lớn nhất của vận tốc. (cm/s, làm tròn 1 chữ số thập phân)`,
        `Biết x = {A}cos({n}πt) cm. Vận tốc cực đại của dao động này là? (cm/s, làm tròn 1 chữ số thập phân)`],
      // Type 6: Tính từ tần số
      [`Vật dao động với A = {A} cm, f = {f} Hz. Tính gia tốc cực đại. (cm/s², làm tròn 1 chữ số thập phân)`,
        `Cho biên độ {A} cm và tần số {f} Hz. Xác định a_max. (cm/s², làm tròn 1 chữ số thập phân)`,
        `DĐĐH có A = {A} cm, tần số {f} Hz. Độ lớn gia tốc cực đại là? (cm/s², làm tròn 1 chữ số thập phân)`,
        `Biết A = {A} cm, f = {f} Hz. Tính giá trị lớn nhất của gia tốc. (cm/s², làm tròn 1 chữ số thập phân)`,
        `Dao động có biên độ {A} cm, tần số {f} Hz. Gia tốc cực đại bằng bao nhiêu? (cm/s², làm tròn 1 chữ số thập phân)`]
    ]

    for (let i = 0; i < 70; i++) {
      const type = i % 7
      const templateIndex = Math.floor(i / 7) % 5

      if (type === 0) {
        const A = randomInt(4, 15); const omega = randomInt(5, 12); const v_max = A * omega
        const template = questionTemplates2[0][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{omega}', omega.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: v_max, explanation: `v_max = Aω = ${A} × ${omega} = ${v_max} cm/s`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 1 - Tính vận tốc cực đại' })
      } else if (type === 1) {
        const A = randomInt(5, 12); const omega = randomInt(8, 15); const a_max = A * omega * omega
        const template = questionTemplates2[1][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{omega}', omega.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: a_max, explanation: `a_max = ω²A = ${omega}² × ${A} = ${a_max} cm/s²`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 1 - Tính gia tốc cực đại' })
      } else if (type === 2) {
        const x = randomInt(3, 8); const v = randomInt(30, 80); const omega = randomInt(8, 12); const A = Math.sqrt(x * x + (v / omega) * (v / omega))
        const template = questionTemplates2[2][templateIndex]
        const question = template.replace('{omega}', omega.toString()).replace('{x}', x.toString()).replace('{v}', v.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(A.toFixed(1)), explanation: `A = √(x² + v²/ω²) = √(${x * x} + ${(v / omega).toFixed(2)}²) ≈ ${A.toFixed(1)} cm`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 2 - Tính biên độ từ x và v' })
      } else if (type === 3) {
        const A = randomInt(6, 12); const x = A / 2; const omega = randomInt(8, 15); const v = omega * Math.sqrt(A * A - x * x)
        const template = questionTemplates2[3][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{omega}', omega.toString()).replace('{x}', x.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(v.toFixed(1)), explanation: `v = ω√(A² - x²) = ${omega}√(${A * A} - ${x * x}) ≈ ${v.toFixed(1)} cm/s`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 3 - Tính vận tốc tại vị trí x' })
      } else if (type === 4) {
        const omega = randomInt(8, 15); const x = randomInt(4, 10); const a = omega * omega * x
        const template = questionTemplates2[4][templateIndex]
        const question = template.replace('{omega}', omega.toString()).replace('{x}', x.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: a, explanation: `|a| = ω²|x| = ${omega}² × ${x} = ${a} cm/s²`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 4 - Tính gia tốc tại vị trí x' })
      } else if (type === 5) {
        const n = randomInt(3, 8); const omega = n * Math.PI; const A = randomInt(6, 12); const v_max = omega * A
        const template = questionTemplates2[5][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{n}', n.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(v_max.toFixed(1)), explanation: `v_max = ωA = ${n}π × ${A} ≈ ${v_max.toFixed(1)} cm/s`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 5 - Từ phương trình tính v_max' })
      } else {
        const A = randomInt(8, 15); const f = randomInt(2, 6); const omega = 2 * Math.PI * f; const a_max = omega * omega * A
        const template = questionTemplates2[6][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{f}', f.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(a_max.toFixed(1)), explanation: `ω = 2πf = ${(omega).toFixed(2)} rad/s. a_max = ω²A ≈ ${a_max.toFixed(1)} cm/s²`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dạng 6 - Tính a_max từ f' })
      }
    }
  }

  if (lessonId === '3') {
    // 20 câu lý thuyết Bài 3
    const theoryQuestions = [
      { q: 'Năng lượng của dao động điều hòa gồm:', opts: ['Chỉ có động năng', 'Chỉ có thế năng', 'Động năng và thế năng', 'Cơ năng và nhiệt năng'], ans: 2, exp: 'Năng lượng dao động điều hòa bao gồm động năng và thế năng, tổng của chúng là cơ năng không đổi.' },
      { q: 'Cơ năng của dao động điều hòa:', opts: ['Biến thiên tuần hoàn theo thời gian', 'Không đổi theo thời gian', 'Tỉ lệ với biên độ', 'Bằng động năng cực đại'], ans: 1, exp: 'Cơ năng của dao động điều hòa luôn được bảo toàn, không thay đổi theo thời gian.' },
      { q: 'Động năng của vật dao động điều hòa đạt cực đại khi:', opts: ['Vật ở vị trí biên', 'Vật qua VTCB', 'Vận tốc bằng 0', 'Li độ cực đại'], ans: 1, exp: 'Động năng cực đại khi vật qua VTCB (x=0), lúc này vận tốc đạt cực đại.' },
      { q: 'Thế năng của vật dao động điều hòa đạt cực đại khi:', opts: ['Vật qua VTCB', 'Vật ở vị trí biên', 'Vận tốc cực đại', 'Gia tốc bằng 0'], ans: 1, exp: 'Thế năng cực đại khi vật ở vị trí biên (|x|=A), lúc này li độ cực đại và vận tốc bằng 0.' },
      { q: 'Công thức tính động năng của dao động điều hòa:', opts: ['Wđ = ½mv²', 'Wđ = ½kx²', 'Wđ = mgh', 'Wđ = ½mω²A²'], ans: 0, exp: 'Động năng Wđ = ½mv², trong đó m là khối lượng, v là vận tốc tại thời điểm đó.' },
      { q: 'Công thức tính thế năng của con lắc lò xo:', opts: ['Wt = ½mv²', 'Wt = ½kx²', 'Wt = mgh', 'Wt = ½mω²v²'], ans: 1, exp: 'Thế năng đàn hồi Wt = ½kx², trong đó k là độ cứng lò xo, x là độ biến dạng.' },
      { q: 'Cơ năng của con lắc lò xo dao động điều hòa:', opts: ['W = ½mv²', 'W = ½kx²', 'W = ½kA²', 'W = ½mω²'], ans: 2, exp: 'Cơ năng W = Wđ + Wt = ½kA² = ½mω²A² = const, chỉ phụ thuộc biên độ.' },
      { q: 'Khi vật qua VTCB thì:', opts: ['Wđ = 0, Wt = W', 'Wđ = W, Wt = 0', 'Wđ = Wt', 'Wđ = 2Wt'], ans: 1, exp: 'Tại VTCB: x=0 nên Wt=0, và v=vmax nên Wđ=W (cực đại).' },
      { q: 'Tại vị trí biên thì:', opts: ['Wđ = W, Wt = 0', 'Wđ = 0, Wt = W', 'Wđ = Wt', 'W = 0'], ans: 1, exp: 'Tại biên: v=0 nên Wđ=0, và |x|=A nên Wt=W (cực đại).' },
      { q: 'Động năng và thế năng biến thiên với tần số:', opts: ['f', 'f/2', '2f', '4f'], ans: 2, exp: 'Động năng và thế năng biến thiên với tần số gấp đôi tần số dao động (2f).' },
      { q: 'Trong một chu kì, số lần động năng bằng thế năng là:', opts: ['1', '2', '3', '4'], ans: 3, exp: 'Trong một chu kì, động năng bằng thế năng 4 lần (mỗi nửa chu kì có 2 lần).' },
      { q: 'Khi Wđ = Wt thì:', opts: ['x = 0', 'x = A', 'x = ±A/√2', 'x = ±A/2'], ans: 2, exp: 'Khi Wđ = Wt = W/2, ta có ½kx² = ½×½kA², suy ra x = ±A/√2.' },
      { q: 'Nếu biên độ tăng gấp đôi thì cơ năng:', opts: ['Tăng 2 lần', 'Tăng 4 lần', 'Tăng √2 lần', 'Không đổi'], ans: 1, exp: 'Cơ năng W ~ A², nên A tăng 2 lần thì W tăng 4 lần.' },
      { q: 'Đơn vị của cơ năng trong dao động điều hòa là:', opts: ['N', 'J', 'W', 'Hz'], ans: 1, exp: 'Cơ năng có đơn vị là Jun (J), là đơn vị của năng lượng.' },
      { q: 'Cơ năng tỉ lệ thuận với:', opts: ['Biên độ A', 'Bình phương biên độ A²', 'Căn bậc hai biên độ √A', 'Lập phương biên độ A³'], ans: 1, exp: 'Cơ năng W = ½kA² = ½mω²A², tỉ lệ với bình phương biên độ.' },
      { q: 'Khi Wđ = 3Wt thì:', opts: ['x = A/2', 'x = A/√2', 'x = A/4', 'x = A'], ans: 0, exp: 'W = Wđ + Wt = 4Wt, mà W = ½kA² và Wt = ½kx², suy ra x² = A²/4, nên x = A/2.' },
      { q: 'Vận tốc của vật khi qua vị trí có Wđ = Wt:', opts: ['v = 0', 'v = vmax', 'v = vmax/√2', 'v = vmax/2'], ans: 2, exp: 'Khi Wđ = Wt = W/2, ta có ½mv² = ½×½mω²A², suy ra v = ωA/√2 = vmax/√2.' },
      { q: 'Chu kì biến thiên của động năng là:', opts: ['T', 'T/2', '2T', 'T/4'], ans: 1, exp: 'Động năng biến thiên với chu kì T/2, tức tần số gấp đôi tần số dao động.' },
      { q: 'Tại vị trí nào thì động năng bằng 3 lần thế năng?', opts: ['x = A', 'x = A/2', 'x = A/√2', 'x = ±A√3/2'], ans: 1, exp: 'Wđ = 3Wt và W = Wđ + Wt = 4Wt, suy ra Wt = W/4 = ½kA²/4, nên x² = A²/4.' },
      { q: 'Trong dao động điều hòa, đại lượng nào sau đây không đổi?', opts: ['Động năng', 'Thế năng', 'Cơ năng', 'Vận tốc'], ans: 2, exp: 'Cơ năng là đại lượng bảo toàn trong dao động điều hòa (không ma sát).' }
    ]
    theoryQuestions.forEach(q => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'multiple-choice', question: q.q, options: q.opts, correctAnswer: q.ans, explanation: q.exp, difficulty: 'basic', category: 'Lý thuyết cơ bản' })
    })

    // 10 câu thực tế
    const practicalQuestions = [
      { q: 'Một đồ chơi lò xo trẻ em có độ cứng k = 100 N/m, bạn kéo ra cho nó dao động với biên độ 5cm. Tính năng lượng dao động của đồ chơi này. (J, làm tròn 2 chữ số thập phân)', ans: 0.13, exp: 'Cơ năng W = ½kA² = ½×100N/m×(0.05m)² = 0.125 ≈ 0.13 J' },
      { q: 'Một quả bóng khối lượng 200g treo trên dây cao su dao động với tần số góc 10 rad/s và biên độ 4cm. Tính năng lượng dao động của quả bóng. (J, làm tròn 3 chữ số thập phân)', ans: 0.016, exp: 'W = ½mω²A² = ½×0.2kg×(10rad/s)²×(0.04m)² = 0.016 J' },
      { q: 'Một con lắc lò xo đồ chơi có năng lượng dao động 0.02J, lò xo có độ cứng k = 80 N/m. Tính biên độ dao động của con lắc. (cm, làm tròn 2 chữ số thập phân)', ans: 2.24, exp: 'A = √(2W/k) = √(2×0.02J/80N/m) = √0.0005 ≈ 0.0224m = 2.24 cm' },
      { q: 'Một vật dao động với biên độ 6cm. Khi vật ở vị trí cách vị trí cân bằng 3cm (tức x = A/2), hỏi động năng chiếm bao nhiêu % cơ năng?', ans: 75, exp: 'Thế năng Wt = W/4 (vì x = A/2). Động năng Wđ = W - W/4 = 3W/4 = 75%' },
      { q: 'Một con lắc lò xo có khối lượng 0.5kg, độ cứng k = 200 N/m dao động với biên độ 2cm. Tính vận tốc cực đại của con lắc. (cm/s)', ans: 40, exp: 'ω = √(k/m) = √(200/0.5) = 20 rad/s. v_max = ωA = 20rad/s × 2cm = 40 cm/s' },
      { q: 'Một vật dao động với cơ năng 0.08J. Tại một vị trí, động năng gấp 3 lần thế năng. Tính động năng tại vị trí đó. (J, làm tròn 2 chữ số thập phân)', ans: 0.06, exp: 'W = Wđ + Wt = 3Wt + Wt = 4Wt → Wđ = 3W/4 = 3×0.08/4 = 0.06 J' },
      { q: 'Một cái xích đu tại công viên có biên độ dao động 8cm theo phương ngang. Tại vị trí động năng bằng thế năng, xích đu cách vị trí cân bằng bao nhiêu? (cm, làm tròn 2 chữ số thập phân)', ans: 5.66, exp: 'Khi Wđ = Wt thì x = A/√2 = 8cm/√2 = 8/1.414 ≈ 5.66 cm' },
      { q: 'Một quả lắc đồng hồ dao động với tần số 5Hz, khối lượng quả lắc 400g, biên độ dao động 2cm. Tính cơ năng của quả lắc. (J, làm tròn 3 chữ số thập phân)', ans: 0.079, exp: 'ω = 2πf = 2π×5 = 10π rad/s. W = ½mω²A² = ½×0.4×(10π)²×(0.02)² ≈ 0.079 J' },
      { q: 'Một con lắc lò xo có cơ năng 0.1J. Khi vật ở vị trí x = 3cm có thế năng 0.045J. Tính biên độ dao động của con lắc. (cm, làm tròn 2 chữ số thập phân)', ans: 4.47, exp: 'Tỉ số Wt/W = x²/A² → A = x√(W/Wt) = 3√(0.1/0.045) = 3√(20/9) ≈ 4.47 cm' },
      { q: 'Một chiếc đu quay tại khu vui chơi dao động nhẹ. Khi ở vị trí cao nhất (biên), năng lượng chủ yếu là thế năng. Khi qua vị trí thấp nhất, năng lượng chủ yếu là gì?', ans: 1, exp: 'Ở VTCB (thấp nhất), thế năng = 0, toàn bộ cơ năng chuyển thành động năng. Đáp án: 1 (động năng)' }
    ]
    practicalQuestions.forEach(q => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question: q.q, correctAnswer: q.ans, explanation: q.exp, difficulty: 'intermediate', category: 'Bài tập thực tế' })
    })

    // 70 câu dạng bài tập
    const questionTemplates3 = [
      [`Con lắc lò xo có k = {k} N/m, dao động với A = {A} cm. Tính cơ năng. (J, làm tròn 2 chữ số thập phân)`,
        `Lò xo có độ cứng {k} N/m, vật dao động với biên độ {A} cm. Cơ năng của dao động là? (J, làm tròn 2 chữ số thập phân)`,
        `Cho k = {k} N/m, A = {A} cm. Xác định cơ năng dao động. (J, làm tròn 2 chữ số thập phân)`,
        `Vật dao động với biên độ {A} cm, lò xo có k = {k} N/m. Tính W. (J, làm tròn 2 chữ số thập phân)`,
        `Dao động có A = {A} cm, k = {k} N/m. Cơ năng bằng? (J, làm tròn 2 chữ số thập phân)`],
      [`Vật m = {m} kg dao động với ω = {omega} rad/s, A = {A} cm. Tính động năng cực đại. (J, làm tròn 3 chữ số thập phân)`,
        `Cho m = {m} kg, ω = {omega} rad/s, A = {A} cm. Động năng cực đại là? (J, làm tròn 3 chữ số thập phân)`,
        `Vật khối lượng {m} kg dao động với tần số góc {omega} rad/s, biên độ {A} cm. Tính Wđmax. (J, làm tròn 3 chữ số thập phân)`,
        `Dao động có m = {m} kg, ω = {omega} rad/s, A = {A} cm. Xác định động năng cực đại. (J, làm tròn 3 chữ số thập phân)`,
        `Biết m = {m} kg, ω = {omega} rad/s, A = {A} cm. Động năng lớn nhất bằng? (J, làm tròn 3 chữ số thập phân)`],
      [`Con lắc có W = {W} J, k = {k} N/m. Tính biên độ dao động. (cm, làm tròn 2 chữ số thập phân)`,
        `Cho cơ năng W = {W} J, độ cứng k = {k} N/m. Biên độ A là? (cm, làm tròn 2 chữ số thập phân)`,
        `Biết W = {W} J, k = {k} N/m. Xác định biên độ. (cm, làm tròn 2 chữ số thập phân)`,
        `Dao động có cơ năng {W} J, lò xo có k = {k} N/m. Tính A. (cm, làm tròn 2 chữ số thập phân)`,
        `W = {W} J, k = {k} N/m. Biên độ dao động bằng? (cm, làm tròn 2 chữ số thập phân)`],
      [`Vật dao động với A = {A} cm, k = {k} N/m. Tại x = {x} cm, động năng là? (J, làm tròn 3 chữ số thập phân)`,
        `Cho A = {A} cm, k = {k} N/m. Khi x = {x} cm, tính Wđ. (J, làm tròn 3 chữ số thập phân)`,
        `Dao động có biên độ {A} cm, k = {k} N/m. Ở vị trí x = {x} cm, động năng bằng? (J, làm tròn 3 chữ số thập phân)`,
        `k = {k} N/m, A = {A} cm. Tại li độ {x} cm, xác định Wđ. (J, làm tròn 3 chữ số thập phân)`,
        `Biết A = {A} cm, k = {k} N/m, x = {x} cm. Động năng là? (J, làm tròn 3 chữ số thập phân)`],
      [`Con lắc có A = {A} cm, k = {k} N/m. Tại x = {x} cm, thế năng là? (J, làm tròn 3 chữ số thập phân)`,
        `Cho k = {k} N/m, A = {A} cm. Khi vật ở x = {x} cm, Wt bằng? (J, làm tròn 3 chữ số thập phân)`,
        `Dao động với A = {A} cm, k = {k} N/m. Ở li độ {x} cm, tính thế năng. (J, làm tròn 3 chữ số thập phân)`,
        `k = {k} N/m, A = {A} cm, x = {x} cm. Thế năng có giá trị? (J, làm tròn 3 chữ số thập phân)`,
        `Vật ở vị trí x = {x} cm, dao động có A = {A} cm, k = {k} N/m. Tính Wt. (J, làm tròn 3 chữ số thập phân)`],
      [`Vật dao động với W = {W} J. Khi Wđ = {n}Wt, động năng bằng? (J, làm tròn 3 chữ số thập phân)`,
        `Cho W = {W} J, Wđ = {n}Wt. Tính động năng. (J, làm tròn 3 chữ số thập phân)`,
        `Cơ năng W = {W} J. Tại vị trí có Wđ = {n}Wt, Wđ là? (J, làm tròn 3 chữ số thập phân)`,
        `W = {W} J, Wđ/Wt = {n}. Xác định động năng. (J, làm tròn 3 chữ số thập phân)`,
        `Biết W = {W} J và Wđ = {n}Wt. Động năng có giá trị? (J, làm tròn 3 chữ số thập phân)`],
      [`Con lắc có A = {A} cm. Khi Wđ = {n}Wt, li độ là? (cm, làm tròn 2 chữ số thập phân)`,
        `Cho A = {A} cm, Wđ = {n}Wt. Tính li độ x. (cm, làm tròn 2 chữ số thập phân)`,
        `Biên độ {A} cm. Tại vị trí có Wđ/Wt = {n}, x bằng? (cm, làm tròn 2 chữ số thập phân)`,
        `Dao động với A = {A} cm. Khi Wđ = {n}Wt, xác định |x|. (cm, làm tròn 2 chữ số thập phân)`,
        `A = {A} cm, Wđ/Wt = {n}. Li độ có độ lớn? (cm, làm tròn 2 chữ số thập phân)`]
    ]

    for (let i = 0; i < 70; i++) {
      const type = i % 7
      const templateIndex = Math.floor(i / 7) % 5

      if (type === 0) {
        const k = randomInt(50, 150); const A = randomInt(4, 12); const W = 0.5 * k * (A / 100) * (A / 100)
        const template = questionTemplates3[0][templateIndex]
        const question = template.replace('{k}', k.toString()).replace('{A}', A.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(W.toFixed(2)), explanation: `W = ½kA² = ½×${k}×(${A / 100})² = ${W.toFixed(2)} J`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính cơ năng' })
      } else if (type === 1) {
        const m = randomFloat(0.1, 0.5, 1); const omega = randomInt(8, 15); const A = randomInt(3, 8); const Wd = 0.5 * m * omega * omega * (A / 100) * (A / 100)
        const template = questionTemplates3[1][templateIndex]
        const question = template.replace('{m}', m.toString()).replace('{omega}', omega.toString()).replace('{A}', A.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(Wd.toFixed(3)), explanation: `Wđmax = W = ½mω²A² = ½×${m}×${omega}²×(${A / 100})² = ${Wd.toFixed(3)} J`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính động năng cực đại' })
      } else if (type === 2) {
        const W = randomFloat(0.02, 0.1, 2); const k = randomInt(40, 100); const A = Math.sqrt(2 * W / k) * 100
        const template = questionTemplates3[2][templateIndex]
        const question = template.replace('{W}', W.toString()).replace('{k}', k.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(A.toFixed(2)), explanation: `A = √(2W/k) = √(2×${W}/${k}) = ${A.toFixed(2)} cm`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính biên độ từ cơ năng' })
      } else if (type === 3) {
        const A = randomInt(8, 15); const k = randomInt(50, 120); const x = randomInt(3, Math.floor(A * 0.7)); const W = 0.5 * k * (A / 100) * (A / 100); const Wt = 0.5 * k * (x / 100) * (x / 100); const Wd = W - Wt
        const template = questionTemplates3[3][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{k}', k.toString()).replace('{x}', x.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(Wd.toFixed(3)), explanation: `W = ½k A² = ${W.toFixed(3)}J. Wt = ½kx² = ${Wt.toFixed(3)}J. Wđ = W - Wt = ${Wd.toFixed(3)} J`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính động năng tại vị trí x' })
      } else if (type === 4) {
        const A = randomInt(6, 12); const k = randomInt(60, 100); const x = randomInt(2, Math.floor(A * 0.6)); const Wt = 0.5 * k * (x / 100) * (x / 100)
        const template = questionTemplates3[4][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{k}', k.toString()).replace('{x}', x.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(Wt.toFixed(3)), explanation: `Wt = ½kx² = ½×${k}×(${x / 100})² = ${Wt.toFixed(3)} J`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính thế năng tại vị trí x' })
      } else if (type === 5) {
        const W = randomFloat(0.04, 0.12, 2); const n = randomInt(2, 4); const Wd = W * n / (n + 1)
        const template = questionTemplates3[5][templateIndex]
        const question = template.replace('{W}', W.toString()).replace('{n}', n.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(Wd.toFixed(3)), explanation: `W = Wđ + Wt = ${n}Wt + Wt = ${n + 1}Wt → Wđ = ${n}W/${n + 1} = ${Wd.toFixed(3)} J`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính năng lượng từ tỉ lệ' })
      } else {
        const A = randomInt(6, 12); const n = randomInt(2, 4); const x = A / Math.sqrt(n + 1)
        const template = questionTemplates3[6][templateIndex]
        const question = template.replace('{A}', A.toString()).replace('{n}', n.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(x.toFixed(2)), explanation: `Wđ = ${n}Wt, W = ${n + 1}Wt. Wt/W = x²/A² = 1/${n + 1} → x = A/√${n + 1} = ${x.toFixed(2)} cm`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính li độ từ tỉ lệ năng lượng' })
      }
    }
  }

  if (lessonId === '4') {
    // 20 câu lý thuyết Bài 4
    const theoryQuestions = [
      { q: 'Dao động tắt dần là:', opts: ['Dao động có biên độ giảm dần', 'Dao động có chu kì tăng dần', 'Dao động không có ma sát', 'Dao động cưỡng bức'], ans: 0, exp: 'Dao động tắt dần là dao động có biên độ giảm dần theo thời gian do ma sát, lực cản.' },
      { q: 'Nguyên nhân của dao động tắt dần:', opts: ['Lực ma sát, lực cản', 'Ngoại lực không đổi', 'Biên độ quá lớn', 'Tần số quá cao'], ans: 0, exp: 'Dao động tắt dần do có lực ma sát, lực cản môi trường làm tiêu hao năng lượng.' },
      { q: 'Trong dao động tắt dần:', opts: ['Cơ năng tăng', 'Cơ năng không đổi', 'Cơ năng giảm', 'Chu kì giảm'], ans: 2, exp: 'Cơ năng giảm dần do năng lượng bị tiêu hao bởi lực cản, ma sát.' },
      { q: 'Dao động cưỡng bức là:', opts: ['Dao động dưới tác dụng của ngoại lực tuần hoàn', 'Dao động tự do', 'Dao động tắt dần', 'Dao động duy trì'], ans: 0, exp: 'Dao động cưỡng bức là dao động chịu tác dụng của ngoại lực tuần hoàn (lực cưỡng bức).' },
      { q: 'Tần số của dao động cưỡng bức bằng:', opts: ['Tần số riêng', 'Tần số ngoại lực', 'Tổng hai tần số', 'Hiệu hai tần số'], ans: 1, exp: 'Dao động cưỡng bức có tần số bằng tần số của ngoại lực tuần hoàn tác dụng.' },
      { q: 'Biên độ dao động cưỡng bức phụ thuộc vào:', opts: ['Chỉ tần số riêng', 'Chỉ tần số ngoại lực', 'Hiệu số giữa tần số riêng và tần số ngoại lực', 'Tổng tần số'], ans: 2, exp: 'Biên độ dao động cưỡng bức phụ thuộc vào độ chênh lệch giữa tần số riêng f₀ và tần số ngoại lực f.' },
      { q: 'Hiện tượng cộng hưởng xảy ra khi:', opts: ['f = f₀', 'f >> f₀', 'f << f₀', 'f = 2f₀'], ans: 0, exp: 'Cộng hưởng xảy ra khi tần số ngoại lực bằng tần số riêng của hệ (f = f₀).' },
      { q: 'Khi xảy ra cộng hưởng thì:', opts: ['Biên độ cực tiểu', 'Biên độ cực đại', 'Biên độ bằng 0', 'Tần số thay đổi'], ans: 1, exp: 'Khi xảy ra cộng hưởng, biên độ dao động đạt giá trị cực đại.' },
      { q: 'Để làm giảm tác hại của cộng hưởng, ta:', opts: ['Tăng ma sát', 'Giảm ma sát', 'Tăng biên độ', 'Tăng khối lượng'], ans: 0, exp: 'Tăng ma sát (lực cản) giúp giảm biên độ dao động, hạn chế tác hại của cộng hưởng.' },
      { q: 'Dao động duy trì là:', opts: ['Dao động được bổ sung năng lượng đúng lúc', 'Dao động tự do', 'Dao động cưỡng bức', 'Dao động tắt dần'], ans: 0, exp: 'Dao động duy trì là dao động được cung cấp năng lượng đúng lúc để bù lại phần năng lượng bị mất.' },
      { q: 'Trong dao động tắt dần, chu kì:', opts: ['Tăng dần', 'Giảm dần', 'Gần như không đổi', 'Bằng 0'], ans: 2, exp: 'Chu kì (hoặc tần số) của dao động tắt dần gần như không đổi, chỉ biên độ giảm.' },
      { q: 'Ứng dụng có lợi của cộng hưởng:', opts: ['Phá hủy cầu', 'Động đất', 'Đàn guitar', 'Sập nhà'], ans: 2, exp: 'Cộng hưởng có lợi trong nhạc cụ (đàn guitar, đàn piano...) để khuếch đại âm thanh.' },
      { q: 'Tác hại của cộng hưởng:', opts: ['Làm tăng âm thanh', 'Làm đổ cầu, nhà', 'Tiết kiệm năng lượng', 'Giảm biên độ'], ans: 1, exp: 'Cộng hưởng có thể gây đổ cầu, sập nhà khi biên độ dao động quá lớn do tần số ngoại lực trùng với tần số riêng.' },
      { q: 'Trong dao động cưỡng bức, khi tần số ngoại lực xa tần số riêng thì:', opts: ['Biên độ lớn', 'Biên độ nhỏ', 'Biên độ cực đại', 'Chu kì thay đổi'], ans: 1, exp: 'Khi f xa f₀, biên độ dao động cưỡng bức nhỏ. Biên độ chỉ lớn khi f gần f₀.' },
      { q: 'Dao động tự do khác dao động cưỡng bức ở chỗ:', opts: ['Tần số dao động', 'Biên độ dao động', 'Có ngoại lực tuần hoàn', 'Chu kì dao động'], ans: 2, exp: 'Dao động tự do không có ngoại lực, dao động cưỡng bức có ngoại lực tuần hoàn tác dụng.' },
      { q: 'Hiện tượng cộng hưởng có thể xảy ra với:', opts: ['Dao động tắt dần', 'Dao động cưỡng bức', 'Dao động tự do', 'Dao động điều hòa'], ans: 1, exp: 'Cộng hưởng xảy ra khi dao động cưỡng bức có tần số ngoại lực bằng tần số riêng.' },
      { q: 'Để dao động được duy trì, ta cần:', opts: ['Tăng ma sát', 'Bổ sung năng lượng đúng lúc', 'Giảm biên độ', 'Tăng lực cản'], ans: 1, exp: 'Dao động duy trì cần được bổ sung năng lượng đúng lúc, đúng pha để bù năng lượng mất mát.' },
      { q: 'Trong dao động tắt dần, đại lượng nào giảm dần?', opts: ['Biên độ và cơ năng', 'Chu kì', 'Tần số', 'Khối lượng'], ans: 0, exp: 'Trong dao động tắt dần, biên độ và cơ năng giảm dần do ma sát, lực cản.' },
      { q: 'Biên độ dao động cộng hưởng phụ thuộc vào:', opts: ['Lực cản môi trường', 'Khối lượng vật', 'Tần số riêng', 'Biên độ ban đầu'], ans: 0, exp: 'Biên độ cộng hưởng càng lớn nếu lực cản càng nhỏ. Lực cản lớn làm giảm biên độ cộng hưởng.' },
      { q: 'Đơn vị của lực cản trong dao động tắt dần là:', opts: ['J', 'N', 'W', 'Hz'], ans: 1, exp: 'Lực cản có đơn vị là Newton (N), giống như các lực khác.' }
    ]
    theoryQuestions.forEach(q => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'multiple-choice', question: q.q, options: q.opts, correctAnswer: q.ans, explanation: q.exp, difficulty: 'basic', category: 'Lý thuyết cơ bản' })
    })

    // 10 câu thực tế
    const practicalQuestions = [
      { q: 'Bạn chơi xích đu ở công viên, ban đầu xích đu lên cao 2m (biên độ ban đầu), sau 50 lần đưa chân lên xuống (50 chu kì) thì chỉ còn lên cao 1m do ma sát không khí. Hỏi cần bao nhiêu chu kì nữa để biên độ giảm còn 0.5m?', ans: 50, exp: 'Giảm từ 2m → 1m mất 50 chu kì. Giảm từ 1m → 0.5m cũng mất 50 chu kì (giảm đều theo quy luật tương tự).' },
      { q: 'Một chiếc cầu vượt bộ có tần số dao động tự nhiên 5Hz. Khi một đoàn người đi bộ với tần số bước chân 4Hz đi qua cầu, hỏi cầu sẽ dao động với tần số nào? (Hz)', ans: 4, exp: 'Đây là dao động cưỡng bức. Tần số dao động bằng tần số ngoại lực (bước chân): f = 4 Hz' },
      { q: 'Một tòa nhà có tần số dao động riêng 2Hz. Để tránh cộng hưởng gây nguy hiểm khi động đất, tần số sóng địa chấn không nên bằng bao nhiêu? (Hz)', ans: 2, exp: 'Cộng hưởng xảy ra khi tần số ngoại lực bằng tần số riêng. Tránh f = f₀ = 2 Hz' },
      { q: 'Bạn đẩy xích đu cho em nhỏ, ban đầu xích đu lên cao 8cm. Sau 10 giây dao động tự do (không đẩy thêm), biên độ giảm còn 2cm do ma sát. Tính tốc độ giảm biên độ trung bình. (cm/s)', ans: 0.6, exp: 'Độ giảm trung bình = (8cm - 2cm) / 10s = 0.6 cm/s' },
      { q: 'Một con lắc lò xo đồ chơi có khối lượng 200g và lò xo có độ cứng 50 N/m. Tính tần số dao động tự nhiên của con lắc này. (Hz, làm tròn 2 chữ số thập phân)', ans: 2.52, exp: 'ω₀ = √(k/m) = √(50/0.2) ≈ 15.81 rad/s. f₀ = ω₀/(2π) = 15.81/(2π) ≈ 2.52 Hz' },
      { q: 'Khi máy giặt vắt ở tốc độ thấp (3Hz), quần áo rung nhẹ với biên độ 5cm. Khi tăng lên tốc độ cộng hưởng (4Hz - trùng tần số riêng), biên độ tăng lên 15cm. So sánh biên độ ở hai tốc độ này.', ans: 0.33, exp: 'Tỉ lệ A(3Hz)/A(4Hz) = 5/15 = 1/3 ≈ 0.33. Ở tần số cộng hưởng biên độ lớn gấp 3 lần' },
      { q: 'Một quả lắc đồng hồ treo tường ban đầu dao động với biên độ 10cm. Sau 1 phút, do ma sát không khí, biên độ giảm còn 5cm. Nếu không lên dây cót, sau 2 phút biên độ còn bao nhiêu? (cm)', ans: 2.5, exp: 'Giả sử giảm đều: mỗi phút giảm 1/2. Sau 2 phút: A = 10/2/2 = 2.5 cm' },
      { q: 'Một chiếc xe đạp chạy trên đường, mỗi lần bánh xe lăn qua khe hở gạch (chu kì T = 1s), khung xe dao động mất 5% năng lượng. Sau 20 khe hở (20 chu kì), xe còn lại bao nhiêu % năng lượng dao động? (%, làm tròn đến hàng đơn vị)', ans: 36, exp: 'Sau mỗi chu kì còn 95%. Sau 20 chu kì: (0.95)²⁰ ≈ 0.358 = 36%' },
      { q: 'Một tấm ván lướt sóng khối lượng 0.5kg chuyển động trong nước với vận tốc 0.2 m/s, chịu lực cản nước Fc = 0.1v (v tính bằng m/s). Tính công suất năng lượng bị tiêu hao do lực cản. (W, làm tròn 3 chữ số thập phân)', ans: 0.004, exp: 'Công suất P = Fc × v = (0.1×0.2) × 0.2 = 0.004 W' },
      { q: 'Một cây cầu treo có tần số dao động riêng 10Hz. Khi có xe tải nặng đi qua với tần số 8Hz (tần số lò xo giảm xóc), hỏi độ chênh lệch tần số giữa dao động riêng và dao động cưỡng bức là bao nhiêu? (Hz)', ans: 2, exp: 'Độ chênh lệch |f - f₀| = |8 - 10| = 2 Hz' }
    ]
    practicalQuestions.forEach(q => {
      exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question: q.q, correctAnswer: q.ans, explanation: q.exp, difficulty: 'intermediate', category: 'Bài tập thực tế' })
    })

    // 70 câu dạng bài tập
    const questionTemplates4 = [
      [`Con lắc có A₀ = {A0} cm, sau {t} chu kì biên độ còn {A} cm. Tính độ giảm biên độ mỗi chu kì. (cm, làm tròn 2 chữ số thập phân)`,
        `Biên độ ban đầu {A0} cm, sau {t} chu kì còn {A} cm. Độ giảm trung bình mỗi chu kì là? (cm, làm tròn 2 chữ số thập phân)`,
        `Dao động có A₀ = {A0} cm giảm xuống {A} cm sau {t} chu kì. Tính độ giảm/chu kì. (cm, làm tròn 2 chữ số thập phân)`,
        `A₀ = {A0} cm, qua {t} chu kì A = {A} cm. Mỗi chu kì giảm? (cm, làm tròn 2 chữ số thập phân)`,
        `Sau {t} chu kì, biên độ từ {A0} cm xuống {A} cm. Độ giảm/chu kì? (cm, làm tròn 2 chữ số thập phân)`],
      [`Con lắc có f₀ = {f0} Hz, chịu ngoại lực f = {f} Hz. Tần số dao động cưỡng bức là? (Hz)`,
        `Tần số riêng f₀ = {f0} Hz, tần số ngoại lực f = {f} Hz. Tần số dao động là? (Hz)`,
        `Cho f₀ = {f0} Hz, tác dụng ngoại lực f = {f} Hz. Xác định tần số dao động. (Hz)`,
        `Hệ có f₀ = {f0} Hz dao động dưới ngoại lực f = {f} Hz. Tần số dao động bằng? (Hz)`,
        `f₀ = {f0} Hz, f_ngoại = {f} Hz. Tần số dao động cưỡng bức? (Hz)`],
      [`Con lắc có f₀ = {f0} Hz. Để xảy ra cộng hưởng, tần số ngoại lực phải bằng? (Hz)`,
        `Cho f₀ = {f0} Hz. Tần số ngoại lực để có cộng hưởng? (Hz)`,
        `Tần số riêng là {f0} Hz. Xác định f_ngoại để cộng hưởng. (Hz)`,
        `Hệ có f₀ = {f0} Hz. Cộng hưởng xảy ra khi f = ? (Hz)`,
        `f₀ = {f0} Hz. Để biên độ cực đại, f_ngoại = ? (Hz)`],
      [`Con lắc có m = {m} kg, k = {k} N/m. Tính tần số riêng. (Hz, làm tròn 2 chữ số thập phân)`,
        `Cho m = {m} kg, k = {k} N/m. Xác định f₀. (Hz, làm tròn 2 chữ số thập phân)`,
        `m = {m} kg, k = {k} N/m. Tần số dao động riêng là? (Hz, làm tròn 2 chữ số thập phân)`,
        `Vật m = {m} kg, lò xo k = {k} N/m. Tính f₀. (Hz, làm tròn 2 chữ số thập phân)`,
        `k = {k} N/m, m = {m} kg. Tần số riêng bằng? (Hz, làm tròn 2 chữ số thập phân)`],
      [`Dao động có |f - f₀| = {df} Hz, với f₀ = {f0} Hz. Nếu f > f₀, tính f. (Hz)`,
        `f₀ = {f0} Hz, |f - f₀| = {df} Hz và f > f₀. Tần số ngoại lực là? (Hz)`,
        `Chênh lệch tần số {df} Hz, f₀ = {f0} Hz, f > f₀. Tính f. (Hz)`,
        `Cho f₀ = {f0} Hz, f vượt f₀ là {df} Hz. f = ? (Hz)`,
        `|f - f₀| = {df}, f₀ = {f0}, f > f₀. Xác định f. (Hz)`],
      [`Con lắc có T = {T} s, mỗi chu kì mất {p}% năng lượng. Sau {n} chu kì, % năng lượng còn? (%, làm tròn đến hàng đơn vị)`,
        `T = {T} s, mỗi chu kì tiêu hao {p}% W. Sau {n} chu kì, W còn? (%, làm tròn đến hàng đơn vị)`,
        `Mỗi chu kì mất {p}%, T = {T} s. Qua {n} chu kì, % cơ năng còn lại? (%, làm tròn đến hàng đơn vị)`,
        `Dao động T = {T} s, {p}%W/chu kì. Sau {n} chu kì, % W? (%, làm tròn đến hàng đơn vị)`,
        `T = {T} s, mỗi T mất {p}%. {n} chu kì sau, còn? (%, làm tròn đến hàng đơn vị)`],
      [`Con lắc có A₀ = {A0} cm, sau {t} giây (T = {T} s) biên độ còn {A} cm. Tính số chu kì đã qua.`,
        `A₀ = {A0} cm, T = {T} s, sau {t} s biên độ còn {A} cm. Số chu kì? `,
        `Trong {t} s (T = {T} s), A giảm từ {A0} cm xuống {A} cm. Số chu kì?`,
        `Cho T = {T} s, A₀ = {A0} cm, sau {t} s còn {A} cm. Tính số chu kì.`,
        `{t} s trôi qua (T = {T} s), A: {A0} → {A} cm. Bao nhiêu chu kì?`]
    ]

    for (let i = 0; i < 70; i++) {
      const type = i % 7
      const templateIndex = Math.floor(i / 7) % 5

      if (type === 0) {
        const A0 = randomInt(8, 20); const t = randomInt(10, 50); const A = randomInt(2, Math.floor(A0 * 0.4)); const decrease = (A0 - A) / t
        const template = questionTemplates4[0][templateIndex]
        const question = template.replace('{A0}', A0.toString()).replace('{t}', t.toString()).replace('{A}', A.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(decrease.toFixed(2)), explanation: `Độ giảm = (${A0}-${A})/${t} = ${decrease.toFixed(2)} cm/chu kì`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dao động tắt dần' })
      } else if (type === 1) {
        const f0 = randomInt(3, 10); const f = randomInt(2, 12)
        const template = questionTemplates4[1][templateIndex]
        const question = template.replace('{f0}', f0.toString()).replace('{f}', f.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: f, explanation: `Tần số dao động cưỡng bức bằng tần số ngoại lực: f = ${f} Hz`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Dao động cưỡng bức' })
      } else if (type === 2) {
        const f0 = randomInt(2, 15)
        const template = questionTemplates4[2][templateIndex]
        const question = template.replace('{f0}', f0.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: f0, explanation: `Cộng hưởng xảy ra khi f = f₀ = ${f0} Hz`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Cộng hưởng' })
      } else if (type === 3) {
        const m = randomFloat(0.1, 1, 1); const k = randomInt(20, 100); const omega0 = Math.sqrt(k / m); const f0 = omega0 / (2 * Math.PI)
        const template = questionTemplates4[3][templateIndex]
        const question = template.replace('{m}', m.toString()).replace('{k}', k.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: parseFloat(f0.toFixed(2)), explanation: `ω₀ = √(k/m) = √(${k}/${m}) = ${omega0.toFixed(2)} rad/s. f₀ = ω₀/(2π) = ${f0.toFixed(2)} Hz`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tần số riêng' })
      } else if (type === 4) {
        const f0 = randomInt(5, 12); const df = randomInt(1, 4); const f = f0 + df
        const template = questionTemplates4[4][templateIndex]
        const question = template.replace('{df}', df.toString()).replace('{f0}', f0.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: f, explanation: `f - f₀ = ${df} → f = f₀ + ${df} = ${f0} + ${df} = ${f} Hz`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Chênh lệch tần số' })
      } else if (type === 5) {
        const T = randomInt(1, 3); const p = randomInt(3, 8); const n = randomInt(5, 15); const remaining = Math.pow((100 - p) / 100, n) * 100
        const template = questionTemplates4[5][templateIndex]
        const question = template.replace('{T}', T.toString()).replace('{p}', p.toString()).replace('{n}', n.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: Math.round(remaining), explanation: `Mỗi chu kì còn ${100 - p}%. Sau ${n} chu kì: (${(100 - p) / 100})^${n} = ${(remaining / 100).toFixed(3)} ≈ ${Math.round(remaining)}%`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Năng lượng tiêu hao' })
      } else {
        const A0 = randomInt(10, 20); const T = randomInt(1, 3); const t = randomInt(10, 40); const A = randomInt(2, Math.floor(A0 * 0.5)); const cycles = t / T
        const template = questionTemplates4[6][templateIndex]
        const question = template.replace('{A0}', A0.toString()).replace('{t}', t.toString()).replace('{T}', T.toString()).replace('{A}', A.toString())
        exercises.push({ id: exerciseId++, lessonId, lessonTitle, type: 'calculation', question, correctAnswer: cycles, explanation: `Số chu kì = t/T = ${t}/${T} = ${cycles} chu kì`, difficulty: i < 25 ? 'basic' : i < 50 ? 'intermediate' : 'advanced', category: 'Tính số chu kì' })
      }
    }
  }

  return exercises
}

export async function POST() {
  try {
    await dbConnect()
    const chapter = await Chapter.findOne({ id: 'chapter-1' })
    if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })
    await Exercise.deleteMany({})
    const allExercises: IExercise[] = []
    for (const lesson of chapter.lessons) {
      const lessonExercises = generateExercisesForLesson(lesson.id, lesson.title)
      allExercises.push(...lessonExercises)
    }
    await Exercise.insertMany(allExercises)
    return NextResponse.json({
      message: 'Exercises generated successfully',
      totalExercises: allExercises.length,
      breakdown: {
        'Bài 1': allExercises.filter(e => e.lessonId === '1').length,
        'Bài 2': allExercises.filter(e => e.lessonId === '2').length,
        'Bài 3': allExercises.filter(e => e.lessonId === '3').length,
        'Bài 4': allExercises.filter(e => e.lessonId === '4').length
      }
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to generate exercises' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await dbConnect()
    const exercises = await Exercise.find({})
    return NextResponse.json({
      success: true,
      totalExercises: exercises.length,
      exercises: exercises
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch exercises'
    }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await dbConnect()
    const result = await Exercise.deleteMany({})
    return NextResponse.json({
      success: true,
      message: `Đã xóa ${result.deletedCount} bài tập`,
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete exercises'
    }, { status: 500 })
  }
}