import { useEffect, useState } from 'react'
import LearningSession from './features/learningSession/LearningSession'
import Pets from './features/pets/Pets'
import ParentDashboard from './features/parent/ParentDashboard'
import { getAllPokemon, getTodayProgress } from './services/db'
import type { AppView } from './types'

function App() {
  const [view, setView] = useState<AppView>('home')
  const [pokemonCount, setPokemonCount] = useState(0)
  const [todayProgress, setTodayProgress] = useState({ shortSessions: 0, longSessions: 0, wordsLearned: 0, wordsReviewed: 0 })
  const [dueReviewCount, setDueReviewCount] = useState(0)

  useEffect(() => {
    loadHomeData()
  }, [view])

  const loadHomeData = async () => {
    const all = await getAllPokemon()
    const today = await getTodayProgress()
    setPokemonCount(all.length)
    setTodayProgress(today)
    
    const { getDueVocabCards } = await import('./services/db')
    const due = await getDueVocabCards()
    setDueReviewCount(due.length)
  }

  if (view === 'home') {
    return (
      <HomeView
        pokemonCount={pokemonCount}
        todayProgress={todayProgress}
        dueReviewCount={dueReviewCount}
        onStartLearning={() => setView('learning')}
        onViewPets={() => setView('pets')}
        onViewReview={() => setView('review')}
        onOpenParent={() => setView('parent')}
      />
    )
  }

  if (view === 'learning') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
        <LearningSession onComplete={() => setView('home')} />
      </div>
    )
  }

  if (view === 'pets') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50 p-4">
        <Pets onBack={() => setView('home')} />
      </div>
    )
  }

  if (view === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
        <ReviewSession onComplete={() => setView('home')} />
      </div>
    )
  }

  if (view === 'parent') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <ParentDashboard onBack={() => setView('home')} />
      </div>
    )
  }

  return null
}

