import React, { useState, useEffect } from 'react'
import type { QuizQuestion } from '../../types'
import { processReview, Rating } from '../../services/srs'
import { getPokemonSprite } from '../../services/pokemon'

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
  const [isShaking, setIsShaking] = useState(false)
  const [isCorrectBounce, setIsCorrectBounce] = useState(false)

  useEffect(() => {
    setSelected(null)
    setShowResult(false)
    setIsShaking(false)
    setIsCorrectBounce(false)
  }, [question.vocab.id])

  const handleAnswer = async (index: number) => {
    if (showResult) return
    setSelected(index)
    setShowResult(true)

    const rating = index === question.correctIndex ? Rating.Good : Rating.Again
    await processReview(question.vocab.id, rating)

    if (index === question.correctIndex) {
      setIsCorrectBounce(true)
      setTimeout(() => setIsCorrectBounce(false), 500)
      onCorrect()
    } else {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      onWrong()
    }
  }

  const pokemonSpriteUrl = getPokemonSprite(question.vocab.pokemonId)

  const optionColors = [
    'from-red-400 to-orange-400',
    'from-blue-400 to-cyan-400',
    'from-green-400 to-emerald-400',
    'from-purple-400 to-pink-400',
  ]

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return `bg-gradient-to-br ${optionColors[index]} hover:scale-105 border-4 border-white/50 hover:border-white cursor-pointer shadow-lg`
    }
    if (index === question.correctIndex) {
      return 'bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-green-600 cursor-default shadow-xl'
    }
    if (index === selected && index !== question.correctIndex) {
      return 'bg-gradient-to-br from-red-400 to-rose-500 border-4 border-red-600 cursor-default shadow-xl'
    }
    return 'bg-gray-300 border-4 border-gray-400 cursor-default opacity-60'
  }

  const getOptionTextStyle = () => {
    return 'text-white'
  }

  const phonemes = question.vocab.phonetic.split('-')

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto p-4">
      {/* Progress */}
      <div className="w-full">
        <div className="flex justify-between text-base text-white font-semibold mb-2 drop-shadow">
          <span>题目 {questionNumber} / {totalQuestions}</span>
          <span className="text-yellow-300">{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-white/30 backdrop-blur rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-4 rounded-full transition-all duration-500 ease-out shadow-lg shadow-yellow-400/50"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Pokemon Image */}
      <div className={`
        relative w-52 h-52 bg-gradient-to-br from-yellow-100 to-white rounded-full 
        border-8 border-yellow-400 shadow-2xl shadow-yellow-400/30
        flex items-center justify-center overflow-hidden
        ${isShaking ? 'animate-shake' : ''}
        ${isCorrectBounce ? 'animate-bounce-gentle' : ''}
        transition-transform duration-300
      `}>
        <img
          src={pokemonSpriteUrl}
          alt={question.vocab.word}
          className="w-40 h-40 object-contain drop-shadow-lg"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <span className="text-7xl hidden">{question.vocab.word[0]}</span>
        
        {showResult && selected === question.correctIndex && (
          <div className="absolute -top-2 -right-2 text-4xl animate-celebrate">🎉</div>
        )}
        
        {showResult && selected !== null && selected !== question.correctIndex && (
          <div className="absolute -top-2 -right-2 text-4xl animate-wiggle">🤔</div>
        )}
      </div>

      {/* Word + Phoneme breakdown */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white drop-shadow-lg mb-3">
          {question.vocab.word}
        </h2>
        <div className="flex gap-2 justify-center flex-wrap">
          {phonemes.map((phoneme, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-white/90 backdrop-blur text-blue-600 rounded-2xl text-xl font-bold border-3 border-blue-300 shadow-md"
            >
              {phoneme}
            </span>
          ))}
        </div>
        <p className="text-white/80 text-sm mt-2 font-medium">点击颜色选择正确的中文意思</p>
      </div>

      {/* Answer options */}
      <div className="w-full grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`
              min-h-[70px] p-4 rounded-3xl text-xl font-bold
              transition-all duration-200 active:scale-95
              ${getOptionStyle(index)}
            `}
            disabled={showResult && index !== question.correctIndex && index !== selected}
          >
            <span className={`${getOptionTextStyle()} drop-shadow`}>{option}</span>
          </button>
        ))}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`
          text-3xl font-bold animate-bounce
          ${selected === question.correctIndex ? 'text-green-300' : 'text-red-300'}
          drop-shadow-lg
        `}>
          {selected === question.correctIndex ? '🎉 太棒了！继续加油！' : '🤔 再想想！加油！'}
        </div>
      )}
    </div>
  )
}

export default GameScreen
