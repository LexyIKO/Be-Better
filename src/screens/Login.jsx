import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { checkToken, loginUser } from '../auth/auth';
import styles from '../styles/AuthStyle'

const Login = () => {
    const [login, SetLogin] = useState('');
    const [password, SetPassword] = useState('');
    const [errors, SetErrors] = useState({});
    const [isFormValid, SetFormValid] = useState(false);

    const navigation = useNavigation();

    async function Submit (){
        const isLooggeed = await loginUser(login, password)
        if( isLooggeed == true){
            navigation.navigate('Main')
        }
    }

    useEffect(()=>{
        const isCheked = checkToken()

        console.log(isCheked);
        
    }, [])

    

    const ValidateForm = () => {
        let errors = {};

        // Валидация логина
        if (!login) {
            errors.login = undefined;
        } else if (login.length < 4) {
            errors.login = 'Длинна логина не меньше 4 символов';
        }

        // Валидация пароля
        if (!password) {
            errors.password = undefined;
        } else if (password.length < 8) {
            errors.password = 'Длинна пароля не меньше 8 символов';
        } 
        
        SetErrors(errors);
        SetFormValid(Object.keys(errors).length === 0);
    };

    useEffect(()=>{
        ValidateForm()
    }, [login, password]);


    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.Box}>
                <Text style = {{fontSize: 32}}>Авторизация</Text>
                <TextInput 
                    placeholder = 'Введите логин'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    style = {styles.MyInput}
                    value = {login}
                    onChangeText = {SetLogin}
                />
                <Text style={[styles.MyError, { display: errors.login ? 'flex' : 'none' }]}>
                    {errors.login}
                </Text>       
                <TextInput 
                    placeholder = 'Введите пароль'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    style = {styles.MyInput}
                    secureTextEntry
                    value = {password}
                    onChangeText = {SetPassword}
                />
                <Text style={[styles.MyError, { display: errors.password ? 'flex' : 'none' }]}>
                    {errors.password}
                </Text>   
                <Pressable 
                    onPress={Submit}
                    style = {[styles.MyButton, {marginTop: 15, opacity: isFormValid ? 1 : 0.5}]}
                >
                    <Text style = {{fontSize: 24}}>Войти</Text>
                </Pressable>

                <Pressable 
                    onPress={()=>navigation.navigate('Register')}
                >
                    <Text style = {{fontSize: 20, marginTop: 10}}>Нет аккаунта?</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default Login;


