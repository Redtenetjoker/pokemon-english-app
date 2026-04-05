import { useEffect, useState } from 'react'
import LearningSession from './features/learningSession/LearningSession'
import Pets from './features/pets/Pets'
import ParentDashboard from './features/parent/ParentDashboard'
import { getAllPokemon, getTodayProgress } from './services/db'
import type { AppView } from './types'

function App() {
  const [view, setView] = useState<AppView>('home')

  if (view === 'home') {
    return (
      <HomeView
        onStartLearning={() => setView('learning')}
        onViewPets={() => setView('pets')}
        onViewReview={() => setView('review')}
        onOpenParent={() => setView('parent')}
      />
    )
  }

  if (view === 'learning') {
    return (
      <div className="min-h-screen bg-[#3B5FA8]">
        <LearningSession onComplete={() => setView('home')} />
      </div>
    )
  }

  if (view === 'pets') {
    return (
      <div className="min-h-screen bg-white">
        <Pets onBack={() => setView('home')} />
      </div>
    )
  }

  if (view === 'review') {
    return (
      <div className="min-h-screen bg-[#3B5FA8]">
        <ReviewSession onComplete={() => setView('home')} />
      </div>
    )
  }

  if (view === 'parent') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ParentDashboard onBack={() => setView('home')} />
      </div>
    )
  }

  return null
}

