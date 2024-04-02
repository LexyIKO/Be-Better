import { StyleSheet, Text, SafeAreaView } from 'react-native';

const Welcome = () => {
    return(
        <SafeAreaView style = {styles.container}>
            <Text>
                Mega hi
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%'
    }
});

export default Welcome;


