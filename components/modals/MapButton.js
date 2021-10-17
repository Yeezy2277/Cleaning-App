import React, {useRef, useState} from 'react';
import {useCombinedRefs} from "../utils/use-combined-refs";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {WebView} from "react-native-webview";
import MyButton from "../LittleComponents/MyButton";
import {Modalize} from "react-native-modalize";

const width = Dimensions.get("screen").width;

const MapButton = () => {
    const modalizeRef = useRef(null);
    const [toggle, setToggle] = useState(true);
    const renderContent = () => (
        <View style={s.content}>
                <View>
                    <MyButton title="Выбрать" width={width * 0.85}/>
                </View>
        </View>
    );
    return (
        <Modalize ref={modalizeRef} alwaysOpen={85}>
            {renderContent()}
        </Modalize>
    );
};

const s = StyleSheet.create({
    content: {
        paddingTop: 38,
        paddingLeft: 28,
        paddingRight: 24,
        paddingBottom: 35
    }
});

export default MapButton;
