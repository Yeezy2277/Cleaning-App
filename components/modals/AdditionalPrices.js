import React, {useRef, forwardRef} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, Dimensions, FlatList} from 'react-native';
import {Modalize} from 'react-native-modalize';

import {useCombinedRefs} from '../utils/use-combined-refs';
import MyButton from "../LittleComponents/MyButton";

const width = Dimensions.get("screen").width;

export const AdditionalPrices = forwardRef((_, ref) => {
    const modalizeRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    const data = [
        {id: 1, name: "Чистка телевизора", category: "regular", multiple: false, price: 100}
    ]

    const renderContent = () => [
        <View style={s.content__header} key="0">
            <Text style={s.content__heading}>Дополнительные опции</Text>
            <Text style={[s.content__heading, {
                marginTop: 10,
                marginBottom: 7,
                fontSize: 15,
                lineHeight: 19,
                color: "#6E7191"
            }]}>Что еще нужно помыть или убрать дополнительно?</Text>
        </View>,
        data.map(item => {
            return <View key="1" style={s.content__item}>
                <Text style={{fontSize: 15}}>{item.name}</Text>
                <MyButton width={width * 0.3} title={`${item.price} руб`}/>
            </View>
        })
    ];
    return (
        <Modalize
            ref={combinedRef}
            scrollViewProps={{
                showsVerticalScrollIndicator: false,
                stickyHeaderIndices: [0],
            }}
        >
            {renderContent()}
        </Modalize>
    );
});

const s = StyleSheet.create({
    content__header: {
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
        paddingHorizontal: width * 0.07,
        marginTop: 33,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#EFF0F7"
    }
});
