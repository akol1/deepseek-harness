# Unstarted New Session draft: contribution assets

Assets for the fix to [Discussion #10021](https://github.com/deepseek-ai/deepseek-harness/discussions/10021): an unsent draft typed into a new chat disappeared when the user navigated away without sending.

- `0001-fix-ui-workspace-keep-unstarted-draft.patch` — applyable patch against `687f282e86` (`v0.2.1-rc.2`), generated with `git format-patch`.
- `draft-carry-125x.gif` — 8.3 s recording of the fixed flow, replayed at 1.25× speed from a 14.0 s capture.

## Apply

```sh
git checkout -b fix/unstarted-draft 687f282e86
curl -L https://raw.githubusercontent.com/akol1/deepseek-harness/draft-carry-assets/0001-fix-ui-workspace-keep-unstarted-draft.patch | git am
pnpm install
pnpm run build
```

The patch changes only `packages/client/ui-conversation`, `packages/client/ui-workspace`, the matching bilingual READMEs and Agent Note, the generated client API catalog, one browser e2e scenario, and focused unit specs. It does not touch the lockfile.

## Recording

`draft-carry-125x.gif` shows: type `draft 未开始 🧭 é 雪` into a new chat, press **New session**, watch the text land in the new composer, open **Plugins**, return to the Session, and reload the page. It replays 2.0–11.0 s of the 14.0 s real-time capture at 1.25× speed with a 1.2 s final hold, encoded at 12 fps from a 128-colour palette. Recorded from a clean worktree of the patched tree with the real Web server and a fresh scratch profile; no message is sent and no model round runs.

The earlier `draft-carry.gif` is the original 2× cut, kept so links from the first revision of the Discussion reply keep resolving.
