import React, { useState } from 'react'
import type { QuizQuestion } from '../../types'
import { processReview, Rating } from '../../services/srs'

interface Props {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  onCorrect: () => void
  onWrong: () => void
}

const GameScreen: React.FC<Props> = ({ question, questionNumber, totalQuestions, onCorrect, onWrong }) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = async (index: number) => {
    if (showResult) return
    setSelected(index)
    setShowResult(true)

    // Process FSRS review
    const rating = index === question.correctIndex ? Rating.Good : Rating.Again
    await processReview(question.vocab.id, rating)

    if (index === question.correctIndex) {
      onCorrect()
    } else {
      onWrong()
    }
  }

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return 'bg-white hover:bg-yellow-50 border-2 border-yellow-300 hover:border-yellow-500 cursor-pointer'
    }
    if (index === question.correctIndex) {
      return 'bg-green-100 border-2 border-green-500 cursor-default'
    }
    if (index === selected && index !== question.correctIndex) {
      return 'bg-red-100 border-2 border-red-500 cursor-default'
    }
    return 'bg-gray-100 border-2 border-gray-300 cursor-default opacity-60'
  }

  // Phoneme breakdown display
  const phonemes = question.vocab.phonetic.split('-')

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-4">
      {/* Progress */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>题目 {questionNumber} / {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Pokemon Image / Emoji */}
      <div className="w-48 h-48 flex items-center justify-center bg-yellow-50 rounded-3xl border-4 border-yellow-300 shadow-lg">
        <span className="text-8xl">{question.vocab.image}</span>
      </div>

      {/* Word + Phoneme breakdown */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{question.vocab.word}</h2>
        <div className="flex gap-2 justify-center">
          {phonemes.map((phoneme, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-lg font-semibold border-2 border-blue-300"
            >
              {phoneme}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-1">点击字母拼出单词发音</p>
      </div>

      {/* Answer options */}
      <div className="w-full grid grid-cols-2 gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`
              min-h-[56px] p-4 rounded-2xl text-lg font-semibold
              transition-all duration-200 active:scale-95
              ${getOptionStyle(index)}
            `}
            disabled={showResult && index !== question.correctIndex && index !== selected}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`
          text-2xl font-bold animate-bounce
          ${selected === question.correctIndex ? 'text-green-600' : 'text-red-600'}
        `}>
          {selected === question.correctIndex ? '🎉 太棒了！' : '🤔 再想想！'}
        </div>
      )}
    </div>
  )
}

export default GameScreen
