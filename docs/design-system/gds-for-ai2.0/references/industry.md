# 行业依据与采用决策

本页记录 2.0 规范为什么采用当前结构。它不覆盖 Figma 观测事实；观测事实见 `artboards.md`。

## 1. Design Tokens Community Group 2025.10

来源：[Design Tokens Format Module 2025.10](https://www.designtokens.org/TR/2025.10/format/)

采用：

- `tokens.dtcg.json` 使用 `$value`、`$type`、`$description` 和花括号别名。
- 原始令牌与语义令牌分层；语义令牌保留对原始令牌的引用，而不是复制值。
- 颜色使用带 `colorSpace/components/alpha/hex` 的结构化值；尺寸带数值和单位。
- 字体和阴影使用复合令牌，使转换工具不必猜测字段含义。

原因：如果只交付一份扁平色值表，大模型和构建工具无法判断 `#1563EB` 是品牌、选中还是任意装饰色。别名把设计意图保留下来。

本包同时提供 `tokens.json`，它是给不支持 DTCG 结构的工程环境使用的已解析镜像；两份文件职责不同，不应只保留后者。

## 2. Figma Code Connect / MCP 的组件映射思路

来源：[Figma Code Connect integration](https://developers.figma.com/docs/figma-mcp-server/code-connect-integration/)

采用：

- 除令牌外增加 `components.json`，明确 anatomy、variant、state、内容规则和禁止项。
- 页面状态不是靠画板名称模糊匹配，而是用 `pageStates` 声明 required/forbidden 组件。
- 技能提及、输入框、结果文件卡等组件以语义组件名表达，便于未来映射到真实代码组件。

原因：视觉值只解决“长什么样”，组件映射才能解决“在什么状态下、以什么属性组合出现”。这正是设计到代码一致性的关键缺口。

后续如果项目已有生产组件，建议把 `components.json` 的组件名绑定到 Code Connect，而不是让模型每次重造 DOM。[R]

## 3. DESIGN.md 的“令牌 + 叙事 + 校验”结构

来源：[Google Labs DESIGN.md 规范](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)

采用：

- `design.md` 使用机器可读前置元数据和人可读规范正文。
- 令牌记录精确值，正文记录设计理由、使用边界和禁止行为。
- 使用 `[O] / [D] / [R]` 证据等级，避免把工程补全误写成原稿事实。
- 提供自动验证和人工视觉门禁；自动验证检查引用，人工检查负责布局、状态和无障碍。

原因：没有理由和边界的 JSON 令牌很容易被模型误用；只有散文又无法被工具可靠解析。两者必须配对。

## 4. Storybook 的独立状态与视觉验收思想

来源：[Why Storybook?](https://storybook.js.org/docs/get-started/why-storybook)

采用：

- 六个画板被转换成六个可独立验收的页面状态。
- 组件契约显式描述 disabled、selected、generating、completed 等状态。
- `assets/reference/` 为视觉回归基线，而不是仅靠主观描述。

原因：组件如果只在整页里验证，很容易漏掉边界状态；状态隔离能让设计、开发和模型使用同一份行为清单。

本包没有强制项目使用 Storybook；采用的是它的状态隔离与可重复验收方法。[R]

## 5. WCAG 2.2 颜色对比度

来源：[WCAG 2.2 — Understanding Success Criterion 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

采用：

- 普通文本生产目标至少 4.5:1，大号文本至少 3:1。
- 保留原稿 `#939393` 作为 Fidelity 模式的观测弱文字色，但限制其承载必要小字。
- Production 模式中，必要小字改用 `#6B7280` 或 `#4A4A4A`。

对比度计算结果：

| 前景 / 背景 | 对比度 | 决策 |
| --- | ---: | --- |
| `#939393 / #FFFFFF` | 3.07:1 | 仅占位、禁用、非必要信息 |
| `#939393 / #F5F5F5` | 2.82:1 | 不承载必要小字 |
| `#6B7280 / #FFFFFF` | 4.83:1 | 可用于必要普通文字 |
| `#4A4A4A / #FFFFFF` | 8.86:1 | 可用于次级正文 |
| `#1563EB / #FFFFFF` | 5.23:1 | 可用于普通蓝色文字 |

计算采用 WCAG 的 sRGB 相对亮度公式。这里没有偷偷修改 Figma 事实，而是把“像素复刻”和“生产可访问性”拆成可显式选择的模式。

## 6. 从 1.0 继承与改进

从项目内 `gdsforai-1.0` 继承：

- 主规范、令牌、画板来源追踪三层结构。
- MUST/SHOULD/MAY 规范语言。
- 生成步骤与验收清单。

2.0 的改进：

- 增加 DTCG 标准源令牌，不再只有自定义扁平 JSON。
- 增加机器可读组件契约，解决“令牌正确但组件组合错误”。
- 增加 required/forbidden 状态矩阵，防止生成中泄露完成态。
- 增加 Fidelity/Production 双模式，显式处理原稿对比度不足。
- 增加资产分类与隐私边界，排除只应存在于强模糊层下的原始截图。
- 增加自动验证脚本和六张独立视觉基准图。

## 7. 尚未采用的内容

- 未把未成熟或缺少项目基础设施的设计系统交换格式设为强依赖。
- 未凭行业惯例发明暗色模式、移动端断点、错误色或动效曲线。
- 未把 Figma 画板中的用户头像、历史文案、PPT 页面内容提升为品牌令牌。

原则是：行业经验用于补齐交付结构和质量门禁，不能覆盖或伪造源设计事实。