// Home View - 参考 Pokemon GO 简洁布局
function HomeView({
  onStartLearning,
  onViewPets,
  onViewReview,
  onOpenParent,
}: {
  onStartLearning: () => void
  onViewPets: () => void
  onViewReview: () => void
  onOpenParent: () => void
}) {
  const [pokemonCount, setPokemonCount] = useState(0)
  const [todayProgress, setTodayProgress] = useState({ shortSessions: 0, longSessions: 0, wordsLearned: 0, wordsReviewed: 0 })
  const [dueReviewCount, setDueReviewCount] = useState(0)

  useEffect(() => {
    loadHomeData()
  }, [])

  const loadHomeData = async () => {
    const all = await getAllPokemon()
    const today = await getTodayProgress()
    setPokemonCount(all.length)
    setTodayProgress(today)
    
    const { getDueVocabCards } = await import('./services/db')
    const due = await getDueVocabCards()
    setDueReviewCount(due.length)
  }

  const todayTotal = todayProgress.shortSessions + todayProgress.longSessions

  return (
    <div className="min-h-screen bg-[#3B5FA8] flex flex-col relative overflow-hidden">
      {/* Background illustration */}
      <img
        src="/images/study-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />

      {/* Header */}
      <div className="relative bg-[#FFCB05] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" 
            alt="pikachu" 
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-lg font-bold text-[#3B5FA8]">Pokemon 学英语</h1>
        </div>
        <button
          onClick={onOpenParent}
          className="w-9 h-9 bg-white/30 rounded-full flex items-center justify-center text-sm"
        >
          ⚙
        </button>
      </div>

      {/* Main content */}
      <div className="relative flex-1 px-5 py-6 flex flex-col gap-5">
        {/* Start Learning - 主按钮 */}
        <button
          onClick={onStartLearning}
          className="w-full bg-[#FFCB05] text-[#3B5FA8] font-bold text-lg py-5 rounded-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" 
            alt="" 
            className="w-10 h-10 object-contain"
          />
          <span>开始学习</span>
        </button>

        {/* Stats row */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white/15 rounded-xl px-4 py-3">
            <div className="text-white/60 text-xs mb-1">今日学习</div>
            <div className="text-white text-xl font-bold">{todayTotal} 次</div>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl px-4 py-3">
            <div className="text-white/60 text-xs mb-1">新词</div>
            <div className="text-white text-xl font-bold">{todayProgress.wordsLearned}</div>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl px-4 py-3">
            <div className="text-white/60 text-xs mb-1">待复习</div>
            <div className="text-white text-xl font-bold">{dueReviewCount}</div>
          </div>
        </div>

        {/* Review banner */}
        {dueReviewCount > 0 && (
          <button
            onClick={onViewReview}
            className="w-full bg-[#E3350D] text-white font-bold py-4 rounded-xl text-center active:scale-[0.98] transition-transform"
          >
            有 {dueReviewCount} 个词等待复习
          </button>
        )}

        {/* Pokemon Collection */}
        <div className="bg-[#3B5FA8] border border-white/20 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#3B5FA8] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">Pokemon 图鉴</span>
              <span className="text-white/60 text-sm">{pokemonCount}/151</span>
            </div>
            <button
              onClick={onViewPets}
              className="text-[#FFCB05] text-sm font-medium"
            >
              查看全部
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-white/20">
            <div 
              className="h-full bg-[#FFCB05] transition-all"
              style={{ width: `${(pokemonCount / 151) * 100}%` }}
            />
          </div>

          {/* Pokemon grid */}
          <div className="p-4">
            <PokemonGrid onViewAll={onViewPets} />
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  )
}

// Pokemon grid - minimal style
function PokemonGrid({ onViewAll }: { onViewAll: () => void }) {
  const [recent, setRecent] = useState<import('./services/db').StoredPokemon[]>([])

  useEffect(() => {
    getAllPokemon().then(all => {
      setRecent(all.slice(0, 8))
    })
  }, [])

  if (recent.length === 0) {
    return (
      <div className="text-center py-6 text-white/50 text-sm">
        完成学习任务获得 Pokemon
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {recent.map(p => (
        <div
          key={p.id}
          className="bg-white rounded-lg p-2 flex flex-col items-center"
        >
          <img src={p.image} alt={p.nameCn} className="w-12 h-12 object-contain" />
          <span className="text-xs text-gray-600 mt-1 truncate w-full text-center">{p.nameCn}</span>
        </div>
      ))}
      <button
        onClick={onViewAll}
        className="bg-white/50 rounded-lg p-2 flex flex-col items-center justify-center min-h-[60px]"
      >
        <span className="text-gray-400 text-lg">→</span>
      </button>
    </div>
  )
}

// Simple Review Session
function ReviewSession({ onComplete }: { onComplete: () => void }) {
  const [cards, setCards] = useState<{ vocabId: string; meaning: string; word: string }[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)

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
    
    setTimeout(() => {
      setShowResult(false)
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(i => i + 1)
      } else {
        onComplete()
      }
    }, 600)
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-5 relative">
        <img 
          src="/images/celebrate.png"
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" 
          alt="" 
          className="w-24 h-24 object-contain relative z-10"
        />
        <h2 className="text-2xl font-bold text-white relative z-10">太棒了！</h2>
        <p className="text-white/70 relative z-10">没有需要复习的词</p>
        <button
          onClick={onComplete}
          className="bg-white/20 text-white font-bold py-3 px-8 rounded-xl relative z-10"
        >
          返回首页
        </button>
      </div>
    )
  }

  const current = cards[currentIndex]

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <img
        src="/images/study-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      {/* Header */}
      <div className="relative bg-[#FFCB05] px-5 py-4 z-10">
        <div className="text-[#3B5FA8] text-sm font-medium mb-2">
          复习 {currentIndex + 1} / {cards.length}
        </div>
        <div className="h-2 bg-white/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B5FA8] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-5 gap-8 z-10">
        {/* Pokemon sprite */}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(Math.random() * 151) + 1}.png`}
          alt=""
          className="w-32 h-32 object-contain"
        />

        {/* Word */}
        <div className="text-center">
          <div className="text-white text-4xl font-bold mb-2">{current.word}</div>
          <div className={`text-xl transition-all ${showResult ? 'text-[#FFCB05]' : 'text-white/50'}`}>
            {showResult ? current.meaning : '点击下方按钮'}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full grid grid-cols-2 gap-3">
          <button
            onClick={() => handleAnswer(false)}
            className="bg-white/20 text-white font-bold py-4 rounded-xl active:scale-95 transition-transform"
          >
            再想想
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="bg-[#FFCB05] text-[#3B5FA8] font-bold py-4 rounded-xl active:scale-95 transition-transform"
          >
            记住了
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
