# Pokemon 英语学习 App - MVP 实现进度

## ✅ 已完成功能

### 1. PWA 基础配置 ✅
- `vite.config.ts` 配置了 `vite-plugin-pwa`
- `manifest.webmanifest` 自动生成
- PWA icons (SVG) 在 `public/` 目录
- Service Worker 自动注册 (`generateSW` 模式)
- Pokemon sprites 缓存策略配置（30天）

### 2. 项目结构搭建 ✅
```
src/
├── types/index.ts          ✅ 类型定义（VocabWord, Pokemon, LearningState 等）
├── data/words.ts          ✅ 56个 RAZ Level A-C 词汇
├── services/
│   ├── db.ts              ✅ Dexie.js 数据库（pokemon, dailyProgress, vocabCards 表）
│   ├── srs.ts             ✅ ts-fsrs 封装（processReview, getDueCards）
│   └── pokemon.ts         ✅ PokeAPI sprite URL + 151只Pokemon中文名
├── hooks/
│   ├── useQuizSession.ts  ✅ 学习会话状态机（useReducer）
│   └── useReview.ts       ✅ 复习会话 hook
├── features/
│   ├── learningSession/
│   │   ├── LearningSession.tsx   ✅ 主学习会话（模式选择）
│   │   ├── GameScreen.tsx       ✅ 看图选词（4选1）+ 音节拆解
│   │   └── SessionComplete.tsx  ✅ 完成奖励动画 + Pokemon 解锁
│   ├── pets/
│   │   ├── Pets.tsx             ✅ Pokemon 图鉴（收集进度）
│   │   └── PetDetailPage.tsx    ✅ Pokemon 详情 + XP/等级
│   └── parent/
│       └── ParentDashboard.tsx  ✅ 家长端统计 + 数据管理
└── App.tsx                      ✅ 首页 + 导航 + 复习会话
```

### 3. 核心功能实现 ✅

**首页** ✅
- Pokemon 收集进度展示
- 今日学习统计（次数/新词/待复习）
- 开始学习按钮（醒目大按钮）
- 待复习词提醒条幅
- 最近收集 Pokemon 预览

**学习模式** ✅
- 短模式：6道题（约10分钟）
- 长模式：15道题（约60分钟）
- 看图选词：emoji图片 + 4个中文含义选项
- 自然拼读辅助：音节拆解显示（如 c-a-t）
- 实时进度条
- 答对/答错反馈动画

**Pokemon 收集** ✅
- 学习完成随机获得一只 Pokemon（1-151）
- NEW! 标签标记新获得
- XP 积累系统（每100 XP 升1级）
- 收集进度条（X / 151）

**Pokemon 图鉴** ✅
- 网格展示所有已收集 Pokemon
- 点击查看详情（等级/XP/总经验值）
- 进化提示（占位，P1实现）

**复习系统** ✅
- ts-fsrs 间隔重复算法
- 显示 due 的词汇
- 记住了/忘记了 二选一按钮
- 自动更新下次复习时间

**家长端** ✅
- Pokemon 收集统计
- 今日/历史学习统计
- 待复习词数量
- 数据清除功能（需确认）

### 4. 技术栈集成 ✅
- React 18 + TypeScript ✅
- Vite ✅
- TailwindCSS v4 (@tailwindcss/vite) ✅
- Dexie.js（IndexedDB） ✅
- ts-fsrs ✅
- vite-plugin-pwa ✅

### 5. 儿童友好设计 ✅
- 大字体（≥18pt）
- 按钮最小 48px
- 鲜艳色彩（黄/蓝/绿/紫）
- 圆角卡片设计
- 简单动画反馈（bounce/pulse）
- emoji 辅助图标

## 📋 P0 功能清单

| 功能 | 状态 |
|------|------|
| PWA manifest + service worker | ✅ |
| 首页（进度+开始按钮） | ✅ |
| 学习模式（短/长） | ✅ |
| 看图选词（4选1） | ✅ |
| Pokemon 收集奖励 | ✅ |
| Pokemon 图鉴 | ✅ |
| 复习系统（FSRS） | ✅ |
| 自然拼读辅助（音节拆解） | ✅ |

## 🚀 运行命令

```bash
# 开发
npm run dev

# 预览 PWA
npm run preview

# 构建
npm run build
```

## 📁 构建产物
- `dist/` 目录包含完整 PWA
- 可通过 `npm run preview` 本地预览
- 可部署到任意静态托管（Vercel/Netlify/Cloudflare Pages）

## ⏭️ P1 待实现
- [ ] Pokemon 进化系统（XP积累 → 进化形态变化）
- [ ] 家长 PIN 码切换
- [ ] 家长端进度报告（周报/月报）
- [ ] 词库扩展（RAZ Level D-E）
- [ ] 发音 TTS（Web Speech API）
