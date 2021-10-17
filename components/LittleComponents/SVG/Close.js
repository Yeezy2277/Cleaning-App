import React from 'react';
import {View} from "react-native";
import Svg, {Path} from "react-native-svg";

const Close = () => {
    return (
        <View>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M6 6L18.7742 18.7742" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M6 18.7742L18.7742 5.99998" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
    );
};

export default Close;
