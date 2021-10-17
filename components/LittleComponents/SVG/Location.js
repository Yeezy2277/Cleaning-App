import React from 'react';
import {View} from "react-native";
import Svg, {Path} from "react-native-svg";

const Location = (props) => {
    return (
       <View {...props}>
           <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
               <Path d="M2.06012 13.8221C1.23238 13.5037 1.19793 12.3453 2.0053 11.9784L24.6293 1.69472C25.4705 1.31237 26.3358 2.17771 25.9535 3.01889L15.6698 25.6429C15.3028 26.4503 14.1445 26.4158 13.8261 25.5881L10.7173 17.5052C10.6158 17.2411 10.4071 17.0324 10.143 16.9309L2.06012 13.8221Z" stroke="white" stroke-width="2"/>
           </Svg>
       </View>
    );
};

export default Location;
