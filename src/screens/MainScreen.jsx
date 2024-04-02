import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import styles from '../styles/MainStyle'

import Header from '../components/Header';
import RequiredTsk from '../components/RequiredTask';
import TaskBox from '../components/TaskBox';

const MainScreen = () => {

    return(
        <SafeAreaView style = {styles.container}>
           <Header ScreenTitle='main'/>
           <RequiredTsk style={{marginTop: 20}}/>
           <TaskBox name = 'default' text = 'Обычные задачи' style = {{marginTop: 30}}/>
           <TaskBox name = 'admin' text ='Задачи от администрации' style = {{marginTop: 30}}/>
        </SafeAreaView>
    );
}

export default MainScreen;