// Home View
function HomeView({
  pokemonCount,
  todayProgress,
  dueReviewCount,
  onStartLearning,
  onViewPets,
  onViewReview,
  onOpenParent,
}: {
  pokemonCount: number
  todayProgress: { shortSessions: number; longSessions: number; wordsLearned: number; wordsReviewed: number }
  dueReviewCount: number
  onStartLearning: () => void
  onViewPets: () => void
  onViewReview: () => void
  onOpenParent: () => void
}) {
  const todayTotal = todayProgress.shortSessions + todayProgress.longSessions

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-blue-50 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pokemon 学英语</h1>
          <p className="text-gray-500 text-sm">加油！🎉</p>
        </div>
        <button
          onClick={onOpenParent}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-md"
          title="家长端"
        >
          ⚙️
        </button>
      </div>

      {/* Today's Progress Card */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span>📅</span> 今日进度
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{todayTotal}</div>
            <div className="text-xs text-gray-400">学习次数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{todayProgress.wordsLearned}</div>
            <div className="text-xs text-gray-400">新词</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{dueReviewCount}</div>
            <div className="text-xs text-gray-400">待复习</div>
          </div>
        </div>
      </div>

      {/* Start Learning Button */}
      <button
        onClick={onStartLearning}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white text-2xl font-bold py-8 px-8 rounded-3xl shadow-xl mb-6 transition-all active:scale-95"
      >
        <span className="text-4xl mr-3">⚡</span>
        开始学习
        <span className="text-4xl ml-3">🚀</span>
      </button>

      {/* Due Review Banner */}
      {dueReviewCount > 0 && (
        <button
          onClick={onViewReview}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-lg mb-6 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🔄</span>
          有 {dueReviewCount} 个词等待复习
          <span className="text-sm opacity-80">→</span>
        </button>
      )}

      {/* Pokemon Collection Preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-700 flex items-center gap-2">
            <span>🌟</span> Pokemon 图鉴
          </h2>
          <button
            onClick={onViewPets}
            className="text-blue-500 text-sm font-semibold"
          >
            查看全部 →
          </button>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-4xl font-bold text-yellow-600">{pokemonCount}</div>
            <div className="text-sm text-gray-500">
              <p>已收集</p>
              <p className="text-xs">目标 151</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all"
              style={{ width: `${Math.min((pokemonCount / 151) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {pokemonCount > 0 && <PokemonPreview onViewAll={onViewPets} />}
    </div>
  )
}

// Pokemon preview component
function PokemonPreview({ onViewAll }: { onViewAll: () => void }) {
  const [recent, setRecent] = useState<import('./services/db').StoredPokemon[]>([])

  useEffect(() => {
    getAllPokemon().then(all => {
      setRecent(all.slice(0, 6))
    })
  }, [])

  if (recent.length === 0) return null

  return (
    <div className="grid grid-cols-6 gap-2">
      {recent.map(p => (
        <div
          key={p.id}
          className="bg-white rounded-xl p-2 shadow flex flex-col items-center"
        >
          <img src={p.image} alt={p.nameCn} className="w-12 h-12 object-contain" />
          <span className="text-xs text-gray-500 truncate w-full text-center">{p.nameCn}</span>
        </div>
      ))}
      <button
        onClick={onViewAll}
        className="bg-gray-100 rounded-xl p-2 shadow flex flex-col items-center justify-center hover:bg-gray-200"
      >
        <span className="text-xl">→</span>
        <span className="text-xs text-gray-400">更多</span>
      </button>
    </div>
  )
}

// Simple Review Session
function ReviewSession({ onComplete }: { onComplete: () => void }) {
  const [cards, setCards] = useState<{ vocabId: string; meaning: string; word: string }[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(() => {
    loadDueCards()
  }, [])

  const loadDueCards = async () => {
    const { getDueVocabCards } = await import('./services/db')
    const due = await getDueVocabCards()
    const { razWords } = await import('./data/words')
    const mapped = due.map(d => {
      const word = razWords.find(w => w.id === d.vocabId)
      return { vocabId: d.vocabId, meaning: word?.meaning || '', word: word?.word || '' }
    }).filter(c => c.meaning)
    setCards(mapped)
  }

  const handleAnswer = async (correct: boolean) => {
    if (showResult) return
    setShowResult(true)
    const { processReview, Rating } = await import('./services/srs')
    const current = cards[currentIndex]
    await processReview(current.vocabId, correct ? Rating.Good : Rating.Again)
    
    if (correct) setCorrectCount(c => c + 1)
    
    setTimeout(() => {
      setShowResult(false)
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(i => i + 1)
      } else {
        onComplete()
      }
    }, 800)
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
        <span className="text-7xl">🎉</span>
        <h2 className="text-2xl font-bold text-gray-800">太棒了！</h2>
        <p className="text-gray-500">没有需要复习的词</p>
        <button
          onClick={onComplete}
          className="bg-green-500 text-white font-bold py-3 px-8 rounded-2xl"
        >
          返回首页
        </button>
      </div>
    )
  }

  const current = cards[currentIndex]

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-4">
      {/* Progress */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>复习 {currentIndex + 1} / {cards.length}</span>
          <span>正确: {correctCount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Word */}
      <div className="text-5xl font-bold text-gray-800 my-8">
        {current.word}
      </div>

      {/* Meaning */}
      <div className="text-3xl text-purple-600 font-semibold">
        {showResult ? current.meaning : '?'}
      </div>

      {/* Buttons */}
      <div className="w-full grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={() => handleAnswer(false)}
          className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-4 px-6 rounded-2xl text-lg transition-all active:scale-95"
        >
          🤔 忘记了
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="bg-green-100 hover:bg-green-200 text-green-700 font-bold py-4 px-6 rounded-2xl text-lg transition-all active:scale-95"
        >
          ✅ 记住了
        </button>
      </div>
    </div>
  )
}

export default App
