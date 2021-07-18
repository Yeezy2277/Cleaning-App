import React, {useEffect} from 'react';
import {Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {LinearGradient} from "expo-linear-gradient";
import ModalPicker from "../LittleComponents/ModalPicker";
import MyInput from "../LittleComponents/MyInput";
import MyButton from "../LittleComponents/MyButton";
import phoneImg from "../../assets/phone-call.png";
import {useForm, Controller } from "react-hook-form";

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const SupportRoot = () => {
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
            <Stack.Screen name="Поддержка" component={Support}/>
        </Stack.Navigator>
    );
};

const Support = () => {
    const {control, register, handleSubmit} = useForm();
    return <FlatList showsVerticalScrollIndicator={false} data={["1"]} renderItem={({item}) => (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Тип запроса</Text>
            <ModalPicker options={["Вопросы по заказу", "Вопросы по технической части"]}/>
            <Text style={[styles.text, {marginTop: width * 0.03}]}>Тема запроса</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (

                    <MyInput placeholder={"Иванов"}
                             onBlur={onBlur}
                             onChangeText={onChange}
                             value={value} />
                )}
                name="theme"
                defaultValue=""
            />
            <Text style={[styles.text, {marginTop: width * 0.03}]}>Текст обращения</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <MyInput placeholder={"Пожелания, запросы"}
                             onBlur={onBlur}
                             onChangeText={onChange}
                             height={width * 0.3}
                             value={value} />
                )}
                name="text"
                defaultValue=""
            />
            <MyButton title={"Отправить запрос"} width={width * 0.85}/>
            <Text style={[styles.text, {marginTop: width * 0.09}]}>Телефон поддержки</Text>
            <View style={styles.phone}>
                <Image source={phoneImg} style={styles.image}/>
                <Text style={[styles.text, {fontSize: width * 0.06, marginLeft: width * 0.03, alignSelf: "center"}]}>+ 7(925) 071-79-78</Text>
            </View>
        </SafeAreaView>
    )}/>
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: width * 0.08,
        paddingHorizontal: width * 0.07
    },
    text: {
        alignSelf: "flex-start",
        fontSize: width * 0.043,
        fontFamily: "Montserrat_400Regular"
    },
    image: {
        width: width * 0.15,
        height: width * 0.15
    },
    phone: {
        alignSelf: "flex-start",
        marginTop: width * 0.04,
        flexDirection: "row"
    }
})

export default SupportRoot;