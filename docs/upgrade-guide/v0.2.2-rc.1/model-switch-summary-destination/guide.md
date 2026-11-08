---
kind: upgrade-guide
description: "Model-switch compaction uses the selected provider and model instead of the previous route."
---

# Model switches summarize with the selected destination

English | [中文](guide.zh.md)

## Change

When automatic compaction needs a summary before a provider/model switch, an empty `summarizationProvider` / `summarizationModel` pair now selects the destination and its summary policy. Previously, the previous request's route and policy wrote that summary, so removing its provider or model could block the switch. The original route no longer needs to remain available.

The destination now handles the auxiliary summary; any provider charges for that request apply to the destination's account. Prefix-cache reuse from the previous model is no longer selected by default during a switch. An explicit summary provider/model pair remains authoritative; ordinary pressure, overflow recovery, and manual `/compact` keep their existing target selection. Failed or cancelled switch compaction still preserves the previous request header.

## Migration

1. To let summaries follow the selected destination, leave both summary fields empty. Review each destination's `modelPolicies` entry: `maxTokens` must fit its output allowance, and `headroomTokens` must fit its context window alongside the request's output reservation.

2. To retain a fixed summary route, set both `summarizationProvider` and `summarizationModel` in the owning `compaction-basic` configuration in your profile's `cordis.patch.yml` or `cordis.yml`. If an agent preset owns the compaction plugin, change its nested configuration. The configured route must remain available; failure does not choose another provider.

3. Resume a long chat with a different provider/model. Confirm that `compaction/summary` records the destination or explicitly configured summary route, followed by a `request/header` for the selected destination and continued work. Existing Session logs need no migration. See the [package reference](../../../../packages/compaction/compaction-basic/README.md).
