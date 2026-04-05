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

// Quiz mode types
export type QuizMode = 'en2cn' | 'cn2en' | 'mixed'

// Extended question with mode info
export interface QuizQuestionEx extends QuizQuestion {
  mode: QuizMode
  questionText: string
  options: string[]
  correctIndex: number
}

export const generateQuizQuestions = (
  words: QuizQuestion['vocab'][],
  count: number,
  mode: QuizMode = 'mixed'
): QuizQuestionEx[] => {
  const selected = words.slice(0, count)
  
  return selected.map(vocab => {
    const otherWords = words.filter(w => w.id !== vocab.id).sort(() => Math.random() - 0.5).slice(0, 3)
    
    // Determine question type for this specific question
    let questionMode: QuizMode
    if (mode === 'mixed') {
      questionMode = Math.random() < 0.5 ? 'en2cn' : 'cn2en'
    } else {
      questionMode = mode
    }
    
    let questionText: string
    let correctAnswer: string
    let wrongOptions: string[]
    
    if (questionMode === 'en2cn') {
      questionText = vocab.word
      correctAnswer = vocab.meaning
      wrongOptions = otherWords.map(w => w.meaning)
    } else {
      questionText = vocab.meaning
      correctAnswer = vocab.word
      wrongOptions = otherWords.map(w => w.word)
    }
    
    const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5)
    const correctIndex = options.indexOf(correctAnswer)
    
    return {
      vocab,
      mode: questionMode,
      questionText,
      options,
      correctIndex,
    }
  })
}
