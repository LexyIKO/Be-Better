import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { checkToken, fetchData } from '../auth/auth';

const API_URL = 'http://188.225.86.119';

export const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
        return Alert.alert("Пользователь не авторизован");
    }
    else {
        return userId
    }
}

export const getAllAboutUser = async () => {
    const userId = await getUserId()

    try {
        const res = await fetchData(`/users/${userId}`)
        return res
    } catch (error) {
        Alert.alert('Ошибка сети: ', error.message || 'Неизвестная ошибка')
    }
    
}

export const isUserAdmin = async () => {
    try {
        const res = await getAllAboutUser();
        return res.isAdmin; 
    } catch (error) {
        Alert.alert('Ошибка сети:', error.message || 'Произошла неизвестная ошибка');
    }
}

export const getUserNickname = async () => {
    try {
        const res = await getAllAboutUser();
        return res.login;
    } catch (error) {
        Alert.alert('Ошибка сети:', error.message || 'Произошла неизвестная ошибка');
    }
}

export const getUserStatistics = async () => {
    try {
        const userData = await getAllAboutUser();
        const userStatistics = {common: userData.positiveRating, skipped: userData.negativeRating};
        return userStatistics;
    } catch (error) {
        Alert.alert('Ошибка: ', error.message || 'Неизвестная ошибка')
    }
}

export const getTopUsers = async () => {
    try {
        return await fetchData('/users/position/all');
    } catch (error) {
        Alert.alert('Ошибка: ', error.message || 'Неизвестная ошибка')
    }
}

export const getCurrUserTopInfo = async () => {
    try {
        const userId = await getUserId();
        const currUser = await fetchData(`/users/position/current/${userId}`);
        return currUser;
    } catch (error) {
        Alert.alert('Ошибка: ', error.message || 'Неизвестная ошибка')
    }
}

export const addNewTask = async (body) => {
    try {
        const token = await checkToken(); // Получаем токен асинхронно
        if (!token) {
            throw new Error('Недействительный токен или отсутствует доступ');
        }

        const response = await axios.post(`${API_URL}/tasks`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const res = await pushTaskToAll(response.data.id)

        if (response.status !== 201) {
            throw new Error(`Ошибка при создании задачи: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        Alert.alert('Ошибка при добавлении задачи:', error.message);
    }
};

export const getTaskList = async () => {
    try {

        const userId = await getUserId();
        const res = await fetchData(`/users/${userId}`);
        
        return res.tasks
    }catch (error) {
        Alert.alert('Ошибка: ', error.message || 'Неизвестная ошибка')
    }
}

export const pushTaskToAll = async (taskId) => {
    try {
        const token = await checkToken(); // Получаем токен асинхронно
        if (!token) {
            throw new Error('Недействительный токен или отсутствует доступ');
        }

        const response = await axios.post(`${API_URL}/users/taskAll/${taskId}`, { }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 201) {
            throw new Error(`Ошибка при добавлении задачи: ${response.statusText}`);
        }
        

        return response;
    } catch (error) {
        Alert.alert('Ошибка при добавлении задачи:', error.message);
    }
}

export const changeTaskStatus = async (taskId, status) => {
    try {
        const token = await checkToken(); // Получаем токен асинхронно
        if (!token) {
            throw new Error('Недействительный токен или отсутствует доступ');
        }

        const userId = await getUserId();
        

        const response = await axios.put(`${API_URL}/users/task/change_status`, 
            { 
                "userId": userId,
                "taskId": taskId,
                "isDone": status
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error(`Ошибка при изменении статуса задачи: ${response.status}`);
        }
        

        return response;
    } catch (error) {
        Alert.alert('Ошибка при добавлении задачи:', error.message);
    }

    
}