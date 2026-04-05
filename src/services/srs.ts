import { createEmptyCard, fsrs, Rating, type Card, type Grade } from 'ts-fsrs'
import type { StoredVocabCard } from './db'

const scheduler = fsrs()

export { Rating }
export type { Grade }

/**
 * Get or create an FSRS card for a vocab word
 */
export const getOrCreateCard = async (vocabId: string): Promise<Card> => {
  const { getVocabCard } = await import('./db')
  const stored = await getVocabCard(vocabId)
  if (stored) {
    return {
      due: stored.due,
      stability: stored.stability,
      difficulty: stored.difficulty,
      lapses: stored.lapses,
      reps: stored.reps,
      state: stored.state,
      elapsed_days: 0,
      scheduled_days: 0,
      learning_steps: 0,
      last_review: stored.lastReview ?? undefined,
    }
  }
  return createEmptyCard(new Date())
}

/**
 * Process a learning/review event and save the updated card
 */
export const processReview = async (
  vocabId: string,
  rating: Rating
): Promise<Card> => {
  const card = await getOrCreateCard(vocabId)
  const now = new Date()
  
  // Cast rating to Grade (exclude Manual)
  const grade = rating as Grade
  const result = scheduler.next(card, now, grade)
  const updatedCard = result.card

  // Save to IndexedDB
  const stored: StoredVocabCard = {
    id: vocabId,
    vocabId,
    due: updatedCard.due,
    dueStr: formatDueStr(updatedCard.due),
    stability: updatedCard.stability,
    difficulty: updatedCard.difficulty,
    lapses: updatedCard.lapses,
    reps: updatedCard.reps,
    state: updatedCard.state,
    lastReview: updatedCard.last_review ?? null,
    nextReview: null,
  }
  const { saveVocabCard } = await import('./db')
  await saveVocabCard(stored)

  return updatedCard
}

function formatDueStr(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '')
}

/**
 * Get all due cards for review
 */
export const getDueCards = async (): Promise<{ vocabId: string; card: Card }[]> => {
  const { getDueVocabCards } = await import('./db')
  const dueCards = await getDueVocabCards()
  return dueCards.map(stored => ({
    vocabId: stored.vocabId,
    card: {
      due: stored.due,
      stability: stored.stability,
      difficulty: stored.difficulty,
      lapses: stored.lapses,
      reps: stored.reps,
      state: stored.state,
      elapsed_days: 0,
      scheduled_days: 0,
      learning_steps: 0,
      last_review: stored.lastReview ?? undefined,
    }
  }))
}
