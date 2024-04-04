import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, StyleSheet } from "react-native";

import TopListItem from "./TopListItem";
import TopModal from "./TopModal";

const Top = (props) => {

    const [TopModalVisability, SetTopModalVisability] = useState(false);

    function closeTopModal() {
        SetTopModalVisability(!TopModalVisability);
    }

    const [TopList, SetTopList] = useState();

    let testTopList = [
        {id: 1, placement: 1, nickname: 'stepunchik', doneTasks: 200},
        {id: 2, placement: 2, nickname: 'LexyIKO', doneTasks: 178},
        {id: 3, placement: 3, nickname: 'Leshiy', doneTasks: 16},
        {id: 4, placement: 4, nickname: 'Laim', doneTasks: 150},
        {id: 5, placement: 5, nickname: 'dj_banana', doneTasks: 1},
        {id: 6, placement: 6, nickname: 'stepunchik', doneTasks: 200},
        {id: 7, placement: 7, nickname: 'bananchiki', doneTasks: 18},
        {id: 8, placement: 8, nickname: 'Leshiy', doneTasks: 160},
        {id: 9, placement: 9, nickname: 'Laim', doneTasks: 150},
        {id: 10, placement: 10, nickname: 'dj_banana', doneTasks: 1499}
    ];

    const [LiteTopList, SetLiteTopList] = useState();

    function getTopList() {
        // TODO
        SetTopList(testTopList);
    }

    useEffect(()=>{
        getTopList();
    },[]);

    useEffect(()=>{
        if(TopList) {
            SetLiteTopList(TopList.slice(0, 5));
        }
    },[TopList]);


    return (
        <Pressable 
            style={[styles.container, props.style]}
            onPress={() => SetTopModalVisability(!TopModalVisability)}
        >
            <Text style={styles.title}>Топ пользователей</Text>
            <FlatList
                data={LiteTopList}
                renderItem={({item}) => (<TopListItem itemData={item}/>)}
                style={styles.list}
            />
            <TopModal displayableInfo={TopList} visability={TopModalVisability} onCloseModal={closeTopModal}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: '#545252',
        borderRadius: 10,
        padding: 10
    },

    list: {
        width: '100%'
    },

    title: {
        color: '#C3C3C3',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    }
 }); 

export default Top;