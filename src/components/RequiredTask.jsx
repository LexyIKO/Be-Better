import { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import ModalConfirm from './ModalConfirm';
import TaskNotCompleted from '../icons/TaskNotComleted';
import TaskCompleted from '../icons/TaskCompleted';


const RequiredTsk = (props) => {
    const [Task, SetTask] = useState({});
    
    let tempTask = {
        id: 0,
        title: 'Позвонить человеку с которым вы давно не общались и узнать как его жизнь', 
        time: '04/03/2024',
        isCompleted: true
    }

    function GetRequiredTask (){

        //toDo
        SetTask(tempTask)
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
        SetTask(prevTask => ({
            ...prevTask, // сохраняем все остальные свойства без изменений
            isCompleted: !prevTask.isCompleted // изменяем только isCompleted на противоположное значение
        }));
    }

    useEffect(()=>{
        GetRequiredTask()
    },[]);

    const [ModalConfirmVisibility, SetModalConfirmVisibility] = useState(false);

    function changeConfirmModalStatus() {
        SetModalConfirmVisibility(!ModalConfirmVisibility);
    };


    const handleConfirmation = () => {
        // TODO
    };

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
                onPress={changeConfirmModalStatus}
                // onPress={ChangeTaskStatus}
                >
                    {Task.isCompleted ? <TaskCompleted /> : <TaskNotCompleted />}
                    <ModalConfirm onConfirm={handleConfirmation} visibility={ModalConfirmVisibility} onCloseModal={changeConfirmModalStatus}/>
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