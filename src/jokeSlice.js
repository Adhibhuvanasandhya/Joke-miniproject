import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch joke categories
export const fetchCategories = createAsyncThunk("jokes/categories", async () => {
    const result = await axios.get("https://api.chucknorris.io/jokes/categories");
    return result.data;
});

// Thunk to fetch a joke for a specific category
export const fetchJoke = createAsyncThunk("jokes/jokecategory", async (category, { rejectWithValue }) => {
    try {
        const result = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
        return result.data.value;
    } catch (error) {
        return rejectWithValue("Invalid category");
    }
});

const initialState = {
    joke: "NO Joke",
    error: "",
    categories: []
};

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJoke.pending, (state) => {
                state.error = ""; // Clear error on new fetch
            })
            .addCase(fetchJoke.fulfilled, (state, action) => {
                state.joke = action.payload;
                state.error = ""; // Clear error when joke is fetched successfully
            })
            .addCase(fetchJoke.rejected, (state, action) => {
                state.error = action.payload; // Set error message
                state.joke ="";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload; // Update categories list
            });
    }
});

export default jokeSlice.reducer;
