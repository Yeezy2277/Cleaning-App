import React from 'react';
import {View} from "react-native";
import Svg, {Path} from "react-native-svg";

const StackSVG = (props) => {
    return (
        <View {...props}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1.4138 17.0896C0.911021 16.8611 0.318171 17.0834 0.0896335 17.5862C-0.138903 18.089 0.0834155 18.6818 0.586197 18.9104L1.4138 17.0896ZM23.4138 18.9104C23.9166 18.6818 24.1389 18.089 23.9104 17.5862C23.6818 17.0834 23.089 16.8611 22.5862 17.0896L23.4138 18.9104ZM12 23L11.5862 23.9104C11.8491 24.0299 12.1509 24.0299 12.4138 23.9104L12 23ZM0.586197 18.9104L11.5862 23.9104L12.4138 22.0896L1.4138 17.0896L0.586197 18.9104ZM12.4138 23.9104L23.4138 18.9104L22.5862 17.0896L11.5862 22.0896L12.4138 23.9104Z" fill="white"/>
                <Path d="M1.4138 10.5896C0.911021 10.3611 0.318171 10.5834 0.0896335 11.0862C-0.138903 11.589 0.0834155 12.1818 0.586197 12.4104L1.4138 10.5896ZM23.4138 12.4104C23.9166 12.1818 24.1389 11.589 23.9104 11.0862C23.6818 10.5834 23.089 10.3611 22.5862 10.5896L23.4138 12.4104ZM12 16.5L11.5862 17.4104C11.8491 17.5299 12.1509 17.5299 12.4138 17.4104L12 16.5ZM0.586197 12.4104L11.5862 17.4104L12.4138 15.5896L1.4138 10.5896L0.586197 12.4104ZM12.4138 17.4104L23.4138 12.4104L22.5862 10.5896L11.5862 15.5896L12.4138 17.4104Z" fill="white"/>
                <Path d="M12 1L23 5L12 10L1 5L12 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
    );
};

export default StackSVG;