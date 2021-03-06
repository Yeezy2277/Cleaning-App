import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";

const Calendar = () => {
    return (
        <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="1.66663" y="3.5" width="16.6667" height="15.8333" rx="3" stroke="#A0A3BD" stroke-width="2"/>
            <Path d="M5.83337 1.83331V3.49998" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M14.1666 1.83331V3.49998" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M1.66663 7.66669H18.3333" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M6.25 11.8333H7.91667" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12.0834 11.8333H13.75" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M6.25 15.1667H7.91667" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12.0834 15.1667H13.75" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    );
};

export default Calendar;
