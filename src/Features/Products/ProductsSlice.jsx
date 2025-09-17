import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Step 1: async thunk
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const res = await fetch("/ProductsData/products-data.json");
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    localStorage.setItem("products", JSON.stringify(data));
    return data;
});


// 🔹 Step 2: initial state
const initialState = {
    products: JSON.parse(localStorage.getItem("products")) || [],
    status: "idle",
    error: null,
};

// 🔹 Step 3: slice
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
