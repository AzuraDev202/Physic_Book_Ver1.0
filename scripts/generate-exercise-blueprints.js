async function generateExerciseBlueprints() {
    try {
        console.log('Generating exercise blueprints...');

        const fetch = (await import('node-fetch')).default;

        console.log('Deleting old exercise blueprints...');

        // Get all existing blueprints
        const getResponse = await fetch('http://localhost:3000/api/admin/exercise-blueprints', {
            headers: {
                'Authorization': `Bearer ${process.env.ADMIN_TOKEN || 'Bearer placeholder'}`
            }
        });

        if (getResponse.ok) {
            const getData = await getResponse.json();

            if (getData.success && getData.blueprints.length > 0) {
                for (const blueprint of getData.blueprints) {
                    const deleteResponse = await fetch(
                        `http://localhost:3000/api/admin/exercise-blueprints?id=${blueprint.id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${process.env.ADMIN_TOKEN || 'Bearer placeholder'}`
                            }
                        }
                    );

                    if (deleteResponse.ok) {
                        console.log(`✓ Deleted blueprint id=${blueprint.id}`);
                    } else {
                        console.error(`❌ Failed to delete blueprint id=${blueprint.id}`);
                    }
                }
                console.log('✓ All old blueprints deleted');
            } else {
                console.log('✓ No old blueprints to delete');
            }
        }

        // ---- BLUEPRINT TEMPLATES SPLIT BY LESSON ----
        const lesson1Templates = [
            // Bài tập tính toán
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động thực hiện được {n} dao động trong thời gian {t} giây. Tính tần số dao động của vật. (Hz, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '{n}/{t}',
                explanationTemplate: 'Tần số f = n/t = {n}/{t} = {result} Hz',
                variables: { n: { min: 10, max: 50, type: 'int' }, t: { min: 5, max: 25, type: 'int' } },
                category: 'Dạng 1.1'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động với tần số f = {f} Hz. Tính chu kì dao động của vật. (s, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '1/{f}',
                explanationTemplate: 'Chu kì T = 1/f = 1/{f} = {result} s',
                variables: { f: { min: 0.1, max: 5.0, type: 'float', decimals: 1 } },
                category: 'Dạng 1.2'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động với tần số {f} Hz. Trong thời gian {t} giây, vật thực hiện được bao nhiêu dao động toàn phần?',
                correctAnswerTemplate: '{f}*{t}',
                explanationTemplate: 'Số dao động n = f*t = {f}*{t} = {result}',
                variables: { f: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, t: { min: 5, max: 25, type: 'int' } },
                category: 'Dạng 1.3'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động với chu kì T = {T} giây. Từ thời điểm t₁ = {t1}s đến thời điểm t₂ = {t2}s, vật thực hiện được bao nhiêu dao động toàn phần?',
                correctAnswerTemplate: '({t2}-{t1})/{T}',
                explanationTemplate: 'Số dao động n = (t₂ - t₁)/T = ({t2}-{t1})/{T} = {result}',
                variables: { T: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, t1: { min: 0, max: 10, type: 'int' }, t2: { min: 10, max: 30, type: 'int' } },
                category: 'Dạng 1.4'
            },
            {
                type: 'calculation',
                questionTemplate: 'Hai vật dao động với tần số f₁ = {f1} Hz và f₂ = {f2} Hz. Trong thời gian vật thứ nhất thực hiện được {n1} dao động thì vật thứ hai thực hiện được bao nhiêu dao động toàn phần?',
                correctAnswerTemplate: '({f2}/{f1})*{n1}',
                explanationTemplate: 'Số dao động của vật 2: n₂ = (f₂/f₁)*n₁ = ({f2}/{f1})*{n1} = {result}',
                variables: { f1: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, f2: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, n1: { min: 10, max: 50, type: 'int' } },
                category: 'Dạng 1.5'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một dao động có tần số góc ω = {n}π rad/s. Tính tần số dao động của vật. (Hz, làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '{n}/2',
                explanationTemplate: 'f = ω/(2π) = (nπ)/(2π) = n/2 = {result} Hz',
                variables: { n: { min: 1, max: 10, type: 'int' } },
                category: 'Dạng 1.6'
            },
            {
                type: 'calculation',
                questionTemplate: 'Dao động thứ nhất có chu kì T₁ = {T1}s, dao động thứ hai có chu kì T₂ = {T2}s. Trong thời gian {t} giây, tổng số dao động của cả hai vật là bao nhiêu?',
                correctAnswerTemplate: '{t}/{T1} + {t}/{T2}',
                explanationTemplate: 'Tổng số dao động = t/T₁ + t/T₂ = {t}/{T1} + {t}/{T2} = {result}',
                variables: { T1: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, T2: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, t: { min: 5, max: 25, type: 'int' } },
                category: 'Dạng 1.7'
            },
            // Bài tập thực tế
            {
                type: 'calculation',
                questionTemplate: 'Bạn quan sát đồng hồ quả lắc treo tường, thấy quả lắc đi hết một lượt mất {T} giây. Hỏi trong {m} phút, quả lắc dao động được bao nhiêu lần?',
                correctAnswerTemplate: '{m}*60/{T}',
                explanationTemplate: 'Số dao động = {m}*60 / {T} = {result} dao động',
                variables: {
                    T: { min: 1, max: 3, type: 'float', decimals: 1 },
                    m: { min: 1, max: 3, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một dây đàn guitar rung với tần số {f} Hz. Tính chu kì dao động của dây đàn. (ms, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '(1/{f})*1000',
                explanationTemplate: 'T = 1/f = 1/{f} s = {result} ms',
                variables: {
                    f: { min: 200, max: 800, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Bạn đo nhịp tim trong {m} phút, đếm được {beats} nhịp. Tính tần số nhịp tim (Hz, làm tròn 2 chữ số thập phân).',
                correctAnswerTemplate: '{beats}/({m}*60)',
                explanationTemplate: 'f = số nhịp / thời gian = {beats}/({m}×60) = {result} Hz',
                variables: {
                    m: { min: 1, max: 2, type: 'int' },
                    beats: { min: 60, max: 120, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một con lắc lò xo dao động với tần số {f} Hz. Hỏi trong {t} giây, con lắc thực hiện được bao nhiêu dao động?',
                correctAnswerTemplate: '{f}*{t}',
                explanationTemplate: 'Số dao động N = f×t = {f}×{t} = {result}',
                variables: {
                    f: { min: 1, max: 5, type: 'int' },
                    t: { min: 3, max: 10, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Cánh muỗi rung với tần số {f} Hz. Tính thời gian để cánh muỗi vỗ 1 lần (ms, làm tròn 2 chữ số thập phân).',
                correctAnswerTemplate: '(1/{f})*1000',
                explanationTemplate: 'Chu kì T = 1/f = 1/{f} s = {result} ms',
                variables: {
                    f: { min: 300, max: 900, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một chiếc ô tô bị rung lắc cứ sau {T} giây thì lắc 1 lần. Nếu xe chạy trong {t} giây, nó rung lắc bao nhiêu lần?',
                correctAnswerTemplate: '{t}/{T}',
                explanationTemplate: 'Số lần dao động = thời gian / chu kì = {t}/{T} = {result}',
                variables: {
                    T: { min: 0.2, max: 1.0, type: 'float', decimals: 1 },
                    t: { min: 5, max: 30, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Sóng biển vỗ vào bờ cứ sau {T} giây lại có một ngọn sóng. Hỏi trong {t} giây có bao nhiêu ngọn sóng đánh vào bờ?',
                correctAnswerTemplate: '{t}/{T}',
                explanationTemplate: 'Số ngọn sóng = thời gian / chu kì = {t}/{T} = {result}',
                variables: {
                    T: { min: 1, max: 200, type: 'int' },
                    t: { min: 30, max: 120, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một tòa nhà chung cư cao tầng bị gió thổi làm rung nhẹ với tần số {f} Hz (người ở tầng cao cảm nhận được). Tính chu kì dao động của tòa nhà. (s)',
                correctAnswerTemplate: '1/{f}',
                explanationTemplate: 'T = 1/f = 1/{f} = {result} s. Tòa nhà hoàn thành 1 dao động mất {result} giây',
                variables: {
                    f: { min: 0.1, max: 1000.0, type: 'float', decimals: 1 }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Động cơ xe máy có piston chuyển động lên xuống {n} lần trong 1 phút khi đang chạy. Tính tần số dao động của piston (Hz).',
                correctAnswerTemplate: '{n}/60',
                explanationTemplate: 'f = số dao động / thời gian = {n}/60 = {result} Hz. Piston dao động {result} lần mỗi giây',
                variables: {
                    n: { min: 2000, max: 6000, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Lá cây trước nhà bạn bị gió thổi lay động với chu kì {T} giây. Trong {t} phút gió thổi liên tục, lá cây dao động được bao nhiêu lần?',
                correctAnswerTemplate: '({t}*60)/{T}',
                explanationTemplate: 'Số dao động = thời gian / chu kì = ({t}×60)/{T} = {result} dao động',
                variables: {
                    T: { min: 0.5, max: 1.5, type: 'float', decimals: 1 },
                    t: { min: 1, max: 5, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            // Bài tập lý thuyết
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động cơ học là gì?',
                correctAnswerTemplate: 'Chuyển động có giới hạn trong không gian quanh vị trí cân bằng',
                explanationTemplate: 'Dao động cơ học là chuyển động có giới hạn trong không gian của vật quanh vị trí cân bằng.',
                variables: {
                    optA: 'Chuyển động thẳng đều',
                    optB: 'Chuyển động có giới hạn trong không gian quanh vị trí cân bằng',
                    optC: 'Chuyển động tròn đều',
                    optD: 'Chuyển động rơi tự do'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động tuần hoàn là dao động mà:',
                correctAnswerTemplate: 'Trạng thái chuyển động lặp lại như cũ sau những khoảng thời gian bằng nhau',
                explanationTemplate: 'Dao động tuần hoàn là dao động mà trạng thái chuyển động được lặp lại như cũ theo chu kì.',
                variables: {
                    optA: 'Vật chuyển động theo quỹ đạo tròn',
                    optB: 'Trạng thái chuyển động lặp lại như cũ sau những khoảng thời gian bằng nhau',
                    optC: 'Vật dao động với biên độ không đổi',
                    optD: 'Vật chịu tác dụng của lực ma sát'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Chu kì dao động là gì?',
                correctAnswerTemplate: 'Khoảng thời gian để vật thực hiện một dao động toàn phần',
                explanationTemplate: 'Chu kì T là thời gian để vật thực hiện một dao động toàn phần.',
                variables: {
                    optA: 'Số dao động trong một giây',
                    optB: 'Khoảng thời gian để vật thực hiện một dao động toàn phần',
                    optC: 'Độ lệch cực đại của vật khỏi vị trí cân bằng',
                    optD: 'Tọa độ của vật tại một thời điểm'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Tần số dao động là gì?',
                correctAnswerTemplate: 'Số dao động vật thực hiện được trong một giây',
                explanationTemplate: 'Tần số f là số dao động vật thực hiện được trong một giây.',
                variables: {
                    optA: 'Khoảng thời gian giữa hai dao động liên tiếp',
                    optB: 'Số dao động vật thực hiện được trong một giây',
                    optC: 'Góc mà vật quét được trong một giây',
                    optD: 'Li độ của vật tại thời điểm ban đầu'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Mối quan hệ giữa chu kì và tần số là:',
                correctAnswerTemplate: 'T = 1/f',
                explanationTemplate: 'Chu kì và tần số có mối quan hệ nghịch đảo: T = 1/f.',
                variables: {
                    optA: 'T = 2πf',
                    optB: 'T = 1/f',
                    optC: 'T = f',
                    optD: 'T = 2f'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Biên độ dao động là gì?',
                correctAnswerTemplate: 'Độ lớn cực đại của li độ',
                explanationTemplate: 'Biên độ A là độ lớn cực đại của li độ.',
                variables: {
                    optA: 'Khoảng thời gian của một dao động',
                    optB: 'Độ lớn cực đại của li độ',
                    optC: 'Vận tốc cực đại của vật',
                    optD: 'Tần số của dao động'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Li độ là gì?',
                correctAnswerTemplate: 'Tọa độ xác định vị trí của vật dao động so với VTCB',
                explanationTemplate: 'Li độ là tọa độ của vật so với vị trí cân bằng.',
                variables: {
                    optA: 'Khoảng cách từ vật đến điểm xuất phát',
                    optB: 'Tọa độ xác định vị trí của vật dao động so với VTCB',
                    optC: 'Quãng đường vật đi được',
                    optD: 'Thời gian vật dao động'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động tự do là:',
                correctAnswerTemplate: 'Dao động chỉ chịu tác dụng của nội lực',
                explanationTemplate: 'Dao động tự do xảy ra chỉ do nội lực của hệ.',
                variables: {
                    optA: 'Dao động chỉ chịu tác dụng của nội lực',
                    optB: 'Dao động chịu tác dụng của ngoại lực tuần hoàn',
                    optC: 'Dao động có biên độ giảm dần',
                    optD: 'Dao động với tần số thay đổi'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong một dao động toàn phần, vật qua vị trí cân bằng mấy lần?',
                correctAnswerTemplate: '2 lần',
                explanationTemplate: 'Trong một chu kì, vật qua VTCB hai lần.',
                variables: {
                    optA: '1 lần',
                    optB: '2 lần',
                    optC: '3 lần',
                    optD: '4 lần'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Tần số góc ω có đơn vị là:',
                correctAnswerTemplate: 'rad/s',
                explanationTemplate: 'Tần số góc ω có đơn vị rad/s.',
                variables: {
                    optA: 'Hz',
                    optB: 's',
                    optC: 'rad/s',
                    optD: 'm/s'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Chiều dài quỹ đạo của dao động điều hòa là:',
                correctAnswerTemplate: '2A',
                explanationTemplate: 'Quãng đường từ biên âm đến biên dương là 2A.',
                variables: {
                    optA: 'A',
                    optB: '2A',
                    optC: '4A',
                    optD: 'πA'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động điều hòa, đại lượng nào sau đây KHÔNG thay đổi theo thời gian?',
                correctAnswerTemplate: 'Biên độ',
                explanationTemplate: 'Biên độ A là hằng số trong dao động điều hòa.',
                variables: {
                    optA: 'Li độ',
                    optB: 'Vận tốc',
                    optC: 'Biên độ',
                    optD: 'Pha dao động'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Khi nói về dao động tuần hoàn, phát biểu nào SAI?',
                correctAnswerTemplate: 'Mọi dao động tuần hoàn đều là dao động điều hòa',
                explanationTemplate: 'Không phải dao động tuần hoàn nào cũng là dao động điều hòa.',
                variables: {
                    optA: 'Dao động tuần hoàn có chu kì xác định',
                    optB: 'Trạng thái dao động lặp lại sau mỗi chu kì',
                    optC: 'Mọi dao động tuần hoàn đều là dao động điều hòa',
                    optD: 'Dao động tuần hoàn có tần số xác định'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Ví dụ nào sau đây KHÔNG phải là dao động cơ học?',
                correctAnswerTemplate: 'Dòng điện xoay chiều',
                explanationTemplate: 'Dòng điện xoay chiều là dao động điện từ, không phải cơ học.',
                variables: {
                    optA: 'Con lắc đồng hồ',
                    optB: 'Dây đàn guitar rung',
                    optC: 'Dòng điện xoay chiều',
                    optD: 'Lá cây rung trong gió'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động tắt dần là do:',
                correctAnswerTemplate: 'Lực ma sát',
                explanationTemplate: 'Ma sát làm hệ mất năng lượng → biên độ giảm.',
                variables: {
                    optA: 'Lực hướng tâm',
                    optB: 'Lực ma sát',
                    optC: 'Trọng lực',
                    optD: 'Lực đàn hồi'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Đơn vị của chu kì dao động là:',
                correctAnswerTemplate: 'Giây (s)',
                explanationTemplate: 'Chu kì T có đơn vị giây.',
                variables: {
                    optA: 'Héc (Hz)',
                    optB: 'Giây (s)',
                    optC: 'Radian (rad)',
                    optD: 'Mét (m)'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Nếu tần số dao động tăng gấp đôi thì chu kì sẽ:',
                correctAnswerTemplate: 'Giảm một nửa',
                explanationTemplate: 'T = 1/f nên f tăng 2 lần thì T giảm 2 lần.',
                variables: {
                    optA: 'Tăng gấp đôi',
                    optB: 'Giảm một nửa',
                    optC: 'Không đổi',
                    optD: 'Tăng gấp bốn'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Vật dao động điều hòa với chu kì T. Trong khoảng thời gian T/4, vật đi được quãng đường tối đa là:',
                correctAnswerTemplate: 'A',
                explanationTemplate: 'Nếu xuất phát từ VTCB thì đi tối đa đến biên A.',
                variables: {
                    optA: 'A/2',
                    optB: 'A',
                    optC: 'A√2',
                    optD: '2A'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Pha dao động cho biết:',
                correctAnswerTemplate: 'Trạng thái dao động tại một thời điểm',
                explanationTemplate: 'Pha xác định vị trí và chiều chuyển động tại thời điểm t.',
                variables: {
                    optA: 'Biên độ dao động',
                    optB: 'Trạng thái dao động tại một thời điểm',
                    optC: 'Tần số dao động',
                    optD: 'Chu kì dao động'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động điều hòa, vật đổi chiều chuyển động khi:',
                correctAnswerTemplate: 'Vật ở vị trí biên',
                explanationTemplate: 'Ở biên, vận tốc bằng 0 nên vật đổi chiều.',
                variables: {
                    optA: 'Vật qua VTCB',
                    optB: 'Vật ở vị trí biên',
                    optC: 'Vận tốc đạt cực đại',
                    optD: 'Gia tốc bằng 0'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            }

        ];

        const lesson2Templates = [
            // Bài tập tính toán
            {
                type: 'calculation',
                questionTemplate: 'Một vật DĐĐH có biên độ A = {A} cm, tần số góc ω = {omega} rad/s. Tính vận tốc cực đại. (cm/s)',
                correctAnswerTemplate: '{A}*{omega}',
                explanationTemplate: 'v_max = A*ω = {A}*{omega} = {result} cm/s',
                variables: { A: { min: 1, max: 20, type: 'int' }, omega: { min: 1, max: 10, type: 'float', decimals: 1 } },
                category: 'Dạng 2.1'
            },
            {
                type: 'calculation',
                questionTemplate: 'Vật dao động điều hòa với A = {A} cm, ω = {omega} rad/s. Tính gia tốc cực đại. (cm/s²)',
                correctAnswerTemplate: '{A}*{omega}*{omega}',
                explanationTemplate: 'a_max = A*ω² = {A}*{omega}² = {result} cm/s²',
                variables: { A: { min: 1, max: 20, type: 'int' }, omega: { min: 1, max: 10, type: 'float', decimals: 1 } },
                category: 'Dạng 2.2'
            },
            {
                type: 'calculation',
                questionTemplate: 'Vật dao động với ω = {omega} rad/s. Khi x = {x} cm thì v = {v} cm/s. Tìm biên độ A. (cm, làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: 'Math.sqrt({x}*{x} + ({v}/{omega})*({v}/{omega}))',
                explanationTemplate: 'A = sqrt(x² + (v/ω)²) = sqrt({x}² + ({v}/{omega})²) = {result} cm',
                variables: { omega: { min: 1, max: 10, type: 'float', decimals: 1 }, x: { min: -20, max: 20, type: 'int' }, v: { min: -50, max: 50, type: 'int' } },
                category: 'Dạng 2.3'
            },
            {
                type: 'calculation',
                questionTemplate: 'DĐĐH có A = {A} cm, ω = {omega} rad/s. Tính tốc độ khi vật ở x = {x} cm. (cm/s, làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '{omega}*Math.sqrt({A}*{A} - {x}*{x})',
                explanationTemplate: '|v| = ω*sqrt(A² - x²) = {omega}*sqrt({A}² - {x}²) = {result} cm/s',
                variables: { A: { min: 1, max: 20, type: 'int' }, omega: { min: 1, max: 10, type: 'float', decimals: 1 }, x: { min: -20, max: 20, type: 'int' } },
                category: 'Dạng 2.4'
            },
            {
                type: 'calculation',
                questionTemplate: 'Vật dao động với ω = {omega} rad/s. Tính độ lớn gia tốc tại x = {x} cm. (cm/s²)',
                correctAnswerTemplate: '{omega}*{omega}*Math.abs({x})',
                explanationTemplate: '|a| = ω²|x| = {omega}²*{x} = {result} cm/s²',
                variables: { omega: { min: 1, max: 10, type: 'float', decimals: 1 }, x: { min: 0, max: 20, type: 'int' } },
                category: 'Dạng 2.5'
            },
            {
                type: 'calculation',
                questionTemplate: 'Cho phương trình x = {A}cos({n}πt) cm. Tính vận tốc cực đại của vật. (cm/s, làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '{A}*{n}*3.1416',
                explanationTemplate: 'v_max = A ω = A n π ≈ {A}*{n}*3.14 = {result} cm/s',
                variables: { A: { min: 1, max: 20, type: 'int' }, n: { min: 1, max: 10, type: 'int' } },
                category: 'Dạng 2.6'
            },
            {
                type: 'calculation',
                questionTemplate: 'Vật dao động với A = {A} cm, f = {f} Hz. Tính gia tốc cực đại. (cm/s², làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '{A}*4*9.8696*{f}*{f}',
                explanationTemplate: 'a_max = 4 π² f² A ≈ 4*9.87*{f}²*{A} = {result} cm/s²',
                variables: { A: { min: 1, max: 20, type: 'int' }, f: { min: 0.1, max: 5.0, type: 'float', decimals: 1 } },
                category: 'Dạng 2.7'
            },
            // Bài tập thực tế
            {
                type: 'calculation',
                questionTemplate: 'Một cây cầu treo dao động với biên độ {A} cm và chu kì {T} giây. Tính vận tốc cực đại của dao động này. (cm/s, làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '{A} * 2 * Math.PI / {T}',
                explanationTemplate: 'v_max = Aω = A·2π/T = {A}×2π/{T} = {result} cm/s',
                variables: {
                    A: { min: 3, max: 10, type: 'int' },
                    T: { min: 2, max: 6, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một người ngồi trên xích đu dao động với biên độ {A} cm và tần số {f} Hz. Tính vận tốc cực đại. (cm/s, làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '2 * Math.PI * {f} * {A}',
                explanationTemplate: 'v_max = 2πfA = 2π×{f}×{A} = {result} cm/s',
                variables: {
                    A: { min: 5, max: 15, type: 'int' },
                    f: { min: 1, max: 3, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động điều hòa có vận tốc cực đại {v} cm/s và tần số góc ω = {w} rad/s. Tính biên độ dao động. (cm)',
                correctAnswerTemplate: '{v}/{w}',
                explanationTemplate: 'A = v_max/ω = {v}/{w} = {result} cm',
                variables: {
                    v: { min: 20, max: 100, type: 'int' },
                    w: { min: 5, max: 15, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động điều hòa có vận tốc cực đại {v} cm/s và tần số góc ω = {w} rad/s. Tính biên độ dao động. (cm)',
                correctAnswerTemplate: '{v}/{w}',
                explanationTemplate: 'A = v_max/ω = {v}/{w} = {result} cm',
                variables: {
                    v: { min: 50, max: 150, type: 'int' },
                    w: { min: 10, max: 25, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động điều hòa theo phương trình x = {A}cos({w}πt) (cm). Hỏi tại thời điểm t = {t} s, li độ bằng bao nhiêu? (cm)',
                correctAnswerTemplate: '{A}*Math.cos({w}*Math.PI*{t})',
                explanationTemplate: 'x = Acos(ωt) = {A}cos({w}π×{t}) = {result} cm',
                variables: {
                    A: { min: 5, max: 15, type: 'int' },
                    w: { min: 2, max: 6, type: 'int' },
                    t: { min: 0.1, max: 0.5, type: 'float', decimals: 2 }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động điều hòa có li độ {x} cm, vận tốc {v} cm/s và tần số góc ω = {w} rad/s. Tính biên độ dao động. (cm)',
                correctAnswerTemplate: 'Math.sqrt({x}*{x} + ({v}/{w})*({v}/{w}))',
                explanationTemplate: 'A = √(x² + v²/ω²) = √({x}² + {v}²/{w}²) = {result} cm',
                variables: {
                    x: { min: 1, max: 5, type: 'int' },
                    v: { min: 10, max: 60, type: 'int' },
                    w: { min: 5, max: 15, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động điều hòa có biên độ {A} cm và chu kì {T} s. Tính gia tốc cực đại. (cm/s², làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '{A} * Math.pow(2*Math.PI/{T}, 2)',
                explanationTemplate: 'a_max = A(2π/T)² = {A}×(2π/{T})² = {result} cm/s²',
                variables: {
                    A: { min: 1, max: 5, type: 'int' },
                    T: { min: 0.5, max: 3, type: 'float', decimals: 1 }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một thiết bị rung có tần số {f} Hz và biên độ {A} mm. Tính vận tốc cực đại. (cm/s, làm tròn 1 chữ số thập phân)',
                correctAnswerTemplate: '2*Math.PI*{f}*({A}/10)',
                explanationTemplate: 'v_max = 2πfA = 2π×{f}×{A}mm = {result} cm/s',
                variables: {
                    f: { min: 50, max: 300, type: 'int' },
                    A: { min: 1, max: 5, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một thiết bị y tế dao động với tần số {f} Hz, đo được vận tốc cực đại {v} cm/s. Tính biên độ dao động. (mm)',
                correctAnswerTemplate: '({v}/(2*Math.PI*{f}))*10',
                explanationTemplate: 'A = v_max/(2πf) = {v}/(2π×{f}) cm = {result} mm',
                variables: {
                    f: { min: 20, max: 80, type: 'int' },
                    v: { min: 5, max: 30, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một màng loa dao động với biên độ {A} mm và tần số {f} Hz. Tính gia tốc cực đại của màng loa. (m/s², làm tròn 0 chữ số thập phân)',
                correctAnswerTemplate: 'Math.pow(2*Math.PI*{f},2)*({A}/1000)',
                explanationTemplate: 'a_max = (2πf)²A = (2π×{f})²×{A}mm = {result} m/s²',
                variables: {
                    A: { min: 0.1, max: 1.0, type: 'float', decimals: 1 },
                    f: { min: 200, max: 2000, type: 'int' }
                },
                difficulty: 'advanced',
                category: 'Bài tập thực tế'
            },
            // Bài tập lý thuyết
            {
                type: 'multiple-choice',
                questionTemplate: 'Phương trình dao động điều hòa có dạng:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Phương trình dao động điều hòa: x = Acos(ωt + φ), trong đó A là biên độ, ω là tần số góc, φ là pha ban đầu.',
                variables: {
                    optA: 'x = At + B',
                    optB: 'x = Acos(ωt + φ)',
                    optC: 'x = Ae^(ωt)',
                    optD: 'x = A + Bsin(t)'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong phương trình x = Acos(ωt + φ), đại lượng (ωt + φ) là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Đại lượng (ωt + φ) được gọi là pha dao động, biểu thị trạng thái dao động tại thời điểm t.',
                variables: {
                    optA: 'Biên độ',
                    optB: 'Pha dao động',
                    optC: 'Li độ',
                    optD: 'Vận tốc'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Vận tốc trong dao động điều hòa có biểu thức:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Vận tốc v = x\' = -Aωsin(ωt + φ), nhanh pha hơn li độ π/2.',
                variables: {
                    optA: 'v = Aωsin(ωt + φ)',
                    optB: 'v = -Aωsin(ωt + φ)',
                    optC: 'v = Acos(ωt + φ)',
                    optD: 'v = -Acos(ωt + φ)'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Gia tốc trong dao động điều hòa có biểu thức:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Gia tốc a = v\' = -ω²x = -Aω²cos(ωt + φ), ngược pha với li độ.',
                variables: {
                    optA: 'a = Aω²cos(ωt + φ)',
                    optB: 'a = -Aω²cos(ωt + φ)',
                    optC: 'a = Aωsin(ωt + φ)',
                    optD: 'a = -Aωsin(ωt + φ)'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Vận tốc đạt cực đại khi:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Vận tốc đạt cực đại v_max = Aω khi vật qua vị trí cân bằng (x = 0).',
                variables: {
                    optA: 'x = A',
                    optB: 'x = 0',
                    optC: 'x = A/2',
                    optD: 'x = A√2'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Gia tốc đạt cực đại khi:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Gia tốc đạt cực đại a_max = ω²A khi vật ở vị trí biên (x = ±A).',
                variables: {
                    optA: 'x = 0',
                    optB: 'x = ±A',
                    optC: 'x = A/2',
                    optD: 'v = 0'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Pha ban đầu của dao động được xác định bởi:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Pha ban đầu φ được xác định bởi điều kiện ban đầu (vị trí và vận tốc tại t = 0).',
                variables: {
                    optA: 'Biên độ',
                    optB: 'Điều kiện ban đầu',
                    optC: 'Tần số',
                    optD: 'Chu kì'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Nếu tại t = 0, vật ở VTCB và chuyển động theo chiều dương thì φ =',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Tại t = 0: x = 0 và v > 0 → φ = -π/2.',
                variables: {
                    optA: '0',
                    optB: '-π/2',
                    optC: 'π/2',
                    optD: 'π'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Vận tốc và li độ trong dao động điều hòa có mối quan hệ:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Vận tốc nhanh pha hơn li độ một góc π/2 (vuông pha).',
                variables: {
                    optA: 'Cùng pha',
                    optB: 'Ngược pha',
                    optC: 'Lệch pha π/2',
                    optD: 'Lệch pha π/4'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Gia tốc và li độ trong dao động điều hòa có mối quan hệ:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Gia tốc ngược pha với li độ (lệch pha π), có công thức a = -ω²x.',
                variables: {
                    optA: 'Cùng pha',
                    optB: 'Ngược pha',
                    optC: 'Lệch pha π/2',
                    optD: 'Lệch pha π/4'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Đồ thị li độ - thời gian của dao động điều hòa là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Đồ thị x-t của dao động điều hòa là đường hình sin hoặc cosin.',
                variables: {
                    optA: 'Đường thẳng',
                    optB: 'Đường hình sin',
                    optC: 'Parabol',
                    optD: 'Hypebol'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Đồ thị vận tốc - li độ của dao động điều hòa là:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Đồ thị v-x là đường elip với phương trình: (x/A)² + (v/v_max)² = 1.',
                variables: {
                    optA: 'Đường thẳng',
                    optB: 'Đường tròn',
                    optC: 'Elip',
                    optD: 'Parabol'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động điều hòa, khi li độ tăng thì:',
                correctAnswerTemplate: '{optD}',
                explanationTemplate: 'Khi |x| tăng thì |v| giảm và |a| tăng theo công thức v² = ω²(A² - x²) và a = -ω²x.',
                variables: {
                    optA: 'Vận tốc tăng',
                    optB: 'Vận tốc giảm',
                    optC: 'Gia tốc tăng',
                    optD: 'Cả B và C đúng'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Pha dao động của hai vật dao động điều hòa cùng tần số lệch nhau π thì hai dao động:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Hai dao động lệch pha π là hai dao động ngược pha.',
                variables: {
                    optA: 'Cùng pha',
                    optB: 'Ngược pha',
                    optC: 'Vuông pha',
                    optD: 'Lệch pha π/4'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Công thức độc lập thời gian của dao động điều hòa là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Công thức độc lập thời gian: (x/A)² + (v/v_max)² = 1.',
                variables: {
                    optA: 'x² + v² = const',
                    optB: '(x/A)² + (v/v_max)² = 1',
                    optC: 'a = -ωv',
                    optD: 'x = At'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Tần số góc ω liên hệ với chu kì T theo công thức:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Tần số góc: ω = 2π/T = 2πf.',
                variables: {
                    optA: 'ω = T',
                    optB: 'ω = 2πT',
                    optC: 'ω = 2π/T',
                    optD: 'ω = T/(2π)'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Quỹ đạo chuyển động của vật dao động điều hòa là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Vật dao động điều hòa chuyển động qua lại trên một đoạn thẳng (quỹ đạo thẳng).',
                variables: {
                    optA: 'Đường tròn',
                    optB: 'Đường thẳng',
                    optC: 'Đường elip',
                    optD: 'Parabol'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong T/4, quãng đường vật đi được phụ thuộc vào:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Quãng đường trong T/4 phụ thuộc vào vị trí ban đầu của vật.',
                variables: {
                    optA: 'Chỉ phụ thuộc biên độ',
                    optB: 'Phụ thuộc vị trí ban đầu',
                    optC: 'Phụ thuộc tần số',
                    optD: 'Phụ thuộc pha ban đầu'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Vật dao động điều hòa với biên độ A. Tốc độ trung bình trong một chu kì là:',
                correctAnswerTemplate: '{optD}',
                explanationTemplate: 'Trong một chu kì, vật đi được quãng đường 4A trong thời gian T nên v_tb = 4A/T.',
                variables: {
                    optA: '0',
                    optB: 'Aω',
                    optC: '2A/T',
                    optD: '4A/T'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Biểu thức liên hệ giữa vận tốc và li độ là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Từ công thức độc lập thời gian: v = ±ω√(A² - x²).',
                variables: {
                    optA: 'v = ±ω√(x² - A²)',
                    optB: 'v = ±ω√(A² - x²)',
                    optC: 'v = ωx',
                    optD: 'v = -ωx'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            }
        ];

        const lesson3Templates = [
            // Bài tập tính toán
            {
                type: 'calculation',
                questionTemplate: 'Con lắc lò xo có k = {k} N/m, dao động với A = {A} cm. Tính cơ năng. (J, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '0.5*{k}*({A}/100)*({A}/100)',
                explanationTemplate: 'W = (1/2) k A² = 0.5*{k}*({A}/100)² = {result} J',
                variables: { k: { min: 10, max: 100, type: 'int' }, A: { min: 1, max: 20, type: 'int' } },
                category: 'Dạng 3.1'
            },
            {
                type: 'calculation',
                questionTemplate: 'Vật m = {m} kg dao động với ω = {omega} rad/s, A = {A} cm. Tính động năng cực đại. (J, làm tròn 3 chữ số thập phân)',
                correctAnswerTemplate: '0.5*{m}*{omega}*{omega}*({A}/100)*({A}/100)',
                explanationTemplate: 'Wđ_max = (1/2) m ω² A² = 0.5*{m}*{omega}²*({A}/100)² = {result} J',
                variables: { m: { min: 0.1, max: 2.0, type: 'float', decimals: 1 }, omega: { min: 1, max: 10, type: 'float', decimals: 1 }, A: { min: 1, max: 20, type: 'int' } },
                category: 'Dạng 3.2'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có W = {W} J, k = {k} N/m. Tính biên độ dao động. (cm, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '100*Math.sqrt(2*{W}/{k})',
                explanationTemplate: 'A = sqrt(2W/k) = sqrt(2*{W}/{k}) = {result} cm',
                variables: { W: { min: 0.01, max: 1.0, type: 'float', decimals: 2 }, k: { min: 10, max: 100, type: 'int' } },
                category: 'Dạng 3.3'
            },
            {
                type: 'calculation',
                questionTemplate: 'Vật dao động với A = {A} cm, k = {k} N/m. Tại x = {x} cm, động năng là? (J, làm tròn 3 chữ số thập phân)',
                correctAnswerTemplate: '0.5*{k}*(({A}/100)*({A}/100) - ({x}/100)*({x}/100))',
                explanationTemplate: 'Wđ = (1/2) k (A² - x²) = 0.5*{k}*(({A}/100)² - ({x}/100)²) = {result} J',
                variables: { A: { min: 1, max: 20, type: 'int' }, k: { min: 10, max: 100, type: 'int' }, x: { min: 0, max: 20, type: 'int' } },
                category: 'Dạng 3.4'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có A = {A} cm, k = {k} N/m. Tại x = {x} cm, thế năng là? (J, làm tròn 3 chữ số thập phân)',
                correctAnswerTemplate: '0.5*{k}*({x}/100)*({x}/100)',
                explanationTemplate: 'Wt = (1/2) k x² = 0.5*{k}*({x}/100)² = {result} J',
                variables: { A: { min: 1, max: 20, type: 'int' }, k: { min: 10, max: 100, type: 'int' }, x: { min: 0, max: 20, type: 'int' } },
                category: 'Dạng 3.5'
            },
            {
                type: 'calculation',
                questionTemplate: 'Vật dao động với W = {W} J. Khi Wđ = {n}Wt, động năng bằng? (J, làm tròn 3 chữ số thập phân)',
                correctAnswerTemplate: '{W}*{n}/({n}+1)',
                explanationTemplate: 'Wđ = W * n/(n+1) = {W}*{n}/({n}+1) = {result} J',
                variables: { W: { min: 0.01, max: 1.0, type: 'float', decimals: 2 }, n: { min: 0.1, max: 10.0, type: 'float', decimals: 1 } },
                category: 'Dạng 3.6'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có A = {A} cm. Khi Wđ = {n}Wt, li độ là? (cm, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '{A}*Math.sqrt({n}/({n}+1))',
                explanationTemplate: 'x = A sqrt(n/(n+1)) = {A}*sqrt({n}/({n}+1)) = {result} cm',
                variables: { A: { min: 1, max: 20, type: 'int' }, n: { min: 0.1, max: 10.0, type: 'float', decimals: 1 } },
                category: 'Dạng 3.7'
            },
            // Bài tập thực tế
            {
                type: 'calculation',
                questionTemplate: 'Một đồ chơi lò xo trẻ em có độ cứng k = {k} N/m, bạn kéo ra cho nó dao động với biên độ {A} cm. Tính năng lượng dao động của đồ chơi này. (J, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '0.5*{k}*({A}/100)**2',
                explanationTemplate: 'Cơ năng W = ½kA² = ½×{k}×({A}/100)² = {result} J',
                variables: {
                    k: { min: 80, max: 150, type: 'int' },
                    A: { min: 3, max: 8, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một quả bóng khối lượng {m} g treo trên dây cao su dao động với tần số góc {w} rad/s và biên độ {A} cm. Tính năng lượng dao động của quả bóng. (J, làm tròn 3 chữ số thập phân)',
                correctAnswerTemplate: '0.5*({m}/1000)*({w}**2)*({A}/100)**2',
                explanationTemplate: 'W = ½mω²A² = ½×({m}/1000)×{w}²×({A}/100)² = {result} J',
                variables: {
                    m: { min: 100, max: 400, type: 'int' },
                    w: { min: 5, max: 15, type: 'int' },
                    A: { min: 2, max: 6, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một con lắc lò xo đồ chơi có năng lượng dao động {W} J, lò xo có độ cứng k = {k} N/m. Tính biên độ dao động của con lắc. (cm, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: 'sqrt(2*{W}/{k})*100',
                explanationTemplate: 'A = √(2W/k) = √(2×{W}/{k}) m = {result} cm',
                variables: {
                    W: { min: 0.01, max: 0.05, type: 'float', decimals: 2 },
                    k: { min: 50, max: 120, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động với biên độ {A} cm. Khi vật ở vị trí cách vị trí cân bằng {x} cm, hỏi động năng chiếm bao nhiêu % cơ năng?',
                correctAnswerTemplate: '(1-({x}/{A})**2)*100',
                explanationTemplate: 'Wt/W = x²/A² ⇒ Wđ = W - Wt = (1 − x²/A²)W ⇒ %Wđ = (1 − ({x}/{A})²)×100% = {result}%',
                variables: {
                    A: { min: 4, max: 10, type: 'int' },
                    x: { min: 1, max: 8, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một con lắc lò xo có khối lượng {m} kg, độ cứng k = {k} N/m dao động với biên độ {A} cm. Tính vận tốc cực đại của con lắc. (cm/s)',
                correctAnswerTemplate: 'sqrt({k}/{m})*({A})',
                explanationTemplate: 'ω = √(k/m), v_max = ωA = √({k}/{m})×{A} = {result} cm/s',
                variables: {
                    m: { min: 0.2, max: 1.0, type: 'float', decimals: 1 },
                    k: { min: 100, max: 300, type: 'int' },
                    A: { min: 1, max: 5, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một vật dao động với cơ năng {W} J. Tại một vị trí, động năng gấp 3 lần thế năng. Tính động năng tại vị trí đó. (J, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '3*{W}/4',
                explanationTemplate: 'W = Wđ + Wt = 3Wt + Wt = 4Wt ⇒ Wđ = 3W/4 = {result} J',
                variables: {
                    W: { min: 0.04, max: 0.2, type: 'float', decimals: 2 }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một cái xích đu tại công viên có biên độ dao động {A} cm theo phương ngang. Tại vị trí động năng bằng thế năng, xích đu cách vị trí cân bằng bao nhiêu? (cm, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '{A}/sqrt(2)',
                explanationTemplate: 'Khi Wđ = Wt ⇒ x = A/√2 = {A}/√2 = {result} cm',
                variables: {
                    A: { min: 5, max: 15, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một quả lắc đồng hồ dao động với tần số {f} Hz, khối lượng quả lắc {m} g, biên độ dao động {A} cm. Tính cơ năng của quả lắc. (J, làm tròn 3 chữ số thập phân)',
                correctAnswerTemplate: '0.5*({m}/1000)*(2*Math.PI*{f})**2*({A}/100)**2',
                explanationTemplate: 'ω = 2πf ⇒ W = ½mω²A² = ½×({m}/1000)×(2π{f})²×({A}/100)² = {result} J',
                variables: {
                    f: { min: 1, max: 6, type: 'int' },
                    m: { min: 200, max: 600, type: 'int' },
                    A: { min: 1, max: 4, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một con lắc lò xo có cơ năng {W} J. Khi vật ở vị trí x = {x} cm có thế năng {Wt} J. Tính biên độ dao động của con lắc. (cm, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '{x}*sqrt({W}/{Wt})',
                explanationTemplate: 'Wt/W = x²/A² ⇒ A = x√(W/Wt) = {x}√({W}/{Wt}) = {result} cm',
                variables: {
                    W: { min: 0.05, max: 0.2, type: 'float', decimals: 2 },
                    Wt: { min: 0.02, max: 0.15, type: 'float', decimals: 3 },
                    x: { min: 2, max: 6, type: 'int' }
                },
                difficulty: 'advanced',
                category: 'Bài tập thực tế'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Một chiếc đu quay tại khu vui chơi dao động nhẹ. Khi ở vị trí cao nhất (biên), năng lượng chủ yếu là thế năng. Khi qua vị trí thấp nhất, năng lượng chủ yếu là gì?',
                correctAnswerTemplate: '`Động năng`',
                explanationTemplate: 'Ở vị trí cân bằng, thế năng nhỏ nhất nên gần như toàn bộ cơ năng là động năng.',
                variables: {},
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            // Bài tập lý thuyết
            {
                type: 'multiple-choice',
                questionTemplate: 'Năng lượng của dao động điều hòa gồm:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Năng lượng dao động điều hòa bao gồm động năng và thế năng, tổng của chúng là cơ năng không đổi.',
                variables: {
                    optA: 'Chỉ có động năng',
                    optB: 'Chỉ có thế năng',
                    optC: 'Động năng và thế năng',
                    optD: 'Cơ năng và nhiệt năng'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Cơ năng của dao động điều hòa:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Cơ năng của dao động điều hòa luôn được bảo toàn, không thay đổi theo thời gian.',
                variables: {
                    optA: 'Biến thiên tuần hoàn theo thời gian',
                    optB: 'Không đổi theo thời gian',
                    optC: 'Tỉ lệ với biên độ',
                    optD: 'Bằng động năng cực đại'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Động năng của vật dao động điều hòa đạt cực đại khi:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Động năng cực đại khi vật qua VTCB (x=0), lúc này vận tốc đạt cực đại.',
                variables: {
                    optA: 'Vật ở vị trí biên',
                    optB: 'Vật qua VTCB',
                    optC: 'Vận tốc bằng 0',
                    optD: 'Li độ cực đại'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Thế năng của vật dao động điều hòa đạt cực đại khi:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Thế năng cực đại khi vật ở vị trí biên (|x|=A), lúc này li độ cực đại và vận tốc bằng 0.',
                variables: {
                    optA: 'Vật qua VTCB',
                    optB: 'Vật ở vị trí biên',
                    optC: 'Vận tốc cực đại',
                    optD: 'Gia tốc bằng 0'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Công thức tính động năng của dao động điều hòa:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Động năng Wđ = ½mv², trong đó m là khối lượng, v là vận tốc tại thời điểm đó.',
                variables: {
                    optA: 'Wđ = ½mv²',
                    optB: 'Wđ = ½kx²',
                    optC: 'Wđ = mgh',
                    optD: 'Wđ = ½mω²A²'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Công thức tính thế năng của con lắc lò xo:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Thế năng đàn hồi Wt = ½kx², trong đó k là độ cứng lò xo, x là độ biến dạng.',
                variables: {
                    optA: 'Wt = ½mv²',
                    optB: 'Wt = ½kx²',
                    optC: 'Wt = mgh',
                    optD: 'Wt = ½mω²v²'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Cơ năng của con lắc lò xo dao động điều hòa:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Cơ năng W = Wđ + Wt = ½kA² = ½mω²A² = const, chỉ phụ thuộc biên độ.',
                variables: {
                    optA: 'W = ½mv²',
                    optB: 'W = ½kx²',
                    optC: 'W = ½kA²',
                    optD: 'W = ½mω²'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Khi vật qua VTCB thì:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Tại VTCB: x=0 nên Wt=0, và v=vmax nên Wđ=W (cực đại).',
                variables: {
                    optA: 'Wđ = 0, Wt = W',
                    optB: 'Wđ = W, Wt = 0',
                    optC: 'Wđ = Wt',
                    optD: 'Wđ = 2Wt'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Tại vị trí biên thì:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Tại biên: v=0 nên Wđ=0, và |x|=A nên Wt=W (cực đại).',
                variables: {
                    optA: 'Wđ = W, Wt = 0',
                    optB: 'Wđ = 0, Wt = W',
                    optC: 'Wđ = Wt',
                    optD: 'W = 0'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Động năng và thế năng biến thiên với tần số:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Động năng và thế năng biến thiên với tần số gấp đôi tần số dao động (2f).',
                variables: {
                    optA: 'f',
                    optB: 'f/2',
                    optC: '2f',
                    optD: '4f'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong một chu kì, số lần động năng bằng thế năng là:',
                correctAnswerTemplate: '{optD}',
                explanationTemplate: 'Trong một chu kì, động năng bằng thế năng 4 lần (mỗi nửa chu kì có 2 lần).',
                variables: {
                    optA: '1',
                    optB: '2',
                    optC: '3',
                    optD: '4'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Khi Wđ = Wt thì:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Khi Wđ = Wt = W/2, ta có ½kx² = ½×½kA², suy ra x = ±A/√2.',
                variables: {
                    optA: 'x = 0',
                    optB: 'x = A',
                    optC: 'x = ±A/√2',
                    optD: 'x = ±A/2'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Nếu biên độ tăng gấp đôi thì cơ năng:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Cơ năng W ~ A², nên A tăng 2 lần thì W tăng 4 lần.',
                variables: {
                    optA: 'Tăng 2 lần',
                    optB: 'Tăng 4 lần',
                    optC: 'Tăng √2 lần',
                    optD: 'Không đổi'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Đơn vị của cơ năng trong dao động điều hòa là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Cơ năng có đơn vị là Jun (J), là đơn vị của năng lượng.',
                variables: {
                    optA: 'N',
                    optB: 'J',
                    optC: 'W',
                    optD: 'Hz'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Cơ năng tỉ lệ thuận với:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Cơ năng W = ½kA² = ½mω²A², tỉ lệ với bình phương biên độ.',
                variables: {
                    optA: 'Biên độ A',
                    optB: 'Bình phương biên độ A²',
                    optC: 'Căn bậc hai biên độ √A',
                    optD: 'Lập phương biên độ A³'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Khi Wđ = 3Wt thì:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'W = Wđ + Wt = 4Wt, mà W = ½kA² và Wt = ½kx², suy ra x² = A²/4, nên x = A/2.',
                variables: {
                    optA: 'x = A/2',
                    optB: 'x = A/√2',
                    optC: 'x = A/4',
                    optD: 'x = A'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Vận tốc của vật khi qua vị trí có Wđ = Wt:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Khi Wđ = Wt = W/2, ta có ½mv² = ½×½mω²A², suy ra v = ωA/√2 = vmax/√2.',
                variables: {
                    optA: 'v = 0',
                    optB: 'v = vmax',
                    optC: 'v = vmax/√2',
                    optD: 'v = vmax/2'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Chu kì biến thiên của động năng là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Động năng biến thiên với chu kì T/2, tức tần số gấp đôi tần số dao động.',
                variables: {
                    optA: 'T',
                    optB: 'T/2',
                    optC: '2T',
                    optD: 'T/4'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Tại vị trí nào thì động năng bằng 3 lần thế năng?',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Wđ = 3Wt và W = 4Wt ⇒ x² = A²/4 ⇒ x = A/2.',
                variables: {
                    optA: 'x = A',
                    optB: 'x = A/2',
                    optC: 'x = A/√2',
                    optD: 'x = ±A√3/2'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động điều hòa, đại lượng nào sau đây không đổi?',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Cơ năng là đại lượng bảo toàn trong dao động điều hòa (không ma sát).',
                variables: {
                    optA: 'Động năng',
                    optB: 'Thế năng',
                    optC: 'Cơ năng',
                    optD: 'Vận tốc'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            }
        ];

        const lesson4Templates = [
            // Bài tập tính toán
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có A₀ = {A0} cm, sau {t} chu kì biên độ còn {A} cm. Tính độ giảm biên độ mỗi chu kì. (cm, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: '({A0}-{A})/{t}',
                explanationTemplate: 'Độ giảm/chu kì = (A₀ - A)/t = ({A0}-{A})/{t} = {result} cm',
                variables: { A0: { min: 10, max: 50, type: 'int' }, A: { min: 1, max: 10, type: 'int' }, t: { min: 5, max: 20, type: 'int' } },
                category: 'Dạng 4.1'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có f₀ = {f0} Hz, chịu ngoại lực f = {f} Hz. Tần số dao động cưỡng bức là? (Hz)',
                correctAnswerTemplate: '{f}',
                explanationTemplate: 'Tần số dao động cưỡng bức bằng tần số ngoại lực f = {f} Hz',
                variables: { f0: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, f: { min: 0.1, max: 5.0, type: 'float', decimals: 1 } },
                category: 'Dạng 4.2'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có f₀ = {f0} Hz. Để xảy ra cộng hưởng, tần số ngoại lực phải bằng? (Hz)',
                correctAnswerTemplate: '{f0}',
                explanationTemplate: 'Cộng hưởng khi f = f₀ = {f0} Hz',
                variables: { f0: { min: 0.1, max: 5.0, type: 'float', decimals: 1 } },
                category: 'Dạng 4.3'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có m = {m} kg, k = {k} N/m. Tính tần số riêng. (Hz, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: 'Math.sqrt({k}/{m})/(2*3.1416)',
                explanationTemplate: 'f₀ = 1/(2π) sqrt(k/m) ≈ sqrt({k}/{m})/(2*3.14) = {result} Hz',
                variables: { m: { min: 0.1, max: 2.0, type: 'float', decimals: 1 }, k: { min: 10, max: 100, type: 'int' } },
                category: 'Dạng 4.4'
            },
            {
                type: 'calculation',
                questionTemplate: 'Dao động có |f - f₀| = {df} Hz, với f₀ = {f0} Hz. Nếu f > f₀, tính f. (Hz)',
                correctAnswerTemplate: '{f0} + {df}',
                explanationTemplate: 'f = f₀ + |f - f₀| = {f0} + {df} = {result} Hz',
                variables: { df: { min: 0.1, max: 2.0, type: 'float', decimals: 1 }, f0: { min: 0.1, max: 5.0, type: 'float', decimals: 1 } },
                category: 'Dạng 4.5'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có T = {T} s, mỗi chu kì mất {p}% năng lượng. Sau {n} chu kì, % năng lượng còn? (%, làm tròn đến hàng đơn vị)',
                correctAnswerTemplate: '100*Math.pow(1 - {p}/100, {n})',
                explanationTemplate: '% W còn = 100 * (1 - p/100)^n ≈ 100*(1 - {p}/100)^{n} = {result}%',
                variables: { T: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, p: { min: 1, max: 20, type: 'int' }, n: { min: 1, max: 10, type: 'int' } },
                category: 'Dạng 4.6'
            },
            {
                type: 'calculation',
                questionTemplate: 'Con lắc có A₀ = {A0} cm, sau {t} giây (T = {T} s) biên độ còn {A} cm. Tính số chu kì đã qua.',
                correctAnswerTemplate: '{t}/{T}',
                explanationTemplate: 'Số chu kì = t/T = {t}/{T} = {result}',
                variables: { A0: { min: 10, max: 50, type: 'int' }, t: { min: 5, max: 25, type: 'int' }, T: { min: 0.1, max: 5.0, type: 'float', decimals: 1 }, A: { min: 1, max: 10, type: 'int' } },
                category: 'Dạng 4.7'
            },
            // Bài tập thực tế
            {
                type: 'calculation',
                questionTemplate: 'Bạn chơi xích đu ở công viên, ban đầu xích đu lên cao {A1} m (biên độ ban đầu), sau {n1} chu kì thì chỉ còn lên cao {A2} m do ma sát không khí. Hỏi cần bao nhiêu chu kì nữa để biên độ giảm còn {A3} m?',
                correctAnswerTemplate: '{n1}',
                explanationTemplate: 'Giảm từ {A1}m → {A2}m mất {n1} chu kì. Giảm từ {A2}m → {A3}m cũng mất {n1} chu kì (giảm theo cùng quy luật). Vậy cần {result} chu kì.',
                variables: {
                    A1: { min: 1.5, max: 2.5, type: 'float', decimals: 1 },
                    A2: { min: 0.8, max: 1.2, type: 'float', decimals: 1 },
                    A3: { min: 0.4, max: 0.6, type: 'float', decimals: 1 },
                    n1: { min: 40, max: 60, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một chiếc cầu vượt bộ có tần số dao động tự nhiên {f0} Hz. Khi một đoàn người đi bộ với tần số bước chân {f} Hz đi qua cầu, hỏi cầu sẽ dao động với tần số nào? (Hz)',
                correctAnswerTemplate: '{f}',
                explanationTemplate: 'Đây là dao động cưỡng bức. Tần số dao động bằng tần số ngoại lực: f = {f} Hz',
                variables: {
                    f0: { min: 3, max: 7, type: 'int' },
                    f: { min: 2, max: 6, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một tòa nhà có tần số dao động riêng {f0} Hz. Để tránh cộng hưởng gây nguy hiểm khi động đất, tần số sóng địa chấn không nên bằng bao nhiêu? (Hz)',
                correctAnswerTemplate: '{f0}',
                explanationTemplate: 'Cộng hưởng xảy ra khi f = f₀. Do đó cần tránh f = {f0} Hz',
                variables: {
                    f0: { min: 1, max: 5, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Bạn đẩy xích đu cho em nhỏ, ban đầu xích đu lên cao {A1} cm. Sau {t} giây dao động tự do, biên độ giảm còn {A2} cm do ma sát. Tính tốc độ giảm biên độ trung bình. (cm/s)',
                correctAnswerTemplate: '({A1}-{A2})/{t}',
                explanationTemplate: 'Độ giảm trung bình = ({A1}-{A2})/{t} = {result} cm/s',
                variables: {
                    A1: { min: 6, max: 10, type: 'int' },
                    A2: { min: 1, max: 4, type: 'int' },
                    t: { min: 5, max: 15, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một con lắc lò xo đồ chơi có khối lượng {m} kg và lò xo có độ cứng {k} N/m. Tính tần số dao động tự nhiên của con lắc này. (Hz, làm tròn 2 chữ số thập phân)',
                correctAnswerTemplate: 'Math.sqrt({k}/{m})/(2*Math.PI)',
                explanationTemplate: 'f₀ = ω/(2π) = √(k/m)/(2π) = {result} Hz',
                variables: {
                    m: { min: 0.1, max: 0.5, type: 'float', decimals: 1 },
                    k: { min: 30, max: 80, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Khi máy giặt quay ở tần số {f1} Hz, quần áo rung với biên độ {A1} cm. Khi tăng lên tần số {f2} Hz (gần tần số cộng hưởng), biên độ tăng lên {A2} cm. Tính tỉ lệ A({f1})/A({f2}).',
                correctAnswerTemplate: '{A1}/{A2}',
                explanationTemplate: 'Tỉ lệ biên độ = {A1}/{A2} = {result}',
                variables: {
                    f1: { min: 2, max: 4, type: 'int' },
                    f2: { min: 3, max: 5, type: 'int' },
                    A1: { min: 3, max: 7, type: 'int' },
                    A2: { min: 9, max: 18, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một quả lắc đồng hồ treo tường ban đầu dao động với biên độ {A} cm. Sau 1 phút, do ma sát không khí, biên độ giảm còn {A2} cm. Nếu xu hướng giảm vẫn như vậy, sau 2 phút biên độ còn bao nhiêu? (cm)',
                correctAnswerTemplate: '{A2}/2',
                explanationTemplate: 'Mỗi phút giảm một nửa. Sau 2 phút: A = {A}/2/2 = {result} cm',
                variables: {
                    A: { min: 8, max: 12, type: 'int' },
                    A2: { min: 4, max: 6, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một chiếc xe đạp chạy trên đường, mỗi chu kì dao động xe mất {loss}% năng lượng. Sau {n} chu kì, xe còn lại bao nhiêu phần trăm năng lượng dao động? (%, làm tròn đến hàng đơn vị)',
                correctAnswerTemplate: 'Math.pow(1-{loss}/100,{n})*100',
                explanationTemplate: 'Sau mỗi chu kì còn (1−{loss}/100). Sau {n} chu kì còn {result}%',
                variables: {
                    loss: { min: 3, max: 7, type: 'int' },
                    n: { min: 10, max: 25, type: 'int' }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một tấm ván lướt sóng chuyển động với vận tốc {v} m/s, chịu lực cản nước Fc = {a}v (v tính bằng m/s). Tính công suất năng lượng bị tiêu hao do lực cản. (W, làm tròn 3 chữ số thập phân)',
                correctAnswerTemplate: '{a}*{v}*{v}',
                explanationTemplate: 'P = F·v = ({a}·{v})·{v} = {result} W',
                variables: {
                    v: { min: 0.1, max: 0.5, type: 'float', decimals: 1 },
                    a: { min: 0.05, max: 0.2, type: 'float', decimals: 2 }
                },
                difficulty: 'intermediate',
                category: 'Bài tập thực tế'
            },
            {
                type: 'calculation',
                questionTemplate: 'Một cây cầu treo có tần số dao động riêng {f0} Hz. Khi có xe tải đi qua với tần số {f} Hz, hỏi độ chênh lệch tần số giữa dao động riêng và dao động cưỡng bức là bao nhiêu? (Hz)',
                correctAnswerTemplate: 'Math.abs({f}-{f0})',
                explanationTemplate: 'Độ chênh lệch Δf = |f − f₀| = |{f}-{f0}| = {result} Hz',
                variables: {
                    f0: { min: 6, max: 12, type: 'int' },
                    f: { min: 5, max: 10, type: 'int' }
                },
                difficulty: 'basic',
                category: 'Bài tập thực tế'
            },
            // Bài tập lý thuyết
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động tắt dần là:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Dao động tắt dần là dao động có biên độ giảm dần theo thời gian do ma sát, lực cản.',
                variables: {
                    optA: 'Dao động có biên độ giảm dần',
                    optB: 'Dao động có chu kì tăng dần',
                    optC: 'Dao động không có ma sát',
                    optD: 'Dao động cưỡng bức'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Nguyên nhân của dao động tắt dần:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Dao động tắt dần do có lực ma sát, lực cản môi trường làm tiêu hao năng lượng.',
                variables: {
                    optA: 'Lực ma sát, lực cản',
                    optB: 'Ngoại lực không đổi',
                    optC: 'Biên độ quá lớn',
                    optD: 'Tần số quá cao'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động tắt dần:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Cơ năng giảm dần do năng lượng bị tiêu hao bởi lực cản, ma sát.',
                variables: {
                    optA: 'Cơ năng tăng',
                    optB: 'Cơ năng không đổi',
                    optC: 'Cơ năng giảm',
                    optD: 'Chu kì giảm'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động cưỡng bức là:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Dao động cưỡng bức là dao động chịu tác dụng của ngoại lực tuần hoàn (lực cưỡng bức).',
                variables: {
                    optA: 'Dao động dưới tác dụng của ngoại lực tuần hoàn',
                    optB: 'Dao động tự do',
                    optC: 'Dao động tắt dần',
                    optD: 'Dao động duy trì'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Tần số của dao động cưỡng bức bằng:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Dao động cưỡng bức có tần số bằng tần số của ngoại lực tuần hoàn tác dụng.',
                variables: {
                    optA: 'Tần số riêng',
                    optB: 'Tần số ngoại lực',
                    optC: 'Tổng hai tần số',
                    optD: 'Hiệu hai tần số'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Biên độ dao động cưỡng bức phụ thuộc vào:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Biên độ dao động cưỡng bức phụ thuộc vào độ chênh lệch giữa tần số riêng f₀ và tần số ngoại lực f.',
                variables: {
                    optA: 'Chỉ tần số riêng',
                    optB: 'Chỉ tần số ngoại lực',
                    optC: 'Hiệu số giữa tần số riêng và tần số ngoại lực',
                    optD: 'Tổng tần số'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Hiện tượng cộng hưởng xảy ra khi:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Cộng hưởng xảy ra khi tần số ngoại lực bằng tần số riêng của hệ (f = f₀).',
                variables: {
                    optA: 'f = f₀',
                    optB: 'f >> f₀',
                    optC: 'f << f₀',
                    optD: 'f = 2f₀'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Khi xảy ra cộng hưởng thì:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Khi xảy ra cộng hưởng, biên độ dao động đạt giá trị cực đại.',
                variables: {
                    optA: 'Biên độ cực tiểu',
                    optB: 'Biên độ cực đại',
                    optC: 'Biên độ bằng 0',
                    optD: 'Tần số thay đổi'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Để làm giảm tác hại của cộng hưởng, ta:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Tăng ma sát (lực cản) giúp giảm biên độ dao động, hạn chế tác hại của cộng hưởng.',
                variables: {
                    optA: 'Tăng ma sát',
                    optB: 'Giảm ma sát',
                    optC: 'Tăng biên độ',
                    optD: 'Tăng khối lượng'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động duy trì là:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Dao động duy trì là dao động được cung cấp năng lượng đúng lúc để bù lại phần năng lượng bị mất.',
                variables: {
                    optA: 'Dao động được bổ sung năng lượng đúng lúc',
                    optB: 'Dao động tự do',
                    optC: 'Dao động cưỡng bức',
                    optD: 'Dao động tắt dần'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động tắt dần, chu kì:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Chu kì (hoặc tần số) của dao động tắt dần gần như không đổi, chỉ biên độ giảm.',
                variables: {
                    optA: 'Tăng dần',
                    optB: 'Giảm dần',
                    optC: 'Gần như không đổi',
                    optD: 'Bằng 0'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Ứng dụng có lợi của cộng hưởng:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Cộng hưởng có lợi trong nhạc cụ (đàn guitar, đàn piano...) để khuếch đại âm thanh.',
                variables: {
                    optA: 'Phá hủy cầu',
                    optB: 'Động đất',
                    optC: 'Đàn guitar',
                    optD: 'Sập nhà'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Tác hại của cộng hưởng:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Cộng hưởng có thể gây đổ cầu, sập nhà khi biên độ dao động quá lớn do tần số ngoại lực trùng với tần số riêng.',
                variables: {
                    optA: 'Làm tăng âm thanh',
                    optB: 'Làm đổ cầu, nhà',
                    optC: 'Tiết kiệm năng lượng',
                    optD: 'Giảm biên độ'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động cưỡng bức, khi tần số ngoại lực xa tần số riêng thì:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Khi f xa f₀, biên độ dao động cưỡng bức nhỏ. Biên độ chỉ lớn khi f gần f₀.',
                variables: {
                    optA: 'Biên độ lớn',
                    optB: 'Biên độ nhỏ',
                    optC: 'Biên độ cực đại',
                    optD: 'Chu kì thay đổi'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Dao động tự do khác dao động cưỡng bức ở chỗ:',
                correctAnswerTemplate: '{optC}',
                explanationTemplate: 'Dao động tự do không có ngoại lực, dao động cưỡng bức có ngoại lực tuần hoàn tác dụng.',
                variables: {
                    optA: 'Tần số dao động',
                    optB: 'Biên độ dao động',
                    optC: 'Có ngoại lực tuần hoàn',
                    optD: 'Chu kì dao động'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Hiện tượng cộng hưởng có thể xảy ra với:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Cộng hưởng xảy ra khi dao động cưỡng bức có tần số ngoại lực bằng tần số riêng.',
                variables: {
                    optA: 'Dao động tắt dần',
                    optB: 'Dao động cưỡng bức',
                    optC: 'Dao động tự do',
                    optD: 'Dao động điều hòa'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Để dao động được duy trì, ta cần:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Dao động duy trì cần được bổ sung năng lượng đúng lúc, đúng pha để bù năng lượng mất mát.',
                variables: {
                    optA: 'Tăng ma sát',
                    optB: 'Bổ sung năng lượng đúng lúc',
                    optC: 'Giảm biên độ',
                    optD: 'Tăng lực cản'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Trong dao động tắt dần, đại lượng nào giảm dần?',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Trong dao động tắt dần, biên độ và cơ năng giảm dần do ma sát, lực cản.',
                variables: {
                    optA: 'Biên độ và cơ năng',
                    optB: 'Chu kì',
                    optC: 'Tần số',
                    optD: 'Khối lượng'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Biên độ dao động cộng hưởng phụ thuộc vào:',
                correctAnswerTemplate: '{optA}',
                explanationTemplate: 'Biên độ cộng hưởng càng lớn nếu lực cản càng nhỏ. Lực cản lớn làm giảm biên độ cộng hưởng.',
                variables: {
                    optA: 'Lực cản môi trường',
                    optB: 'Khối lượng vật',
                    optC: 'Tần số riêng',
                    optD: 'Biên độ ban đầu'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            },
            {
                type: 'multiple-choice',
                questionTemplate: 'Đơn vị của lực cản trong dao động tắt dần là:',
                correctAnswerTemplate: '{optB}',
                explanationTemplate: 'Lực cản có đơn vị là Newton (N), giống như các lực khác.',
                variables: {
                    optA: 'J',
                    optB: 'N',
                    optC: 'W',
                    optD: 'Hz'
                },
                difficulty: 'basic',
                category: 'Lý thuyết'
            }
        ];

        const lessons = [
            { id: '1', title: 'Mô tả dao động', templates: lesson1Templates },
            { id: '2', title: 'Phương trình dao động điều hoà', templates: lesson2Templates },
            { id: '3', title: 'Năng lượng trong dao động điều hoà', templates: lesson3Templates },
            { id: '4', title: 'Dao động tắt dần và cộng hưởng', templates: lesson4Templates }
        ];

        // ---- ID COUNTER ----
        let currentId = 1;

        for (const lesson of lessons) {
            console.log(`Creating blueprints for lesson ${lesson.id}: ${lesson.title}`);

            for (const template of lesson.templates) {
                const blueprintData = {
                    id: currentId++,
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    type: template.type,
                    questionTemplate: template.questionTemplate,
                    correctAnswerTemplate: template.correctAnswerTemplate,
                    explanationTemplate: template.explanationTemplate,
                    difficulty: template.difficulty || 'basic',
                    category: template.category,
                    variables: template.variables
                };

                const createResponse = await fetch(
                    'http://localhost:3000/api/admin/exercise-blueprints',
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${process.env.ADMIN_TOKEN || 'Bearer placeholder'}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(blueprintData)
                    }
                );

                if (createResponse.ok) {
                    console.log(`✓ Created blueprint id=${blueprintData.id} (${template.category})`);
                } else {
                    const err = await createResponse.text();
                    console.error(`❌ Failed to create blueprint id=${blueprintData.id}:`, err);
                }
            }
        }

        console.log('✓ Exercise blueprints generation completed!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

generateExerciseBlueprints();