import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import TaskNotCompleted from '../icons/TaskNotComleted';
import TaskCompleted from '../icons/TaskCompleted';


const MiniTaskBox = (props) => {    

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
        const expirationDate = new Date(props.el.time);

        const currDate = new Date();
    
        let timeDiff = expirationDate.getTime() - currDate.getTime();
        let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
    
        if(dayDiff == 0) {
            hourDiff = Math.round(timeDiff / (1000 * 3600));
            return hourDiff + ` ${getNoun(hourDiff, "час", "часа", "часов")}`;
        }
        return dayDiff + ` ${getNoun(dayDiff, "день", "дня", "дней")}`;
    }
    

    function ChangeTaskStatus (){
    
    }

    useEffect(()=>{

    }, []);

    const openModal = () =>{
        props.onPressed();
    };

    return(
       <Pressable 
       style = {styles.container}
       onPress={openModal}
       >
            <View style = {props.el.isCompleted ? {opacity: 0.5,  padding: 10, width: '100%'}
            : {opacity: 1, padding: 10, width: '100%'}}> 
                <Text style = {styles.taskBox}>{props.el.title}</Text>
                <Text style = {styles.timer} adjustsFontSizeToFit = {true}>На выполнение: {getRemaningTime()}</Text>
            </View>
       </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        backgroundColor: '#545252',
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
    },
    taskBox: {
        width: '95%',
        backgroundColor: '#323232',
        fontSize: 24,
        color: '#C3C3C3',
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
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    timer: {
        fontSize: 20,
        color: '#C3C3C3',
        width: '100%',
        textAlign: 'left',
        marginTop: 10,
        paddingLeft: 10
    },
    

});


export default MiniTaskBox;