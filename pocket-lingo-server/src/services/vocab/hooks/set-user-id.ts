import type { HookContext } from '../../../declarations'

export const setUserId = async (context: HookContext) => {
    const userId = (context.params.user as any)?.id
    if (Array.isArray(context.data)) {
        context.data = context.data.map(item => ({
            ...item,
            userId
        }))
    } else if (context.data) {
        context.data.userId = userId
    }
    return context
}