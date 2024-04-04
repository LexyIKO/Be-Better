import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import MiniTaskBox from './MiniTaskBox';
import HeaderForModal from './HeaderForModal'
import OneTaskModal from './OneTaskModal';

const ModalAdminTasks = (props) => {
 
    const [taskList, setTaskList] = useState([]);
    const [SortedTaskList, SetSortedTaskList] = useState([])

    const [OneTaskVisability, SetOneTaskVisible] = useState(false); 

    const closeModal = () => {
        props.onCloseModal();
    };

    let TempTaskList = [       
        {id: 0, key: 'lalala', title: 'Красавица и чудовище', description: 'Помочь двум людям, один из должен вам нравиться, другой - нет', time: 'April 17, 2024 00:00:00', isCompleted: true},
        {id: 1, key: 'hahaha', title: 'Короли болота', description: 'Уберитесь у себя дома, пожалуйста, наконце-то уже!', time: '2024, 10, 2', isCompleted: false},
        {id: 2, key: 'blabla', title: 'Речное чудище', description: 'Сходи в душ, помой голову, уложи волосы, не позорься!', time: '12/06/2024', isCompleted: false},
    ]

    const getTaskList = () =>{
        
        //toDo
        setTaskList(TempTaskList)
    };

    useEffect(() => {
        getTaskList()
    }, [])

    useEffect(() => {
        // Сортировка taskList после загрузки
        const sortedTaskList = [...taskList].sort((a, b) => {
            // Сначала сортируем по isCompleted (false сначала)
            if (a.isCompleted === b.isCompleted) {
                return 0;
            } else if (a.isCompleted === false) {
                return -1;
            } else {
                return 1;
            }
        });
        SetSortedTaskList(sortedTaskList);
    }, [taskList])

    const [CurrentTask, SetCurrentTask] = useState({});

    const openTaskModal = (obj) => {
        SetOneTaskVisible(!OneTaskVisability)
        SetCurrentTask(obj)
    };

    

    return(
        <Modal
            animationType='slide'
            transparent={false}
            visible={props.visability}
            onRequestClose={closeModal}
        >
            <HeaderForModal fontSize = {{fontSize: 24}} onModalClose = {closeModal} title='Задачи от трации'/>

            <View style = {styles.container}>
                <FlatList
                data={SortedTaskList}
                renderItem = {({item}) => (<MiniTaskBox el = {item} onPressed={() => openTaskModal(item)} />)}
                style = {styles.flatlist}
                
                />
            </View>

            <OneTaskModal 
                visibility={OneTaskVisability} 
                onCloseModal={() => SetOneTaskVisible(false)} 
                item = {CurrentTask}
            />

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3E3E3E',
        alignItems: 'center'
    },
    flatlist: {
        width: '100%',
        paddingLeft: '10%'
    }
});

export default ModalAdminTasks;