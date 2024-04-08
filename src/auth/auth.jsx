import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_URL = 'http://188.225.86.119';

export const loginUser = async (login, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { login, password })
    .then(res => {
        return res
    }).catch(error => {
        Alert.alert('Ошибка авторизации')
        throw error;
    })
    const token = await response.data.token;
    const userId = await response.data.userId;

    
    // Сохранение токена в AsyncStorage
    if (token) {
        // Сохраняем токен в AsyncStorage
        AsyncStorage.multiSet([['token', token],['userId', userId.toString()]])
          .then(() => {
            Alert.alert('Токен успешно сохранен в AsyncStorage');
          })
          .catch((error) => {
            Alert.alert('Ошибка при сохранении токена в AsyncStorage:', error.message);
          });
      } else {
        Alert.alert('Попытка сохранить null или undefined в AsyncStorage');
      }

    

    return true;
  } catch (error) {

    throw error;
  }
};

export const logout = async () => {
    try {
      // Удаление токена из AsyncStorage
      await AsyncStorage.multiRemove(['token', 'userId']);
    } catch (error) {
        Alert.alert('Logout failed', error);
      throw error;
    }

  };
  

export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
          login: username,
          password: password
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });
        const token = await response.data.token;
        const userId = await response.data.userId;

      if (token) {
        // Сохраняем токен в AsyncStorage
        AsyncStorage.multiSet([['token', token],['userId', userId.toString()]])
          .then(() => {
            Alert.alert('Токен успешно сохранен в AsyncStorage');
          })
          .catch((error) => {
            Alert.alert('Ошибка при сохранении токена в AsyncStorage:', error.message);
          });
      } else {
        Alert.alert('Попытка сохранить null или undefined в AsyncStorage');
      }
    
      return true;
    } catch (error) {
        Alert.alert('Registration failed - ', error.message);
      throw error;
    }
  };

export const checkToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    Alert.alert('Failed to load token', error);
    throw error;
  }
};



// let запрос_пример = fetchData('/task/2')

export const fetchData = async (address, body = undefined) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        
        return Alert.alert("Пользователь не авторизован");
      }
  
      const response = await axios.get(`${API_URL}${address}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body
      });
  
      return response.data;
    } catch (error) {
      console.error('Failed to fetch data', error);
      throw error;
    }
};




