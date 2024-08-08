import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    likedCategories: [],
    basketItems: [],
  },
  reducers: {
    likeCategory: (state, action) => {
      state.likedCategories.push(action.payload);
    },
    dislikeCategory: (state, action) => {
      state.likedCategories = state.likedCategories.filter(
        (item) => item.id !== action.payload.id
      );
    },
    addToBasket: (state, action) => {
      state.basketItems.push(action.payload);
    },
    removeFromBasket: (state, action) => {
      state.basketItems = state.basketItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { likeCategory, dislikeCategory, addToBasket, removeFromBasket } = categorySlice.actions;
export default categorySlice.reducer;
