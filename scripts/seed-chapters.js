const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const chapterSchema = new mongoose.Schema({
  id: String,
  title: String,
  subtitle: String,
  icon: String,
  content: String,
  sections: [{
    id: String,
    title: String,
    content: String,
    subsections: [{
      id: String,
      title: String,
      content: String,
    }]
  }],
  exercises: [{
    id: Number,
    title: String,
    question: String,
    solution: String,
    type: {
      type: String,
      enum: ['practice', 'quiz'],
      default: 'practice'
    }
  }],
  order: Number,
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);

const sampleChapters = [
  {
    id: 'dao-dong',
    title: 'Chương 1: Dao Động',
    subtitle: 'Dao động cơ và các hiện tượng liên quan',
    icon: '🌊',
    content: `# Chương 1: Dao Động

Chương này nghiên cứu về dao động cơ học, bao gồm các khái niệm cơ bản, phương trình dao động điều hòa, năng lượng và các hiện tượng đặc biệt.

## Nội dung chương:
1. Mô tả dao động
2. Phương trình dao động điều hoà
3. Năng lượng trong dao động điều hoà
4. Dao động tắt dần và hiện tượng cộng hưởng`,
    sections: [
      {
        id: 'lesson-1',
        title: 'Bài 1: Mô tả dao động',
        content: `Dao động cơ là chuyển động lặp lại quanh vị trí cân bằng.

**Các đại lượng đặc trưng:**
- Biên độ A (m)
- Chu kỳ T (s): T = t/n
- Tần số f (Hz): f = 1/T
- Tần số góc ω (rad/s): ω = 2πf`,
        subsections: []
      },
      {
        id: 'lesson-2',
        title: 'Bài 2: Phương trình dao động điều hoà',
        content: `**Li độ:** x = Acos(ωt + φ)

**Vận tốc:** v = -Aωsin(ωt + φ)

**Gia tốc:** a = -Aω²cos(ωt + φ) = -ω²x`,
        subsections: []
      },
      {
        id: 'lesson-3',
        title: 'Bài 3: Năng lượng trong dao động điều hoà',
        content: `**Động năng:** Wd = (1/2)mv²

**Thế năng:** Wt = (1/2)kx²

**Cơ năng:** W = Wd + Wt = (1/2)kA² = const`,
        subsections: []
      },
      {
        id: 'lesson-4',
        title: 'Bài 4: Dao động tắt dần và hiện tượng cộng hưởng',
        content: `**Dao động tắt dần:** Biên độ giảm dần do ma sát

**Dao động cưỡng bức:** Tần số = tần số ngoại lực

**Cộng hưởng:** Biên độ cực đại khi f = f₀`,
        subsections: []
      }
    ],
    exercises: [
      {
        id: 1,
        title: 'Bài tập 1',
        question: 'Vật thực hiện 20 dao động trong 10s. Tính chu kỳ và tần số.',
        solution: 'T = 10/20 = 0.5s; f = 1/0.5 = 2Hz',
        type: 'practice'
      },
      {
        id: 2,
        title: 'Bài tập 2',
        question: 'Vật dao động với A=5cm, f=2Hz, φ=π/3. Viết phương trình.',
        solution: 'ω = 4π rad/s; x = 5cos(4πt + π/3) cm',
        type: 'practice'
      },
      {
        id: 3,
        title: 'Bài tập 3',
        question: 'Con lắc k=100N/m, A=5cm. Tính cơ năng.',
        solution: 'W = (1/2)×100×(0.05)² = 0.125J',
        type: 'practice'
      },
      {
        id: 4,
        title: 'Bài tập 4',
        question: 'Hệ có f₀=5Hz. Tần số ngoại lực để cộng hưởng?',
        solution: 'ff = f₀ = 5Hz',
        type: 'practice'
      }
    ],
    order: 1,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

async function seedChapters() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing chapters
    await Chapter.deleteMany({});
    console.log('🗑️  Cleared existing chapters');

    // Insert sample chapters
    const result = await Chapter.insertMany(sampleChapters);
    console.log(`✅ Successfully created ${result.length} chapters:`);
    
    result.forEach(chapter => {
      console.log(`   - ${chapter.title} (${chapter.isPublished ? 'Published' : 'Draft'})`);
    });

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✅ Seeding completed!');
    
  } catch (error) {
    console.error('❌ Error seeding chapters:', error);
    process.exit(1);
  }
}

seedChapters();
