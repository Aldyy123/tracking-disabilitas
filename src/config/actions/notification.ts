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

interface Notification {
  data: {
    title: string;
    body: string;
    type: string;
  };
}

const sendNotification = createAsyncThunk(
  'map/sendNotification',
  async ({data}: Notification) => {
    try {
      const response = await axios.post(
        'https://midstd.com/api/public/api/notification',
        data,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
);

interface Message {
  data?: object;
  notification: {
    title: string;
    body: string;
  };
  to: string;
}

const messageAction = createAsyncThunk(
  'map/messageAction',
  async ({data}: Message) => {
    try {
      const response = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        data,
        {
          headers: {
            Authorization: `Bearer AAAA3umljd0:APA91bHAiMdZu7jn_dIs2CZ2QwvNuiBKkt_11aH6ymoUtBVOKawo8v_GrLfbuD8rSTiMqIlbOK6suQnYvU6yWGCsjlxBMZMYSAqLVXTNWONh6j-AD-SZVQtqldG8T-62FxruNv-qZVax`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export {getNotification, sendNotification, messageAction};
