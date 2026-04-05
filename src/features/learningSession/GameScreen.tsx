import React, { useState, useEffect } from 'react'
import type { QuizQuestion } from '../../types'
import { processReview, Rating } from '../../services/srs'
import { getPokemonSprite, getPokemonCardImage, getWordImageUrl } from '../../services/pokemon'

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

  useEffect(() => {
    setSelected(null)
    setShowResult(false)
    setIsShaking(false)
  }, [question.vocab.id])

  const handleAnswer = async (index: number) => {
    if (showResult) return
    setSelected(index)
    setShowResult(true)

    const rating = index === question.correctIndex ? Rating.Good : Rating.Again
    await processReview(question.vocab.id, rating)

    if (index === question.correctIndex) {
      onCorrect()
    } else {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 400)
      onWrong()
    }
  }

  const pokemonSpriteUrl = getPokemonSprite(question.vocab.pokemonId)
  const pokemonCardUrl = getPokemonCardImage(question.vocab.pokemonId)
  const wordImageUrl = getWordImageUrl(question.vocab.word)
  const phonemes = question.vocab.phonetic.split('-')
  
  // Get question mode from extended question or default to en2cn
  const questionEx = question as any
  const questionMode = questionEx.mode || 'en2cn'
  const questionText = questionEx.questionText || question.vocab.word

  const optionColors = [
    { bg: 'bg-[#E3350D]', hover: 'hover:bg-[#c42d0c]', text: 'text-white' },
    { bg: 'bg-[#3B5FA8]', hover: 'hover:bg-[#2d4a87]', text: 'text-white' },
    { bg: 'bg-[#FFCB05]', hover: 'hover:bg-[#e6b604]', text: 'text-[#3B5FA8]' },
    { bg: 'bg-[#68BB59]', hover: 'hover:bg-[#5aa84d]', text: 'text-white' },
  ]

  const modeLabel = questionMode === 'en2cn' ? '看英文选中文' : questionMode === 'cn2en' ? '看中文选英文' : '混合模式'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with progress */}
      <div className="bg-[#FFCB05] px-5 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#3B5FA8] font-bold">{questionNumber}/{totalQuestions}</span>
          <span className="bg-[#3B5FA8] text-white text-xs px-3 py-1 rounded-full font-medium">
            {modeLabel}
          </span>
        </div>
        <div className="h-2 bg-white/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B5FA8] rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-5 py-6 gap-5">
        {/* Image area - Pokemon card + word illustration */}
        <div className="w-full max-w-xs">
          {/* Pokemon TCG card */}
          <div className={`
            bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl overflow-hidden
            border-4 border-[#FFD700] shadow-2xl
            ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}
          `}>
            <img
              src={pokemonCardUrl}
              alt={question.vocab.word}
              className="w-full aspect-square object-contain p-3 bg-gradient-to-br from-blue-900/30 to-purple-900/30"
              onError={(e) => {
                // Fallback to sprite if card not available
                e.currentTarget.src = pokemonSpriteUrl
              }}
            />
            {/* Pokemon name ribbon */}
            <div className="bg-gradient-to-r from-[#E3350D] via-[#FFCB05] to-[#E3350D] px-3 py-1.5 text-center">
              <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
                {question.vocab.word}
              </span>
            </div>
          </div>
          
          {/* Word illustration (shows when available) */}
          {wordImageUrl && (
            <div className="mt-3 bg-white rounded-xl overflow-hidden shadow-lg border-2 border-[#FFCB05]/30">
              <img
                src={wordImageUrl}
                alt={question.vocab.word}
                className="w-full aspect-square object-contain p-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        {/* Result indicator */}
        {showResult && (
          <div className="text-2xl">
            {selected === question.correctIndex ? '🎉' : '🤔'}
          </div>
        )}

        {/* Question text */}
        <div className="text-center">
          <h2 className="text-white text-3xl font-bold mb-3">
            {questionText}
          </h2>
          {/* Phoneme chips (only show for en2cn) */}
          {questionMode === 'en2cn' && (
            <div className="flex gap-2 justify-center flex-wrap">
              {phonemes.map((phoneme, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/20 text-white text-sm rounded-lg font-medium"
                >
                  {phoneme}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Answer options - 2x2 grid */}
        <div className="w-full grid grid-cols-2 gap-3 mt-2">
          {question.options.map((option, index) => {
            let btnClass = optionColors[index].bg + ' ' + optionColors[index].hover + ' ' + optionColors[index].text
            
            if (showResult) {
              if (index === question.correctIndex) {
                btnClass = 'bg-[#68BB59] text-white'
              } else if (index === selected) {
                btnClass = 'bg-[#888] text-white'
              } else {
                btnClass = 'bg-[#888]/50 text-white'
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult && index !== question.correctIndex && index !== selected}
                className={`
                  ${btnClass}
                  font-bold text-lg py-4 rounded-xl
                  transition-all active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Feedback text */}
        {showResult && (
          <div className={`text-lg font-medium ${selected === question.correctIndex ? 'text-[#68BB59]' : 'text-white/70'}`}>
            {selected === question.correctIndex ? '太棒了！' : '继续加油！'}
          </div>
        )}
      </div>
    </div>
  )
}

export default GameScreen
