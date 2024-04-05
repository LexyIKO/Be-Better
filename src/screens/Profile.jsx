import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/MainStyle'

import Header from '../components/Header';
import Statistics from '../components/Statistics';
import Top from '../components/Top';
import IconDoveLeft from '../icons/DoveLeft';
import IconDoveRight from '../icons/DoveRight';

import { logout, fetchData } from '../auth/auth';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const [Nickname, SetNickname] = useState();

    function getNickname() {
        // TODO
        SetNickname("LexyIKO");
    }

    const handleLogout = () => {

        logout()
        navigation.navigate("Auth")
    };

    useEffect(()=>{
        getNickname();
    },[]);

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
            <Pressable onPress={handleLogout}><Text>Выйти</Text></Pressable>
        </SafeAreaView>
    );
}

export default ProfileScreen;