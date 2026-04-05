# 深度研究：三个开源项目融合评估

> 研究日期：2026-04-05  
> 目标：为7岁半孩子设计的 Pokemon 主题英语学习 PWA

---

## 1. PokeEnglish

**GitHub**: https://github.com/HTamasViktoria/pokeEnglish  
**技术栈**: MongoDB + Express + React + Node.js（MERN）  
**研究深度**: 已 clone 并分析 server.js / model / React 组件源码

### 架构分析

```
客户端 (React + Vite)
    ↓ REST API
服务端 (Express.js)
    ↓ Mongoose ODM
数据库 (MongoDB Atlas)
```

**服务端路由一览**:
- `/api/addnew` — 家长添加词汇（english/hungarian/topic）
- `/api/addNewTopic` — 家长创建 Pokemon Topic（绑定 Pokemon 图片 URL）
- `/api/topics` — 获取所有 Topic（含 default/shiny 图片 URL）
- `/api/words/:topic` — 按 Topic 获取词汇列表
- `/api/rewards` — 奖励列表 CRUD
- `/api/inventory` — 用户 Pokemon 收集库（name/pokemon/default+shiny/bothCompleted）
- `/api/results` — 答题结果记录
- `/api/users` — 用户注册/登录/积分

**核心业务逻辑**（Quiz.jsx）:
1. 用户选择一个 Topic（如 "fruit"），对应一个 Pokemon
2. 进入 Quiz，匈牙利语 → 选对应英语单词（4选1）
3. **全部答对** → 获得该 Pokemon，加入 Inventory，积分+1
4. 部分答错 → Retry，不能获得 Pokemon

### Pokemon 奖励机制

```javascript
// 答对后存入 inventory
const pokemonData = {
  name: reward.name,
  pokemon: { default: reward.url.default, shiny: reward.url.shiny },
  bothCompleted: false
};
fetch('/api/inventory', { method: 'POST', body: JSON.stringify(pokemonData) })

// 用户积分 +1
fetch(`/api/users/${user._id}`, {
  method: 'PATCH',
  body: JSON.stringify({ points: user.points + 1 })
})
```

**特点**: 一次性奖励——Topic 全部词汇答对就解锁，写法简单直接。

### 家长录入功能

```javascript
// POST /api/addNewTopic
{
  name: "fruit",
  url: { default: "...", shiny: "..." },
  createdAt: ...
}
```

家长录入界面（Rewards.jsx）：表单输入奖励名称 + 积分，没有词汇直接录入功能。

### 代码复用评估

| 维度 | 评分 | 说明 |
|------|------|------|
| Pokemon 收集/解锁逻辑 | ⭐⭐⭐ | 简单 Topic→Pokemon 映射，可直接参考 |
| 奖励积分机制 | ⭐⭐ | 仅 +1 积分，太简单，需扩展 |
| 家长词汇录入 | ⭐ | 无结构化录入，需重新设计 |
| React 项目结构 | ⭐ | 缺乏组件化，仅 SPA 简单组件 |
| 后端架构 | ⭐ | Express 直连 MongoDB，无 service 层 |

**可直接复用**:
- Topic → Pokemon 映射模型（Inventory Schema）
- "全对才能获得 Pokemon" 的游戏化设计理念

**需改造**:
- 整体架构太简单，不能直接复用
- 家长功能需全新设计（RAZ 词汇库是结构化的）
- MongoDB → 轻量本地存储（IndexedDB）更适合 PWA

### 融合建议

**匹配度: 2/5**

PokeEnglish 的价值在于"概念验证"——证明了 Pokemon + 学习这个玩法是可行的。但实现太简陋，无法作为基础。建议：

- ✅ **借鉴**: Pokemon 奖励动画/UI 概念（答对展示 Pokemon 卡片）
- ✅ **借鉴**: "Topic = Pokemon" 的隐喻设计
- ❌ **不复用**: 后端架构、家长录入设计

---

## 2. Vocamon（WordSoul）

**GitHub**: https://github.com/trvannhanh/vocamon-project  
**技术栈**: React + Vite + TypeScript + TailwindCSS + ASP.NET Core + SQL Server  
**研究深度**: 已 clone，完整分析了 React 前端（features/services/types/hooks）和 ASP.NET 后端（Domain/Application 层）

### 架构分析

```
wordsoul-app (React 前端)
├── features/          # 功能模块（按领域组织）
│   ├── learningSession/
│   ├── pets/
│   ├── vocabularySet/
│   ├── battle/
│   └── ...
├── services/         # API 调用层
├── hooks/             # React hooks（状态管理核心）
├── types/             # TypeScript DTO 定义
└── components/        # 可复用 UI 组件

WordSoulApi (ASP.NET Core 后端)
├── Domain/Entities   # 数据实体（含 SRS 相关）
├── Application/Services/SRS/  # SM-2 算法实现
└── ...
```

