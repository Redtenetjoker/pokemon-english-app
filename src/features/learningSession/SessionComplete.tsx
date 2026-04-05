import React, { useEffect, useState } from 'react'
import type { Pokemon } from '../../types'

interface Props {
  pokemon: Pokemon
  correctCount: number
  wrongCount: number
  mode: 'short' | 'long'
  onContinue: () => void
}

const SessionComplete: React.FC<Props> = ({ pokemon, correctCount, wrongCount, mode, onContinue }) => {
  const [showPokemon, setShowPokemon] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const total = correctCount + wrongCount
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0

  useEffect(() => {
    const t1 = setTimeout(() => setShowPokemon(true), 300)
    const t2 = setTimeout(() => setShowText(true), 1000)
    const t3 = setTimeout(() => setShowButton(true), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const accuracyColor = accuracy >= 80 ? 'text-green-600' : accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-4">
      {/* Trophy */}
      <div className="text-6xl animate-bounce">🏆</div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        {mode === 'short' ? '学习完成！' : '闯关成功！'}
      </h1>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-gray-500">答对</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-500">{wrongCount}</div>
            <div className="text-sm text-gray-500">答错</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${accuracyColor}`}>{accuracy}%</div>
            <div className="text-sm text-gray-500">正确率</div>
          </div>
        </div>
      </div>

      {/* Pokemon Reward */}
      <div className={`transition-all duration-700 ${showPokemon ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="bg-yellow-50 rounded-3xl p-6 border-4 border-yellow-300 shadow-xl">
          <p className="text-center text-yellow-700 font-semibold mb-2">🎁 获得新Pokemon!</p>
          <img
            src={pokemon.image}
            alt={pokemon.nameCn}
            className="w-40 h-40 mx-auto"
          />
          <p className="text-center text-2xl font-bold text-gray-800 mt-2">{pokemon.nameCn}</p>
        </div>
      </div>

      {/* Encouragement */}
      {showText && (
        <p className="text-xl text-gray-600 text-center animate-pulse">
          继续加油！你越来越厉害了！💪
        </p>
      )}

      {/* Continue button */}
      {showButton && (
        <button
          onClick={onContinue}
          className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 active:scale-95"
        >
          继续 🏠
        </button>
      )}
    </div>
  )
}

export default SessionComplete
