import { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import { StyleSheet } from 'react-native';

import TaskNotCompleted from '../icons/TaskNotComleted';
import TaskCompleted from '../icons/TaskCompleted';

import { fetchData } from '../auth/auth';


const RequiredTsk = (props) => {
    const [Task, SetTask] = useState({});

    async function GetRequiredTask (){

        try {
            const res = await fetchData('/tasks/all/required')
            
            //Для даты
            const createdAtDate = new Date(res.createdAt);
            const moscowOffset = 3 * 60 * 60 * 1000; // в миллисекундах
            const createdAtMoscow = new Date(createdAtDate.getTime() + moscowOffset);
            const endDate = new Date(createdAtMoscow.getTime() + res.duration * 24 * 60 * 60 * 1000);

            let task = {
                id: res.id,
                title: res.description,
                time: endDate,
                isCompleted: false,
            }

            SetTask(task)

        } catch (error ){
            Alert.alert('Ошибка: ', error.message || 'Неизвестная ошибка')
        }
    }

    function getNoun(number, nominative, accusative, genitive) {
        let absNumber = Math.round(number);
    
        absNumber %= 100;
        if(absNumber >= 5 && absNumber <= 20) {
            return genitive;
        }
    
        absNumber %= 10;
        if(absNumber == 1) {
            return nominative;
        }
    
        if(absNumber >= 2 && absNumber <= 4) {
            return accusative;
        }
    
        return genitive;
    }
    
    function getRemaningTime() {
        const expirationDate = new Date(Task.time);

        const currDate = new Date();
    
        let timeDiff = expirationDate.getTime() - currDate.getTime();
        let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
    
        if(dayDiff == 0) {
            hourDiff = Math.round(timeDiff / (1000 * 3600));
            return `${getNoun(hourDiff, "Остался", "Осталось", "Осталось")}: ` + hourDiff + ` ${getNoun(hourDiff, "час", "часа", "часов")}`;
        }
        return `${getNoun(dayDiff, "Остался", "Осталось", "Осталось")}: `+ dayDiff + ` ${getNoun(dayDiff, "день", "дня", "дней")}`;
    }
    

    function ChangeTaskStatus (){
        //to do

    }

    useEffect(()=>{
        GetRequiredTask()
    },[]);

    return(
       <View style = {[styles.container, props.style]}>
            <Text style = {styles.title} adjustsFontSizeToFit = {true}>Обязательная задача</Text>
            <View style = {styles.taskBox}>
                <Text style = {styles.taskText}>{Task.title}</Text>
            </View>
            <View style = {styles.infoBox}>
                <Text style = {styles.timer} adjustsFontSizeToFit = {true} numberOfLines={1}>{getRemaningTime()}</Text>
                <Pressable 
                style = {styles.button}
                onPress={ChangeTaskStatus}>
                {Task.isCompleted ? <TaskCompleted /> : <TaskNotCompleted />}
                </Pressable>
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        backgroundColor: '#545252',
        width: '90%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    title: {
        fontSize: 28, 
        color: '#C3C3C3',
        marginTop: 10,
        width: '90%',
        textAlign: 'center'
    },
    taskBox: {
        width: '95%',
        padding: 20,
        backgroundColor: '#323232',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    taskText: {
        fontSize: 24,
        color: '#C3C3C3',
        textAlign: 'justify',
    },
    infoBox: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timer: {
        fontSize: 20,
        color: '#C3C3C3',
        maxWidth: '60%',
        paddingRight: 15
    },
    button: {
    }

});


export default RequiredTsk;