### React 项目结构详解

**核心文件对应关系**:

| 前端类型/接口 | 后端实体 | 用途 |
|---|---|---|
| `LearningSessionDto` | `LearningSession.cs` | 学习会话（含 petId/catchRate/buffPetId） |
| `QuizQuestionDto` | 动态生成 | 当前题目（词汇/题型/选项） |
| `AnswerRequestDto` | `AnswerRecord.cs` | 用户答案提交 |
| `PetDto` / `PetDetailDto` | `Pet.cs` / `UserOwnedPet.cs` | Pokemon 属性 + 进化数据 |
| `UserVocabularyProgress` | `UserVocabularyProgress.cs` | SM-2 参数存储 |

**宠物/XP/进化系统实现**（PetDto.ts）:

```typescript
interface PetDetailDto {
  id: number;
  name: string;
  level: number | null;        // 当前等级
  experience: number | null;    // 当前 XP
  isFavorite: boolean | null;
  isActive: boolean;            // 是否出战
  acquiredAt: string | null;
  baseFormId: number | null;    // 进化链：基础形态 ID
  nextEvolutionId: number | null; // 进化到哪个 ID
  requiredLevel: number | null; // 进化所需等级
}
```

**进化触发**（在 `completeLearningSession` 时）: 宠物 XP 累加达到阈值 → 升级 → 检查 `requiredLevel` 是否满足 → 触发进化。

**SRS 状态机设计**（VocabularySetTypes / LearningSessionTypes）:

```typescript
// 题型级别映射
const levelToType = {
  0: QuestionTypeEnum.Flashcard,    // 看单词/释义
  1: QuestionTypeEnum.FillInBlank,  // 填空
  2: QuestionTypeEnum.MultipleChoice, // 选择
  3: QuestionTypeEnum.Listening,     // 听力
};
```

**会话流程**（useQuizSession hook）:
1. `fetchQuizOfSession(sessionId)` → 批量加载题目（每次多个）
2. 用户答题 → `answerQuiz(sessionId, request)` → 返回 `isCorrect` + `newLevel`
3. 答对 → `newLevel++`，下次显示更高难度题型
4. 答错 → `newLevel--`（或 stay），catchRate -0.05
5. 4个题型全部通过（newLevel 达到上限）→ 词汇被认为"已掌握"（单次会话内）
6. 会话结束 → `completeLearningSession` → XP + Pokemon 奖励

### 题型流程详解

```
单词进入会话
    ↓
[Level 0] Flashcard    — 先展示单词 + 释义（学习模式）
    ↓ 答对
[Level 1] FillInBlank   — 填空
    ↓ 答对
[Level 2] MultipleChoice — 4选1
    ↓ 答对
[Level 3] Listening     — 听发音选单词
    ↓ 完成
词汇标记为"已掌握"（单次会话内）
```

### 代码复用评估

| 维度 | 评分 | 说明 |
|------|------|------|
| React 项目结构 | ⭐⭐⭐⭐⭐ | feature-based 模块化，hooks 分离状态，TypeScript 类型完整 |
| Pokemon 进化系统 | ⭐⭐⭐⭐ | PetDetailDto + level + requiredLevel 进化链设计完善 |
| XP 奖励机制 | ⭐⭐⭐⭐ | 宠物 XP Multiplier / CatchBonus / HintShield 等 buff 设计精妙 |
| 学习会话流程 | ⭐⭐⭐⭐ | 题型递进（Flashcard→听力）+ 批次加载 + catchRate 机制 |
| SRS 算法 | ⭐⭐⭐ | SM-2 实现，但建议改用 ts-fsrs（见第三节） |
| 家长端设计 | ⭐⭐ | 无家长端，只有 Admin 角色 |
| 后端架构 | ⭐⭐⭐ | ASP.NET Core + EF Core，代码质量高，但部署复杂度高 |

**可直接复用**:
- `src/features/learningSession/LearningSession.tsx` — 主会话 UI 结构
- `src/features/pets/Pets.tsx` — 宠物图鉴列表（过滤/搜索/无限滚动）
- `src/hooks/LearningSession/useQuizSession.ts` — **最关键**：会话状态机 hook
- `src/types/PetDto.ts` — Pokemon 属性建模（type/rarity/进化链）
- `src/types/LearningSessionDto.ts` — DTO 类型定义
- `src/services/learningSession.ts` — API 调用封装

**需改造**:
- ASP.NET Core 后端 → 去掉，用轻量 API（Supabase/Firebase）或本地 IndexedDB
- SM-2 算法 → 替换为 ts-fsrs（更现代）
- 家长端 → 需独立设计
- 登录/Admin 角色 → 简化为家长/孩子双角色
- "复习"模式 → 与 ts-fsrs 的复习概念对齐

