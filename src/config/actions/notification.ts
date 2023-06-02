import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const getNotification = createAsyncThunk('map/getNotification', async () => {
  try {
    const response = await axios.get(
      'https://midstd.com/api/public/api/notification',
    );
    return response.data;
  } catch (error) {
    return error;
  }
});

export {getNotification};
