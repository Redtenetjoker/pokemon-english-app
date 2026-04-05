# Findings: 女儿英语学习 App

## Requirements

来自 Brainstorming 的需求总结：

| 维度 | 用户答案 |
|------|---------|
| 孩子英文水平 | 能说简单句子，有一定基础 |
| 最大痛点 | 磨蹭不主动（选项B）+ 没有复习系统（选项C） |
| 家长期望 | A+B+C（主动学 + 减负 + 看到效果）都要 |
| 游戏偏好 | Pokemon 超级粉丝 |
| 激励机制 | Pokemon 收集 + 进化（非战斗） |
| 学习模式 | 双模式：短10分钟 / 长60分钟 |
| 自然拼读 | 辅助工具，嵌入学单词流程 |
| 词库来源 | RAZ 分级（主流认可）|
| 平台 | iPad，PWA |
| 教育理念 | 自然拼读+单词结合才有意义 |

## Pokemon 设计讨论

**初始设计问题**："变强"没有明确目标 → 进化才是核心目标
- 答对词 = 积累经验值 → 进化
- 进化需要：掌握N个新词 + 复习正确率>80%
- 最终选择：**进化驱动**（非战斗），保持学习核心

**战斗方案被否**：
- 理由：变成游戏 app，偏离学习本质
- 核心还是英语学习，Pokemon 只是激励外壳

## PWA 平台决策

- **不需要 App Store**：$99/年 + 审核麻烦
- **PWA = 渐进式网页应用**：添加到主屏幕 = 原生体验
- iPad Safari 支持完善
- 限制：无法推送通知（可后续解决）

## 学习流程设计（草案）

### 长模式（60分钟）
```
选择模式 → 热身(10min) → 闯关(15min) → 阅读/听力(15min) → 复习(10min) → 打卡获蛋
```

### 短模式（10分钟）
```
选择模式 → 快速闯关 → 打卡获蛋
```

## 技术栈参考

| 功能 | 技术选项 |
|------|---------|
| 前端框架 | React + TypeScript（可复用）/ Vue |
| PWA | manifest.json + service worker |
| 词库 | RAZ 分级词汇（需获取或购买） |
| 发音 | Web Speech API（TTS）|
| 数据存储 | IndexedDB（本地，跨session） |
| 后端 | 可选，MVP全前端实现 |
| Pokemon 素材 | 需确认版权问题，或用像素风格替代 |

## 待确认问题

- [ ] Pokemon 素材版权：官方精灵图不可商用，是否用像素风格替代？
- [ ] RAZ 词库获取方式：官方付费 / 开源镜像 / 自建？
- [ ] 是否需要后端：MVP全本地是否够用？

## GitHub 调研结果

### 1. PokeEnglish ⭐（高度相关）
**链接**: https://github.com/HTamasViktoria/pokeEnglish

Pokemon + 英语词汇学习，概念和大姚的需求几乎一致：
- 家长录入词汇列表 → 孩子学 → 掌握后获得 Pokemon 奖励
- 家长可以留鼓励信息
- MERN 栈（MongoDB + Express + React + Node.js）

**可借鉴**：
- Pokemon 奖励机制的具体实现方式
- 家长管理词汇列表的功能设计
- 亲子互动的设计思路

**不适用**：
- 有战斗系统（我们已否决）
- MERN 栈偏重（我们倾向轻量 PWA）

---

### 2. Vocamon ⭐⭐（最相关，架构最完整）
**链接**: https://github.com/trvannhanh/vocamon-project

词汇学习 + SRS 间隔重复 + 宠物收集进化系统：
- **SRS 复习算法**：每个词经历 Flashcard → Fill-in-Blank → MultipleChoice → Listening 四种题型
- **宠物机制**：收集、升级、进化，用 XP/AP
- **状态机**：词掌握状态流转
- **前端**：React + Vite + TypeScript + TailwindCSS（正好是我们想要的！）
- **后端**：ASP.NET Core + EF Core + SQL Server（偏重，但模块化设计可参考）

**可借鉴**：
- SRS 状态机设计（词的状态 + 转换规则）
- 宠物收集/升级/进化的 XP 系统
- 题型流程设计
- React + TailwindCSS 项目结构

---

### 3. FSRS (Free Spaced Repetition Scheduler) ⭐⭐⭐（SRS 算法首选）
**链接**: https://github.com/open-spaced-repetition/ts-fsrs

学术界支撑的最优间隔重复算法，比传统艾宾浩斯更准确：
- TypeScript 实现，可直接集成到 React 项目
- 适配 Anki 用户的 SM-2 算法改进版
- 状态转换图：https://github.com/open-spaced-repetition/ts-fsrs/raw/main/docs/../assets/ts-fsrs-workflow.drawio

**推荐直接使用** `ts-fsrs` npm 包处理复习调度

---

## 技术栈参考结论

| 功能 | 推荐技术 | 来源 |
|------|---------|------|
| 前端框架 | React + Vite + TypeScript + TailwindCSS | Vocamon |
| SRS 算法 | ts-fsrs npm 包 | FSRS 官方 |
| PWA | vite-plugin-pwa | 标准方案 |
| 状态管理 | React Context / Zustand | 轻量方案 |
| 本地存储 | IndexedDB（Dexie.js 封装）| 持久化 |
| 发音 | Web Speech API | 浏览器内置 |
| Pokemon 图 | 像素风格 Sprite（版权友好）| 第三方CDN |

## Resources

- PWA manifest: https://web.dev/learn/pwa/
- React PWA template: Vite + vite-plugin-pwa
- RAZ Kids: https://www.razplus.com/ (付费)
- 艾宾浩斯复习算法: https://en.wikipedia.org/wiki/Spaced_repetition
- PokeEnglish: https://github.com/HTamasViktoria/pokeEnglish
- Vocamon: https://github.com/trvannhanh/vocamon-project
- FSRS ts-fsrs: https://github.com/open-spaced-repetition/ts-fsrs
- Pokemon Sprite: https://github.com/PokeAPI/sprites
