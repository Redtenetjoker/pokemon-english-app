import React from 'react'
import type { StoredPokemon } from '../../services/db'
import { markPokemonNotNew } from '../../services/db'

interface Props {
  pokemon: StoredPokemon
  onBack: () => void
}

const PetDetailPage: React.FC<Props> = ({ pokemon, onBack }) => {
  const handleViewDetails = async () => {
    if (pokemon.isNew) {
      await markPokemonNotNew(pokemon.id)
    }
    onBack()
  }

  // XP needed for next level
  const currentLevelXp = pokemon.xp % 100
  const xpToNext = 100 - currentLevelXp

  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-[80vh]">
      {/* Back button */}
      <div className="w-full flex justify-start">
        <button
          onClick={handleViewDetails}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md"
        >
          ←
        </button>
      </div>

      {/* Pokemon card */}
      <div className="bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-3xl p-8 border-4 border-yellow-300 shadow-xl w-full max-w-sm">
        {/* NEW badge */}
        {pokemon.isNew && (
          <div className="bg-yellow-400 text-yellow-900 font-bold text-center py-2 rounded-xl mb-4 animate-bounce">
            ✨ 新收服！✨
          </div>
        )}

        {/* Pokemon image */}
        <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-gray-200 mb-4">
          <img
            src={pokemon.image}
            alt={pokemon.nameCn}
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Name */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {pokemon.nameCn}
        </h2>
        <p className="text-center text-gray-400 mb-6">#{String(pokemon.id).padStart(3, '0')}</p>

        {/* Level and XP */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-700">等级 Lv.{pokemon.level}</span>
            <span className="text-sm text-gray-400">{currentLevelXp} / 100 XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${currentLevelXp}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">
            再 {xpToNext} XP 升级！
          </p>
        </div>

        {/* Total XP */}
        <div className="text-center text-gray-500">
          <p>总经验值: <span className="font-bold text-blue-600">{pokemon.xp}</span> XP</p>
        </div>
      </div>

      {/* Evolution hint (P1 placeholder) */}
      <div className="bg-gray-100 rounded-2xl p-4 w-full max-w-sm text-center">
        <p className="text-gray-500 text-sm">
          💡 继续学习可以获得更多经验值，让 Pokemon 进化！
        </p>
      </div>
    </div>
  )
}

export default PetDetailPage
