import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const Plus = (props) => {
    return (
        <View {...props}>
            <Svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M8.63637 1V13.9231" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M1 7.46157H16.2727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
    );
};

export default Plus;
