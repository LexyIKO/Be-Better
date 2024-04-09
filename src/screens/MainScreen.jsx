import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import styles from '../styles/MainStyle'

import Header from '../components/Header';
import RequiredTsk from '../components/RequiredTask';
import TaskBox from '../components/TaskBox';

import {isUserAdmin } from '../Requests/requests';

const MainScreen = () => {
    const [isAdmin, setIsAdmin] = useState('false');

    useEffect(()=>{
        // Проверка на админа
        const CheckUserRootStatus = async () => {
            try{
                const isAdmin =  await isUserAdmin()
                if(isAdmin){
                    setIsAdmin(true);
                }
            }catch (error) {
                console.log('Ошибка: ', error.message || 'Неизвестная ошибка')
            }
        }
        CheckUserRootStatus();
    }, [])

    return(
        <SafeAreaView style = {styles.container}>
           <Header ScreenTitle='main'/>
           <RequiredTsk style={{marginTop: '5%'}}/>
           <TaskBox name = 'default' text = 'Обычные задачи' style = {{marginTop: '5%'}}/>
           <TaskBox name = 'admin' text ='Задачи от администрации' style = {{marginTop: '5%'}}/>
           {isAdmin === true ? <TaskBox name = 'newTaskButton' text = "Добавить задачу" style = {{marginTop: '5%'}} /> : undefined}
        </SafeAreaView>
    );
}

export default MainScreen;