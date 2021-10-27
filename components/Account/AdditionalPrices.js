import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MyButton from "../LittleComponents/MyButton";
import Preloader from "../view/Common/Preloader";
import {calculateAPI} from "../api";
import {commonError} from "../alerts";
import AdditionCount from "../LittleComponents/SVG/AdditionCount";

const width = Dimensions.get("screen").width;

const AdditionalPrices = props => {
    // const data = [
    //     {id: 1, name: "Чистка телевизора", category: "regular", multiple: false, price: 100},
    //     {id: 2, name: "Чистка телевизора", category: "regular", multiple: false, price: 1110}
    // ]
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState([]);
    const onSubmit = itemArr => {
        let arr = [...data].map(item => {
            return {id: item.id, name: item.name, category: item.category, multiple: item.multiple,
                price: item.price, count: itemArr.name === item.name ? item.count + 1 : item.count}
        });
        setData(arr);
    }
    useEffect(() => {
        calculateAPI.getOptions().then(r => {
            if (r === undefined) {
                commonError();
            } else {
                let arr = [...r.data.extra].map(item => {
                    return {id: item.id, name: item.name, category: item.category, multiple: item.multiple, price: item.price, count: 0}
                });
                console.log(arr);
                setData(arr);
                setIsPending(false);
            }
        })
    }, [])
    return (
        isPending ? <Preloader/> :
        <FlatList style={{flex: 1}} data={["1"]} keyExtractor={() => Math.random().toString()} renderItem={({item}) => (
            <View style={s.content__header} key="0">
                <Text style={s.content__heading}>Дополнительные опции</Text>
                <Text style={[s.content__heading, {
                    marginTop: 10,
                    marginBottom: 7,
                    fontSize: 15,
                    lineHeight: 19,
                    color: "#6E7191"
                }]}>Что еще нужно помыть или убрать дополнительно?</Text>
                <FlatList style={{flex: 1}} data={data} renderItem={({item}) => (
                    <View key="1" style={s.content__item}>
                        <Text style={{fontSize: 15, marginTop: width * 0.05}}>{item.name}</Text>
                        {item.count > 0 ?
                            item.multiple ?
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <AdditionCount addition={true}/>
                                    <Text style={{fontWeight: "600", color: "#272338", fontSize: 16}}>{item.count}</Text>
                                    <AdditionCount addition={false}/>
                                </View> :
                                <TouchableOpacity style={s.deleteButton}>
                                    <Text style={{fontWeight: "400", fontSize: 15, color: "#A0A3BD"}}>Удалить</Text>
                                </TouchableOpacity>
                            : <MyButton onPress={() => onSubmit(item)} width={width * 0.3} title={`${item.price} руб`}/>}
                    </View>
                )}/>
            </View>
        )}/>
    );
};

const s = StyleSheet.create({
    content__header: {
        flex: 1,
        padding: width * 0.07,
        paddingBottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    content__heading: {
        marginBottom: 2,

        fontSize: 20,
        fontWeight: '500',
        color: '#14142B',
    },
    content__item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: "#EFF0F7"
    },
    deleteButton: {
        marginTop: width * 0.05,
        width: width * 0.3,
        borderRadius: 12,
        borderColor: "#A0A3BD",
        borderWidth: 1,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default AdditionalPrices;
