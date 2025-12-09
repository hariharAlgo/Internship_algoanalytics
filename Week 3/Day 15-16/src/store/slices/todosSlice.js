import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    return response.json()
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        filter: 'all',
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({
                id: Date.now(),
                title: action.payload,
                completed: false,
            })
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find((t) => t.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter((t) => t.id !== action.payload)
        },
        editTodo: (state, action) => {
            const todo = state.items.find((t) => t.id === action.payload.id)
            if (todo) {
                todo.title = action.payload.title
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        clearCompleted: (state) => {
            state.items = state.items.filter((t) => !t.completed)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload.map(todo => ({
                    id: todo.id,
                    title: todo.title,
                    completed: todo.completed,
                }))
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter, clearCompleted } = todosSlice.actions
export default todosSlice.reducer