### 融合建议

**匹配度: 4/5**（前端部分）

Vocamon 是三个项目中最值得深度复用的。其前端 React 项目结构极为规范，hooks 模式成熟，宠物系统完整。核心融合策略：

1. **整体借鉴**: 采用 `features/` 按领域组织 + `hooks/` 状态管理的结构
2. **直接复用**: `LearningSession` 会话流程、`Pets` 宠物图鉴的 UI/UX
3. **改造**: SM-2 → ts-fsrs；去掉 SignalR；简化 Auth
4. **新增**: 家长端、RAZ 词汇库集成

---

## 3. ts-fsrs

**GitHub**: https://github.com/open-spaced-repetition/ts-fsrs  
**npm**: `npm install ts-fsrs`  
**Node.js 要求**: >= 20.0.0

### 集成方案

```bash
npm install ts-fsrs
```

```typescript
import { createEmptyCard, fsrs, Rating } from 'ts-fsrs'

const scheduler = fsrs()  // 默认参数

// 创建新卡片
const card = createEmptyCard()

// 预览所有评分结果（用户选择前）
const preview = scheduler.repeat(card, new Date())
// preview[Rating.Again]  → 失败
// preview[Rating.Hard]   → 困难
// preview[Rating.Good]   → 良好
// preview[Rating.Easy]   → 简单

// 用户选择评分后，提交结果
const result = scheduler.next(card, new Date(), Rating.Good)
// result.card    → 下一状态（含 due/interval/stability）
// result.log     → 复习日志
```

### 核心 API

| 函数 | 用途 |
|------|------|
| `createEmptyCard()` | 创建空白卡片 |
| `scheduler.repeat(card, now)` | 预览所有 Rating 结果 |
| `scheduler.next(card, now, rating)` | 提交评分，获取下一状态 |
| `scheduler.get_retrievability(card, now, decay?)` | 查询"可回忆率" |
| `scheduler.rollback(card, log)` | 回滚到上一状态 |
| `scheduler.forget(card, now)` | 重置卡片为 New |

### 自定义参数

```typescript
const scheduler = fsrs({
  request_retention: 0.9,    // 目标记忆保留率（默认90%）
  maximum_interval: 36500,    // 最大间隔（天）
  enable_fuzz: true,          // 间隔随机化（防止卡片扎堆）
  enable_short_term: true,   // 启用短时学习步骤
  learning_steps: ['1m', '10m'],   // 学习阶段的复习间隔
  relearning_steps: ['10m'],        // 重学阶段
})
```

### 关键类型

```typescript
interface Card {
  due: Date
  interval: number      // 天数
  stability: number     // 稳定度（记忆稳定性指标）
  difficulty: number    // 难度（0-10）
  state: State          // New | Learning | Review | Relearning
  last_review: Date | null
}

interface Log {
  rating: Rating
  due: Date
  review: Date
  interval: number
  last_interval: number
  // ...
}

enum State { New, Learning, Review, Relearning }
enum Rating { Again, Hard, Good, Easy }
```

### Vocamon 的 SM-2 vs ts-fsrs

| 维度 | Vocamon (SM-2) | ts-fsrs |
|------|----------------|---------|
| 稳定性计算 | 固定 EF | 动态 stability + difficulty 双参数 |
| 间隔计算 | EF × 前一次间隔 | 基于记忆模型预测 |
| 遗忘曲线 | 简单线性 | 指数衰减模型 |
| Fuzz（间隔抖动） | 无 | 有（防止扎堆） |
| 可视化回顾 | 无 | `get_retrievability()` |
| 适用年龄 | 通用 | 通用（可配置参数） |

**结论**: Vocamon 的 `SRSAlgorithm.cs` 是教学级 SM-2 实现，但 ts-fsrs 是生产级 FSRS 算法，精确度更高、参数更丰富。**建议直接用 ts-fsrs 替换 Vocamon 的 SM-2**。

### 融合建议

**匹配度: 5/5**（对 SRS 需求而言）

ts-fsrs 是最小化、最纯粹的 SRS 算法库，可直接嵌入 React 项目：

1. **安装**: `npm install ts-fsrs`
2. **持久化**: 卡片状态存 IndexedDB（本地 PWA）
3. **复习流程**: 用户进入复习 → 读 IndexedDB 中 due 的卡片 → 调用 `scheduler.repeat()` 预览 → 用户选择 Rating → 调用 `scheduler.next()` 更新 → 写回 IndexedDB
4. **学习流程**: 新词创建 `createEmptyCard()`，直接进入 Learning 状态

---

## 融合架构建议

### 推荐技术栈

