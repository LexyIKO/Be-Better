import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import storage from '../storage/storage';

const API_URL = 'http://188.225.86.119';

export const loginUser = async (login, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { login, password })
    .then(res => {
        return res
    }).catch(error => {
        console.log(error)
        throw error;
    })
    const token = response.data.token;
    const userId = response.data.userId

    
    // Сохранение токена в AsyncStorag
    if (token) {
        storage.save({
            key: 'loginState',
            id: '1001',
            data: {
              userid: userId,
              token: token
            },
            
          })
        return true
      } else {
        console.log('Попытка сохранить null или undefine в Storage');
      }  

  } catch (error) {
    throw error;
  }

  return false;
};

export const logout = async () => {
    
    try{
        storage.remove({
            key: 'loginState',
            id: '1001'
        });

        
    }catch (error) {
        console.log('Неудача - ', error)
    }
    
    // try {
    //   // Удаление токена из AsyncStorage
    //   await AsyncStorage.removeItem('token');
    // } catch (error) {
    //   console.error('Logout failed', error);
    //   throw error;
    // }

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
      const token = response.data;

      console.log('Repsonse - ', response)
      console.log('Token - ', token)

      if (token) {
        // Сохраняем токен в AsyncStorage
        AsyncStorage.setItem('token', token)
          .then(() => {
            console.log('Токен успешно сохранен в AsyncStorage');
          })
          .catch((error) => {
            console.log('Ошибка при сохранении токена в AsyncStorage:', error);
          });
      } else {
        console.log('Попытка сохранить null или undefined в AsyncStorage');
      }
    
      return true;
    } catch (error) {
      console.log('Registration failed - ', error.message);
      throw error;
    }

    checkToken()
  };

export const checkToken = () => {

    let temp;

    storage
    .getAllDataForKey('loginState')
    .then(ret => {
        console.log('sososososoos- ', ret)
        temp = ret;
    })
    .catch(err => {
        
    switch (err.name) {
        case 'NotFoundError':
        // TODO;
        break;
        case 'ExpiredError':
        // TODO
        break;
    }
    });

    return temp

//   try {
//     const token = await AsyncStorage.getItem('token');
//     return token;
//   } catch (error) {
//     console.log('Failed to load token', error);
//     throw error;
//   }
};





// let запрос_пример = fetchData('/task/2')

export const fetchData = async (address, body = undefined) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        
        return console.log("Пользователь не авторизован");
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




