import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./Components/RecipesStore";
const store = configureStore({
    reducer: {
        recipes: recipesSlice.reducer, 
    
    }
});
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

