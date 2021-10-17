import React from 'react';
import {Image} from "react-native";
import marker from "../../../assets/marker.png";

const MarkerCustom = () => {
    return (
        <Image source={marker} style={{width: 28, height: 37}}/>
    );
};

export default MarkerCustom;
