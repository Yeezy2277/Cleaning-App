import React from 'react';
import {Image, StyleSheet, View} from "react-native";

const AuthPreloader = () => {
    return (
        <View style={[{backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", alignItems: "center"}, StyleSheet.absoluteFillObject]}>
            <Image source={{
                uri: "https://i.imgur.com/WSTYk4b.gif"
            }} style={{width: 300, height: 300}}/>
        </View>
    );
};

export default AuthPreloader;
