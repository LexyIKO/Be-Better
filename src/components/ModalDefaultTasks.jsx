import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import MiniTaskBox from './MiniTaskBox';
import HeaderForModal from './HeaderForModal'
import OneTaskModal from './OneTaskModal';

const ModalDefaultTasks = (props) => {
 
    const [taskList, setTaskList] = useState([]);
    const [SortedTaskList, SetSortedTaskList] = useState([])

    const [OneTaskVisability, SetOneTaskVisible] = useState(false); 

    const closeModal = () => {
        props.onCloseModal();
    };

    let TempTaskList = [       
        {id: 0, key: 'lalala', title: 'hello world', description: 'Выйти ночью в поле с конем, ночкой темной тихо вдвоем', time: '2024-04-09T00:00:00Z', isCompleted: true},
        {id: 1, key: 'hahaha', title: 'My name uwewewe onit uwewe', description: 'Посмотреть где можно закупиться по скидке, да так, чтобы еще на послезавтра деньги остались', time: '2024, 10, 2', isCompleted: false},
        {id: 2, key: 'blabla', title: 'Мне сегодня 7 лет', description: 'Пожевать жувачку', time: '12/06/2024', isCompleted: false},
        {id: 33, key: 'lalasla', title: 'hello world', description: 'Выйти ночью в поле с конем, ночкой темной тихо вдвоем', time: 'April 17, 2024 00:00:00', isCompleted: true},
        {id: 4, key: 'hahafha', title: 'My name uwewewe onit uwewe', description: 'Посмотреть где можно закупиться по скидке, да так, чтобы еще на послезавтра деньги остались', time: '2024, 10, 2', isCompleted: false},
        {id: 5, key: 'blablga', title: 'Мне сегодня 7 лет', description: 'Пожевать жувачку', time: '12/06/2024', isCompleted: false},
        {id: 6, key: 'lalajla', title: 'hello world', description: 'Выйти ночью в поле с конем, ночкой темной тихо вдвоем', time: 'April 17, 2024 00:00:00', isCompleted: true},
        {id: 7, key: 'hahakha', title: 'My name uwewewe onit uwewe', description: 'Посмотреть где можно закупиться по скидке, да так, чтобы еще на послезавтра деньги остались', time: '2024, 10, 2', isCompleted: false},
        {id: 8, key: 'blab;lla', title: 'Мне сегодня 7 лет', description: 'Пожевать жувачку', time: '12/06/2024', isCompleted: false},
        {id: 9, key: 'lalamla', title: 'hello world', description: 'Выйти ночью в поле с конем, ночкой темной тихо вдвоем', time: 'April 17, 2024 00:00:00', isCompleted: true},
        {id: 10, key: 'hahahba', title: 'My name uwewewe onit uwewe', description: 'Посмотреть где можно закупиться по скидке, да так, чтобы еще на послезавтра деньги остались', time: '2024, 10, 2', isCompleted: false},
        {id: 52, key: 'blablca', title: 'Мне сегодня 7 лет', description: 'Пожевать жувачку', time: '12/06/2024', isCompleted: false},

    ]

    const getTaskList = () =>{

        //toDo
        setTaskList(TempTaskList)
    };

    const changeTaskStatus = (taskID) => {
        //toDo
        getTaskList();
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
            <HeaderForModal fontSize = {{fontSize: 32}} onModalClose = {closeModal} title='Обычные задачи'/>

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
                onStatusChanged= {()=>changeTaskStatus(CurrentTask.id)} 
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

export default ModalDefaultTasks;