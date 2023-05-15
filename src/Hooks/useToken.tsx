import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';

const useTokenFirebaseMessage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    messaging()
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          setToken(currentToken);
        } else {
          console.log(
            'No Instance ID token available. Request permission to generate one.',
          );
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }, []);

  return token;
};

export default useTokenFirebaseMessage;
