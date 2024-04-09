import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';

const ModalConfirm = (props) => {

    function closeModal() {
        props.onCloseModal();
    };

    function handleConfirm() {
        props.onConfirm();
        closeModal();
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visibility}
            onRequestClose={closeModal}
        >
            <Pressable 
                style={styles.modalContainer}
                onPress={props.onCloseModal}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>Вы уверены?</Text>
                    <View style={styles.buttonBox}>
                        <Pressable 
                            style={styles.button}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.text}>Да</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={closeModal}
                        >
                            <Text style={styles.text}>Нет</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    container:{
        display: 'flex',
        backgroundColor: '#3E3E3E',
        width: '90%',
        borderRadius: 10,
        padding: 20,
        margin: 'auto',
        alignItems: 'center'
    },

    buttonBox: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        backgroundColor: "#545252"
    },

    text: {
        color: '#C3C3C3',
        fontSize: 24,
    }
});

export default ModalConfirm;