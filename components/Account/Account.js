import React, {useState} from 'react';
import {Dimensions, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {createStackNavigator} from "@react-navigation/stack";
import avatar from "../../assets/user.png";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import MyButton from "../LittleComponents/MyButton";
import MyInput from "../LittleComponents/MyInput";
import ModalPicker from "../LittleComponents/ModalPicker";
import Svg, {Path} from "react-native-svg";
import ModalPickerItem from "../LittleComponents/ModalPickerItem";

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const AccountContainer = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleContainerStyle: {
                paddingLeft: width * 0.018,
                paddingTop: width * 0.06
            },
            headerTitleStyle: {
                fontFamily: "Montserrat_500Medium",
                color: "white",
                fontSize: width * 0.06,
                justifyContent: "flex-end",
                alignSelf: "flex-start",
            },
            headerBackground: () => (
                <LinearGradient colors={["#3ad666", "#2eade8"]} start={[0, 1]}
                                end={[1, 0]}
                                style={[StyleSheet.absoluteFill, {paddingBottom: width * 0.25}]}>
                </LinearGradient>
            )
        }}>
            <Stack.Screen name="Аккаунт" component={Account}/>
        </Stack.Navigator>
    );
};

const Account = () => {
    const changeModalVisibility = (bool) => {
        setModalVisible(bool)
    }
    const setData = (option) => {
        setChooseData(option)
    }
    const options = ["Физическое лицо (Частное лицо)", "Юридическое лицо (Компания)"]
    const [chooseData, setChooseData] = useState(options[0])
    const [isModalVisible, setModalVisible] = useState(false)
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return <FlatList showsVerticalScrollIndicator={false} data={["1"]} renderItem={({item}) => (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={avatar} style={styles.image}/>
                    <View style={styles.imageContainer}>
                        <Text style={[styles.text, {fontSize: width * 0.047}]}>+ 7(925) 071-79-78</Text>
                        <Text style={styles.text}>Иванов</Text>
                        <Text style={styles.text}>Иван Иванович</Text>
                        <Text style={styles.text}>Частное лицо</Text>
                        <Text style={styles.text}>Баланс: 5350 руб.</Text>
                    </View>
                </View>
                <MyButton title={"Пополнить баланс"} width={width * 0.85}/>
                <Text style={[styles.textTitle, {marginTop: width * 0.09}]}>Фамилия</Text>
                <MyInput placeholder={"Иванов"} />
                <Text style={[styles.textTitle, {marginTop: width * 0.03}]}>Имя</Text>
                <MyInput placeholder={"Иван"} />
                <Text style={[styles.textTitle, {marginTop: width * 0.03}]}>Отчество</Text>
                <MyInput placeholder={"Иванович"} />
                <Text style={[styles.textTitle, {marginTop: width * 0.03}]}>Тип аккаунта</Text>
                <SafeAreaView>
                    <TouchableOpacity style={styles.containerModal} onPress={() => changeModalVisibility(true)}>
                        <Text style={styles.textModal}>{chooseData}</Text>
                        <View style={styles.pickerIcon}>
                            <Svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M0.645917 0.645978C0.692363 0.599415 0.747539 0.562472 0.808284 0.537265C0.869029 0.512059 0.93415 0.499084 0.999917 0.499084C1.06568 0.499084 1.13081 0.512059 1.19155 0.537265C1.2523 0.562472 1.30747 0.599415 1.35392 0.645978L6.99992 6.29298L12.6459 0.645978C12.6924 0.59949 12.7476 0.562614 12.8083 0.537455C12.8691 0.512296 12.9342 0.499346 12.9999 0.499346C13.0657 0.499346 13.1308 0.512296 13.1915 0.537455C13.2522 0.562614 13.3074 0.59949 13.3539 0.645978C13.4004 0.692466 13.4373 0.747655 13.4624 0.808394C13.4876 0.869134 13.5005 0.934234 13.5005 0.999978C13.5005 1.06572 13.4876 1.13082 13.4624 1.19156C13.4373 1.2523 13.4004 1.30749 13.3539 1.35398L7.35392 7.35398C7.30747 7.40054 7.2523 7.43748 7.19155 7.46269C7.13081 7.4879 7.06568 7.50087 6.99992 7.50087C6.93415 7.50087 6.86903 7.4879 6.80828 7.46269C6.74754 7.43748 6.69236 7.40054 6.64592 7.35398L0.645917 1.35398C0.599354 1.30753 0.562411 1.25236 0.537205 1.19161C0.511998 1.13087 0.499023 1.06575 0.499023 0.999978C0.499023 0.934211 0.511998 0.86909 0.537205 0.808344C0.562411 0.747599 0.599354 0.692424 0.645917 0.645978Z"
                                      fill="black"/>
                            </Svg>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType={"fade"}
                        visible={isModalVisible}
                        onRequestClose={() => changeModalVisibility(false)}>
                        <ModalPickerItem changeModalVisibility={changeModalVisibility} setData={setData}
                                         options={options}/>
                    </Modal>
                </SafeAreaView>
                {chooseData === options[1] ? <View>
                    <Text style={[styles.textTitle, {marginTop: width * 0.03}]}>Введите ИНН для договора</Text>
                    <MyInput placeholder={"ИНН"} />
                    <Text style={[styles.textTitle, {marginTop: width * 0.03}]}>E-Mail для счетов</Text>
                    <MyInput placeholder={"E-Mail"} />
                </View> : null}
            </SafeAreaView>
        )}/>
    };
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: width * 0.08,
        paddingHorizontal: width * 0.07
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    imageContainer: {
        marginLeft: width * 0.05
    },
    image: {
        width: width * 0.3,
        height: width * 0.3
    },
    text: {
        fontFamily: "Montserrat_500Medium",
        fontSize: width * 0.03,
        alignSelf: "flex-start"
    },
    textTitle: {
        alignSelf: "flex-start",
        fontSize: width * 0.043,
        fontFamily: "Montserrat_400Regular"
    },
    containerModal: {
        marginTop: width * 0.02,
        height: width * 0.13,
        paddingLeft: width * 0.018,
        paddingRight: width * 0.03,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#2eade8",
        borderWidth: 2,
        borderRadius: 15,
        width : width * 0.85
    },
    textModal: {
        fontFamily: "Montserrat_500Medium"
    },
    pickerIcon: {
        borderLeftWidth: 2,
        borderLeftColor: "#2eade8",
        paddingLeft: width * 0.02,
        height: width * 0.12,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default AccountContainer;