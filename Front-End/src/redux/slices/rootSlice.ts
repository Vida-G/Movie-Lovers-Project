
import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'The Godfather',
        genre: 'Drama, Crime',
        year: '1972',
        rating: 5
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseGenre: (state, action) => { state.genre = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseRating: (state, action) => { state.rating = action.payload },
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseGenre, chooseYear, chooseRating } = rootSlice.actions;
