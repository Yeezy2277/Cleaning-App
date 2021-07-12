import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {LinearGradient} from "expo-linear-gradient";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import ModalPicker from "../LittleComponents/ModalPicker";

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const CalculateRoot = () => {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen options={{
                    headerTitleContainerStyle: {
                        paddingLeft: 20
                    },
                    headerTitleStyle: {
                        fontFamily: "Montserrat_500Medium",
                        color: "white",
                        fontSize: 22
                    },
                    headerBackground: () => (
                        <LinearGradient colors={["#3ad666", "#2eade8"]} start={[0, 1]}
                                        end={[1, 0]}
                                        style={[StyleSheet.absoluteFill, {paddingBottom: width * 0.25}]}>
                        </LinearGradient>
                    )
                }} name="Калькулятор" component={Calculate}/>
            </Stack.Navigator>
        );
    };
};

const Calculate = () => {
    const changeModalVisibility = (bool) => {
        setModalVisible(bool)
    }
    const setData = (option) => {
        setChooseData(option)
    }
    const [chooseData, setChooseData] = useState("Вопросы по заказу")
    const [isModalVisible, setModalVisible] = useState(false)
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.container} onPress={() => changeModalVisibility(true)}>
                <Text>{chooseData}</Text>
            </TouchableOpacity>
            <Modal
            transparent={true}
            animationType={"fade"}
            visible={isModalVisible}
            onRequestClose={() => changeModalVisibility(false)}>
                <ModalPicker changeModalVisibility={changeModalVisibility} setData={setData}/>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: width * 0.1,
        marginLeft: width * 0.1,
        height: width * 0.13,
        paddingLeft: width * 0.1,
        justifyContent: "center",
        borderColor: "#2eade8",
        borderWidth: 2,
        borderRadius: 15
    }
})

export default CalculateRoot;