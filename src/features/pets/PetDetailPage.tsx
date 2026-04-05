import React from 'react'
import type { StoredPokemon } from '../../services/db'
import { markPokemonNotNew } from '../../services/db'
import { getPokemonCardImage, getPokemonSprite } from '../../services/pokemon'

interface Props {
  pokemon: StoredPokemon
  onBack: () => void
}

const PetDetailPage: React.FC<Props> = ({ pokemon, onBack }) => {
  const handleBack = async () => {
    if (pokemon.isNew) {
      await markPokemonNotNew(pokemon.id)
    }
    onBack()
  }

  // XP needed for next level
  const currentLevelXp = pokemon.xp % 100
  const xpToNext = 100 - currentLevelXp

  // Use card image if available, otherwise sprite
  const displayImage = getPokemonCardImage(pokemon.id)
  const isCardImage = displayImage.includes('/pokemon-cards/')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9E6] to-[#FFE4B5]">
      {/* Header with back button */}
      <div className="bg-[#FFCB05] px-4 py-3 flex items-center gap-3 shadow-md">
        <button
          onClick={handleBack}
          className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center text-xl font-bold text-[#3B5FA8]"
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-[#3B5FA8]">Pokemon 详情</h1>
      </div>

      <div className="p-4 flex flex-col items-center gap-4">
        {/* Pokemon Card */}
        <div className="relative w-full max-w-sm">
          {/* NEW badge */}
          {pokemon.isNew && (
            <div className="absolute -top-2 -right-2 z-10 bg-[#E3350D] text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg animate-bounce">
              ✨ 新收服！
            </div>
          )}

          {/* Card with holographic effect */}
          <div className={`
            relative overflow-hidden rounded-3xl
            ${isCardImage ? 'bg-gradient-to-br from-[#FFCB05]/20 to-[#FFE066]/20' : 'bg-gradient-to-br from-[#FFE066] to-[#FFCB05]'}
            p-1 shadow-2xl
          `}>
            <div className={`
              rounded-[1.4rem] p-6
              ${isCardImage ? 'bg-white/90 backdrop-blur-sm' : 'bg-gradient-to-br from-[#FFCB05] to-[#FFD700]'}
            `}>
              {/* Pokemon image */}
              <div className={`
                relative w-56 h-56 mx-auto
                ${isCardImage ? '' : 'bg-white rounded-2xl border-4 border-[#FFD700] shadow-inner'}
                flex items-center justify-center
              `}>
                <img
                  src={displayImage}
                  alt={pokemon.nameCn}
                  className={`
                    ${isCardImage ? 'w-full h-full object-contain' : 'w-40 h-40 object-contain'}
                  `}
                  onError={(e) => {
                    // Fallback to sprite if card fails
                    if (isCardImage) {
                      (e.target as HTMLImageElement).src = getPokemonSprite(pokemon.id)
                    }
                  }}
                />

                {/* Holographic shine effect for non-card images */}
                {!isCardImage && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
                )}
              </div>

              {/* Name and ID */}
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-[#3B5FA8]">
                  {pokemon.nameCn}
                </h2>
                <p className="text-[#3B5FA8]/60 text-sm">
                  #{String(pokemon.id).padStart(3, '0')}
                </p>
              </div>
            </div>
          </div>

          {/* Level and XP bar */}
          <div className="mt-4 bg-white rounded-2xl p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#3B5FA8]">等级 Lv.{pokemon.level}</span>
              <span className="text-sm text-gray-400">{currentLevelXp} / 100 XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFCB05] to-[#FFD700] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(currentLevelXp, 5)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">
              再 {xpToNext} XP 升级！
            </p>
          </div>

          {/* Total XP */}
          <div className="mt-2 text-center">
            <p className="text-gray-500 text-sm">
              总经验值: <span className="font-bold text-[#FFCB05]">{pokemon.xp}</span> XP
            </p>
          </div>
        </div>

        {/* Evolution hint */}
        <div className="w-full max-w-sm bg-white/80 rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 text-[#3B5FA8]">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-gray-600">
              继续学习可以获得更多经验值，让 Pokemon 进化！
            </p>
          </div>
        </div>

        {/* Stats summary */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <p className="text-2xl font-bold text-[#FFCB05]">{pokemon.level}</p>
            <p className="text-xs text-gray-400">等级</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <p className="text-2xl font-bold text-[#FFCB05]">{pokemon.xp}</p>
            <p className="text-xs text-gray-400">经验值</p>
          </div>
        </div>

        {/* Collection date */}
        <div className="text-center text-gray-400 text-xs">
          收服时间: {new Date(pokemon.collectedAt).toLocaleDateString('zh-CN')}
        </div>
      </div>
    </div>
  )
}

export default PetDetailPage
