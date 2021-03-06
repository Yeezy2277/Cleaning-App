import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {Dimensions, View} from "react-native";

const width = Dimensions.get("screen").width;

const AdditionCount = props => {
    return (
        props.addition ?
            <View style={{marginRight: width * 0.01}}>
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect width="32" height="32" rx="16" fill="#EFF0F7"/>
                    <Path d="M17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12L17 12ZM15 20C15 20.5523 15.4477 21 16 21C16.5523 21 17 20.5523 17 20L15 20ZM15 12L15 20L17 20L17 12L15 12Z" fill="#272338"/>
                    <Path d="M12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17V15ZM20 17C20.5523 17 21 16.5523 21 16C21 15.4477 20.5523 15 20 15V17ZM12 17H20V15H12V17Z" fill="#272338"/>
                </Svg>
            </View>
            :
            <View tyle={{marginLeft: width * 0.01}}>
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect width="32" height="32" rx="16" fill="#EFF0F7"/>
                    <Path d="M12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17V15ZM20 17C20.5523 17 21 16.5523 21 16C21 15.4477 20.5523 15 20 15V17ZM12 17H20V15H12V17Z" fill="#272338"/>
                </Svg>
            </View>
    );
};

export default AdditionCount;
