import React from 'react';
import Svg, {Rect} from "react-native-svg";
import {View} from "react-native";

const ModalLine = () => {
    return (
        <View style={{marginTop: 8}}>
            <Svg width="25" height="2" viewBox="0 0 25 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Rect x="0.5" width="24" height="2" rx="1" fill="#D9DBE9"/>
            </Svg>
        </View>
    );
};

export default ModalLine;
