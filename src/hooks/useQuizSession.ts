import { useReducer } from 'react'
import type { LearningState, LearningAction, QuizQuestion } from '../types'

const initialState: LearningState = {
  phase: 'select-mode',
  mode: 'short',
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  startTime: 0,
  earnedPokemon: null,
}

function learningReducer(state: LearningState, action: LearningAction): LearningState {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        phase: 'playing',
        mode: action.mode,
        questions: action.questions,
        currentIndex: 0,
        correctCount: 0,
        wrongCount: 0,
        startTime: Date.now(),
        earnedPokemon: null,
      }
    case 'ANSWER_CORRECT':
      return {
        ...state,
        correctCount: state.correctCount + 1,
      }
    case 'ANSWER_WRONG':
      return {
        ...state,
        wrongCount: state.wrongCount + 1,
      }
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      }
    case 'COMPLETE_SESSION':
      return {
        ...state,
        phase: 'session-complete',
        earnedPokemon: action.pokemon,
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const useQuizSession = () => {
  return useReducer(learningReducer, initialState)
}

export const generateQuizQuestions = (
  words: QuizQuestion['vocab'][],
  count: number
): QuizQuestion[] => {
  const selected = words.slice(0, count)
  
  return selected.map(vocab => {
    // Pick 3 wrong answers from other words
    const otherWords = words.filter(w => w.id !== vocab.id)
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5).slice(0, 3)
    
    // Create options with correct answer mixed in
    const options = [...shuffledOthers.map(w => w.meaning), vocab.meaning]
    const shuffled = options.sort(() => Math.random() - 0.5)
    const correctIndex = shuffled.indexOf(vocab.meaning)
    
    return {
      vocab,
      options: shuffled,
      correctIndex,
    }
  })
}
