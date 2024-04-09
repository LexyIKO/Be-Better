import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import ModalDefaultTasks from './ModalDefaultTasks';
import ModalAdminTasks from './ModalAdminTasks';
import ModalAddNewTask from './ModalAddNewTask';

const TaskBox = (props) => {
    const [ModalDefaultTasksVisability, SetModalDefaultTaskVisability] = useState(false);
    const [ModalAdminTasksVisability, SetModalAdminTaskVisability] = useState(false);
    const [ModalAddNewTaskVisability, SetModalAddNewTaskVisability] = useState(false);


    function setModalVisability (){
        if(props.name === 'default'){
            SetModalDefaultTaskVisability(!ModalDefaultTasksVisability);
        }else if(props.name === 'admin'){
            SetModalAdminTaskVisability(!ModalAdminTasksVisability);
        }else if(props.name === 'newTaskButton'){
            SetModalAddNewTaskVisability(!ModalAddNewTaskVisability);
        }
    }

    function closeDefaultModal (){
        SetModalDefaultTaskVisability(!ModalDefaultTasksVisability);
    }

    function closeAdminModal (){
        SetModalAdminTaskVisability(!ModalAdminTasksVisability);
    }

    function closeAddNewTaskModal (){
        SetModalAddNewTaskVisability(!ModalAddNewTaskVisability);
    }

    return(
        <Pressable style = {[styles.container, props.style]}
        onPress={setModalVisability}
        >
            <Text style = {styles.text}>{props.text}</Text>
            <ModalDefaultTasks visability = {ModalDefaultTasksVisability} onCloseModal = {closeDefaultModal}/>
            <ModalAdminTasks visability = {ModalAdminTasksVisability} onCloseModal = {closeAdminModal}/>
            <ModalAddNewTask visability = {ModalAddNewTaskVisability} onCloseModal = {closeAddNewTaskModal}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        backgroundColor: '#545252',
        width: '90%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 10
    },
    text:{
        color: '#C3C3C3',
        fontSize: 30,
        textAlign: 'center',
        width: '80%'
    }
});

export default TaskBox;
