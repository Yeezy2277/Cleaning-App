import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableOpacity
} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {LinearGradient} from "expo-linear-gradient";
import ModalPicker from "../LittleComponents/ModalPicker";
import MyInput from "../LittleComponents/MyInput";
import MyButton from "../LittleComponents/MyButton";
import phoneImg from "../../assets/phone-call.png";
import {useForm, Controller} from "react-hook-form";
import {accountAPI, supportAPI} from "../api";
import {setTokenRequest} from "../utils/Common Functions";
import {alertQuestion, commonError} from "../alerts";
import Preloader from "../view/Common/Preloader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const SupportRoot = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                height: width * 0.27
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: "500",
                justifyContent: "center",
                alignSelf: "center",
                color: "white",
                fontSize: 24
            },
            headerBackground: () => (
                <LinearGradient colors={["#3ad666", "#2eade8"]} start={[0, 1]}
                                end={[1, 0]}
                                style={[StyleSheet.absoluteFill]}>
                </LinearGradient>
            )
        }}>
            <Stack.Screen name="Поддержка" component={Support}/>
        </Stack.Navigator>
    );
};

const Support = () => {
    const {control, register, handleSubmit} = useForm();
    const [text, setText] = useState(null);
    const [chooseData, setChooseData] = useState("Вопросы по заказу");
    const [isPending, setIsPending] = useState(false);
    const callPhone = () =>{
        const url='tel://+79958837929'
        Linking.openURL(url)
    }
    const onSubmit = () => {
        setIsPending(true);
        setTokenRequest(supportAPI.createQuestions, {question_type: chooseData, answer: null, text}).then(r => {
            if (r === undefined) {
                commonError();
                setIsPending(false);
            } else {
                alertQuestion();
                setIsPending(false);
            }
        }).catch(() => {
            commonError();
            setIsPending(false);
        })
    }
    return isPending ? <Preloader/> :
        <KeyboardAwareScrollView style={{flex: 1, backgroundColor: "white"}}>
            <FlatList keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} data={["1"]}
                      renderItem={({item}) => (
                          <SafeAreaView style={styles.container}>
                              <Text style={styles.text}>Тип запроса</Text>
                              <ModalPicker setChooseData={setChooseData} chooseData={chooseData} options={["Вопросы по заказу", "Вопросы по технической части"]}/>
                              <Text style={[styles.text, {marginTop: width * 0.03}]}>Текст обращения</Text>
                              <MyInput placeholder={"Пожелания, запросы"}
                                       onChangeText={setText}
                                       multiline={true}
                                       marginTop={15}
                                       height={width * 0.3}
                                       value={text}/>
                              <MyButton title={"Отправить запрос"} onPress={onSubmit} marginTop={30} width={width * 0.85}/>
                              <Text style={[styles.text, {marginTop: width * 0.09}]}>Телефон поддержки</Text>
                              <TouchableOpacity onPress={callPhone} style={styles.phone}>
                                  <Image source={phoneImg} style={styles.image}/>
                                  <Text style={[styles.text, {
                                      fontSize: width * 0.06,
                                      marginLeft: width * 0.03,
                                      alignSelf: "center"
                                  }]}>+7 (995) 883-79-29</Text>
                              </TouchableOpacity>
                          </SafeAreaView>
                      )}/>
        </KeyboardAwareScrollView>
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
        fontWeight: "400",
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
