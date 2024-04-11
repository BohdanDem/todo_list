const baseURL = process.env.REACT_APP_API

const todos = '/todos'

const urls = {
    todos: {
        base: todos,
        byId: (id: string): string => `${todos}/${id}`,
    }
}

export {
    baseURL,
    urls
}
