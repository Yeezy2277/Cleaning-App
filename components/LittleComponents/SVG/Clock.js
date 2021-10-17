import React from 'react';
import {View} from "react-native";
import {Circle} from "react-native-maps";
import Svg, {Path} from "react-native-svg";

const Clock = (props) => {
    return (
       <View {...props}>
           <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <Circle cx="12" cy="12" r="11" stroke="white" stroke-width="2"/>
               <Path d="M12 7V13L14.5 15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </Svg>
       </View>
    );
};

export default Clock;
