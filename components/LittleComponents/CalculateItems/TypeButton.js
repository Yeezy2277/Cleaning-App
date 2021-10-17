import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import radio from "../../../assets/Radio.png";
import Plus from "../SVG/Plus";

const TypeButton = (props, {Component}) => {
    return (
        <View style={{padding: 3, borderRadius: 21, borderColor: props.borderColor}}>
            <TouchableOpacity onPress={props.onPress} style={{width: props.width, height: props.height, borderRadius: 18}}>
                <ImageBackground source={props.background}>
                    <View style={{paddingLeft: props.paddingLeft, paddingRight: props.paddingRight}}>
                        <Component/>
                        {props.active ? <Image source={radio} style={styles.radio}/> : null}
                    </View>
                    <Text>{props.text}</Text>
                    <Plus style={{marginTop: 30}}/>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    radio: {
        width: 24,
        height: 24
    },
    title: {
        fontWeight: "400",
        fontSize: 15,
        color: "white"
    }
})

export default TypeButton;
