# Task Plan: 女儿英语学习 App - Pokemon 版本

## Goal
为7岁半女儿设计并实现一款英语学习 PWA，融合 Pokemon 收集进化激励机制，主打 RAZ 词库 + 自然拼读辅助，目标让孩子主动想学、形成习惯、看到进步。

## Background（来自 Brainstorming）

| 维度 | 结论 |
|------|------|
| 孩子现状 | 能说简单句子，有一定基础 |
| 核心痛点 | 磨蹭不主动、没有复习系统 |
| 家长期望 | 主动学 + 减负 + 看到效果 |
| 游戏偏好 | Pokemon 超级粉丝 |
| 激励机制 | Pokemon 收集 + 进化（非战斗） |
| 学习时长 | 短模式10分钟 / 长模式60分钟两种可选 |
| 自然拼读 | 辅助工具（嵌入学单词流程） |
| 词库来源 | RAZ 分级为主 |
| 平台 | iPad PWA（渐进式网页应用） |

## Current Phase
Phase 1: GStack 设计评审

## Phases

### Phase 1: GStack 设计评审
- [x] CEO 视角评审（Brian Chesky 6问）
- [x] EM 方案设计
- [x] Tech Stack 确定（融合 Vocamon + PokeEnglish + ts-fsrs）
- [x] 写入 task_plan.md
- **Status:** ✅ complete

### Phase 2: 产品规格设计（Product Spec）
- [ ] 核心用户体验流程（User Flow）
- [ ] MVP 功能清单（Feature List）
- [ ] 技术架构设计
- [ ] 写入 docs/product-spec.md
- **Status:** in_progress

### Phase 3: UI/UX 设计
- [ ] 信息架构
- [ ] 关键页面设计（低保真）
- [ ] Pokemon 收集系统 UI
- [ ] 写入 docs/ui-design.md
- **Status:** pending

### Phase 4: 技术实现（MVP）
- [x] PWA 基础搭建（manifest + service worker）
- [x] RAZ 词库数据准备
- [x] FSRS 复习算法（ts-fsrs）
- [x] Pokemon 收集系统
- [x] 双模式学习流程
- [x] Pokemon 图鉴
- **Status:** ✅ MVP complete

### Phase 5: 家长端设计
- [ ] 学习报告页面
- [ ] 词库管理（添加/调整）
- **Status:** pending

### Phase 6: 测试 & 验证
- [ ] 在 iPad 上 PWA 安装测试
- [ ] 真实用户体验收集
- **Status:** pending

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| PWA 非原生 App | 省去 App Store 审核 + $99 年费，MVP 最快路径 |
| 战斗暂不加 | 先用"学习会话完成 → Pokemon 入库"轻量激励，后续按需加 |
| 双模式（10min/60min）| 选择权给孩子减少抵触，长短都有奖励 |
| 自然拼读=辅助工具 | 嵌入学单词里，不单独开设模块 |
| RAZ 词库 | 分级清晰、内容有趣、家长认可度高 |
| ts-fsrs 复习 | 替换 Vocamon SM-2，更精确的生产级算法 |
| 纯前端无后端 | IndexedDB 本地存储，够用且部署简单 |
| React + Vocamon 结构 | feature/hooks 模式，TypeScript + TailwindCSS |
| PokeAPI Pokemon | 151 基础精灵，无需自建数据 |
| 家长 PIN 码切换 | 简单，无需独立登录系统 |

## GStack 分析入口

- `gstack plan` → CEO 评审
- `gstack design` → 设计审查
- `lenny` → 产品策略验证

## Notes
- 先 GStack 设计评审，方案确认后再开始写代码
- 文档写入 `docs/` 目录
- 关键里程碑：MVP 可在 iPad 上安装使用
