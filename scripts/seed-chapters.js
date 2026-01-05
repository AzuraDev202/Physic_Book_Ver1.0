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
          title: 'Sự dao động của các vật - Khái niệm dao động',
          type: 'intro',
          content: `
            <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">SỰ DAO ĐỘNG CỦA CÁC VẬT</h2>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 border-l-4 border-blue-400">
              <div class="flex items-start gap-3">
                <div class="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                    Sự dao động của các vật diễn ra phổ biến trong cuộc sống hàng ngày như: dao động của quả lắc đồng hồ (Hình 1.1a), dao động của cánh chim ruồi để giữ cho cơ thể bay tại chỗ trong không trung khi hút mật (Hình 1.1b). Vậy dao động có đặc điểm gì và được mô tả như thế nào?
                  </p>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mb-3 max-w-4xl mx-auto">
              <div class="text-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                <div class="h-56 flex items-center justify-center">
                  <img src="/images/lesson1_clock.png" alt="Đồng hồ quả lắc" class="max-h-full max-w-full object-contain rounded" />
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">a)</p>
              </div>
              <div class="text-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                <div class="h-56 flex items-center justify-center">
                  <img src="/images/lesson1_bird.png" alt="Chim ruồi đang hút mật" class="max-h-full max-w-full object-contain rounded" />
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">b)</p>
              </div>
            </div>
            <p class="text-xs italic text-center text-gray-600 dark:text-gray-400 mb-4">▲ Hình 1.1. a) Đồng hồ quả lắc; b) Chim ruồi đang hút mật</p>

            <div class="bg-gradient-to-r from-pink-500 to-pink-400 dark:from-pink-700 dark:to-pink-600 p-4 rounded-lg mb-4 shadow">
              <div class="flex items-start gap-3">
                <div class="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm text-pink-600">2</div>
                <div class="text-white">
                  <h3 class="font-bold mb-2 text-base">KHÁI NIỆM DAO ĐỘNG TỰ DO</h3>
                  <p class="text-sm leading-relaxed mb-2">
                    <span class="font-bold">▶ Khái niệm dao động</span>
                  </p>
                  <p class="text-sm leading-relaxed">
                    Chuyển động của những vật trong Hình 1.1 (quả lắc, cánh chim ruồi) là chuyển động có tính lặp lại và có giới hạn trong không gian. Những chuyển động như vậy được gọi là <strong>dao động cơ học</strong>. Một số vật thực hiện dao động cơ học quanh một vị trí đặc biệt được gọi là <strong>vị trí cân bằng</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-4 border-l-4 border-blue-500">
              <div class="flex items-start gap-3">
                <div class="text-blue-600 dark:text-blue-300 text-2xl flex-shrink-0 font-bold">⊙</div>
                <div>
                  <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
                    Dao động cơ học là sự chuyển động có giới hạn trong không gian của một vật quanh một vị trí đặc biệt được gọi là vị trí cân bằng.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 shadow-sm">
              <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                Dao động rất phổ biến trong tự nhiên và khoa học kỹ thuật. Trong điện và từ học cũng có hiện tượng dao động. Dòng điện được sử dụng trong sinh hoạt hàng ngày là dao động điện từ.
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 shadow-sm">
              <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                Dao động mà trạng thái chuyển động của vật (vị trí và vận tốc) được lặp lại như cũ sau những khoảng thời gian bằng nhau được gọi là <strong>dao động tuần hoàn</strong>, ví dụ: dao động của quả lắc đồng hồ (Hình 1.1a).
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-3 mb-3">
              <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-green-500">
                <div class="flex items-start gap-3">
                  <div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-base">?</div>
                  <div class="flex-1">
                    <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-semibold mb-2">
                      <strong>2.</strong> Nêu một số ví dụ về dao động tuần hoàn.
                    </p>
                    <details class="mt-2">
                      <summary class="cursor-pointer text-green-600 dark:text-green-400 text-xs font-medium hover:text-green-700 dark:hover:text-green-300">
                        ▶ Xem gợi ý trả lời
                      </summary>
                      <div class="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <ul class="list-disc ml-5 space-y-1 text-xs text-gray-800 dark:text-gray-200">
                          <li>Dao động của con lắc đồng hồ quả lắc: Lặp lại trạng thái sau những khoảng thời gian bằng nhau.</li>
                          <li>Dao động của con lắc lò xo (trong điều kiện lý tưởng): Vật dao động qua lại quanh vị trí cân bằng với chu kỳ không đổi.</li>
                          <li>Chuyển động của pittông trong động cơ: Chuyển động tịnh tiến qua lại tuần hoàn.</li>
                          <li>Dao động của bánh xe Ferris: Mỗi cabin lặp lại vị trí sau mỗi vòng quay.</li>
                        </ul>
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500">
                <div class="flex items-start gap-3">
                  <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-base">💡</div>
                  <div class="flex-1">
                    <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-semibold mb-2">
                      <strong>3.</strong> Hãy nêu một ứng dụng của dao động tuần hoàn trong cuộc sống.
                    </p>
                    <details class="mt-2">
                      <summary class="cursor-pointer text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-700 dark:hover:text-blue-300">
                        ▶ Xem gợi ý trả lời
                      </summary>
                      <div class="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <ul class="list-disc ml-5 space-y-1 text-xs text-gray-800 dark:text-gray-200">
                          <li><strong>Đồng hồ quả lắc:</strong> Sử dụng dao động tuần hoàn của con lắc để đo thời gian chính xác.</li>
                          <li><strong>Nhạc cụ:</strong> Dao động của dây đàn, màng trống tạo ra âm thanh với tần số xác định.</li>
                          <li><strong>Hệ thống giảm xóc xe:</strong> Lò xo và giảm chấn giúp xe dao động ổn định khi qua địa hình gập ghềnh.</li>
                          <li><strong>Máy massage rung:</strong> Dao động tuần hoàn giúp thư giãn cơ bắp.</li>
                          <li><strong>Máy phát điện:</strong> Sử dụng dao động điện từ tuần hoàn để tạo ra dòng điện xoay chiều.</li>
                        </ul>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 shadow-sm">
              <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200 mb-2">
                <span class="font-bold">▶ Dao động tự do</span>
              </p>
              <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                Xét các hệ thực hiện dao động: con lắc lò xo gồm vật nặng được gắn vào đầu một lò xo (Hình 1.2a), con lắc đơn gồm một vật nặng được gắn vào đầu một dây nhỏ không dãn (Hình 1.2b). Lực đàn hồi tác dụng lên vật trong con lắc lò xo và lực tác dụng lên vật trong con lắc đơn gọi là nội lực của hệ.
              </p>
            </div>

            <div class="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-lg mb-4 border-l-4 border-pink-500">
              <div class="flex items-start gap-3">
                <div class="text-pink-600 dark:text-pink-300 text-2xl flex-shrink-0 font-bold">⊙</div>
                <div>
                  <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
                    Dao động của hệ xảy ra dưới tác dụng chỉ của nội lực được gọi là dao động tự do (dao động riêng).
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg mb-3 border-l-4 border-orange-500">
              <div class="flex items-start gap-3">
                <div class="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-base">💡</div>
                <div class="flex-1">
                  <p class="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    Nêu một số ví dụ về các vật dao động tự do trong thực tế.
                  </p>
                  <details class="mt-2">
                    <summary class="cursor-pointer text-orange-600 dark:text-orange-400 text-xs font-medium hover:text-orange-700 dark:hover:text-orange-300">
                      ▶ Xem gợi ý trả lời
                    </summary>
                    <div class="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <ul class="list-disc ml-5 space-y-1 text-xs text-gray-800 dark:text-gray-200">
                        <li>Con lắc lò xo: Sau khi kéo ra khỏi vị trí cân bằng và thả nhẹ, vật dao động tự do nhờ lực đàn hồi của lò xo.</li>
                        <li>Con lắc đơn: Kéo lệch khỏi vị trí cân bằng rồi thả nhẹ, vật dao động tự do dưới tác dụng của trọng lực.</li>
                        <li>Dây đàn guitar sau khi gảy: Dao động tự do tạo ra âm thanh.</li>
                        <li>Cánh cửa lò xo sau khi đóng: Dao động tự do quanh vị trí đóng.</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mb-3 max-w-4xl mx-auto">
              <div class="text-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                <div class="h-56 flex items-center justify-center">
                  <img src="/images/lesson1_spring.png" alt="Con lắc lò xo" class="max-h-full max-w-full object-contain rounded" />
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">a) Con lắc lò xo</p>
              </div>
              <div class="text-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                <div class="h-56 flex items-center justify-center">
                  <img src="/images/lesson1_pendulum.png" alt="Con lắc đơn" class="max-h-full max-w-full object-contain rounded" />
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">b) Con lắc đơn</p>
              </div>
            </div>
            <p class="text-xs italic text-center text-gray-600 dark:text-gray-400 mb-4">▲ Hình 1.2. a) Con lắc lò xo; b) Con lắc đơn</p>

            <div class="bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-700 dark:to-teal-700 p-4 rounded-lg mb-4 shadow">
              <div class="flex items-start gap-3">
                <div class="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-lg text-green-600">🧪</div>
                <div class="text-white flex-1">
                  <h3 class="font-bold mb-2 text-base">THÍ NGHIỆM</h3>
                  <p class="text-sm leading-relaxed mb-2">
                    <strong>1. Từ một số dụng cụ đơn giản như: lò xo nhẹ, dây nhẹ không dãn, vật nặng và giá đỡ.</strong>
                  </p>
                  <p class="text-sm leading-relaxed mb-2">
                    <strong>a) Em hãy thực hiện hai thí nghiệm sau:</strong>
                  </p>
                  <p class="text-sm leading-relaxed ml-3 mb-1">
                    – Cố định một đầu của lò xo, gắn vật nặng vào đầu còn lại của lò xo như Hình 1.2a. Kéo vật nặng xuống một đoạn theo phương thẳng đứng và buông nhẹ.
                  </p>
                  <p class="text-sm leading-relaxed ml-3 mb-3">
                    – Cố định một đầu của dây nhẹ không dãn, gắn vật nặng vào đầu còn lại của dây. Kéo vật nặng để dây treo lệch một góc xác định và buông nhẹ.
                  </p>

                  <p class="text-sm leading-relaxed mb-2">
                    <strong>b) Quan sát và mô tả chuyển động của các vật, nêu điểm giống nhau về chuyển động của chúng.</strong>
                  </p>

                  <details class="mt-3">
                    <summary class="cursor-pointer bg-white hover:bg-gray-50 text-green-700 font-bold px-6 py-3.5 rounded-lg inline-flex items-center gap-2 text-sm transition-all shadow-lg hover:shadow-xl border-2 border-white/50">
                      <span class="text-xl">💡</span>
                      <span>Gợi ý</span>
                    </summary>
                    
                    <div class="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      
                      <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                        <p class="text-xs font-bold text-yellow-800 dark:text-yellow-300 mb-2">💡 Điểm giống nhau về chuyển động:</p>
                        <ul class="list-disc ml-5 space-y-1 text-xs text-gray-700 dark:text-gray-300">
                          <li>Cả hai đều dao động quanh vị trí cân bằng</li>
                          <li>Chuyển động có giới hạn trong không gian (giữa 2 vị trí biên)</li>
                          <li>Chuyển động tuần hoàn - lặp lại theo chu kỳ</li>
                          <li>Tự dao động sau kích thích ban đầu (không cần tác động thêm)</li>
                        </ul>
                      </div>
                  </details>
                </div>
              </div>
            </div>
          `,
          notes: 'Chim ruồi là loài chim có thân hình bé nhỏ, có khả năng bay cố định một chỗ trong không trung hoặc bay giật lùi.'
        },
        {
          id: 2,
          title: 'Thí nghiệm khảo sát - Dao động điều hòa',
          type: 'defination',
          content: `
            <h2 class="text-2xl font-bold mb-4">DAO ĐỘNG ĐIỀU HÒA</h2>
            
            <div class="bg-gradient-to-r from-red-500 to-red-400 dark:from-red-700 dark:to-red-600 p-6 rounded-xl mb-6 text-white">
              <div class="flex items-start gap-3">
                <div>
                  <p class="text-base leading-relaxed">
                    <strong>▶ Thí nghiệm khảo sát sự phụ thuộc tọa độ của vật dao động theo thời gian</strong>
                  </p>
                  <p class="text-base leading-relaxed mt-2">• <strong>Mục đích:</strong> Khảo sát sự phụ thuộc tọa độ của vật dao động theo thời gian.</p>
                  <p class="text-base leading-relaxed mt-2">• <strong>Dụng cụ:</strong></p>
                  <p class="text-base leading-relaxed ml-4">
                    – Hệ thống giá đỡ (1) và con lắc lò xo (2).<br/>
                    – Cảm biến khoảng cách (3).<br/>
                    – Dây cáp nối cảm biến với bộ ghi số liệu (4).<br/>
                    – Bộ ghi số liệu (5).<br/>
                    – Dây cáp nối bộ ghi số liệu và máy tính (6), máy tính (7).
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <div class="text-center mb-4">
                <img src="/images/lesson1_experiment.png" alt="Thí nghiệm khảo sát sự phụ thuộc tọa độ của vật dao động theo thời gian" class="w-full max-w-2xl mx-auto rounded-lg shadow-md" />
                <p class="text-sm italic text-gray-600 dark:text-gray-400 mt-3">▲ Hình 1.3. Thí nghiệm khảo sát sự phụ thuộc tọa độ của vật dao động theo thời gian</p>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
                <strong>• Tiến hành thí nghiệm:</strong>
              </p>
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                Tiến hành bố trí thí nghiệm như Hình 1.3. Khởi động các thiết bị để sẵn sàng ghi nhận tin liệu, sau đó kéo vật ra khỏi vị trí cân bằng một đoạn nhỏ theo phương thẳng đứng và buông cho vật bắt đầu dao động không vận tốc ban đầu. Tọa độ của vật được ghi nhận tại từng thời điểm khác nhau được hiển thị trên máy tính như trong Bảng 1.1 và đồ thị tọa độ – thời gian của vật dao động như trong Hình 1.4.
              </p>
            </div>

            <div class="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-xl mb-6">
              <h3 class="text-lg font-bold text-center text-pink-800 dark:text-pink-200 mb-4">▼ Bảng 1.1. Tọa độ của vật nặng tại những thời điểm khác nhau</h3>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-sm">
                  <thead>
                    <tr class="bg-pink-200 dark:bg-pink-800">
                      <th class="border border-pink-300 dark:border-pink-600 p-2">t (s)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">x (m)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">t (s)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">x (m)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">t (s)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">x (m)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">t (s)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">x (m)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">t (s)</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-2">x (m)</th>
                    </tr>
                  </thead>
                  <tbody class="text-center">
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,00</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,044< /td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,28</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,041</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,56</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,027</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,84</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,009</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,12</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,012</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,02</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,043</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,30</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,044</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,58</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,033</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,86</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,017</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,14</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,003</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,04</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,041</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,32</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,045</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,60</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,038</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,88</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,025</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,16</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,005</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,06</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,037</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,34</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,045</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,62</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,042</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,90</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,031</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,18</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,013</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,08</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,032</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,36</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,043</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,64</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,043</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,92</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,036</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,20</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,021</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,10</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,026</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,38</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,040</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,66</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,043</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,94</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,041</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,22</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,028</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,12</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,018</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,40</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,035</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,68</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,043</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,96</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,043</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,24</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,035</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,14</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,010</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,42</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,029</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,70</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,040</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,98</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,044</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,26</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,040</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,16</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,002</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,44</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,022</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,72</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,036</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,00</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,044</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,28</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,042</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,18</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,006</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,46</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,014</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,74</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,031</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,02</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,042</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,30</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,043</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,20</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,016</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,48</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,005</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,76</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,025</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,04</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,039</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,32</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,043</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,22</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,024</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,50</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,004</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,78</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,004</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,06</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,034</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2"></td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2"></td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,24</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,031</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,52</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,012</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,80</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,009</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,08</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,028</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2"></td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2"></td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,26</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,036</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,54</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,020</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,82</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">-0,001</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">1,10</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2">0,021</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2"></td>
                      <td class="border border-pink-300 dark:border-pink-600 p-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <div class="text-center mb-4">
                <img src="/images/lesson1_graph.png" alt="Đồ thị tọa độ - thời gian của vật dao động trong thí nghiệm" class="w-full max-w-3xl mx-auto rounded-lg shadow-md" />
                <p class="text-sm italic text-gray-600 dark:text-gray-400 mt-3">▲ Hình 1.4. Đồ thị tọa độ - thời gian của vật dao động trong thí nghiệm</p>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500 mb-4">
              <div class="flex items-start gap-3">
                <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">❓</div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                    Câu hỏi 4: Nhận xét về hình dạng đồ thị tọa độ – thời gian của vật dao động trong Hình 1.4.
                  </p>
                  
                  <details class="mt-2">
                    <summary class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all mx-auto w-fit list-none">
                      <span>🔍</span>
                      <span>Xem đáp án</span>
                    </summary>
                    
                    <div class="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                      <p class="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Trả lời:</p>
                      <ul class="list-disc ml-5 space-y-1 text-xs text-gray-700 dark:text-gray-300">
                        <li>Đồ thị có dạng <strong>hình sin (hoặc cosin)</strong> - một đường cong tuần hoàn</li>
                        <li>Tọa độ của vật <strong>biến thiên theo chu kỳ</strong> theo thời gian</li>
                        <li>Đồ thị lặp lại sau mỗi khoảng thời gian nhất định (chu kỳ T ≈ 0,56s)</li>
                        <li>Biên độ dao động (giá trị cực đại) vào khoảng ±0,045m</li>
                        <li>Đây là đặc trưng của <strong>dao động điều hòa</strong></li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          `,
          notes: 'Thí nghiệm khảo sát giúp hiểu rõ quy luật dao động của vật.'
        },
        {
          id: 3,
          title: 'Li độ, biên độ, chu kì dao động, tần số dao động',
          type: 'defination',
          content: `
            <h2 class="text-2xl font-bold mb-4">LI ĐỘ, BIÊN ĐỘ, CHU KÌ DAO ĐỘNG, TẦN SỐ DAO ĐỘNG</h2>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <div class="text-center mb-4">
                <img src="/images/lesson1_oscillation.png" alt="Vị trí của vật nặng trong hệ con lắc lò xo tại các thời điểm khác nhau" class="w-full max-w-3xl mx-auto rounded-lg shadow-md" />
                <p class="text-sm italic text-gray-600 dark:text-gray-400 mt-3">▲ Hình 1.5. Vị trí của vật nặng trong hệ con lắc lò xo tại các thời điểm khác nhau</p>
              </div>
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-4">
                Hình 1.5 cho biết vị trí của vật nặng tại những thời điểm khác nhau trên đường đồ thị toạ độ –
                thời gian khi tiến hành thí nghiệm như bố trí trong Hình 1.3.
              </p>
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-4">
                Chọn hệ trục toạ độ Oxt như Hình 1.5, gốc thời gian được chọn vào lúc vật bắt đầu dao động,
                gốc toạ độ được chọn tại vị trí cân bằng của vật, chiều dương của trục toạ độ được chọn theo
                một chiều xác định, ví dụ thẳng đứng hướng lên.
              </p>
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-4">
                Toạ độ của vật tính từ vị trí cân bằng tại mỗi thời điểm được gọi là li độ x của vật dao động.
                Như vậy, li độ có thể có giá trị dương, âm hoặc bằng không.
              </p>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500 mb-6">
              <div class="flex items-start gap-3">
                <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">❓</div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                    Quan sát Hình 1.5 và chỉ ra những điểm:
                  </p>
                  <p class="text-sm text-gray-800 dark:text-gray-200 ml-3 mb-2">
                    a) Có tọa độ dương, âm hoặc bằng không.<br/>
                    b) Có khoảng cách đến vị trí cân bằng cực đại.<br/>
                    c) Gần nhau nhất ở cùng trạng thái chuyển động.
                  </p>
                  
                  <details class="mt-2">
                    <summary class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all mx-auto w-fit list-none">
                      <span>🔍</span>
                      <span>Xem đáp án</span>
                    </summary>
                    
                    <div class="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                      <p class="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Trả lời:</p>
                      <div class="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                        <p><strong>a) Điểm có tọa độ dương, âm hoặc bằng không:</strong></p>
                        <ul class="list-disc ml-5 space-y-1">
                          <li>Tọa độ dương: Các điểm phía dưới vị trí cân bằng O (ví dụ: điểm ở t=0,00s; t=0,04s)</li>
                          <li>Tọa độ âm: Các điểm phía trên vị trí cân bằng O (ví dụ: điểm ở t=0,30s; t=0,32s)</li>
                          <li>Tọa độ bằng 0: Điểm tại vị trí cân bằng O (ví dụ: điểm ở t=0,18s; t=0,82s)</li>
                        </ul>
                        
                        <p><strong>b) Điểm có khoảng cách đến vị trí cân bằng cực đại:</strong></p>
                        <ul class="list-disc ml-5 space-y-1">
                          <li>Điểm ở vị trí biên dương (t=0,00s) và biên âm (t=0,30s; t=0,32s)</li>
                          <li>Đây là các điểm có li độ cực đại (biên độ A ≈ 0,045m)</li>
                        </ul>
                        
                        <p><strong>c) Hai điểm gần nhau nhất ở cùng trạng thái chuyển động:</strong></p>
                        <ul class="list-disc ml-5 space-y-1">
                          <li>Các điểm liên tiếp trên đồ thị (cách nhau 0,02s) đều có cùng trạng thái chuyển động</li>
                          <li>Ví dụ: t=0,00s và t=0,02s (cùng chuyển động từ biên dương về vị trí cân bằng)</li>
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
                Trong quá trình dao động, vật nặng sẽ đến hai biên,
                dừng lại và đổi chiều chuyển động. Biên ứng với toạ độ
                dương được gọi là biên dương, biên còn lại là biên âm.
                Khi ở hai biên, li độ của vật dao động có độ lớn cực đại.
                Độ lớn cực đại của li độ được gọi là biên độ A của vật
                dao động. Biên độ dao động luôn có giá trị dương.
              </p>
            </div>
          `,
          notes: 'Li độ, biên độ, chu kì và tần số là các đại lượng đặc trưng của dao động điều hòa.'
        },
        {
          id: 4,
          title: 'Li độ, biên độ, chu kì dao động, tần số dao động',
          type: 'defination',
          content: `
            <h2 class="text-2xl font-bold mb-4">LI ĐỘ, BIÊN ĐỘ, CHU KÌ DAO ĐỘNG, TẦN SỐ DAO ĐỘNG</h2>
            
            <div class="bg-pink-100 dark:bg-pink-900/30 p-5 rounded-xl mb-6 border-l-4 border-pink-500">
              <div class="flex items-start gap-3">
                <div class="text-pink-600 dark:text-pink-300 text-2xl flex-shrink-0">⊙</div>
                <div>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
                    <strong>Li độ của vật dao động là tọa độ của vật mà gốc tọa độ được chọn trùng với vị trí cân bằng.</strong>
                  </p>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                    <strong>Biên độ là độ lớn cực đại của li độ.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
                Trong Hình 1.5, ta thấy tại các thời điểm t„, t, và t, vật nặng
                có cùng trạng thái chuyền động: đến biên âm và bắt đầu
                chuyền động đi lên. Khoảng thời gian ngắn nhất giữa hai
                lần vật có cùng trạng thái chuyển động được gọi là chu kì
                dao động T. Trong một chu kì dao động, vật hoàn thành
                được một dao động hay một chu trình dao động.
              </p>
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                Trên thực tế, người ta thường sử dụng thuật ngữ tần số
                dao động như là một đặc trưng của dao động để cho biết
                số dao động mà vật thực hiện trong một giây.
              </p>
            </div>

            <div class="bg-gradient-to-r from-pink-500 to-pink-400 dark:from-pink-700 dark:to-pink-600 p-6 rounded-xl mb-6 text-white">
              <div class="flex items-start gap-3">
                <div class="text-2xl flex-shrink-0">⊙</div>
                <div>
                  <p class="text-base leading-relaxed mb-3">
                    <strong>Chu kì dao động là khoảng thời gian để vật thực hiện được một dao động. Tần số dao động được xác định bởi số dao động mà vật thực hiện được trong một giây.</strong>
                  </p>
                  <div class="text-center">
                    <p class="text-2xl font-bold mt-3">$f = \\frac{1}{T}$</p>
                    <p class="text-sm mt-2">Trong hệ SI, chu kì có đơn vị là giây (s) và tần số có đơn vị là héc (Hz).</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500 mb-6">
              <div class="flex items-start gap-3">
                <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">❓</div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                    Một con ong mật đang bay tại chỗ trong không trung (Hình 1.6), đập cánh với tần số khoảng 300 Hz. Xác định số dao động mà cánh ong mật thực hiện trong 1 s và chu kì dao động của cánh ong.
                  </p>
                  
                  <details class="mt-2">
                    <summary class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all mx-auto w-fit list-none">
                      <span>🔍</span>
                      <span>Xem đáp án</span>
                    </summary>
                    
                    <div class="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                      <p class="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Trả lời:</p>
                      <div class="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                        <p><strong>Cho biết:</strong></p>
                        <ul class="list-disc ml-5 space-y-1">
                          <li>Tần số dao động: f = 300 Hz</li>
                        </ul>
                        
                        <p><strong>Tìm:</strong> Số dao động trong 1 s và chu kì dao động T</p>
                        
                        <p><strong>Giải:</strong></p>
                        <ul class="list-disc ml-5 space-y-1">
                          <li><strong>Số dao động trong 1 s:</strong> Theo định nghĩa, tần số là số dao động toàn phần thực hiện được trong một giây. Do đó, cánh ong mật thực hiện <strong>300 dao động</strong> trong 1 giây.</li>
                          <li><strong>Chu kì dao động:</strong> Mối liên hệ giữa chu kì và tần số: $T = \\frac{1}{f} = \\frac{1}{300} ≈ 0,0033$ s hoặc $T ≈ 3,3$ ms</li>
                        </ul>
                        
                        <p class="mt-2"><strong>Kết luận:</strong> Cánh ong mật thực hiện 300 dao động trong 1 giây và chu kì dao động là khoảng 0,0033 s (hay 3,3 ms).</p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mt-6 shadow-md">
              <div class="text-center mb-4">
                <img src="/images/lesson1_bee.png" alt="Ong mật bay tại chỗ trong không trung" class="w-full max-w-md mx-auto rounded-lg shadow-md" />
                <p class="text-sm italic text-gray-600 dark:text-gray-400 mt-3">▲ Hình 1.6. Ong mật bay tại chỗ trong không trung</p>
              </div>
            </div>

            <h2 class="text-2xl font-bold mb-4 mt-8">KHÁI NIỆM DAO ĐỘNG ĐIỀU HÒA</h2>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
                Khi lực cản trong quá trình dao động là không đáng kể, đồ
                thị toạ độ – thời gian, cũng chính là đồ thị li độ – thời gian,
                có dạng hình sin. Dao động có tính chất này được gọi là
                dao động điều hoà.
              </p>
            </div>

            <div class="bg-gradient-to-r from-pink-500 to-pink-400 dark:from-pink-700 dark:to-pink-600 p-6 rounded-xl mb-6 text-white">
              <div class="flex items-start gap-3">
                <div class="text-2xl flex-shrink-0">⊙</div>
                <div>
                  <p class="text-base leading-relaxed mb-3">
                    <strong>Dao động điều hoà là dao động tuần hoàn mà li độ
                      của vật dao động là một hàm cosin (hoặc sin) theo
                      thời gian.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          `,
        },
        {
          id: 5,
          title: 'Pha dao động, độ lệch pha, tần số góc',
          type: 'defination',
          content: `
            <h2 class="text-2xl font-bold mb-4">PHA DAO ĐỘNG, ĐỘ LỆCH PHA, TẦN SỐ GÓC</h2>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
                Tại mỗi thời điểm, trạng thái dao động (li độ và vận tốc) của
                vật được đặc trưng bởi một đại lượng, gọi là pha dao động $\\phi$.
                Pha dao động được đo bằng đơn vị của góc, là độ hoặc rad.
                Vật thực hiện một dao động tương ứng với pha dao động
                thay đổi một lượng 2$\\pi$ rad.
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
                Khi xét hai dao động cùng chu kì (cùng tần số), ta thường
                quan tâm đến đại lượng độ lệch pha giữa chúng.
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
                Ví dụ: Hai vật đang dao động có đồ thị li độ – thời gian được
                biểu diễn như Hình 1.7. Tại thời điểm t = 0, vật 1 đi qua
                vị trí cân bằng theo chiểu dương của trục toạ độ. Sau một
                khoảng thời gian ngắn nhất $\\Delta t$, vật 2 mới đạt được trạng
                thái tương tự. Ta nói hai dao động này lệch pha nhau một
                lượng $\\Delta \\phi$.
              </p>
            </div>

            <div class="bg-gradient-to-r from-pink-500 to-pink-400 dark:from-pink-700 dark:to-pink-600 p-6 rounded-xl mb-6 text-white">
              <div class="flex items-start gap-3">
                <div class="text-pink-600 dark:text-pink-300 text-2xl flex-shrink-0">⊙</div>
                <div>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
                    <strong>Pha dao động là một đại lượng đặc trung cho trạng thái của vật trong quá trình dao động. Độ lệch pha giữa hai dao động điều hòa cùng chu kì (cùng tần số) được xác định theo công thức:</strong>
                  </p>
                  <div class="text-center mt-3">
                    <p class="text-2xl font-bold">$\\Delta \\phi = 2\\pi \\frac{\\Delta t}{T}$</p>
                  </div>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-3">
                    Trong hệ SI, độ lệch pha có đơn vị là rad (rad) hoặc hẹc (Hz).
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
              <div class="flex items-start gap-3">
                <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">❓</div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                    Quan sát Hình 1.7, so sánh biên độ và li độ của hai dao động 1 và 2 tại mỗi thời điểm.
                  </p>
                  
                  <details class="mt-2">
                    <summary class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all mx-auto w-fit list-none">
                      <span>🔍</span>
                      <span>Xem đáp án</span>
                    </summary>
                    
                    <div class="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                      <p class="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Trả lời:</p>
                      <div class="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                        <p><strong>So sánh biên độ:</strong></p>
                        <ul class="list-disc ml-5 space-y-1">
                          <li>Cả hai dao động 1 và 2 đều có cùng <strong>biên độ A</strong> (độ lớn cực đại của li độ)</li>
                          <li>Biên độ không thay đổi theo thời gian và bằng nhau cho cả hai dao động</li>
                        </ul>
                        
                        <p><strong>So sánh li độ tại mỗi thời điểm:</strong></p>
                        <ul class="list-disc ml-5 space-y-1">
                          <li>Tại cùng một thời điểm, hai dao động có <strong>li độ khác nhau</strong></li>
                          <li>Khi dao động 1 đạt giá trị cực đại thì dao động 2 chưa đạt cực đại</li>
                          <li>Hai dao động <strong>lệch pha</strong> với nhau (dao động không đồng pha)</li>
                          <li>Dao động 2 bắt đầu muộn hơn dao động 1 một khoảng thời gian nhất định</li>
                        </ul>
                        
                        <p class="mt-2"><strong>Kết luận:</strong> Hai dao động có cùng biên độ nhưng khác li độ tại mỗi thời điểm do chúng lệch pha nhau.</p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mt-6 shadow-md">
              <div class="text-center mb-4">
                <img src="/images/lesson1_phase_diff.png" alt="Đồ thị li độ - thời gian của hai vật dao động điều hòa trong các trường hợp khác nhau" class="w-full max-w-3xl mx-auto rounded-lg shadow-md" />
                <p class="text-sm italic text-gray-600 dark:text-gray-400 mt-3">▲ Hình 1.7. Đồ thị li độ – thời gian
của hai vật dao động điều hoà</p>
              </div>
            </div>

            <div class="bg-gradient-to-r from-pink-500 to-pink-400 dark:from-pink-700 dark:to-pink-600 p-6 rounded-xl mb-6 text-white">
              <div class="flex items-start gap-3">
                <div class="text-pink-600 dark:text-pink-300 text-2xl flex-shrink-0">⊙</div>
                <div>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                    <strong>Tần số góc của dao động là đại lượng đặc trung cho tốc độ biến thiên của pha dao động. Đối với dao động điều hòa, tần số góc có giá trị không đổi và được xác định theo công thức:</strong>
                  </p>
                  <div class="text-center mt-3">
                    <p class="text-2xl font-bold">$\\omega = \\frac{\\Delta \\phi}{\\Delta t} = \\frac{2\\pi}{T}$</p>
                  </div>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mt-3">
                    Trong hệ SI, tần số góc có đơn vị là rad trên giây (rad/s).
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
                <div class="text-center mb-4">
                  <img src="/images/lesson1_phase_comparison.png" alt="Đồ thị li độ - thời gian của hai vật dao động điều hòa" class="w-full max-w-3xl mx-auto rounded-lg shadow-md" />
                  <p class="text-sm italic text-gray-600 dark:text-gray-400 mt-3">▲ Hình 1.8. Đồ thị li độ – thời gian của hai vật dao động điều hoà</p>
                </div>
              </div>

              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500 mb-6">
                <div class="flex items-start gap-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">❓</div>
                  <div class="flex-1">
                    <p class="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                      Quan sát đồ thị li độ - thời gian của hai vật dao động điều hòa được thể hiện trong Hình 1.8. Hãy xác định biên độ, chu kì, tần số và độ lệch pha của hai dao động.
                    </p>
                    
                    <details class="mt-2">
                      <summary class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all mx-auto w-fit list-none">
                        <span>🔍</span>
                        <span>Xem đáp án</span>
                      </summary>
                      
                      <div class="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <p class="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Trả lời:</p>
                        <div class="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                          <p><strong>Dao động 1 (đường màu xanh):</strong></p>
                          <ul class="list-disc ml-5 space-y-1">
                            <li>Biên độ: $A_1 = 10$ cm</li>
                            <li>Chu kì: $T_1 = 1$ s (thời gian thực hiện 1 dao động toàn phần)</li>
                            <li>Tần số: $f_1 = \\frac{1}{T_1} = \\frac{1}{1} = 1$ Hz</li>
                          </ul>
                          
                          <p><strong>Dao động 2 (đường màu đỏ):</strong></p>
                          <ul class="list-disc ml-5 space-y-1">
                            <li>Biên độ: $A_2 = 10$ cm</li>
                            <li>Chu kì: $T_2 = 1$ s</li>
                            <li>Tần số: $f_2 = \\frac{1}{T_2} = \\frac{1}{1} = 1$ Hz</li>
                          </ul>
                          
                          <p><strong>Độ lệch pha:</strong></p>
                          <ul class="list-disc ml-5 space-y-1">
                            <li>Dao động 2 đạt cực đại sau dao động 1 một khoảng thời gian $\\Delta t = 0.5$ s</li>
                            <li>Độ lệch pha: $\\Delta\\varphi = \\frac{2\\pi \\Delta t}{T} = \\frac{2\\pi \\times 0.5}{1} = \\pi$ rad (hay 180°)</li>
                            <li>Dao động 2 lệch pha $\\pi$ rad so với dao động 1</li>
                          </ul>
                          
                          <p class="mt-2"><strong>Kết luận:</strong> Hai dao động có cùng biên độ 10 cm, cùng chu kì 1 s, cùng tần số 1 Hz nhưng lệch pha nhau $\\pi$ rad.</p>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          `,
          notes: 'Pha dao động, độ lệch pha và tần số góc là các khái niệm quan trọng để mô tả dao động điều hòa.'
        },
        {
          id: 6,
          title: 'Mối liên hệ giữa dao động điều hòa và chuyển động tròn đều',
          type: 'relation',
          content: `
            <h2 class="text-2xl font-bold mb-4">MỐI LIÊN HỆ GIỮA DAO ĐỘNG ĐIỀU HÒA VÀ CHUYỂN ĐỘNG TRÒN ĐỀU</h2>
            
            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl mb-6">
              <div class="flex items-start gap-3">
                <div class="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">⊕</div>
                <div>
                  <h3 class="font-bold text-purple-800 dark:text-purple-200 mb-3 text-lg">Mối liên hệ giữa dao động điều hòa và chuyển động tròn đều</h3>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-4">
                    Xét một quả cầu được gắn cố định vào một vành của một quả cầu chuyển động tròn đều trên mặt phẳng thẳng đứng. Khi chiếu ánh sáng từ trường, ta thấy bóng có phương song song với đường thẳng đi qua tâm của chuyển động tròn và nằm trong mặt phẳng quỹ đạo, biểu thị của dao động bằng hình chiếu của một chuyển động tròn đều lên một đường thẳng đi qua tâm của chuyển động tròn đều.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-5 rounded-xl mb-6 shadow-md">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="text-center">
                  <img src="/images/lesson1_circular_motion.png" alt="Hình chiếu của một quả cầu chuyển động tròn đều lên mặt phẳng nằm ngang" class="w-full max-w-md mx-auto rounded-lg shadow-md" />
                  <p class="text-sm italic text-gray-600 dark:text-gray-400 mt-3">▲ Hình 1.11. Hình chiếu của một quả cầu chuyển động tròn đều lên mặt phẳng nằm ngang</p>
                </div>
                <div class="flex items-center">
                  <div>
                    <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
                      Khi quả cầu trong Hình 1.11 quay được một vòng, vector bán kính nối tâm của quả cầu và vật quét được một góc 2π rad, tương ứng với bóng của vật thực hiện được một dao động.
                    </p>
                    <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                      Bằng một số tính toán, ta rút ra được dao động điều hòa được xem như là hình chiếu của một chuyển động tròn đều lên một đường thẳng đi qua tâm của chuyển động tròn và nằm trong mặt phẳng quỹ đạo của nó.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-pink-100 dark:bg-pink-900/30 p-5 rounded-xl border-l-4 border-pink-500">
              <div class="flex items-start gap-3">
                <div class="text-pink-600 dark:text-pink-300 text-2xl flex-shrink-0">⊙</div>
                <div>
                  <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 text-center font-bold">
                    Dao động điều hòa được xem như là hình chiếu của chuyển động tròn đều lên một đường thẳng di qua tâm và nằm trong mặt phẳng quỹ đạo.
                  </p>
                </div>
              </div>
            </div>
          `,
          notes: 'Dao động điều hòa có mối liên hệ chặt chẽ với chuyển động tròn đều.'
        },
        {
          id: 7,
          title: 'Bảng tóm tắt và tổng kết bài học',
          type: 'summary',
          content: `
            <h2 class="text-2xl font-bold mb-4">SỰ TƯƠNG TỰ TRONG DAO ĐỘNG ĐIỀU HÒA VÀ CHUYỂN ĐỘNG TRÒN ĐỀU</h2>
            
            <div class="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-xl mb-6">
              <h3 class="text-lg font-bold text-center text-pink-800 dark:text-pink-200 mb-4">▼ Bảng 1.2. Sự tương tự trong dao động điều hòa và chuyển động tròn đều</h3>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-sm">
                  <thead>
                    <tr class="bg-pink-200 dark:bg-pink-800">
                      <th class="border border-pink-300 dark:border-pink-600 p-3 text-left">Kí hiệu</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-3 text-left">Dao động điều hòa</th>
                      <th class="border border-pink-300 dark:border-pink-600 p-3 text-left">Chuyển động tròn đều</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-800 dark:text-gray-200">
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-3 font-mono">x</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Li độ</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Tọa độ hình chiếu của vật trên trục tọa độ đi qua tâm và nằm trong mặt phẳng quỹ đạo</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-3 font-mono">A</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Biên độ</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Bán kính</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-3 font-mono">T</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Chu kì dao động</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Chu kì quay</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-3 font-mono">f</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Tần số dao động</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Tần số quay</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <td class="border border-pink-300 dark:border-pink-600 p-3 font-mono">ω</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Tần số góc</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Tốc độ góc</td>
                    </tr>
                    <tr class="bg-pink-50 dark:bg-pink-900/10">
                      <td class="border border-pink-300 dark:border-pink-600 p-3 font-mono">ωt + φ</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Pha dao động</td>
                      <td class="border border-pink-300 dark:border-pink-600 p-3">Tọa độ góc</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex justify-center my-8">
              <img src="/images/congrats.jpg" alt="Chúc mừng hoàn thành bài học!" class="w-40 h-40 object-contain" />
            </div>

            <div class="text-center mt-6">
              <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">🎉 Chúc mừng bạn đã hoàn thành bài học!</h3>
              <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">Hãy luyện tập các bài tập để củng cố kiến thức.</p>
            </div>
          `,
          notes: 'Tổng kết các khái niệm và công thức quan trọng về dao động điều hòa.'
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
        {
          id: 5,
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

require("dotenv").config({ path: ".env.local" });
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
