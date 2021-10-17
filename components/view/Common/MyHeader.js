import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Header from "react-native/Libraries/NewAppScreen/components/Header";

const width = Dimensions.get("screen").width;

const MyHeader = (props) => {
    return (
        <View style={{ backgroundColor: '#eee' }}>
            <LinearGradient
                colors={["#3ad666", "#2eade8"]} start={[0, 1]} end={[1, 0]} style={{height: width * 0.3}}>
                <Header {...props} />
            </LinearGradient>
        </View>
    );
};


export default MyHeader;