```
前端: React 18 + TypeScript + Vite + TailwindCSS + PWA (Workbox)
SRS : ts-fsrs (npm install ts-fsrs)
存储: IndexedDB (Dexie.js 封装) — 替代 MERN 后端
状态: React Context + useReducer（参考 Vocamon hooks 模式）
家长端: 同一 PWA + 家长 PIN 码切换视图
```

### 组件结构

```
src/
├── features/
│   ├── learningSession/
│   │   ├── LearningSession.tsx       # 主学习会话（参考 Vocamon）
│   │   ├── GameScreen.tsx            # 上屏：题目展示
│   │   ├── AnswerScreen.tsx          # 下屏：答题区
│   │   ├── MilestoneOverlay.tsx      # 里程碑弹层（答对5/10/15题）
│   │   └── SessionComplete.tsx       # 会话完成奖励动画
│   ├── pets/
│   │   ├── Pets.tsx                  # 宠物图鉴（参考 Vocamon）
│   │   ├── PetCard.tsx               # 宠物卡片组件
│   │   └── PetDetailPage.tsx         # 宠物详情 + 进化
│   ├── review/
│   │   ├── ReviewSession.tsx         # 复习模式（ts-fsrs）
│   │   └── ReviewCard.tsx            # 复习闪卡
│   └── parent/
│       ├── ParentDashboard.tsx        # 家长端：进度总览
│       └── VocabularyManager.tsx      # 家长：管理孩子词汇
├── hooks/
│   ├── useQuizSession.ts             # 学习会话状态机（参考 Vocamon useQuizSession）
│   ├── useReview.ts                  # 复习会话（封装 ts-fsrs）
│   └── usePet.ts                     # 宠物状态管理
├── services/
│   ├── srs.ts                        # ts-fsrs 封装
│   ├── db.ts                         # Dexie.js (IndexedDB) 操作
│   └── pokemon.ts                    # Pokemon 数据（PokeAPI）
├── types/
│   ├── Card.ts                       # ts-fsrs Card 类型扩展
│   ├── Pet.ts                        # Pokemon 属性
│   └── Vocabulary.ts                 # 词汇类型
└── App.tsx
```

### 数据流设计

```
┌─────────────────────────────────────────────────────────────┐
│                      IndexedDB (Dexie.js)                    │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │  VocabCard   │  │  UserPet      │  │  VocabularySet   │  │
│  │  - word      │  │  - petId      │  │  - id            │  │
│  │  - meaning   │  │  - level      │  │  - words[]       │  │
│  │  - ts-fsrs  │  │  - xp         │  │  - difficulty    │  │
│  │    Card      │  │  - evolvedId  │  │                  │  │
│  └──────────────┘  └───────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↑
                    ┌─────────┴─────────┐
                    │   ts-fsrs 调度层   │
                    │  scheduler.repeat()│
                    │  scheduler.next()  │
                    └─────────┬─────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                    React UI Layer                           │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │LearningMode│  │ ReviewMode   │  │ ParentDashboard   │   │
│  │10/60分钟  │  │ ts-fsrs due  │  │ 进度报告          │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**数据流说明**:
1. **新词学习**: RAZ 词汇 → 创建 `createEmptyCard()` → 存入 IndexedDB → Learning 流程
2. **复习**: 从 IndexedDB 筛选 `due <= now` 的卡片 → `scheduler.repeat()` 预览 → 用户 Rating → `scheduler.next()` 更新 → 写回 IndexedDB
3. **Pokemon 奖励**: 学习会话完成（Vocamon 模式）→ 解锁/升级 Pokemon → 更新 `UserPet` 表
4. **家长端**: 读取 IndexedDB 汇总数据 → 生成进度图表

### 关键技术决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| 后端 | 无（纯前端 PWA） | 7岁孩子 app，数据敏感度低，IndexedDB 足够 |
| SRS 算法 | ts-fsrs（替换 Vocamon SM-2） | 更精确的间隔预测，生产级验证 |
| 状态管理 | Vocamon hooks 模式 | 成熟、TypeScript 友好、无 Redux 复杂度 |
| 家长端 | 家长 PIN 码切换 | 简单，无需独立登录 |
| Pokemon 数据 | PokeAPI（实时） | 151+ 基础 Pokemon，无需自建 |
| 词汇库 | RAZ Plus 分级词汇 | 结构化，按年级/GRL 分级 |
| 学习模式 | Vocamon 双模式 | Learning（4题型递进）+ Review（ts-fsrs 调度） |

---

## 总结

| 项目 | 最终评分 | 复用建议 |
|------|----------|----------|
| **PokeEnglish** | 2/5 | 仅借鉴"答对解锁 Pokemon"概念，不复用代码 |
| **Vocamon** | 4/5 | **核心参考** — React 结构、hooks、会话流程、宠物系统直接复用或适配 |
| **ts-fsrs** | 5/5 | **直接集成** — npm install，替换 Vocamon SM-2 |
