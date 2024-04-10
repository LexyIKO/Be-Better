import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, FlatList, Alert, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import MiniTaskBox from './MiniTaskBox';
import HeaderForModal from './HeaderForModal'
import OneTaskModal from './OneTaskModal';

import { getTaskList, changeTaskStatus } from '../Requests/requests';

const ModalAdminTasks = (props) => {
 
    const [taskList, setTaskList] = useState([]);
    const [SortedTaskList, SetSortedTaskList] = useState([])

    const [OneTaskVisability, SetOneTaskVisible] = useState(false);

    const reverseTaskStatus = async (taskID, status) => {
        try {
            await changeTaskStatus(taskID, !status)

            SetOneTaskVisible(false);
            getFirstTimeTaskList();
        } catch (error) {
            Alert.alert('Ошибка: ', error.message || 'Неизвестная ошибка')
        }

        
    };

    const getFirstTimeTaskList = async () =>{
        const moscowOffset = 3 * 60 * 60 * 1000; // в миллисекундах
        const res = await getTaskList();
        let item = []
        if(res != undefined){
            for (i in res){
                if(res[i].isRequired === false && res[i].isActive === true && res[i].isFromAdmin === true){

                    const createdAtDate = new Date(res[i].createdAt);
                    const createdAtMoscow = new Date(createdAtDate.getTime() + moscowOffset);
                    
                    const endDate = new Date(createdAtMoscow.getTime() + res[i].duration * 24 * 60 * 60 * 1000);

                    let temp = {
                        'id': res[i].id,
                        'title': res[i].title,
                        'description': res[i].description,
                        'time': endDate,
                        'isCompleted': res[i].UserTasks.isDone
                    }
                    item.push(temp);
                }
            }
        }
        setTaskList(item)
    }

    const closeModal = () => {
        props.onCloseModal();
    };

    useEffect(() => {

        getFirstTimeTaskList();
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
            <HeaderForModal fontSize = {{fontSize: 32}} onModalClose = {closeModal} title='Задачи от администрации'/>

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
                onStatusChanged= {()=>reverseTaskStatus(CurrentTask.id, CurrentTask.isCompleted)} 
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