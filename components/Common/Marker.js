import React from 'react';
import {Image} from "react-native";
import marker from "../../assets/marker.png";

const MarkerCustom = () => {
    return (
        <Image source={marker} style={{width: 40, height: 40}}/>
    );
};

export default MarkerCustom;