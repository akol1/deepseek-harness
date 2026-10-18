# Unstarted New Session draft: contribution assets

Assets for the fix to [Discussion #10021](https://github.com/deepseek-ai/deepseek-harness/discussions/10021): an unsent draft typed into a new chat disappeared when the user navigated away without sending.

- `0001-fix-ui-workspace-keep-unstarted-draft.patch` — applyable patch against `687f282e86` (`v0.2.1-rc.2`), generated with `git format-patch`.
- `draft-carry.gif` — 14.0 s recording of the fixed flow.

## Apply

```sh
git checkout -b fix/unstarted-draft 687f282e86
curl -L https://raw.githubusercontent.com/akol1/deepseek-harness/draft-carry-assets/0001-fix-ui-workspace-keep-unstarted-draft.patch | git am
pnpm install
pnpm run build
```

The patch changes only `packages/client/ui-conversation`, `packages/client/ui-workspace`, the matching bilingual READMEs and Agent Note, the generated client API catalog, one browser e2e scenario, and focused unit specs. It does not touch the lockfile.

## Recording

`draft-carry.gif` shows: type `draft 未开始 🧭 é 雪` into a new chat, press **New session**, watch the text land in the new composer, open **Plugins**, return to the Session, and reload the page. Recorded from a clean worktree of the patched tree with the real Web server and a fresh scratch profile; no message is sent and no model round runs.
