---
kind: upgrade-guide
description: "模型切换压缩使用所选提供方和模型，而不再使用先前路由。"
---

# 模型切换使用所选目标生成摘要

[English](guide.md) | 中文

## 变更

自动压缩（compaction）需要在提供方／模型切换前生成摘要时，空的 `summarizationProvider` / `summarizationModel` 配置对现在会选择目标及其摘要策略。此前，摘要由先前请求的路由及其策略生成，因此移除其提供方或模型可能阻止切换。原路由不再需要保持可用。

目标现在处理辅助摘要；提供商对该请求收取的任何费用都计入目标账户。切换时，默认选择不再复用先前模型的前缀缓存。显式配置的摘要提供方／模型对仍然优先；普通压力压缩、溢出恢复和手动 `/compact` 保持现有目标选择方式。切换压缩失败或取消时，仍然保留先前请求 header。

## 迁移

1. 要让摘要跟随所选目标，将两个摘要字段都留空。检查每个目标的 `modelPolicies` 配置项：`maxTokens` 必须符合其输出额度，`headroomTokens` 必须与请求的输出预留共同适配其上下文窗口。

2. 要保留固定的摘要路由，在配置所属的 `compaction-basic` 中同时设置 `summarizationProvider` 和 `summarizationModel`；该配置位于 profile 的 `cordis.patch.yml` 或 `cordis.yml` 中。如果压缩插件由 agent（智能体）预设提供，则修改其嵌套配置。所配置的路由必须保持可用；失败时不会选择其他提供方。

3. 使用不同的提供方／模型恢复长会话。确认 `compaction/summary` 记录目标或显式配置的摘要路由，随后出现所选目标的 `request/header`，并继续工作。现有会话日志无需迁移。详见[包参考](../../../../packages/compaction/compaction-basic/README.zh.md)。
