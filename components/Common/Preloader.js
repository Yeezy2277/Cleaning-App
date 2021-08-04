import React from 'react';
import {View, StyleSheet, Image} from "react-native";

const Preloader = () => {
    return (
            <Image source={{
                uri: "https://i.imgur.com/bfj4YZJ.gif"
            }} style={StyleSheet.absoluteFillObject}/>
    );
};

export default Preloader;