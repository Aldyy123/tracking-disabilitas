import {createSlice} from '@reduxjs/toolkit';

interface StatusState {
  message: string | null;
  userOut: boolean | null;
  featureCollection: GeoJSON.FeatureCollection | null;
  title: string | null;
}

const initialState: StatusState = {
  message: null,
  userOut: false,
  featureCollection: null,
  title: null,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const featureCollection = action.payload as GeoJSON.FeatureCollection;
      if (featureCollection.features.length > 0) {
        state.featureCollection = featureCollection;
        state.message = 'User masuk area';
        state.userOut = false;
        state.title = 'Safety';
        return;
      }
      state.message = 'User keluar ke area';
      state.userOut = true;
      state.title = 'Warning';
    },
    clearAllState: state => {
      state.message = null;
      state.userOut = false;
      state.featureCollection = null;
      state.title = null;
    },
  },
});

export const {setMessage, clearAllState} = statusSlice.actions;
export default statusSlice.reducer;
