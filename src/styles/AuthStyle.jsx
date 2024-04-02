import { StyleSheet } from "react-native";
// import {Appearance} from 'react-native';

// const colorSheme = Appearance.getColorScheme()

// const light = StyleSheet.create({
//     container: {
//         display: 'flex',
//         height: '100%'
//     },
//     Box: {
//         display: 'flex',
//         alignItems: 'center',
//         marginTop: 200

//     },
//     MyInput: {
//         marginTop: 10,
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//         borderWidth: 2,
//         borderRadius: 10,
//         borderColor: '#369bff',
//         width: 320,
//         fontSize: 24,
//     },
//     MyButton: {
//         borderWidth: 2,
//         borderRadius: 5,
//         paddingHorizontal: 5,
//         paddingVertical: 5,
//         borderColor: '#369bff',
//     },
//     MyError: {
//         color: 'red'
//     } 
// });

const dark = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        backgroundColor: 'black'
    },
    Box: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 200

    },
    MyInput: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#369bff',
        width: 320,
        fontSize: 24,
    },
    MyButton: {
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: '#369bff',
    },
    MyError: {
        color: 'red'
    } 
});

function isDark (){
    styles = dark
}

isDark()

export default styles