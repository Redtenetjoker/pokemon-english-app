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
  const [phase, setPhase] = useState<'loading' | 'hatching' | 'reveal'>('loading')

  const total = correctCount + wrongCount
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hatching'), 500)
    const t2 = setTimeout(() => setPhase('reveal'), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <img
        src="/images/study-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
      />

      <div className="relative flex-1 flex flex-col items-center justify-center px-5 py-8 z-10">
        {/* Trophy */}
        <img 
          src={phase === 'reveal' ? '/images/celebrate.png' : '/images/studying.png'}
          alt=""
          className={`w-40 h-40 object-contain mb-4 ${phase === 'reveal' ? 'animate-bounce' : 'opacity-50'}`}
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-6">
          {mode === 'short' ? '学习完成！' : '闯关成功！'}
        </h1>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          <div className="bg-white/20 rounded-xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">{correctCount}</div>
            <div className="text-white/60 text-sm">答对</div>
          </div>
          <div className="bg-white/20 rounded-xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">{wrongCount}</div>
            <div className="text-white/60 text-sm">答错</div>
          </div>
          <div className="bg-[#FFCB05] rounded-xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-[#3B5FA8]">{accuracy}%</div>
            <div className="text-[#3B5FA8]/60 text-sm">正确率</div>
          </div>
        </div>

        {/* Pokemon Reward */}
        <div className={`
          bg-white rounded-xl p-6 flex flex-col items-center
          ${phase === 'hatching' ? 'animate-[shake_0.3s_ease-in-out_infinite]' : ''}
        `}>
          {pokemon.isNew && (
            <img src="/images/badge-gold.png" alt="new" className="w-12 h-12 object-contain mb-2" />
          )}
          <img
            src={phase === 'loading' ? '/images/studying.png' : pokemon.image}
            alt={pokemon.nameCn}
            className={`w-32 h-32 object-contain transition-all ${phase !== 'reveal' ? 'opacity-30' : ''}`}
          />
          <p className="text-lg font-bold text-gray-800 mt-2">{pokemon.nameCn}</p>
          <p className="text-gray-400 text-sm">#{String(pokemon.id).padStart(3, '0')}</p>
        </div>

        {/* Encouragement */}
        <p className="text-white/80 text-center mt-6">
          {accuracy >= 80 ? '太厉害了！你是个小学霸！' : 
           accuracy >= 60 ? '做得不错！继续加油！' : 
           '别灰心，多练习就会越来越好！'}
        </p>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="mt-8 w-full max-w-xs bg-[#FFCB05] text-[#3B5FA8] font-bold py-4 rounded-xl active:scale-95 transition-transform"
        >
          继续
        </button>
      </div>
    </div>
  )
}

export default SessionComplete
