import { View, Text, StyleSheet } from "react-native";

const TopListItem = (props) => {

    return (
        <View style={[styles.container, Number(props.userId) === props.itemData.id ? styles.spotlight : null]}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[{marginRight: 10, width: 30, textAlign: 'center'}, styles.text]}>{props.itemData.placement}</Text>
                <Text style={styles.text}>{props.itemData.nickname}</Text>
            </View>
            
            <Text style={[styles.text, {textAlign: 'right'}]}>{props.itemData.doneTasks}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
    },

    spotlight: {
        backgroundColor: '#545252'
    },

    text: {
        color: '#C3C3C3',
        fontSize: 22
    }
});

export default TopListItem;