import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { getUserStatistics } from '../Requests/requests';

const Statistics = (props) => {

    const [TaskQuantity, SetTaskQuantity] = useState();

    const getTaskQuantity = async () => {
        const userStatistics = await getUserStatistics();
        SetTaskQuantity(userStatistics);
    }

    useEffect(()=>{
        getTaskQuantity();
    },[]);

    return (
        <View style = {[styles.container, props.style]}>
            <Text style = {[styles.text, {textAlign: 'center', fontWeight: 'bold', fontSize: 24}]}>Ваша статистика</Text>

            <View style = {styles.statisticsLine}>
                <Text style = {styles.text}>Обычные</Text>
                <Text style = {styles.text}>{TaskQuantity?.common}</Text>
            </View>

            <View style = {styles.statisticsLine}>
                <Text style = {styles.text}>Пропущенные</Text>
                <Text style = {styles.text}>{TaskQuantity?.skipped}</Text>
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