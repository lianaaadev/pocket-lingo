export const filterByUser = async (context: any) => {
    const userId = context.params.user.id
    context.params.query = {
        ...context.params.query,
        userId
    };
    return context;
};