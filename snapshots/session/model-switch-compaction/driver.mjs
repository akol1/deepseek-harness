/** Test-only switch from a withdrawn organization route to a smaller model. */
import { LlmAdapter } from '@deepseek-ai/dsh-llm'

export const name = 'model-switch-compaction-driver'
export const inject = ['llm', 'tools']

/**
 * Withdraw the first organization after its tool call, then select the destination.
 * @param {import('@deepseek-ai/cordis').Context} ctx - composition context.
 */
export function apply(ctx) {
  class RetiredOrganizationAdapter extends LlmAdapter {
    resolveModel(provider, model) {
      return Promise.resolve({
        provider,
        id: model,
        name: model,
        context: { contextWindow: 100000 },
        defaultMaxTokens: 1000,
      })
    }

    stream(options) {
      return ctx.llm.stream({
        ...options,
        provider: 'deepseek-official',
        model: 'deepseek-v4-flash',
      })
    }
  }

  const withdraw = ctx.effect(() => ctx.llm.registerAdapter(['retired-organization'], new RetiredOrganizationAdapter()))
  ctx.on('agent/created', ({ agent }) => {
    agent.model.select({ provider: 'retired-organization', model: 'large-model' })
  })
  ctx.on('tools/execute', async (exec, next) => {
    const result = await next()
    if (exec.name === 'bash' && !result.isError) {
      if (exec.agent === undefined) throw new Error('model-switch compaction requires a calling Agent')
      await withdraw()
      exec.agent.model.select({ provider: 'deepseek-official', model: 'deepseek-v4-pro' })
    }
    return result
  })
}
