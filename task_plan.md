# Task Plan: Pokemon英语App - 单词库和UI全面优化

## Goal
全面优化Pokemon英语学习App：扩充单词库到200+词、建立单词-配图-宝可梦三角强关联、优化Quiz多模式支持，整体UI达到80%完成度再给胡逸辰验收

## Current Phase
Phase 0: 需求确认 (AUQ)

## Phases

### Phase 0: 需求确认 (AUQ)
- [ ] 向胡逸辰确认关键设计决策
- **Status:** in_progress

### Phase 1: 词汇和配图系统优化
- [ ] 分析当前词汇库状态（120词，哪些有配图）
- [ ] 确定词汇-配图关联策略（哪些词需要配图）
- [ ] 确定词汇-宝可梦关联策略（如何建立强关联）
- [ ] MiniMax配额刷新后批量生成剩余配图
- **Status:** pending

### Phase 2: Quiz系统多模式支持
- [ ] 实现 en2cn 模式（英文→中文）
- [ ] 实现 cn2en 模式（中文→英文）
- [ ] 实现 mixed 模式（随机混合）
- [ ] Quiz界面加入单词配图显示
- **Status:** pending

### Phase 3: UI整体优化（目标80%完成度）
- [ ] 主页面视觉升级
- [ ] 学习流程页面优化
- [ ] 宝可梦图鉴页面增强
- [ ] 家长仪表盘完善
- **Status:** pending

### Phase 4: 测试和部署
- [ ] 本地测试所有功能
- [ ] 部署到GitHub Pages
- [ ] 向胡逸辰汇报进度
- **Status:** pending

## Key Questions
1. 词汇-配图关联：一个单词配一张图，还是一个单词配多张不同角度的图？
2. 词汇-宝可梦关联：一个单词固定绑定一只Pokemon，还是随机分配？
3. 词汇量目标：120词扩到多少？（200词？300词？）
4. Quiz是否需要显示配图？（目前Quiz只有文字）
5. 宝可梦和词汇的绑定关系：是否需要语义关联（比如"jump"绑火暴猴因为它爱跳）？

## Decisions Made
| Decision | Rationale |
|----------|-----------|
|          |           |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
|       | 1       |            |

## Notes
- MiniMax image-01 每日100张配额，00:00刷新
- Pokemon TCG卡片已生成50张，还需约100张
- 单词配图已生成30张，还需约170张
- 待胡逸辰确认后启动GStack组内分析
