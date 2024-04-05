import { useState, useEffect } from 'react';
import { Text, View, Pressable, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import TaskCompleted from '../icons/TaskCompleted';
import TaskNotCompleted from '../icons/TaskNotComleted';

const OneTaskModal = (props) => {

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
        const expirationDate = new Date(props.item.time);

        const currDate = new Date();
    
        let timeDiff = expirationDate.getTime() - currDate.getTime();
        let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
    
        if(dayDiff == 0) {
            hourDiff = Math.round(timeDiff / (1000 * 3600));
            return `${getNoun(hourDiff, "Остался", "Осталось", "Осталось")}: ` + hourDiff + ` ${getNoun(hourDiff, "час", "часа", "часов")}`;
        }
        return `${getNoun(dayDiff, "Остался", "Осталось", "Осталось")}: `+ dayDiff + ` ${getNoun(dayDiff, "день", "дня", "дней")}`;
    }

    useEffect(()=>{

    },[]);

    const closeModal = () => {
        props.onCloseModal();
    };

    function ChangeTaskStatus (){
        props.onStatusChanged();
    }
    

    return(
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visibility}
            onRequestClose={closeModal}
        >
            <Pressable 
                style = {styles.modalContainer}
                onPress={props.onCloseModal}
            >
                
                <View style={styles.container}>
                    <Text style = {styles.title}>{props.item.title}</Text>
                    <Text style = {styles.description}>{props.item.description}</Text>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.timer} adjustsFontSizeToFit = {true} numberOfLines = {1}>{getRemaningTime()}</Text>
                        <Pressable 
                        style = {styles.button}
                        onPress={ChangeTaskStatus}>
                        {props.item.isCompleted ? <TaskCompleted /> : <TaskNotCompleted />}
                        </Pressable>
                    </View>
                </View>
                    
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    },
    container:{
        display: 'flex',
        backgroundColor: '#3E3E3E',
        width: '90%',
        borderRadius: 10,
        margin: 'auto',
        alignItems: 'center'
    },
    title: {
        fontSize: 28, 
        color: '#C3C3C3',
        marginTop: 10,
        padding: 10,
        width: '100%'
    },
    description: {
        width: '95%',
        backgroundColor: '#323232',
        fontSize: 24,
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        justifyContent: 'center',
        color: '#C3C3C3'
        
    },
    infoBox: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    timer: {
        fontSize: 20,
        color: '#C3C3C3',
        paddingRight: 15,
        maxWidth: '60%'
    },
    button: {
    }
     

});


export default OneTaskModal;