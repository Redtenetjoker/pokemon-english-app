import type { VocabWord } from '../types'

// RAZ Level A-C 基础词汇 MVP
// Each word has syllable breakdown for phonics practice
export const razWords: VocabWord[] = [
  // Level A
  { id: 'a1', word: 'apple', meaning: '苹果', phonetic: 'a-p-p-l-e', image: '🍎', level: 'A' },
  { id: 'a2', word: 'cat', meaning: '猫', phonetic: 'c-a-t', image: '🐱', level: 'A' },
  { id: 'a3', word: 'dog', meaning: '狗', phonetic: 'd-o-g', image: '🐕', level: 'A' },
  { id: 'a4', word: 'red', meaning: '红色', phonetic: 'r-e-d', image: '🔴', level: 'A' },
  { id: 'a5', word: 'blue', meaning: '蓝色', phonetic: 'b-l-u-e', image: '🔵', level: 'A' },
  { id: 'a6', word: 'sun', meaning: '太阳', phonetic: 's-u-n', image: '☀️', level: 'A' },
  { id: 'a7', word: 'moon', meaning: '月亮', phonetic: 'm-o-o-n', image: '🌙', level: 'A' },
  { id: 'a8', word: 'fish', meaning: '鱼', phonetic: 'f-i-s-h', image: '🐟', level: 'A' },
  { id: 'a9', word: 'bird', meaning: '鸟', phonetic: 'b-i-r-d', image: '🐦', level: 'A' },
  { id: 'a10', word: 'ball', meaning: '球', phonetic: 'b-a-l-l', image: '⚽', level: 'A' },
  { id: 'a11', word: 'book', meaning: '书', phonetic: 'b-o-o-k', image: '📚', level: 'A' },
  { id: 'a12', word: 'hand', meaning: '手', phonetic: 'h-a-n-d', image: '✋', level: 'A' },
  { id: 'a13', word: 'foot', meaning: '脚', phonetic: 'f-o-o-t', image: '🦶', level: 'A' },
  { id: 'a14', word: 'eye', meaning: '眼睛', phonetic: 'e-y-e', image: '👀', level: 'A' },
  { id: 'a15', word: 'nose', meaning: '鼻子', phonetic: 'n-o-s-e', image: '👃', level: 'A' },
  { id: 'a16', word: 'mouth', meaning: '嘴巴', phonetic: 'm-o-u-t-h', image: '👄', level: 'A' },
  { id: 'a17', word: 'tree', meaning: '树', phonetic: 't-r-e-e', image: '🌳', level: 'A' },
  { id: 'a18', word: 'flower', meaning: '花', phonetic: 'f-l-o-w-e-r', image: '🌸', level: 'A' },

  // Level B
  { id: 'b1', word: 'happy', meaning: '开心的', phonetic: 'h-a-p-p-y', image: '😊', level: 'B' },
  { id: 'b2', word: 'sad', meaning: '伤心的', phonetic: 's-a-d', image: '😢', level: 'B' },
  { id: 'b3', word: 'big', meaning: '大的', phonetic: 'b-i-g', image: '🐘', level: 'B' },
  { id: 'b4', word: 'small', meaning: '小的', phonetic: 's-m-a-l-l', image: '🐜', level: 'B' },
  { id: 'b5', word: 'hot', meaning: '热的', phonetic: 'h-o-t', image: '🔥', level: 'B' },
  { id: 'b6', word: 'cold', meaning: '冷的', phonetic: 'c-o-l-d', image: '❄️', level: 'B' },
  { id: 'b7', word: 'water', meaning: '水', phonetic: 'w-a-t-e-r', image: '💧', level: 'B' },
  { id: 'b8', word: 'milk', meaning: '牛奶', phonetic: 'm-i-l-k', image: '🥛', level: 'B' },
  { id: 'b9', word: 'cake', meaning: '蛋糕', phonetic: 'c-a-k-e', image: '🎂', level: 'B' },
  { id: 'b10', word: 'run', meaning: '跑', phonetic: 'r-u-n', image: '🏃', level: 'B' },
  { id: 'b11', word: 'jump', meaning: '跳', phonetic: 'j-u-m-p', image: '🦘', level: 'B' },
  { id: 'b12', word: 'walk', meaning: '走', phonetic: 'w-a-l-k', image: '🚶', level: 'B' },
  { id: 'b13', word: 'sleep', meaning: '睡觉', phonetic: 's-l-e-e-p', image: '😴', level: 'B' },
  { id: 'b14', word: 'eat', meaning: '吃', phonetic: 'e-a-t', image: '🍽️', level: 'B' },
  { id: 'b15', word: 'drink', meaning: '喝', phonetic: 'd-r-i-n-k', image: '🥤', level: 'B' },
  { id: 'b16', word: 'read', meaning: '读', phonetic: 'r-e-a-d', image: '📖', level: 'B' },
  { id: 'b17', word: 'write', meaning: '写', phonetic: 'w-r-i-t-e', image: '✏️', level: 'B' },
  { id: 'b18', word: 'draw', meaning: '画', phonetic: 'd-r-a-w', image: '🎨', level: 'B' },

  // Level C
  { id: 'c1', word: 'friend', meaning: '朋友', phonetic: 'f-r-i-e-n-d', image: '👫', level: 'C' },
  { id: 'c2', word: 'family', meaning: '家人', phonetic: 'f-a-m-i-l-y', image: '👨‍👩‍👧', level: 'C' },
  { id: 'c3', word: 'mother', meaning: '妈妈', phonetic: 'm-o-t-h-e-r', image: '👩', level: 'C' },
  { id: 'c4', word: 'father', meaning: '爸爸', phonetic: 'f-a-t-h-e-r', image: '👨', level: 'C' },
  { id: 'c5', word: 'sister', meaning: '姐妹', phonetic: 's-i-s-t-e-r', image: '👧', level: 'C' },
  { id: 'c6', word: 'brother', meaning: '兄弟', phonetic: 'b-r-o-t-h-e-r', image: '👦', level: 'C' },
  { id: 'c7', word: 'house', meaning: '房子', phonetic: 'h-o-u-s-e', image: '🏠', level: 'C' },
  { id: 'c8', word: 'school', meaning: '学校', phonetic: 's-c-h-o-o-l', image: '🏫', level: 'C' },
  { id: 'c9', word: 'garden', meaning: '花园', phonetic: 'g-a-r-d-e-n', image: '🌻', level: 'C' },
  { id: 'c10', word: 'river', meaning: '河流', phonetic: 'r-i-v-e-r', image: '🏞️', level: 'C' },
  { id: 'c11', word: 'mountain', meaning: '山', phonetic: 'm-o-u-n-t-a-i-n', image: '⛰️', level: 'C' },
  { id: 'c12', word: 'rainbow', meaning: '彩虹', phonetic: 'r-a-i-n-b-o-w', image: '🌈', level: 'C' },
  { id: 'c13', word: ' cookie', meaning: '饼干', phonetic: 'c-o-o-k-i-e', image: '🍪', level: 'C' },
  { id: 'c14', word: 'orange', meaning: '橙子', phonetic: 'o-r-a-n-g-e', image: '🍊', level: 'C' },
  { id: 'c15', word: 'banana', meaning: '香蕉', phonetic: 'b-a-n-a-n-a', image: '🍌', level: 'C' },
  { id: 'c16', word: 'strawberry', meaning: '草莓', phonetic: 's-t-r-a-w-b-e-r-r-y', image: '🍓', level: 'C' },
  { id: 'c17', word: 'play', meaning: '玩', phonetic: 'p-l-a-y', image: '🎮', level: 'C' },
  { id: 'c18', word: 'sing', meaning: '唱歌', phonetic: 's-i-n-g', image: '🎤', level: 'C' },
  { id: 'c19', word: 'dance', meaning: '跳舞', phonetic: 'd-a-n-c-e', image: '💃', level: 'C' },
  { id: 'c20', word: 'swim', meaning: '游泳', phonetic: 's-w-i-m', image: '🏊', level: 'C' },
]

export const getRandomWords = (count: number, excludeIds: string[] = []): VocabWord[] => {
  const available = razWords.filter(w => !excludeIds.includes(w.id))
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const getWordsByLevel = (level: 'A' | 'B' | 'C'): VocabWord[] => {
  return razWords.filter(w => w.level === level)
}
