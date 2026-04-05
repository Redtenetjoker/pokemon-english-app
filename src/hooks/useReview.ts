import { useState, useEffect, useCallback } from 'react'
import type { ReviewState, VocabCard } from '../types'
import { getDueCards, processReview, Rating } from '../services/srs'
import { razWords } from '../data/words'

export const useReview = () => {
  const [state, setState] = useState<ReviewState>({
    dueCards: [],
    currentIndex: 0,
    completed: 0,
    correctCount: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const loadDueCards = useCallback(async () => {
    setIsLoading(true)
    try {
      const due = await getDueCards()
      setState({
        dueCards: due.map(d => ({ ...d.card, vocabId: d.vocabId } as VocabCard)),
        currentIndex: 0,
        completed: 0,
        correctCount: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDueCards()
  }, [loadDueCards])

  const answerCard = async (rating: Rating) => {
    const current = state.dueCards[state.currentIndex]
    if (!current) return

    await processReview(current.vocabId, rating)

    const isCorrect = rating === Rating.Good || rating === Rating.Easy
    setState(prev => ({
      ...prev,
      completed: prev.completed + 1,
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      currentIndex: prev.currentIndex + 1,
    }))
  }

  const getCurrentVocab = () => {
    const current = state.dueCards[state.currentIndex]
    if (!current) return null
    return razWords.find(w => w.id === current.vocabId) || null
  }

  return {
    state,
    isLoading,
    answerCard,
    getCurrentVocab,
    hasMore: state.currentIndex < state.dueCards.length,
    dueCount: state.dueCards.length,
  }
}
