import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, FlatList, Pressable, Modal, StyleSheet, Alert } from 'react-native';

import HeaderForModal from './HeaderForModal'

import IconCheckboxMarkedCircleOutline from '../icons/CheckBoxChecked'
import IconCheckboxBlankCircleOutline from '../icons/CheckBox'
import { addNewTask } from '../Requests/requests';

const ModalAddNewTask = (props) => {
    const [Title, SetTitle] = useState('');
    const [Description, SetDescription] = useState('');
    const [Duration, SetDuration] = useState(''); //Строка, нужно преобразовывать в число
    const [isRequired, SetIsRequired] = useState(false);
    const [isFromAdmin, SetISFromAdmin] = useState(false);
    const [isDeletable, SetIsDeletable] = useState(true);
    const [isActive, SetIsActive] = useState(true);
    


    const closeModal = () => {
        props.onCloseModal();
    };

    const submitTask = async () => {
        try {
            const res = await addNewTask({
                'title': Title,
                'description' : Description,
                'duration' : Number(Duration),
                'isRequired' : isRequired,
                'isDeletable' : isDeletable,
                'isActive' : isActive               
            })

            Alert.alert('Задача успешно добавлена.');
            
            SetTitle('');
            SetDescription('');
            SetDuration('');
            SetIsRequired(false);
            SetISFromAdmin(false);

        } catch (error) {
            Alert.alert('Ошибка: ', error.message || 'Неизвестная ошибка');
        }

    }

    useEffect(()=>{
        
    });

    return(
        <Modal
            animationType='slide'
            transparent={false}
            visible={props.visability}
            onRequestClose={closeModal}
        >
            <HeaderForModal fontSize = {{fontSize: 32}} onModalClose = {closeModal} title='Добавление задачи'/>
            <View style = {styles.container}>
                <Text style = {{width: '95%', textAlign: 'center', fontSize: 28, marginTop: '15%', color: '#C3C3C3', marginBottom: '5%'}} adjustsFontSizeToFit = {true} numberOfLines = {2}>Для добавление новой задачи заполните все поля</Text>
                <TextInput 
                    placeholder='Заголовок'
                    placeholderTextColor='rgba(195, 195, 195, 0.5)'
                    style = {styles.input}
                    value={Title}
                    onChangeText={SetTitle}
                    multiline={true}
                />
                <TextInput 
                    placeholder='Описание'
                    placeholderTextColor='rgba(195, 195, 195, 0.5)'
                    style = {styles.input}
                    value={Description}
                    onChangeText={SetDescription}
                    multiline={true}
                />
                <View style = {{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '85%',
                        justifyContent: 'space-between',
                        marginTop: '3%',
                        paddingHorizontal: 10,
                    }}>
                    <Text style = {{fontSize: 24, color: '#C3C3C3'}} adjustsFontSizeToFit = {true} numberOfLines = {1}>Длительность (Дней)</Text>
                    <TextInput 
                        placeholder='0'
                        placeholderTextColor='rgba(195, 195, 195, 0.5)'
                        style = {[styles.input, {width: '15%', textAlign: 'center'}]}
                        value={Duration}
                        keyboardType='numeric'
                        onChangeText={SetDuration}
                    />
                </View>
                <View style = {styles.listView}>
                    <Text style = {{fontSize: 24, color: '#C3C3C3'}} adjustsFontSizeToFit = {true} numberOfLines = {1}>Обязательная: </Text>
                    
                    <Pressable onPress={()=> SetIsRequired(!isRequired)}>
                        {isRequired === true 
                            ? <IconCheckboxMarkedCircleOutline color='#C3C3C3' height = '50px' width='50px'/> 
                            : <IconCheckboxBlankCircleOutline color='#C3C3C3' height = '50px' width='50px' />
                        }
                    </Pressable>
                </View>

                <View style = {styles.listView}>
                    <Text style = {{fontSize: 24, color: '#C3C3C3'}} adjustsFontSizeToFit = {true} numberOfLines = {1}>От администратора: </Text>
                    
                    <Pressable onPress={()=> SetISFromAdmin(!isFromAdmin)}>
                        {isFromAdmin === true 
                            ? <IconCheckboxMarkedCircleOutline color='#C3C3C3' height = '50px' width='50px'/> 
                            : <IconCheckboxBlankCircleOutline color='#C3C3C3' height = '50px' width='50px' />
                        }
                    </Pressable>
                </View>

                <View style = {styles.listView}>
                    <Pressable onPress={closeModal}><Text style = {styles.buttons}>Отменить</Text></Pressable>
                    <Pressable onPress={submitTask}><Text style = {styles.buttons}>Добавить</Text></Pressable>
                </View>

                
            </View>
            

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3E3E3E',
        alignItems: 'center'
    },
    input: {
        fontSize: 24,
        width: '85%',
        marginTop: '3%',
        backgroundColor: '#545252',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        color: "#C3C3C3" 
    },
    listView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        justifyContent: 'space-between',
        marginTop: '5%',
        paddingHorizontal: 10,
    }
    ,
    buttons: {
        fontSize: 24,
        color: '#C3C3C3',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#545252',
        borderRadius: 10,
        marginTop: '10%'
    }
    
    
    
});

export default ModalAddNewTask;