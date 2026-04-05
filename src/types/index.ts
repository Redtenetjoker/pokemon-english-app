import type { Card } from 'ts-fsrs'

// ============================================
// Vocabulary Types
// ============================================

export interface VocabWord {
  id: string
  word: string
  meaning: string
  phonetic: string // syllable breakdown e.g. "c-a-t"
  pokemonId: number // PokeAPI Pokemon ID for sprite
  level: 'A' | 'B' | 'C' | 'D' | 'E' // RAZ level
}

// FSRS Card state stored in IndexedDB
export interface VocabCard extends Card {
  vocabId: string
}

// ============================================
// Pokemon Types
// ============================================

export interface Pokemon {
  id: number // PokeAPI id (1-151)
  name: string
  nameCn: string
  image: string // sprite URL
  xp: number
  level: number
  isNew: boolean
  collectedAt: number // timestamp
}

// ============================================
// Learning Session Types
// ============================================

export type SessionMode = 'short' | 'long'

export interface QuizQuestion {
  vocab: VocabWord
  options: string[] // 4 choices
  correctIndex: number
  mode?: 'en2cn' | 'cn2en' | 'mixed'
  questionText?: string
}

export type QuizPhase = 
  | 'select-mode'
  | 'playing'
  | 'session-complete'

export interface LearningState {
  phase: QuizPhase
  mode: SessionMode
  questions: QuizQuestion[]
  currentIndex: number
  correctCount: number
  wrongCount: number
  startTime: number
  earnedPokemon: Pokemon | null
}

export type LearningAction =
  | { type: 'START_SESSION'; mode: SessionMode; questions: QuizQuestion[] }
  | { type: 'ANSWER_CORRECT' }
  | { type: 'ANSWER_WRONG' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_SESSION'; pokemon: Pokemon }
  | { type: 'RESET' }

// ============================================
// Review Session Types
// ============================================

export interface ReviewState {
  dueCards: VocabCard[]
  currentIndex: number
  completed: number
  correctCount: number
}

// ============================================
// Progress Stats
// ============================================

export interface DailyProgress {
  date: string // YYYY-MM-DD
  shortSessions: number
  longSessions: number
  wordsLearned: number
  wordsReviewed: number
}

// ============================================
// App Navigation
// ============================================

export type AppView = 'home' | 'learning' | 'pets' | 'review' | 'parent'
