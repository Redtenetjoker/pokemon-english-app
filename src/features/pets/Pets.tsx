import React, { useEffect, useState } from 'react'
import type { StoredPokemon } from '../../services/db'
import { getAllPokemon } from '../../services/db'
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
    <div className="flex flex-col min-h-[80vh]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          ←
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pokemon 图鉴</h1>
          <p className="text-gray-500 text-sm">已收集 {pokemon.length} / 151</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-yellow-400 h-3 rounded-full transition-all"
          style={{ width: `${(pokemon.length / 151) * 100}%` }}
        />
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-4xl animate-bounce">🐾</div>
        </div>
      ) : pokemon.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
          <span className="text-7xl">🌱</span>
          <p className="text-xl text-gray-500">还没有收集到Pokemon</p>
          <p className="text-gray-400">完成学习任务就能获得!</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {pokemon.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`
                bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all
                active:scale-95 flex flex-col items-center gap-2
                ${p.isNew ? 'ring-4 ring-yellow-400 ring-opacity-70' : ''}
              `}
            >
              {p.isNew && (
                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                  NEW!
                </span>
              )}
              <img
                src={p.image}
                alt={p.nameCn}
                className="w-20 h-20 object-contain"
              />
              <span className="text-sm font-bold text-gray-700 truncate w-full text-center">
                {p.nameCn}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Lv.{p.level}</span>
                <div className="w-12 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-400 h-1.5 rounded-full"
                    style={{ width: `${(p.xp % 100)}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Pets
