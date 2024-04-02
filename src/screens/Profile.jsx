import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/MainStyle'

import Header from '../components/Header';

const ProfileScreen = () => {
    const navigation = useNavigation();

    return(
        <SafeAreaView style = {styles.container}>
           <Header ScreenTitle='profile'/>
           <Text>Это профиль</Text>
        </SafeAreaView>
    );
}

export default ProfileScreen;