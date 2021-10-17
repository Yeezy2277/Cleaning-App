import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Dimensions, Platform, KeyboardAvoidingView, Keyboard, FlatList
} from "react-native";
import logo from "../../../assets/logo.png";
import AppLoading from 'expo-app-loading';
import {useFonts, Montserrat_400Regular, Montserrat_500Medium} from "@expo-google-fonts/montserrat"
import {AuthContext} from "../../../App";
import MyButton from "../../LittleComponents/MyButton";
import MyInput from "../../LittleComponents/MyInput";
import {authAPI} from "../../api";
import {errorCode} from "../../alerts";
import * as SecureStore from "expo-secure-store";


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Code = ({navigation, route}) => {
    const [state, dispatch] = useContext(AuthContext)
    const [input, setInput] = useState("");
    const [first, setFirst] = useState(true);
    const [isPending, setIsPending] = useState(false);

    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
    const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        console.log(route.params.phone);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, [])

    const onSubmit = () => {
        authAPI.code({phone: route.params?.phone, code: input}).then(r => {
            if (r === undefined) {
                errorCode();
            } else {
                SecureStore.setItemAsync("userToken", r.data.token).then(r => {
                    dispatch({type: 'SIGN_IN', token: "dummy-auth-token"});
                })
            }
        }).catch(err => {
            console.log(err);
            errorCode();
        })
    }
    const disabled = isPending
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <FlatList keyboardShouldPersistTaps='handled' contentContainerStyle={{flex: 1, backgroundColor: "white"}}
                      data={["1"]} renderItem={({item}) => (
                <View
                    style={keyboardStatus === "Keyboard Shown" ? [styles.container, {justifyContent: "flex-start"}] : styles.container}>
                    {keyboardStatus === "Keyboard Shown" ? <Image source={logo} style={styles.logoStyleOnFocus}/>
                        : <Image source={logo} style={styles.logoStyle}/>}
                    <Text style={styles.textTitle}>Введите код из SMS</Text>
                    <MyInput value={input} onSubmitEditing={Keyboard.dismiss} onChangeText={setInput}
                             textAlignCenter={true} keyboardType={"numeric"} marginTop={20} maxLength={6}
                             width={width * 0.75} placeholder={"Код"}/>
                    <MyButton disabled={disabled} title={"Войти"} onPress={onSubmit}/>
                </View>
            )}/>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: height * 0.07,
        paddingBottom: width * 0.45
    },
    logoStyle: {
        width: width * 0.50,
        height: width * 0.73,
        alignSelf: "center",
        marginBottom: width * 0.07,
    },
    logoStyleOnFocus: {
        width: width * 0.30,
        height: width * 0.44,
        alignSelf: "center",
        marginBottom: width * 0.05,
    },
    textTitle: {
        fontWeight: "400",
        paddingHorizontal: 50,
        fontSize: 15,
        color: "#6E7191",
        textAlign: "center"
    },
    input: {
        width: width * 0.75,
        height: width * 0.13,
        borderRadius: 16,
        marginTop: width * 0.04,
        backgroundColor: "#EFF0F6",
        color: "#6E7191",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "500",
        paddingLeft: width * 0.06
    }
})
export default Code;
