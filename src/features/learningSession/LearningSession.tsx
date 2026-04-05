import React, { useEffect, useCallback } from 'react'
import { useQuizSession, generateQuizQuestions } from '../../hooks/useQuizSession'
import type { QuizMode } from '../../hooks/useQuizSession'
import { getRandomPokemonId, getPokemonData } from '../../services/pokemon'
import { addPokemon, incrementTodayProgress } from '../../services/db'
import { razWords } from '../../data/words'
import GameScreen from './GameScreen'
import SessionComplete from './SessionComplete'
import type { SessionMode } from '../../types'

interface Props {
  onComplete: () => void
}

const QUESTION_COUNTS: Record<SessionMode, number> = {
  short: 6,
  long: 15,
}

const LearningSession: React.FC<Props> = ({ onComplete }) => {
  const [state, dispatch] = useQuizSession()

  const startSession = useCallback((mode: SessionMode) => {
    const count = QUESTION_COUNTS[mode]
    // Use mixed mode for variety: en2cn, cn2en, mixed
    const quizMode: QuizMode = 'mixed'
    // Shuffle all words first, then pick count * 2 for true randomness across all levels
    const shuffled = [...razWords].sort(() => Math.random() - 0.5)
    const words = shuffled.slice(0, Math.min(count * 2, shuffled.length))
    const questions = generateQuizQuestions(words, count, quizMode)
    dispatch({ type: 'START_SESSION', mode, questions })
  }, [dispatch])

  const handleCorrect = useCallback(() => {
    dispatch({ type: 'ANSWER_CORRECT' })
    // Small delay before next question
    setTimeout(() => {
      dispatch({ type: 'NEXT_QUESTION' })
    }, 800)
  }, [dispatch])

  const handleWrong = useCallback(() => {
    dispatch({ type: 'ANSWER_WRONG' })
    setTimeout(() => {
      dispatch({ type: 'NEXT_QUESTION' })
    }, 1200)
  }, [dispatch])

  // Check if session is complete
  useEffect(() => {
    if (state.phase === 'playing' && state.currentIndex >= state.questions.length) {
      const completeSession = async () => {
        // Generate random Pokemon reward
        const pokeId = getRandomPokemonId()
        const pokeData = getPokemonData(pokeId)
        const pokemon = {
          ...pokeData,
          xp: 0,
          level: 1,
          isNew: true,
          collectedAt: Date.now(),
        }
        await addPokemon(pokemon)
        await incrementTodayProgress(state.mode === 'short' ? 'shortSessions' : 'longSessions')
        await incrementTodayProgress('wordsLearned')
        dispatch({ type: 'COMPLETE_SESSION', pokemon })
      }
      completeSession()
    }
  }, [state.phase, state.currentIndex, state.questions.length, state.mode, dispatch])

  // Mode selection screen
  if (state.phase === 'select-mode') {
    return (
      <div className="flex flex-col items-center gap-8 p-6 min-h-[80vh] justify-center">
        <h1 className="text-3xl font-bold text-gray-800 text-center">选择学习模式</h1>
        
        <div className="flex flex-col gap-6 w-full max-w-md">
          {/* Short Mode */}
          <button
            onClick={() => startSession('short')}
            className="bg-white border-4 border-yellow-400 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <div className="text-5xl mb-3">⚡</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">短模式</h2>
            <p className="text-gray-500">6道题 · 约10分钟</p>
            <p className="text-yellow-600 text-sm mt-2 font-semibold">快速充电 ⚡</p>
          </button>

          {/* Long Mode */}
          <button
            onClick={() => startSession('long')}
            className="bg-white border-4 border-blue-400 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <div className="text-5xl mb-3">🚀</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">长模式</h2>
            <p className="text-gray-500">15道题 · 约60分钟</p>
            <p className="text-blue-600 text-sm mt-2 font-semibold">深度学习 🚀</p>
          </button>
        </div>

        <button
          onClick={onComplete}
          className="mt-4 text-gray-400 hover:text-gray-600 text-sm"
        >
          ← 返回首页
        </button>
      </div>
    )
  }

  // Playing phase
  if (state.phase === 'playing') {
    const current = state.questions[state.currentIndex]
    if (!current) return null

    return (
      <GameScreen
        question={current}
        questionNumber={state.currentIndex + 1}
        totalQuestions={state.questions.length}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
      />
    )
  }

  // Session complete
  if (state.phase === 'session-complete' && state.earnedPokemon) {
    return (
      <SessionComplete
        pokemon={state.earnedPokemon}
        correctCount={state.correctCount}
        wrongCount={state.wrongCount}
        mode={state.mode}
        onContinue={onComplete}
      />
    )
  }

  return null
}

export default LearningSession
