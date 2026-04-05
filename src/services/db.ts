import Dexie, { type Table } from 'dexie'

export interface StoredVocabCard {
  id: string // same as vocabId
  vocabId: string
  due: Date
  dueStr: string // YYYYMMDD string for indexing
  stability: number
  difficulty: number
  lapses: number
  reps: number
  state: number
  lastReview: Date | null
  nextReview: Date | null
}

export interface StoredPokemon {
  id: number
  name: string
  nameCn: string
  image: string
  xp: number
  level: number
  isNew: boolean
  collectedAt: number
}

export interface StoredDailyProgress {
  date: string // YYYY-MM-DD
  shortSessions: number
  longSessions: number
  wordsLearned: number
  wordsReviewed: number
}

class PokemonEnglishDB extends Dexie {
  pokemon!: Table<StoredPokemon, number>
  dailyProgress!: Table<StoredDailyProgress, string>
  vocabCards!: Table<StoredVocabCard, string>

  constructor() {
    super('PokemonEnglishDB')
    this.version(1).stores({
      pokemon: 'id, name, collectedAt',
      dailyProgress: 'date',
      vocabCards: 'id, vocabId, dueStr, state'
    })
  }
}

export const db = new PokemonEnglishDB()

// Pokemon helpers
export const getAllPokemon = async (): Promise<StoredPokemon[]> => {
  return db.pokemon.orderBy('collectedAt').reverse().toArray()
}

export const addPokemon = async (p: StoredPokemon): Promise<number> => {
  return db.pokemon.add(p)
}

export const updatePokemonXp = async (id: number, xpDelta: number): Promise<void> => {
  const p = await db.pokemon.get(id)
  if (p) {
    const newXp = p.xp + xpDelta
    const newLevel = Math.floor(newXp / 100) + 1
    await db.pokemon.update(id, { xp: newXp, level: newLevel })
  }
}

export const markPokemonNotNew = async (id: number): Promise<void> => {
  await db.pokemon.update(id, { isNew: false })
}

// Daily progress helpers
export const getTodayProgress = async (): Promise<StoredDailyProgress> => {
  const today = new Date().toISOString().split('T')[0]
  const existing = await db.dailyProgress.get(today)
  if (existing) return existing
  return {
    date: today,
    shortSessions: 0,
    longSessions: 0,
    wordsLearned: 0,
    wordsReviewed: 0
  }
}

export const incrementTodayProgress = async (
  type: 'shortSessions' | 'longSessions' | 'wordsLearned' | 'wordsReviewed'
): Promise<void> => {
  const today = new Date().toISOString().split('T')[0]
  const existing = await db.dailyProgress.get(today)
  if (existing) {
    await db.dailyProgress.update(today, { [type]: existing[type] + 1 })
  } else {
    const initial: StoredDailyProgress = {
      date: today,
      shortSessions: 0,
      longSessions: 0,
      wordsLearned: 0,
      wordsReviewed: 0,
      [type]: 1
    }
    await db.dailyProgress.add(initial)
  }
}

// Vocab card helpers (for FSRS)
export const getVocabCard = async (vocabId: string): Promise<StoredVocabCard | undefined> => {
  return db.vocabCards.get(vocabId)
}

export const saveVocabCard = async (card: StoredVocabCard): Promise<void> => {
  await db.vocabCards.put(card)
}

export const getDueVocabCards = async (): Promise<StoredVocabCard[]> => {
  const now = new Date()
  const todayStr = now.toISOString().split('T')[0].replace(/-/g, '')
  return db.vocabCards.where('dueStr').below(todayStr + '99999999').toArray()
}

export const getAllVocabCards = async (): Promise<StoredVocabCard[]> => {
  return db.vocabCards.toArray()
}
