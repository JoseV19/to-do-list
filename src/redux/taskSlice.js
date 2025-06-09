import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    currentTask: null
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        setCurrentTask: (state, action) => {
            state.currentTask = action.payload;
        },
        clearCurrentTask: (state) => {
            state.currentTask = null;
        }
    },
});

export const { setTasks, addTask, deleteTask, updateTask, setCurrentTask, clearCurrentTask } = taskSlice.actions;
export default taskSlice.reducer;