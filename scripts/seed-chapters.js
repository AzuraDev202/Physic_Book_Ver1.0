// Seed data for Chapter 1 with 4 lessons, each lesson contains slides with content from lesson page.tsx

// Sửa lại màu nền các box trong slide để đảm bảo hài hòa, không bị lỗi chữ trắng trên nền trắng, phù hợp cả light/dark mode
// Sửa lại các box nền trắng thành màu nền trung tính đậm hơn để tránh chữ trắng trên nền trắng
// Ví dụ: bg-white -> bg-gray-100 dark:bg-gray-800, text-gray-900 dark:text-white
const chapter = {
  id: 'chapter-1',
  title: 'Chương 1: Dao Động',
  subtitle: 'Tổng hợp các bài học về dao động',
  icon: '🌊',
  content: 'Chương này nghiên cứu về dao động cơ học, phương trình dao động điều hòa, năng lượng, dao động tắt dần và cộng hưởng.',
  lessons: [
    {
      id: '1',
      title: 'Mô tả dao động',
      slides: [
        {
          id: 1,
          title: 'Khái niệm dao động',
          type: 'intro',
          content: `
            <h2>Dao động là gì?</h2>
            <p>Là Dao động cơ học, là sự chuyển động có giới hạn trong không gian của một vật quanh một vị trí xác định. Vị trí đó gọi là vị trí cân bằng.</p> <br/>
            <div class="bg-gradient-to-r from-blue-500 to-gray-800 dark:from-blue-700 dark:to-gray-900 p-6 rounded-xl mb-6 text-white">
              <h3 class="font-bold mb-3 text-lg">I. Định nghĩa dao động tuần hoàn</h3>
              <p class="text-base leading-relaxed">Dao động mà trạng thái chuyển động của vật (vị trí và vận tốc) được lặp lại như cũ sau những khoảng thời gian bằng nhau được gọi là dao động tuần hoàn.</p>
            </div>
            <div class="bg-gradient-to-r from-blue-500 to-gray-800 dark:from-blue-700 dark:to-gray-900 p-6 rounded-xl mb-6 text-white">
              <h3 class="font-bold mb-3 text-lg">II. Dao động tự do</h3>
              <p class="text-base leading-relaxed">Dao động của hệ xảy ra dưới tác dụng chỉ của nội lực được gọi là dao động tự do (dao động riêng).</p>
            </div>
            <div class="grid md:grid-cols-2 gap-6 mt-8">
              <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-gray-900 dark:text-blue-100">
                <h3 class="font-bold text-blue-800 dark:text-blue-100 mb-2">Ví dụ thực tế</h3>
                <ul class="space-y-1 text-sm">
                  <li>• Con lắc đồng hồ quả lắc.</li>
                  <li>• Dây đàn guitar sau khi gảy.</li>
                  <li>• Màng loa khi phát ra âm thanh.</li>
                  <li>• Cánh hoa trong gió nhẹ.</li>
                  <li>• Dao động của phân tử trong chất rắn.</li>
                </ul>
              </div>
              <div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-gray-900 dark:text-green-100">
                <h3 class="font-bold text-green-800 dark:text-green-100 mb-2">Đặc điểm cơ bản</h3>
                <ul class="space-y-1 text-sm">
                  <li>• Chuyển động lặp lại theo thời gian.</li>
                  <li>• Có vị trí cân bằng ổn định.</li>
                  <li>• Có biên độ dao động xác định.</li>
                  <li>• Có chu kì và tần số đặc trưng.</li>
                  <li>• Có lực phục hồi hướng về VTCB.</li>
                </ul>
              </div>
            </div>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">⚠️Chú ý:</h4>
              <p class="text-sm">Dao động khác với chuyển động tròn đều ở chỗ: dao động có giới hạn trong không gian và có sự đổi chiều chuyển động.</p>
            </div>
            
          `,
          notes: 'Dao động xuất hiện khắp nơi trong tự nhiên và công nghệ.'
        },
        {
          id: 2,
          title: 'Dao động điều hòa',
          type: 'defination',
          content: `
            <h2>1. Li độ, biên độ, chu kì dao động, tần số dao động.</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-800 dark:text-blue-200 mb-2">1. Li độ, biên độ</h3>
                <p class="text-sm mb-3 font-medium"> Li độ của vật dao động là tọa độ của vật mà gốc tọa độ được chọn trùng với VTCB. Biên độ là độ lớn cực đại của li độ.</p>
              </div>
              <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                <h3 class="font-bold text-green-800 dark:text-green-200 mb-2">2. Chu kì dao động</h3>
                <p class="text-sm mb-3 font-medium">Chu kì dao động là khoảng thời gian để vật thực hiện được một dao động, đơn vị: giây (s).</p>
              </div>
              <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 class="font-bold text-purple-800 dark:text-purple-200 mb-2">3. Tần số dao động</h3>
                <p class="text-sm mb-3 font-medium">Tần số dao động được xác định bởi số dao động mà vật thực hiện được trong một giây, đơn vị: héc (Hz).</p>
                <div class="text-xs space-y-1">
                  <p><strong>Công thức tần số:</strong></p>
                  <p class="text-center text-base" style="font-size:32px">$f = \\frac{1}{T}$</p>
                </div>
              </div>
            </div>
            
          `,
          notes: 'Chu kì và tần số liên quan nghịch đảo với nhau.'
        },
        {
          id: 3,
          title: 'Dao động điều hòa',
          type: 'defination',
          content: `
            <h2>2. Khái niệm dao động điều hòa.</h2> <br/>
            <div class="bg-gradient-to-r from-blue-500 to-gray-800 dark:from-blue-700 dark:to-gray-900 p-6 rounded-xl mb-6 text-white">
              <h3 class="font-bold mb-3 text-lg">Định nghĩa: </h3>
              <p class="text-base leading-relaxed">Dao động điều hòa là dao động tuần hoàn mà li độ của vật dao động là một hàm côsin (hoặc sin) theo thời gian.</p>
            </div>
            <h2>Phương trình dao động điều hòa: </h2> <br/>
            <div class="text-xs space-y-1">
              <p class="text-center text-base" style="font-size:32px">$x = Acos(\\omega t + \\phi)$</p>
              <p class="text-sm mt-2">Trong đó:</p>
              <ul class="list-disc list-inside mt-2 text-sm space-y-1">
                <li><strong>x</strong>: li độ của vật dao động (m).</li>
                <li><strong>A</strong>: biên độ dao động (m).</li>
                <li><strong>$\\omega$</strong>: tần số góc (rad/s), với $\\omega = 2\\pi f = \\frac{2\\pi}{T}$.</li>
              </ul>
            </div>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ:</h4>
              <p class="text-sm">Một vật dao động điều hòa với biên độ A = 5 cm và tần số f = 2 Hz. Viết phương trình dao động của vật nếu tại thời điểm t = 0, vật ở vị trí biên dương.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Tại t = 0, vật ở vị trí biên dương nên pha ban đầu $\\phi = 0$.</p>
                <p>Tần số góc: $\\omega = 2\\pi f = 2\\pi \\times 2 = 4\\pi$ rad/s.</p>
                <p>Phương trình dao động: <strong>$x = 0.05 \\cos(4\\pi t)$</strong> (m).</p>
              </div>
            </div>
            <div class="mt-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400 text-gray-900 dark:text-green-100">
              <h4 class="font-semibold text-indigo-800 dark:text-indigo-100 mb-2">⚠️Mối liên hệ giữa dao động điều hòa và chuyển động tròn đều</h4>
              <p class="text-sm">Dao động điều hòa có thể được xem là hình chiếu của chuyển động tròn đều lên một trục cố định.</p>
              <div class="mt-4 grid md:grid-cols-2 gap-6 items-center">
                <div class="flex justify-center">
                  <img src="/images/circular_motion_projection.png" alt="Chuyển động tròn đều và dao động điều hòa" class="w-full max-w-sm rounded-lg shadow-md" />
                </div>
                <div>
                  <div class="p-4 bg-amber-200 dark:bg-yellow-700 rounded-lg text-gray-900 dark:text-white">
                    <p class="font-semibold mb-2">Giải thích:</p>
                    <p class="text-sm">$\\Delta \\phi = \\omega t$</p>
                    <p class="text-sm">Tại M: $\\Theta = \\Delta \\phi + \\phi_0 = \\omega t + \\phi_0$</p>
                    <p class="text-sm">Xét tam giác vuông OMP:</p>
                    <p class="text-sm">$OP = x = OM\\cos \\Theta = A\\cos(\\omega t + \\phi_0)$</p>
                    <p class="font-semibold mb-2 underline">Kết luận:</p>
                    <p class="text-sm">Hình chiếu của một vật chuyển động tròn đều là dao động điều hòa với biên độ A = bán kính đường tròn và tần số góc $\\omega$ chính là tốc độ góc của chuyển động tròn đều.</p>
                  </div>
                </div>
              </div>
            </div>
          `,
        },
        {
          id: 4,
          title: 'Dao động điều hòa',
          type: 'defination',
          content: `
            <h2>3. Pha dao động, độ lệch pha, tần số góc.</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-800 dark:text-blue-200 mb-2">1. Pha dao động</h3>
                <p class="text-sm mb-3 font-medium">Pha dao động là một đại lượng đặc trung cho trạng thái của vật trong quá trình dao động.</p>
              </div>
              <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                <h3 class="font-bold text-green-800 dark:text-green-200 mb-2">2. Độ lệch pha</h3>
                <p class="text-sm mb-3 font-medium">Độ lệch pha giữa hai dao động điều hòa cùng chu kì (cùng tần số) được xác định theo công thức:</p>
                <div class="text-xs space-y-1">
                  <p class="text-center text-base" style="font-size:20px">$\\Delta \\phi = \\phi_2 - \\phi_1$</p>
                </div>
                <ul class="list-disc list-inside mt-2 text-sm space-y-1">
                  <li class="leading-relaxed">Nếu $\\Delta \\phi = 2k\\pi$ thì hai dao động cùng pha ($k \\in \\mathbb{Z}$).</li>
                  <li class="leading-relaxed">Nếu $\\Delta \\phi = (2k + 1)\\pi$ thì hai dao động ngược pha ($k \\in \\mathbb{Z}$).</li>
                  <li class="leading-relaxed">Nếu $\\Delta \\phi = \\frac{(2k + 1)\\pi}{2}$ thì hai dao động vuông pha ($k \\in \\mathbb{Z}$).</li>
                </ul>
              </div>
              <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 class="font-bold text-purple-800 dark:text-purple-200 mb-2">3. Tần số góc</h3>
                <p class="text-sm mb-3 font-medium">Tần số góc của dao động là đại lượng đặc trưng cho tốc độ biến thiên của pha dao động. Đối với dao động điều hòa tần số góc có giá trị không đổi và được xác định theo công thức:</p>
                <div class="text-xs space-y-1">
                  <p class="text-center text-base" style="font-size:16px">$\\omega = \\frac{\\phi_2 - \\phi_1}{t_2 - t_1} = \\frac{2\\pi}{T} = 2\\pi f$</p>
                  <p class="text-sm mt-2">Với $\\phi_1$ và $\\phi_2$ lần lượt là pha dao động tại thời điểm $t_1$ và $t_2$. Đơn vị của tần số góc là rad/s.</p>
                </div>
              </div>
            </div>
          `,
          notes: `Chiều dài quỹ đạo là: L = 2A; 
                  Đại lượng thay đổi: thời gian, li độ x, pha dao động Φ; 
                  Đại lượng không thay đổi: biên độ A, tần số góc ω, chu kì T, tần số f, pha ban đầu φ0.`
        },
        {
          id: 5,
          title: 'Ví dụ về dao động điều hòa',
          type: 'example',
          content: `
            <h2>Ví dụ về dao động điều hòa:</h2>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 1 :</h4>
              <p class="text-sm">Một vật dao động điều hòa với biên độ A = 10 cm và tần số f = 1 Hz. Viết phương trình dao động của vật nếu tại thời điểm t = 0, vật ở vị trí cân bằng và chuyển động về phía biên dương.</p> 
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Tại t = 0, vật ở vị trí cân bằng và chuyển động về phía biên dương nên pha ban đầu $\\phi = -\\frac{\\pi}{2}$.</p>
                <p>Tần số góc: $\\omega = 2\\pi f = 2\\pi \\times 1 = 2\\pi$ rad/s.</p>
                <p>Phương trình dao động: <strong>$x = 0.1 \\cos(2\\pi t - \\frac{\\pi}{2})$</strong> (m).</p>
              </div>
            </div>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 2 :</h4>
              <p class="text-sm">Một vật dao động điều hòa với phương trình $x = 0.2 cos(4\\pi t + \\pi/3)$ (m). Tính biên độ, tần số, chu kì và pha ban đầu của dao động.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Biên độ A = 0.2 m.</p>
                <p>Tần số góc $\\omega = 4\\pi$ rad/s → Tần số $f = \\frac{\\omega}{2\\pi} = 2$ Hz.</p>
                <p>Chu kì $T = \\frac{1}{f} = 0.5$ s.</p>
                <p>Pha ban đầu $\\phi = \\frac{\\pi}{3}$ rad.</p>
              </div>
            </div>
          `,
        },
        {
          id: 6,
          title: 'Tổng kết bài học',
          type: 'summary',
          content: `
            <h2>Tổng kết:</h2>
            <ul class="list-disc list-inside mt-4 space-y-2">
              <li>• Dao động là chuyển động có giới hạn quanh vị trí cân bằng.</li>
              <li>• Dao động điều hòa là dao động mà li độ biến thiên theo hàm cosin (hoặc sin) theo thời gian.</li>
              <li>• Phương trình dao động điều hòa: $x = A cos(\\omega t + \\phi)$.</li>
              <li>• Biên độ, chu kì, tần số và pha ban đầu là các đại lượng đặc trưng của dao động điều hòa.</li>
            </ul>
            <div class="flex justify-center my-6">
              <img src="/images/congrats.jpg" alt="Chúc mừng hoàn thành bài học!" class="w-32 h-32 object-contain" />
            </div>
          `,
        }
      ]
    },
    {
      id: '2',
      title: 'Phương trình dao động điều hoà',
      slides: [
        {
          id: 1,
          title: 'Li độ dao động điều hòa',
          type: 'defination',
          content: `
            <h2>1. Phương trình li độ của vật dao động.</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-8">
              <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">Phương trình li độ của vật dao động điều hòa có dạng:</h3>
                <div class="max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl text-center bg-gradient-to-r from-purple-400 to-purple-300 dark:from-purple-900 dark:to-purple-800 border border-purple-300 dark:border-purple-600 ring-1 ring-purple-200 dark:ring-purple-800">
                <div class="text-2xl md:text-4xl font-mono leading-tight text-purple-900 dark:text-purple-50"><strong>$x = A \\cos(\\omega t + \\phi_0)$</strong></div>
              </div>
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Trong đó:</p>
              <ul class="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>x</strong>: li độ của vật dao động (m).</li>
                <li><strong>A</strong>: biên độ dao động (m).</li>
                <li><strong>ω</strong>: tần số góc (rad/s).</li>
                <li><strong>$\\phi_0$</strong>: pha ban đầu (rad).</li>
                <li><strong>$\\phi = \\omega t + \\phi_0$</strong>: pha dao động tại thời điểm t (rad).</li>
              </ul>
            </div>
            <h2>2. Độ dịch chuyển của vật dao động.</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-8">
              <h3 class="text-xl font-bold text-green-700 dark:text-green-300 mb-4 text-center">Tại một thời điểm bất kì, độ dịch chuyển của vật dao động so với vị trí ban đầu được xác định bằng công thức:</h3>
              <div class="p-6 rounded-lg text-center bg-transparent">
                <div class="max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl text-center bg-amber-600 dark:bg-amber-900 border border-amber-300 dark:border-amber-600 ring-1 ring-amber-200 dark:ring-amber-800">
                  <div class="text-1xl md:text-4xl font-mono leading-tight text-amber-50 dark:text-amber-50"><strong>$d = \\Delta x = x - x_0 = A \\cos(\\omega t + \\phi_0) - A \\cos(\\phi_0)$</strong></div>
                </div>
              </div>
            </div>
          `,
          notes: 'Dao động điều hòa là mô hình cơ bản để hiểu mọi loại dao động khác'
        },
        {
          id: 2,
          title: 'Vận tốc, gia tốc trong dao động điều hòa',
          type: 'defination',
          content: `
            <h2>1. Vận tốc của vật dao động điều hòa.</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-8">
              <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">Công thức vận tốc của vật dao động điều hòa:</h3>
                <div class="max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl text-center bg-gradient-to-r from-sky-400 to-sky-300 dark:from-sky-900 dark:to-sky-800 border border-sky-300 dark:border-sky-600 ring-1 ring-sky-200 dark:ring-sky-800">
                <div class="text-2xl md:text-4xl mb-2 font-mono leading-tight text-sky-900 dark:text-sky-50"><strong>$v = -A \\omega \\sin(\\omega t + \\phi_0) = A \\omega \\cos(\\omega t + \\phi_0 + \\frac{\\pi}{2})$</strong></div>
              </div>
              <div class="mt-6">
                <div class="bg-white/5 dark:bg-gray-800/20 p-6 rounded-lg shadow-md border border-transparent">
                  <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Nhận xét:</h4>
                    <div class="mt-4 w-full">
                      <img src="/images/velocity-graph.png" alt="Đồ thị vận tốc trong dao động điều hòa" class="w-full h-auto max-h-[420px] object-contain rounded-lg shadow-lg border border-gray-50 dark:border-gray-700 block mx-auto" />
                    </div>
                    <br/>
                    <il class="list-disc list-inside mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li class="leading-relaxed">Vận tốc nhanh hơn pha li độ một góc <span class="font-mono">$\\frac{\\pi}{2}$</span>.</li>
                      <li class="leading-relaxed">Vận tốc dương khi vật đi theo chiều Ox, âm khi đi ngược chiều Ox.</li>
                      <li class="leading-relaxed">Vận tốc đổi chiều ở biên.</li>
                      <li class="leading-relaxed">Vận tốc cực đại tại VTCB theo chiều dương với độ lớn <span class="font-mono">$v_{max} = A\\omega$</span>.</li>
                      <li class="leading-relaxed">Vận tốc cực tiểu tại VTCB theo chiều âm với độ lớn <span class="font-mono">$v_{min} = -A\\omega$</span>.</li>
                      <li class="flex justify-center"><img class="w-full max-w-xs rounded object-contain" src="/images/velocity.png" alt="Biểu diễn vận tốc trong dao động điều hòa" /></li>
                      <li class="leading-relaxed">Tốc độ là độ lớn của vận tốc. Tốc độ cực đại <span class="font-mono">$|v|_{max} = A\\omega$</span> khi vật đi qua VTCB. Tốc độ cực tiểu <span class="font-mono">$|v|_{min} = 0$</span> tại hai biên.</li>
                      <li class="flex justify-center"><img class="w-full max-w-xs rounded object-contain" src="/images/speed.png" alt="Biểu diễn tốc độ trong dao động điều hòa" /></li>
                    </il>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Lưu ý: chiều dương Ox được chọn tùy theo hệ quy chiếu.</p>
                    <img class="w-40 mx-auto mt-3" src="/images/elips.png" alt="Sơ đồ vận tốc theo li độ x" />
                    <br/>
                    <il class="list-disc list-inside mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li class="leading-relaxed">Đồ thị vận tốc theo thời gian là đồ thị hình sin. Đồ thị vận tốc theo li độ là hình elip.</li>
                      <li class="text-xs text-gray-500 dark:text-gray-400">$x = A \\cos(\\omega t + \\phi) -> (\\frac{x}{A})^2 = \\cos(\\omega t + \\phi)^2$. (1)</li>
                      <li class="text-xs text-gray-500 dark:text-gray-400">$v = - A \\omega \\sin(\\omega t + \\phi) = - v_{max} \\sin(\\omega t + \\phi) -> (\\frac{v}{v_{max}})^2 = \\sin(\\omega t + \\phi)^2$. (2)</li>
                      <li class="text-xs text-gray-500 dark:text-gray-400">Từ (1) và (2) ta có: <span class="font-mono">$(\\frac{x}{A})^2 + (\\frac{v}{v_{max}})^2 = 1$.</span></li>
                    </il>
                  </div>
                </div>
              </div>
            </div>
            <h2>2. Gia tốc của vật dao động điều hòa.</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-8">
              <h3 class="text-xl font-bold text-green-700 dark:text-green-300 mb-4 text-center">Công thức gia tốc của vật dao động điều hòa:</h3>
                <div class="max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl text-center bg-gradient-to-r from-emerald-400 to-emerald-300 dark:from-emerald-900 dark:to-emerald-800 border border-emerald-300 dark:border-emerald-600 ring-1 ring-emerald-200 dark:ring-emerald-800">
                <div class="text-1xl md:text-4xl font-mono leading-tight text-emerald-900 dark:text-emerald-50"><strong>$a = -A \\omega^2 \\cos(\\omega t + \\phi) = -\\omega^2 x = A\\omega^2 \\cos(\\omega t + \\phi + \\pi)$</strong></div>
              </div>
              <br/>
              <div class="text-xs text-gray-500 dark:text-gray-400">Độ lớn của gia tốc cực đại: $a_{max} = A\\omega^2$</div>
            </div>
          `,
          notes: 'Vận tốc đạt cực đại tại VTCB, gia tốc đạt cực đại tại biên.'
        },
        {
          id: 3,
          title: 'Vòng tròn pha, đa trục và thời gian di chuyển',
          type: 'defination',
          content: `
            <h2>1. Vòng tròn pha.</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-8">
              <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">Khái niệm vòng tròn pha:</h3>
              <p class="text-base leading-relaxed">Vòng tròn pha là một biểu diễn đồ họa giúp ta hình dung mối quan hệ giữa li độ, vận tốc và gia tốc của vật dao động điều hòa theo pha dao động.</p>
              <p class="text-base leading-relaxed">Hai đại lượng vuông pha, công thức độc lập thời gian (không phụ thuộc thời gian):</p>
              <br/>
              <il class="list-disc list-inside mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li class="leading-relaxed">$(\\frac{x}{A})^2 + (\\frac{v}{v_{max}})^2 = 1$ && $(\\frac{a}{a_{max}})^2 + (\\frac{v}{v_{max}})^2 = 1$</li>
                <li class="leading-relaxed">$A^2 = x_1^2 + \\frac{v_1^2}{\\omega^2} = x_2^2 + \\frac{v_2^2}{\\omega^2} -> x_1^2 - x_2^2 = \\frac{v_2^2 - v_1^2}{\\omega^2}$</li>
                <li class="leading-relaxed">$\\omega = \\sqrt{\\frac{v_2^2 - v_1^2}{x_1^2 - x_2^2}}$ && $a_{max} = \\omega v_{max}$</li>
              </il>
              <div class="mt-6 w-full">
                <img src="/images/phase_circle.png" alt="Vòng tròn pha trong dao động điều hòa" class="w-full h-auto max-h-[420px] object-contain rounded-lg shadow-lg border border-gray-50 dark:border-gray-700 block mx-auto" />
              </div>
            </div>
            <h2>2. Đa trục.</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-8">
              <h3 class="text-xl font-bold text-green-700 dark:text-green-300 mb-4 text-center">Khái niệm đa trục:</h3>
              <p class="text-base leading-relaxed">Đa trục là một biểu diễn đồ họa khác giúp ta hình dung mối quan hệ giữa li độ, vận tốc và gia tốc của vật dao động điều hòa theo thời gian.</p>
              <div class="mt-6 w-full">
                <img src="/images/phase_plane.png" alt="Đa trục trong dao động điều hòa" class="w-full h-auto max-h-[420px] object-contain rounded-lg shadow-lg border border-gray-50 dark:border-gray-700 block mx-auto" />
              </div>
            </div>
            <h2>3. Thời gian di chuyển giữa hai vị trí trong dao động điều hòa.</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-8">
              <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">Công thức tính thời gian di chuyển giữa hai vị trí trong dao động điều hòa:</h3>
                <div class="max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-purple-400 to-purple-300 dark:from-purple-900 dark:to-purple-800 border border-purple-300 dark:border-purple-600 ring-1 ring-purple-200 dark:ring-purple-800">
                <div class="text-lg md:text-3xl font-mono leading-tight text-purple-900 dark:text-purple-50">
                  <il class="list-disc list-inside mt-3 space-y-3 text-base md:text-2xl text-gray-700 dark:text-gray-300">
                    <li class="leading-relaxed md:leading-snug md:text-2xl">$t = \\frac{\\delta \\phi}{\\omega}$</li>
                    <li class="leading-relaxed md:leading-snug md:text-2xl">Thời gian đi từ vị trí x đến vị trí cân bằng và ngược lại:</li>
                    <p class="mt-3 text-lg md:text-2xl font-semibold">$t = \\frac{1}{\\omega} \\sin^{-1}(\\frac{|x|}{A})$</p>
                  </il>
                </div>
              </div>
            </div>
          `,
          notes: 'Vòng tròn pha và đa trục giúp trực quan hóa mối quan hệ giữa các đại lượng trong dao động'
        },
        {
          id: 4,
          title: 'Ví dụ về phương trình dao động điều hòa',
          type: 'example',
          content: `
            <h2>Ví dụ về phương trình dao động điều hòa:</h2>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 1:</h4>
              <p class="text-sm">Một vật dao động điều hòa với biên độ A = 8 cm và tần số f = 0.5 Hz. Viết phương trình dao động của vật nếu tại thời điểm t = 0, vật ở vị trí biên âm.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Tại t = 0, vật ở vị trí biên âm nên pha ban đầu $\\phi = \\pi$.</p>
                <p>Tần số góc: $\\omega = 2\\pi f = 2\\pi \\times 0.5 = \\pi$ rad/s.</p>
                <p>Phương trình dao động: <strong>$x = 0.08 \\cos(\\pi t + \\pi)$</strong> (m).</p>
              </div>  
            </div>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 2:</h4
              <p class="text-sm">Một vật dao động điều hòa với phương trình $x = 0.15 cos(6\\pi t - \\frac{\\pi}{4})$ (m). Tính biên độ, tần số, chu kì và pha ban đầu của dao động.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Biên độ A = 0.15 m.</p>
                <p>Tần số góc $\\omega = 6\\pi$ rad/s → Tần số $f = \\frac{\\omega}{2\\pi} = 3$ Hz.</p>
                <p>Chu kì $T = \\frac{1}{f} = \\frac{1}{3}$ s.</p>
                <p>Pha ban đầu $\\phi = -\\frac{\\pi}{4}$ rad.</p>
              </div>
            </div>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 3:</h4>
              <p class="text-sm">Một vật dao động điều hòa có biên độ A = 12 cm và vận tốc cực đại $v_{max} = 3.6$ m/s. Tính tần số góc và chu kì dao động của vật.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Vận tốc cực đại: $v_{max} = A\\omega$ → $\\omega = \\frac{v_{max}}{A} = \\frac{3.6}{0.12} = 30$ rad/s.</p>
                <p>Chu kì dao động: $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{30} = \\frac{\\pi}{15}$ s.</p>
              </div>
            </div>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 4:</h4>
              <p class="text-sm">Một vật dao động điều hòa có phương trình $x = 0.1 cos(10t + \\frac{\\pi}{6})$ (m). Tính gia tốc của vật khi li độ x = 5 cm.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Biên độ A = 0.1 m, tần số góc $\\omega = 10$ rad/s.</p>
                <p>Tại li độ x = 5 cm = 0.05 m, ta có:</p>
                <p>$a = -\\omega^2 x = -10^2 \\times 0.05 = -50$ m/s<sup>2</sup>.</p>
              </div>  
            </div>
          `,
          notes: `Phương trình dao động điều hòa là công cụ quan trọng để phân tích chuyển động dao động.
          `,  
        },
        {          id: 5,
          title: 'Tổng kết bài học',
          type: 'summary',
          content: `
            <h2>Tổng kết:</h2>
            <ul class="list-disc list-inside mt-4 space-y-2">
              <li>• Phương trình li độ dao động điều hòa: $x = A cos(\\omega t + \\phi_0)$.</li>
              <li>• Vận tốc dao động điều hòa: $v = -A \\omega \\sin(\\omega t + \\phi_0)$.</li>
              <li>• Gia tốc dao động điều hòa: $a = -A \\omega^2 \\cos(\\omega t + \\phi_0)$.</li>
              <li>• Vòng tròn pha và đa trục giúp trực quan hóa mối quan hệ giữa các đại lượng trong dao động.</li>
            </ul>
            <div class="flex justify-center my-6">
              <img src="/images/congrats.jpg" alt="Chúc mừng hoàn thành bài học!" class="w-32 h-32 object-contain" />
            </div>
          `,
        }
      ]
    },
    {
      id: '3',
      title: 'Năng lượng trong dao động điều hoà',
      slides: [
        {
          id: 1,
          title: 'Khái niệm năng lượng trong dao động',
          type: 'intro',
          content: `
            <h2>Năng lượng trong dao động:</h2>
            <p class="mb-6">Năng lượng trong dao động gồm động năng và thế năng, chuyển hóa liên tục nhưng tổng năng lượng được bảo toàn.</p>
            <div class="bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-700 dark:to-orange-800 p-6 rounded-xl mb-6 text-white">
              <h3 class="font-bold mb-3 text-lg">Động năng trong dao động điều hòa:</h3>
              <ul class="space-y-2 text-base">
                <li>Động năng: $W_{đ} = \\frac{1}{2}mv^2 = \\frac{1}{2}mA^2\\omega^2 \\sin^2(\\omega t + \\phi)$</li>
              </ul>
            </div>
            <p class="mb-6">Xét trường hợp con lắc lò xo nằm ngang, người ta chứng minh được:</p>
            <div class="mb-6 p-6">
              <il class="list-disc list-inside mb-6 space-y-2 text-base">
                <li>$\\omega = \\sqrt{\\frac{k}{m}} -> k = m\\omega^2$</li>
                <li>$T = 2\\pi\\sqrt{\\frac{m}{k}}$</li>
                <li>$f = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}$</li>
              </il>
            </div>
            <div class="bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-700 dark:to-orange-800 p-6 rounded-xl mb-6 text-white">
              <h3 class="font-bold mb-3 text-lg">Thế năng của con lắc lò xo:</h3>
              <ul class="space-y-2 text-base">
                <li>Thế năng: $W_{t} = \\frac{1}{2}kx^2$</li>
              </ul>
              <h3 class="font-bold mb-3 text-lg">Thế năng trong dao động điều hòa:</h3>
              <ul class="space-y-2 text-base">
                <li>Thế năng: $W_{t} = \\frac{1}{2}m \\omega^2 x^2 = \\frac{1}{2}m \\omega^2 A^2 \\cos^2(\\omega t + \\phi)$</li>
              </ul>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-6">
              <h3 class="font-bold text-green-800 dark:text-green-200 mb-2">Ví dụ thực tế</h3>
              <ul class="space-y-1 text-sm">
                <li>• Con lắc lò xo: động năng lớn nhất ở VTCB, thế năng lớn nhất ở biên</li>
                <li>• Dao động phân tử: năng lượng chuyển hóa liên tục</li>
              </ul>
            </div>
          `,
          notes: 'Năng lượng chuyển hóa liên tục nhưng tổng năng lượng được bảo toàn'
        },
        {
          id: 2,
          title: 'Cơ năng trong dao động điều hòa',
          type: 'defination',
          content: `
            <h2>Công thức cơ năng:</h2>
            <div class="formula-box text-center">
              <p>$W = W_{đ} + W_{t}$</p>
              <p>$= \\frac{1}{2}m \\omega^2 A^2 \\sin^2(\\omega t + \\phi) + \\frac{1}{2}m \\omega^2 A^2 \\cos^2(\\omega t + \\phi) = \\frac{1}{2}m \\omega^2 A^2$</p>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
              <h3 class="font-bold text-blue-800 dark:text-blue-200 mb-2">Ý nghĩa</h3>
              <p class="text-sm">Cơ năng là đại lượng bảo toàn, không biến thiên.</p>
            </div>
            <div class="bg-green/10 dark:bg-yellow-800/30 p-4 rounded-lg mb-6">
              <h3 class="font-bold text-blue-800 dark:text-blue-200 mb-2">⚠️Lưu ý:</h3>
              <il class="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>x, v, A biến thiên với $\\omega$, f, T.</li>
                <li>$W_{đ}, W_{t}$ biến thiên với $2\\omega$, 2f, 2T.</li>
                <li>Khi động năng tăng thì thế năng giảm và ngược lại, nhưng cơ năng luôn bảo toàn.</li>
              </il>
            </div>
            <img class="w-40 mx-auto mt-3" src="/images/energy.png" alt="Sơ đồ năng lượng trong dao động điều hòa" />
          `,
          notes: 'Cơ năng được bảo toàn trong dao động điều hòa lý tưởng'
        },
        {
          id: 3,
          title: 'Ví dụ về năng lượng trong dao động',
          type: 'example',
          content: `
            <h2>Ví dụ về năng lượng trong dao động:</h2>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 1:</h4>
              <p class="text-sm">Một vật có khối lượng m = 0.2 kg dao động điều hòa với biên độ A = 0.1 m và tần số f = 2 Hz. Tính cơ năng của vật.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Tần số góc: $\\omega = 2\\pi f = 2\\pi \\times 2 = 4\\pi$ rad/s.</p>
                <p>Cơ năng: $W = \\frac{1}{2}m \\omega^2 A^2 = \\frac{1}{2} \\times 0.2 \\times (4\\pi)^2 \\times (0.1)^2 = 0.157$ J.</p>
              </div>
            </div>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ví dụ 2:</h4
              <p class="text-sm">Một vật dao động điều hòa có cơ năng W = 0.5 J và biên độ A = 0.2 m. Tính khối lượng m của vật nếu tần số góc $\\omega = 5$ rad/s.</p>
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p><strong>Giải:</strong></p>
                <p>Cơ năng: $W = \\frac{1}{2}m \\omega^2 A^2$ → $m = \\frac{2W}{\\omega^2 A^2} = \\frac{2 \\times 0.5}{5^2 \\times 0.2^2} = 2$ kg.</p>
              </div>
            </div>
          `,
          notes: 'Định luật bảo toàn cơ năng là cơ sở để phân tích dao động'
        },
        {
          id: 4,
          title: 'Tổng kết bài học',
          type: 'summary',
          content: `
            <h2>Tổng kết:</h2>
            <ul class="list-disc list-inside mt-4 space-y-2">
              <li>• Động năng trong dao động điều hòa: $W_{đ} = \\frac{1}{2}mv^2$.</li>
              <li>• Thế năng trong dao động điều hòa: $W_{t} = \\frac{1}{2}kx^2$.</li>
              <li>• Cơ năng trong dao động điều hòa: $W = W_{đ} + W_{t} = \\frac{1}{2}m \\omega^2 A^2$.</li>
            </ul>
            <div class="flex justify-center my-6">
              <img src="/images/congrats.jpg" alt="Chúc mừng hoàn thành bài học!" class="w-32 h-32 object-contain" />
            </div>
          `,
        }
      ]
    },
    {
      id: '4',
      title: 'Dao động tắt dần và hiện tượng cộng hưởng',
      slides: [
        {
          id: 1,
          title: 'Khái niệm dao động tắt dần',
          type: 'intro',
          content: `
            <h2>1. Dao động tắt dần (có lực ma sát):</h2>
            <div class="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 p-6 rounded-xl mb-6 text-white">
              <il class="list-disc list-inside mt-2 space-y-2 text-base">
                <li>Dao động tắt dần là dao động có biên độ và năng lượng giảm dần theo thời gian.</li>
                <li>Nguyên nhân: do lực cản, lực ma sát thực hiện công âm làm giảm năng lượng của hệ.</li>
                <li>Đặc điểm: lực cản, lực ma sát càng lớn thì dao động sẽ tắt dần càng nhanh.</li>
                <li>Hiệu quả có lợi: dùng trong các bộ phận giảm sóc:</li>
                <li>Hiệu quả bất lợi: làm các cơ hệ dừng lại, không hoạt động do mất năng lượng.</li>
              </il>
            </div>
            <h2>2. Dao động cưỡng bức (có lực ma sát, biên độ không đổi, không tắt dần):</h2>
            <div class="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 p-6 rounded-xl mb-6 text-white">
              <il class="list-disc list-inside mt-2 space-y-2 text-base">
                <li>Dao động cưỡng bức là dao động chịu ngoại lực biến thiên điều hòa:</li>
                <p class="mt-2">$F_{n} = F_0 cos(\\omega_{n} t + \\phi)$</p>
                <li>Đặc điểm:</li>
                <il class="list-disc list-inside mt-2 space-y-2 text-base">
                  <li>Tần số của dao động cưỡng bức là tần số của ngoại lực ($f_0$: tần số riêng của hệ đã mất dần).</li>
                  <li>Biên độ của dao động cưỡng bức: phụ thuộc vào biên độ ngoại lực, tần số của ngoại lực, tần số riêng của hệ.</li>
                  <li>Độ chênh lệch giữa tần số của ngoại lực và tần số riêng càng nhỏ thì biên độ của dao động cưỡng bức càng lớn và ngược lại ($f_n~f_0$ thì A~$A_0)</li>
                </il>
              </il>
            </div>
          `,
          notes: 'Dao động tắt dần xảy ra trong hầu hết các tình huống thực tế.'
        },
        {
          id: 2,
          title: 'Hiện tượng cộng hưởng và dao động duy trì',
          type: 'defination',
          content: `
            <h2>1. Hiện tượng cộng hưởng:</h2>
            <p class="text-xl mb-6">Cộng hưởng xảy ra khi tần số lực cưỡng bức bằng tần số riêng của hệ, làm biên độ dao động cực đại.</p>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-6">
              <h3 class="font-bold mb-3 text-lg">Ứng dụng cộng hưởng</h3>
              <ul class="space-y-2 text-base">
                <li>• Nhạc cụ: tạo âm thanh lớn</li>
                <li>• Cầu treo: cần tránh cộng hưởng với gió</li>
                <li>• Máy móc: giảm rung động nguy hiểm</li>
              </ul>
            </div>
            <div class="bg-gray-100 dark:bg-amber-900/30 p-4 rounded-lg mt-6 border border-gray-200 dark:border-amber-700 shadow-sm">
              <h3 class="font-bold text-gray-900 dark:text-amber-100 mb-2">⚠️ Chú ý:</h3>
              <p class="text-base text-gray-900 dark:text-amber-100 leading-relaxed font-medium">Cộng hưởng có thể có lợi hoặc có hại tùy vào ứng dụng thực tế.</p>
            </div>
            <br/>
            <h2>2. Dao động duy trì:</h2>
            <div class="bg-white/10 dark:bg-gray-800/30 p-6 rounded-xl mb-6">
              <il class="list-disc list-inside mt-2 space-y-2 text-base">
                <li>Dao động duy trì chịu tác động của lực cùng chiều chuyển động nằm bên trong cơ hệ, bổ sung năng lượng đúng bằng phần năng lượng đã mất đi.</li>
                <li>$f_{duy trì} = f_0$ (tần số riêng của hệ)</li>
              </il>
            </div>
          `,
          notes: 'Cộng hưởng có thể có lợi hoặc có hại tùy vào ứng dụng'
        },
        {
          id: 3,
          title: 'Ứng dụng thực tế của dao động tắt dần',
          type: 'example',
          content: `
            <h2>Ứng dụng thực tế của dao động tắt dần:</h2>
            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ứng dụng 1: Hệ thống giảm xóc ô tô</h4>
              <p class="text-sm">Hệ thống giảm xóc sử dụng dao động tắt dần để hấp thụ năng lượng từ các va chạm và rung động khi xe di chuyển trên địa hình không bằng phẳng, giúp cải thiện sự thoải mái và an toàn cho hành khách.</p>
              <div class="mt-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-l-4 border-gray-300">
                <h5 class="font-semibold mb-1">Nguyên nhân gây tắt dần trong giảm xóc</h5>
                <p class="text-sm mb-2">Trong giảm xóc, năng lượng bị tiêu tán chủ yếu do:</p>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li><strong>Lực cản nhớt:</strong> dầu thủy lực trong giảm xóc tạo lực cản tỉ lệ với vận tốc, chuyển động cơ thành nhiệt.</li>
                  <li><strong>Ma sát cơ khí:</strong> gioăng, vòng bi và con dấu tạo ma sát làm mất năng lượng.</li>
                </ul>
                <h5 class="font-semibold mt-2 mb-1">Mục đích áp dụng</h5>
                <p class="text-sm">Giảm xóc được thiết kế để:</p>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li>Hấp thụ va chạm và giảm biên độ dao động để tăng sự êm ái.</li>
                  <li>Giữ bánh xe tiếp xúc tốt với mặt đường, nâng cao an toàn và kiểm soát lái.</li>
                </ul>
              </div>
            </div>

            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ứng dụng 2: Đồng hồ quả lắc</h4>
              <p class="text-sm">Đồng hồ quả lắc sử dụng dao động tắt dần nhẹ (kèm với bộ thoát/escapement) để duy trì chuyển động đều đặn của quả lắc, giúp đồng hồ hoạt động chính xác và ổn định theo thời gian.</p>
              <div class="mt-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-l-4 border-gray-300">
                <h5 class="font-semibold mb-1">Nguyên nhân gây tắt dần trong đồng hồ</h5>
                <p class="text-sm mb-2">Trong đồng hồ quả lắc, damping phát sinh do:</p>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li><strong>Ma sát ổ trục và tiếp xúc cơ học:</strong> làm mất một phần năng lượng cơ học.</li>
                  <li><strong>Cản không khí:</strong> lực cản nhỏ từ không khí quanh quả lắc.</li>
                </ul>
                <h5 class="font-semibold mt-2 mb-1">Mục đích áp dụng</h5>
                <p class="text-sm">Ở đồng hồ, tắt dần nhẹ giúp:</p>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li>Ổn định biên độ dao động để tránh dao động quá lớn hoặc không ổn định.</li>
                  <li>Cho phép bộ thoát cung cấp năng lượng khắc phục phần năng lượng mất đi, giữ pha và tần số ổn định cho việc đo thời gian chính xác.</li>
                </ul>
              </div>
            </div>

            <div class="mt-6 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400 text-gray-900 dark:text-yellow-100">
              <h4 class="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">💡Ứng dụng 3: Hệ thống treo cầu</h4>
              <p class="text-sm">Hệ thống treo cầu sử dụng các biện pháp giảm chấn để hạn chế dao động do gió, giao thông hoặc các kích thích khác, bảo vệ cấu trúc và tăng tuổi thọ công trình.</p>
              <div class="mt-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-l-4 border-gray-300">
                <h5 class="font-semibold mb-1">Nguyên nhân gây tắt dần trong cầu</h5>
                <p class="text-sm mb-2">Các nguồn tắt dần trong kết cấu cầu bao gồm:</p>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li><strong>Mất năng lượng nội tại:</strong> nội ma sát trong vật liệu kết cấu (thép, bê tông).</li>
                  <li><strong>Tương tác không khí (aero-damping):</strong> các dòng không khí tạo lực cản và mất năng lượng.</li>
                  <li><strong>Thiết bị giảm chấn:</strong> bộ giảm chấn điều chỉnh như tuned mass dampers hay viscous dampers nhằm chủ động tiêu tán năng lượng.</li>
                </ul>
                <h5 class="font-semibold mt-2 mb-1">Mục đích áp dụng</h5>
                <p class="text-sm">Trong cầu, mục tiêu chính là:</p>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li>Ngăn hiện tượng cộng hưởng do gió hoặc tải trọng thay đổi, tránh dao động lớn gây hư hỏng.</li>
                  <li>Giảm biến dạng và mệt mỏi vật liệu, kéo dài tuổi thọ kết cấu và đảm bảo an toàn cho người sử dụng.</li>
                </ul>
              </div>
            </div>
          `,
          notes: 'Dao động tắt dần. có ứng dụng rộng rãi trong mọi lĩnh vực của đời sống.'
        },
        {
          id: 4,
          title: 'Tổng kết bài học',
          type: 'summary',
          content: `
            <h2>Tổng kết:</h2>
            <il class="list-disc list-inside mt-4 space-y-2">
              <li>• Dao động tắt dần là dao động có biên độ và năng lượng giảm dần theo thời gian do lực ma sát.</li>
              <li>• Hiện tượng cộng hưởng xảy ra khi tần số lực cưỡng bức bằng tần số riêng của hệ, làm biên độ dao động cực đại.</li>
              <li>• Dao động duy trì chịu tác động của lực cùng chiều chuyển động nằm bên trong cơ hệ, bổ sung năng lượng đúng bằng phần năng lượng đã mất đi.</li>
            </il>
            <div class="flex justify-center my-6">
              <img src="/images/congrats.jpg" alt="Chúc mừng hoàn thành bài học!" class="w-32 h-32 object-contain" />
            </div>
          `,
        }
      ]
    }
  ],
  exercises: [],
  order: 1,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = chapter;

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hunghs25202:Hungho.02@physicbook.dd77djr.mongodb.net/?retryWrites=true&w=majority&appName=PhysicBook';

const ChapterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: String,
  icon: String,
  content: { type: String, required: true },
  lessons: [mongoose.Schema.Types.Mixed],
  exercises: [mongoose.Schema.Types.Mixed],
  order: Number,
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
});

const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);

async function seedChapter() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected');

    // Xóa dữ liệu cũ
    await Chapter.deleteMany({});
    // Thêm dữ liệu mới
    await Chapter.create(chapter);
    console.log('✓ Chapter seeded!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

if (require.main === module) {
  seedChapter();
}
