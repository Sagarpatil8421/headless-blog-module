import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  selectedCategory: number | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
