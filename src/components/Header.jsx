import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import IconProfile from '../icons/ProfileIcons';
import IconHome from '../icons/HoneIcon';

const Header = (props) => {
    const navigation = useNavigation();
    function handlerProfile (){
        if (props.ScreenTitle === 'main')  {
            navigation.navigate('ProfileScreen');
        } else {
            navigation.navigate('MainScreen');
        }
    }

    return(
        <View style = {styles.container}>
            <View style= {styles.logoBox}>
                <Text style = {styles.logoText}>Be-Better</Text>
            </View>
            <Pressable
            onPress={handlerProfile}>
                {props.ScreenTitle === 'main' 
                ? <IconProfile color='#C3C3C3' height = '70px' width='70px' style={styles.icon}/> 
                : <IconHome color='#C3C3C3' height = '75px' width='75px' style={styles.icon}/>}
            </Pressable>
        </View>
    );
}



const styles = StyleSheet.create({
    container:{
        width: '100%',
        display: 'flex',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoBox:{
        height: 60,
        width: '70%',
        backgroundColor: '#2F2F2F',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 15,
        justifyContent: 'center'
    },
    logoText:{
        fontSize: 36,
        color: '#C3C3C3',
        paddingLeft: 16
    },
    icon:{
        marginRight: 15
    }


});

export default Header;