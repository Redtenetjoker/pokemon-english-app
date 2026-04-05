import React, { useEffect, useState } from 'react'
import type { StoredPokemon } from '../../services/db'
import { getAllPokemon } from '../../services/db'
import { getPokemonCardImage, getPokemonSprite } from '../../services/pokemon'
import PetDetailPage from './PetDetailPage'

const Pets: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [pokemon, setPokemon] = useState<StoredPokemon[]>([])
  const [selected, setSelected] = useState<StoredPokemon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPokemon()
  }, [])

  const loadPokemon = async () => {
    setLoading(true)
    const all = await getAllPokemon()
    setPokemon(all)
    setLoading(false)
  }

  if (selected) {
    return <PetDetailPage pokemon={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FD] to-[#D4ECFC]">
      {/* Header */}
      <div className="bg-[#FFCB05] px-5 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center text-xl font-bold text-[#3B5FA8]"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#3B5FA8]">🎮 Pokemon 图鉴</h1>
            <p className="text-[#3B5FA8]/70 text-sm">{pokemon.length} / 151 已收集</p>
          </div>
          {/* Progress indicator */}
          <div className="text-right">
            <span className="text-2xl font-bold text-[#3B5FA8]">{Math.round((pokemon.length / 151) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[#3B5FA8]/10">
        <div
          className="h-full bg-gradient-to-r from-[#FFCB05] to-[#FFD700] transition-all duration-500"
          style={{ width: `${(pokemon.length / 151) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border-4 border-[#FFCB05] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : pokemon.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt=""
              className="w-24 h-24 object-contain opacity-30 grayscale"
            />
            <p className="text-gray-500 text-center">
              完成学习任务<br />就能收集 Pokemon
            </p>
            <div className="bg-[#FFCB05]/20 rounded-full px-4 py-2">
              <p className="text-[#3B5FA8] text-sm">🎯 完成10道题 = 1只Pokemon</p>
            </div>
          </div>
        ) : (
          <>
            {/* Collection progress stats */}
            <div className="mb-4 bg-white/80 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-2xl font-bold text-[#FFCB05]">{pokemon.length}</p>
                  <p className="text-xs text-gray-400">已收集</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-[#3B5FA8]">{151 - pokemon.length}</p>
                  <p className="text-xs text-gray-400">未收集</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-green-500">
                    {pokemon.filter(p => p.level >= 5).length}
                  </p>
                  <p className="text-xs text-gray-400">Lv.5+</p>
                </div>
              </div>
            </div>

            {/* Pokemon grid */}
            <div className="grid grid-cols-3 gap-3">
              {pokemon.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`
                    relative bg-white border-2 rounded-2xl p-3 flex flex-col items-center
                    transition-all duration-200 hover:scale-105 active:scale-95
                    ${p.isNew ? 'border-[#E3350D] shadow-lg shadow-red-200' : 'border-gray-100 shadow-sm hover:border-[#FFCB05]'}
                  `}
                >
                  {p.isNew && (
                    <span className="absolute -top-1 -right-1 text-xs bg-[#E3350D] text-white px-2 py-0.5 rounded-full font-bold">
                      NEW
                    </span>
                  )}

                  {/* Pokemon image container */}
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden
                    ${p.isNew ? 'bg-gradient-to-br from-[#FFECB3] to-[#FFE082]' : 'bg-gray-50'}
                  `}>
                    <img
                      src={getPokemonCardImage(p.id)}
                      alt={p.nameCn}
                      className="w-14 h-14 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getPokemonSprite(p.id)
                      }}
                    />
                  </div>

                  {/* Name */}
                  <span className="text-sm text-gray-700 mt-2 font-medium truncate w-full text-center">
                    {p.nameCn}
                  </span>

                  {/* Level badge */}
                  <div className={`
                    mt-1 px-2 py-0.5 rounded-full text-xs font-bold
                    ${p.level >= 10 ? 'bg-purple-100 text-purple-600' :
                      p.level >= 5 ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-500'}
                  `}>
                    Lv.{p.level}
                  </div>

                  {/* XP progress mini bar */}
                  <div className="w-full mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFCB05] rounded-full"
                      style={{ width: `${p.xp % 100}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Completion hint */}
            {pokemon.length < 151 && (
              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>继续学习，收集全部 151 只 Pokemon！</p>
                <p className="text-xs mt-1">🎮 每10题可获得1只Pokemon</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Pets
