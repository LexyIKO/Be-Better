import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import MiniTaskBox from './MiniTaskBox';
import HeaderForModal from './HeaderForModal'
import OneTaskModal from './OneTaskModal';

const ModalDefaultTasks = (props) => {
 
    const [taskList, setTaskList] = useState([
        {id: 0, key: 'lalala', title: 'hello world', description: 'Выйти ночью в поле с конем, ночкой темной тихо вдвоем', time: 'April 17, 2024 00:00:00', isCompleted: true},
        {id: 1, key: 'hahaha', title: 'My name uwewewe onit uwewe', description: 'Посмотреть где можно закупиться по скидке, да так, чтобы еще на послезавтра деньги остались', time: '2024, 10, 2', isCompleted: false},
        {id: 2, key: 'blabla', title: 'Мне сегодня 7 лет', description: 'Пожевать жувачку', time: '12/06/2024', isCompleted: false},
        // {id: 3, key: 'papapa', title: 'Заварить кофе', description: 242, time: 50, isCompleted: true},
        // {id: 4, key: 'hgaraa', title: 'Я повар, такова моя жизнь', description: 242, time: 50, isCompleted: true},
        // {id: 5, key: 'hahghf', title: 'А ведь мама говорила', description: 242, time: 50, isCompleted: true},
        // {id: 6, key: 'hahkjh', title: 'Сходить в магазин и...', description: 242, time: 50, isCompleted: true},
        // {id: 7, key: 'heqweq', title: 'Скушать змею', description: 242, time: 50, isCompleted: true},
        // {id: 8, key: 'hahabv', title: 'Выйти из дома', description: 242, time: 50, isCompleted: true},
        // {id: 9, key: 'haszdd', title: 'Обнять слона', description: 242, time: 50, isCompleted: true},

    ]);

    const [OneTaskVisability, SetOneTaskVisible] = useState(false); 

    const closeModal = () => {
        props.onCloseModal();
    };


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
            <HeaderForModal onModalClose = {closeModal} title='Обычные задачи'/>

            <View style = {styles.container}>
                <FlatList
                data={taskList}
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

export default ModalDefaultTasks;