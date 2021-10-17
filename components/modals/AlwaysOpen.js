import React, {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Modalize } from 'react-native-modalize';
import MyButton from "../LittleComponents/MyButton";

const width = Dimensions.get("screen").width;

export const AlwaysOpen = props => {
    const modalizeRef = useRef(null);

    const renderContent = () => (
        <View style={s.content}>
            <MyButton width={width * 0.85}  title={"Выбрать"} onPress={async () => {
                props.navigation.goBack();
                await props.route.params.updateAddress(props.myRef.current?.getAddressText(), props.region, props.camera)
            }}/>
        </View>
    );

    return (
        <Modalize
            ref={modalizeRef}
            alwaysOpen={119}
            onOpen={() => modalizeRef.current.close()}
            onClose={() => modalizeRef.current.close()}

            adjustToContentHeight={true}
        >
            {renderContent()}
        </Modalize>
    );
};

const s = StyleSheet.create({
    content: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        height: 119
    },

    content__heading: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },

});
