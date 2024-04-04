import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Statistics = (props) => {

    const [TaskQuantity, SetTaskQuantity] = useState({});

    let TestData = {Common: 5, Required: 2, AdminTasks: 12};

    function getTaskQuantity() {
        // TODO
        SetTaskQuantity(TestData);
    }

    useEffect(()=>{
        getTaskQuantity();
    },[]);

    return (
        <View style = {[styles.container, props.style]}>
            <Text style = {[styles.text, {textAlign: 'center', fontWeight: 'bold', fontSize: 24}]}>Ваша статистика</Text>

            <View style = {styles.statisticsLine}>
                <Text style = {styles.text}>Обычные</Text>
                <Text style = {styles.text}>{TaskQuantity.Common}</Text>
            </View>

            <View style = {styles.statisticsLine}>
                <Text style = {styles.text}>Обязательные</Text>
                <Text style = {styles.text}>{TaskQuantity.Required}</Text>
            </View>

            <View style = {styles.statisticsLine}>
                <Text style = {styles.text}>От администрации</Text>
                <Text style = {styles.text}>{TaskQuantity.AdminTasks}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: '#545252',
        borderRadius: 10,
        padding: 10
    },

    statisticsLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    text: {
        color: '#C3C3C3',
        fontSize: 22
    }
 });
 

export default Statistics;