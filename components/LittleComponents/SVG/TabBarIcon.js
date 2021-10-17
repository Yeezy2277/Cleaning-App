import React from 'react';
import Svg, {Circle, Defs, LinearGradient, Path, Rect, Stop} from "react-native-svg";

const TabBarIcon = (props) => {
    return (
        props.name === "calc-active" ?
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Rect x="2" y="2" width="4" height="4" rx="0.25" stroke="url(#paint0_linear)" stroke-width="2"/>
                <Rect x="10" y="2" width="4" height="4" rx="0.25" stroke="url(#paint1_linear)" stroke-width="2"/>
                <Rect x="18" y="2" width="4" height="4" rx="0.25" stroke="url(#paint2_linear)" stroke-width="2"/>
                <Rect x="2" y="10" width="4" height="4" rx="0.25" stroke="url(#paint3_linear)" stroke-width="2"/>
                <Rect x="10" y="10" width="4" height="4" rx="0.25" stroke="url(#paint4_linear)" stroke-width="2"/>
                <Rect x="18" y="10" width="4" height="4" rx="0.25" stroke="url(#paint5_linear)" stroke-width="2"/>
                <Rect x="2" y="18" width="4" height="4" rx="0.25" stroke="url(#paint6_linear)" stroke-width="2"/>
                <Rect x="10" y="18" width="4" height="4" rx="0.25" stroke="url(#paint7_linear)" stroke-width="2"/>
                <Rect x="18" y="18" width="4" height="4" rx="0.25" stroke="url(#paint8_linear)" stroke-width="2"/>
                <Defs>
                    <LinearGradient id="paint0_linear" x1="2" y1="4" x2="6" y2="4" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint1_linear" x1="10" y1="4" x2="14" y2="4" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint2_linear" x1="18" y1="4" x2="22" y2="4" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint3_linear" x1="2" y1="12" x2="6" y2="12" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint4_linear" x1="10" y1="12" x2="14" y2="12" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint5_linear" x1="18" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint6_linear" x1="2" y1="20" x2="6" y2="20" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint7_linear" x1="10" y1="20" x2="14" y2="20" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                    <LinearGradient id="paint8_linear" x1="18" y1="20" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                        <Stop stop-color="#3AD666"/>
                        <Stop offset="1" stop-color="#2EADE8"/>
                    </LinearGradient>
                </Defs>
            </Svg> : props.name === "calc" ?
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect x="2" y="2" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="10" y="2" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="18" y="2" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="2" y="10" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="10" y="10" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="18" y="10" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="2" y="18" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="10" y="18" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                    <Rect x="18" y="18" width="4" height="4" rx="0.25" stroke="#A0A3BD" stroke-width="2"/>
                </Svg> : props.name === "location-active" ?
                    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path
                            d="M21.9995 11C21.9995 15.346 15.8072 20.9022 13.1682 23.0727C12.4833 23.636 11.5157 23.636 10.8309 23.0727C8.19185 20.9022 1.99951 15.346 1.99951 11C1.99951 5.47715 6.47666 1 11.9995 1C17.5224 1 21.9995 5.47715 21.9995 11Z"
                            stroke="url(#paint0_linear)" stroke-width="2"/>
                        <Circle cx="11.9995" cy="11" r="3" stroke="url(#paint1_linear)" stroke-width="2"/>
                        <Defs>
                            <LinearGradient id="paint0_linear" x1="1.99951" y1="12.5" x2="21.9995" y2="12.5"
                                            gradientUnits="userSpaceOnUse">
                                <Stop stop-color="#3AD666"/>
                                <Stop offset="1" stop-color="#2EADE8"/>
                            </LinearGradient>
                            <LinearGradient id="paint1_linear" x1="8.99951" y1="11" x2="14.9995" y2="11"
                                            gradientUnits="userSpaceOnUse">
                                <Stop stop-color="#3AD666"/>
                                <Stop offset="1" stop-color="#2EADE8"/>
                            </LinearGradient>
                        </Defs>
                    </Svg> : props.name === "location" ?
                        <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path
                                d="M21.9995 11C21.9995 15.346 15.8072 20.9022 13.1682 23.0727C12.4833 23.636 11.5157 23.636 10.8309 23.0727C8.19185 20.9022 1.99951 15.346 1.99951 11C1.99951 5.47715 6.47666 1 11.9995 1C17.5224 1 21.9995 5.47715 21.9995 11Z"
                                stroke="#A0A3BD" stroke-width="2"/>
                            <Circle cx="11.9995" cy="11" r="3" stroke="#A0A3BD" stroke-width="2"/>
                        </Svg> : props.name === "support-active" ?
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path
                                    d="M12.4995 22C18.2985 22 22.9995 17.299 22.9995 11.5C22.9995 5.70101 18.2985 1 12.4995 1C6.70052 1 1.99951 5.70101 1.99951 11.5C1.99951 13.4585 2.53574 15.2918 3.46939 16.8611L1.99951 21.9999L7.26498 20.6042C8.80589 21.4921 10.5934 22 12.4995 22Z"
                                    stroke="url(#paint0_linear)" stroke-width="2" stroke-linejoin="round"/>
                                <Defs>
                                    <LinearGradient id="paint0_linear" x1="1.99951" y1="11.5" x2="22.9995" y2="11.5"
                                                    gradientUnits="userSpaceOnUse">
                                        <Stop stop-color="#3AD666"/>
                                        <Stop offset="1" stop-color="#2EADE8"/>
                                    </LinearGradient>
                                </Defs>
                            </Svg> : props.name === "support" ?
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M12.4995 22C18.2985 22 22.9995 17.299 22.9995 11.5C22.9995 5.70101 18.2985 1 12.4995 1C6.70052 1 1.99951 5.70101 1.99951 11.5C1.99951 13.4585 2.53574 15.2918 3.46939 16.8611L1.99951 21.9999L7.26498 20.6042C8.80589 21.4921 10.5934 22 12.4995 22Z"
                                        stroke="#A0A3BD" stroke-width="2" stroke-linejoin="round"/>
                                </Svg> : props.name === "profile-active" ?
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <Path
                                            d="M18.9506 17.3802C17.3783 16.5669 14.7849 15.5 12 15.5C9.21513 15.5 6.62175 16.5669 5.04942 17.3802C4.03431 17.9052 3.42295 18.9351 3.2883 20.07L3 22.5H21L20.7117 20.07C20.577 18.9351 19.9657 17.9052 18.9506 17.3802Z"
                                            stroke="url(#paint0_linear)" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                        <Path
                                            d="M12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11Z"
                                            stroke="url(#paint1_linear)" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                        <Defs>
                                            <LinearGradient id="paint0_linear" x1="3" y1="19" x2="21" y2="19"
                                                            gradientUnits="userSpaceOnUse">
                                                <Stop stop-color="#3AD666"/>
                                                <Stop offset="1" stop-color="#2EADE8"/>
                                            </LinearGradient>
                                            <LinearGradient id="paint1_linear" x1="7.5" y1="6.5" x2="16.5" y2="6.5"
                                                            gradientUnits="userSpaceOnUse">
                                                <Stop stop-color="#3AD666"/>
                                                <Stop offset="1" stop-color="#2EADE8"/>
                                            </LinearGradient>
                                        </Defs>
                                    </Svg> : props.name === "profile" ?
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.9506 17.3802C17.3783 16.5669 14.7849 15.5 12 15.5C9.21513 15.5 6.62175 16.5669 5.04942 17.3802C4.03431 17.9052 3.42295 18.9351 3.2883 20.07L3 22.5H21L20.7117 20.07C20.577 18.9351 19.9657 17.9052 18.9506 17.3802Z" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <Path d="M12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11Z" stroke="#A0A3BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </Svg> : null
    );
};

export default TabBarIcon;
