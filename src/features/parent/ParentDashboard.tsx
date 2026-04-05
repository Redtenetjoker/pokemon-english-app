import React, { useEffect, useState } from 'react'
import { getAllPokemon, getTodayProgress, db } from '../../services/db'
import { razWords } from '../../data/words'

interface Props {
  onBack: () => void
}

const ParentDashboard: React.FC<Props> = ({ onBack }) => {
  const [pokemonCount, setPokemonCount] = useState(0)
  const [todayProgress, setTodayProgress] = useState({ shortSessions: 0, longSessions: 0, wordsLearned: 0, wordsReviewed: 0 })
  const [totalWords, setTotalWords] = useState(0)
  const [totalDueCards, setTotalDueCards] = useState(0)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    const allPokemon = await getAllPokemon()
    const today = await getTodayProgress()
    const dueCards = await db.vocabCards.count()
    
    setPokemonCount(allPokemon.length)
    setTodayProgress(today)
    setTotalWords(razWords.length)
    setTotalDueCards(dueCards)
  }

  return (
    <div className="flex flex-col min-h-[80vh] p-6 gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md"
        >
          ←
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">家长端</h1>
          <p className="text-gray-500 text-sm">学习进度总览</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-gray-500 text-sm mb-1">Pokemon收集</p>
          <p className="text-3xl font-bold text-yellow-600">{pokemonCount} <span className="text-base text-gray-400">/ 151</span></p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-gray-500 text-sm mb-1">今日学习</p>
          <p className="text-3xl font-bold text-blue-600">
            {todayProgress.shortSessions + todayProgress.longSessions}
            <span className="text-base text-gray-400"> 次</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-gray-500 text-sm mb-1">已学词汇</p>
          <p className="text-3xl font-bold text-green-600">{totalDueCards}</p>
          <p className="text-xs text-gray-400">共 {totalWords} 词可选</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <p className="text-gray-500 text-sm mb-1">待复习</p>
          <p className="text-3xl font-bold text-purple-600">{totalDueCards}</p>
          <p className="text-xs text-gray-400">词等待复习</p>
        </div>
      </div>

      {/* Today's breakdown */}
      <div className="bg-white rounded-2xl p-5 shadow-md">
        <h3 className="font-bold text-gray-700 mb-3">📅 今日详情</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-xs text-gray-400">短模式</p>
              <p className="font-bold">{todayProgress.shortSessions} 次</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <div>
              <p className="text-xs text-gray-400">长模式</p>
              <p className="font-bold">{todayProgress.longSessions} 次</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <div>
              <p className="text-xs text-gray-400">新词学习</p>
              <p className="font-bold">{todayProgress.wordsLearned} 个</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            <div>
              <p className="text-xs text-gray-400">复习</p>
              <p className="font-bold">{todayProgress.wordsReviewed} 个</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="bg-blue-50 rounded-2xl p-5">
        <h3 className="font-bold text-blue-700 mb-2">💡 使用说明</h3>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• 孩子完成学习后会自动获得 Pokemon 奖励</li>
          <li>• 使用 FSRS 算法安排复习，遗忘时自动提醒</li>
          <li>• Pokemon 可通过积累经验值升级（P1功能）</li>
          <li>• 数据全部保存在本地设备</li>
        </ul>
      </div>

      {/* Reset data button */}
      <div className="bg-red-50 rounded-2xl p-5">
        <h3 className="font-bold text-red-700 mb-2">⚠️ 数据管理</h3>
        <button
          onClick={async () => {
            if (window.confirm('确定要清除所有数据吗？这将删除所有 Pokemon 和学习记录！')) {
              await db.pokemon.clear()
              await db.dailyProgress.clear()
              await db.vocabCards.clear()
              loadStats()
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl text-sm"
        >
          清除所有数据
        </button>
      </div>
    </div>
  )
}

export default ParentDashboard
