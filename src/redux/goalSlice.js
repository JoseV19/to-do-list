import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goals: [],
    currentGoal: null
};

const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload;
        },
        addGoal: (state, action) => {
            state.goals.push(action.payload);
        },
        deleteGoal: (state, action) => {
            state.goals = state.goals.filter(goal => goal._id !== action.payload);
        },
        updateGoal: (state, action) => {
            const index = state.goals.findIndex(goal => goal._id === action.payload._id);
            if (index !== -1) {
                state.goals[index] = action.payload;
            }
        },
        setCurrentGoal: (state, action) => {
            state.currentGoal = action.payload;
        },
        clearCurrentGoal: (state) => {
            state.currentGoal = null;
        }
    },
});

export const { setGoals, addGoal, deleteGoal, updateGoal, setCurrentGoal, clearCurrentGoal } = goalSlice.actions;
export default goalSlice.reducer;