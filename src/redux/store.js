import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice';
import goalReducer from './goalSlice';

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        goals: goalReducer,
    },
});

export default store;
