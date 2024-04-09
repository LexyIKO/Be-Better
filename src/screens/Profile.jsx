import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/MainStyle'

import ModalConfirm from '../components/ModalConfirm';
import Header from '../components/Header';
import Statistics from '../components/Statistics';
import Top from '../components/Top';
import IconDoveLeft from '../icons/DoveLeft';
import IconDoveRight from '../icons/DoveRight';

import { logout, fetchData } from '../auth/auth';
import { getUserNickname } from '../Requests/requests';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const [Nickname, SetNickname] = useState();

    const getNickname = async () => {
        const nickname = await getUserNickname();
        SetNickname(nickname);
    }

    const handleLogout = () => {

        logout()
        navigation.navigate("Auth")
    };

    useEffect(()=>{
        getNickname();
    },[]);

    const [ModalConfirmVisibility, SetModalConfirmVisibility] = useState(false);

    function changeConfirmModalStatus() {
        SetModalConfirmVisibility(!ModalConfirmVisibility);
    };

    const handleConfirmation = () => {
        handleLogout();
    };

    return(
        <SafeAreaView style = {styles.container}>
            <Header ScreenTitle='profile'/>
            <View style={{flexDirection: 'row', marginTop: "15%"}}>
                <IconDoveLeft color='#C3C3C3'/>
                <Text style = {{color: '#C3C3C3', fontSize: 40, paddingHorizontal: 10}}>{Nickname}</Text>
                <IconDoveRight color='#C3C3C3'/>
            </View>                   
            <Statistics style = {{marginTop: '20%'}}/>
            <Top style={{marginTop: '10%'}}/>
            <Pressable onPress={changeConfirmModalStatus} style = {{marginTop: '10%',}}>
                <Text style = {{
                    paddingVertical: 20,
                    paddingHorizontal: 50,
                    borderRadius: 10,
                    color: '#C3C3C3',
                    fontSize: 24,
                    backgroundColor: "#545252"
                }}>Выйти</Text>
                <ModalConfirm onConfirm={handleConfirmation} visibility={ModalConfirmVisibility} onCloseModal={changeConfirmModalStatus}/>
            </Pressable>
        </SafeAreaView>
    );
}

export default ProfileScreen;