import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Pressable } from 'react-native';
import { StyleSheet } from "react-native";
import IconArrowBackCircleOutline from '../icons/Back';


const HeaderForModal = (props) => {

    function closeModal (){
        props.onModalClose();
    }

    return(
        <View style = {styles.container}>
           <Pressable 
            onPress={closeModal}
           >
                <IconArrowBackCircleOutline color='#C3C3C3' height = '50px' width='50px'/>
           </Pressable>
           <Text style = {{fontSize: 38, color: '#C3C3C3'}}>{props.title}</Text>
        </View>
    );
}



const styles = StyleSheet.create({
   container: {
    height: 60,
    width: '100%',
    backgroundColor: '#3E3E3E',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,

   },

});

export default HeaderForModal;