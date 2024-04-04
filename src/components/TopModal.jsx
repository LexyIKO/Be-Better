import { useEffect, useState } from "react";
import { FlatList, Modal, View, StyleSheet, Text } from "react-native";

import TopListItem from "./TopListItem";
import HeaderForModal from "./HeaderForModal";

const TopModal = (props) => {

    const [UserPlacementInfo, SetUserPlasementInfo] = useState({placement: 0, nickname: 'Noname', doneTasks: 0});

    let testUserPlacementInfo = {placement: 52, nickname: 'Me', doneTasks: 12};

    function getUserPlacementInfo() {
        // TODO
        SetUserPlasementInfo(testUserPlacementInfo);
    };

    function closeModal() {
        props.onCloseModal();
    };

    useEffect(()=>{
        getUserPlacementInfo();
    },[]);

    return (
        <Modal
            animationType='slide'
            transparent={false}
            visible={props.visability}
            onRequestClose={closeModal}
        >
            <HeaderForModal fontSize={{fontSize: 30}} onModalClose={closeModal} title='Топ пользователей'/>
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <FlatList
                        data={props.displayableInfo}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (<TopListItem itemData={item}/>)}
                    />
                </View>
                <Text style={[styles.text, {marginTop: 5, marginBottom: 5}]}>Ваша позиция</Text>
                <View style={styles.userPlacement}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[{marginRight: 10}, styles.text]}>{UserPlacementInfo.placement}</Text>
                        <Text style={styles.text}>{UserPlacementInfo.nickname}</Text>
                    </View>
                    <Text style={styles.text}>{UserPlacementInfo.doneTasks}</Text>
                </View>
            </View>            
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#3E3E3E',
        flex: 1,
        alignItems: 'center'
    },

    listContainer: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#C3C3C3', 
        width: '97%',
        height: '80%',
        padding: 10,
        marginTop: '10%'
    },

    title: {
        color: '#C3C3C3',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    userPlacement: {
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#C3C3C3', 
        backgroundColor: '#3E3E3E',
        display: 'flex',
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    text: {
        color: '#C3C3C3',
        fontSize: 22
    }
 }); 

export default TopModal;