import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMapData = createAsyncThunk('map/fetchMapData', async () => {
  try {
    const response = await axios.post(
      'https://midstd.com/api/public/api/locate',
      {
        token: 252525,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
});

export {fetchMapData};
