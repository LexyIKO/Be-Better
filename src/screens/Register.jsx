import { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, Pressable, View } from 'react-native';
import styles from '../styles/AuthStyle'

import { useNavigation } from '@react-navigation/native';

const Registration = () => {
    const [login, SetLogin] = useState('');
    const [password, SetPassword] = useState('');
    const [copyPassword, SetCopyPassword] = useState('');
    const [errors, SetErrors] = useState({});
    const [isFormValid, SetFormValid] = useState(false);

    const navigation = useNavigation();

    function Submit(){
        console.log("Registration submited")
    }
   
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
        }  else if (!copyPassword) {
            errors.password = 'Пароль не введен повторно';
        } else if (copyPassword !== password) {
            errors.password = 'Веденные пароли не совпадают';
        }
        SetErrors(errors);
        SetFormValid(Object.keys(errors).length === 0);
    };

    useEffect(()=>{
        ValidateForm()
    }, [login, password, copyPassword]);

    return(

        <SafeAreaView style = {styles.container}>
            
            <View style = {styles.Box}>
                <Text style = {{fontSize: 32}}>Регистрация</Text>
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
                <TextInput 
                    placeholder = 'Повторите пароль'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    style = {styles.MyInput}
                    secureTextEntry
                    value = {copyPassword}
                    onChangeText = {SetCopyPassword}
                />
                <Text style={[styles.MyError, { display: errors.password ? 'flex' : 'none' }]}>
                    {errors.password}
                </Text>  

                <Pressable
                    disabled = {!isFormValid} 
                    onPress={Submit}
                    style = {[styles.MyButton, {marginTop: 15, opacity: isFormValid ? 1 : 0.5}]}
                >
                    <Text style = {{fontSize: 24}}>Зарегистрироваться</Text>
                </Pressable>

                <Pressable 
                    style = {{marginTop: 15}}
                    onPress={()=>navigation.navigate('Login')}
                >
                    <Text style = {{fontSize: 20}}>Уже есть аккаунт?</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default Registration;


