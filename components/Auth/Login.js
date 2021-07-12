import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Dimensions, Platform, KeyboardAvoidingView, Keyboard
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import logo from "../../assets/logo.png";
import AppLoading from 'expo-app-loading';
import {useFonts, Montserrat_400Regular, Montserrat_500Medium} from "@expo-google-fonts/montserrat"
import {AuthContext} from "../../App";
import {Ionicons} from "@expo/vector-icons";
import {TextInputMask} from "react-native-masked-text";
import MyButton from "../LittleComponents/MyButton";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const [agree1, setAgree1] = useState(true);
    const [agree2, setAgree2] = useState(true);

    const [input, setInput] = useState("");
    const [first, setFirst] = useState(true);

    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
    const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, [])
    // useEffect(() => {
    //     let text = input.split("");
    //     console.warn(text);
    //     if (input === "") {
    //         setFirst(true);
    //     }
    //     if (first && text[4] !== "9") {
    //         text.pop();
    //         setFirst(false);
    //     } else if (first && text[1] === "7") {
    //         text.push("7");
    //         text.push("7");
    //         setFirst(false);
    //     }
    //     setInput(text.join(""));
    // }, [input])

    const login = () => signIn("123", "123");
    const disabled = !agree1 || !agree2;
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
                <View style={keyboardStatus === "Keyboard Shown" ? [styles.container, {justifyContent: "flex-start"}] : styles.container}>
                    {keyboardStatus === "Keyboard Shown" ? <Image source={logo} style={styles.logoStyleOnFocus}/> : <Image source={logo} style={styles.logoStyle}/>}
                        <View>
                            <Text style={styles.textTitle}>Введите номер телефона</Text>
                            <TextInputMask
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '+7 (999) 999-99-99 '
                                }}
                                onSubmitEditing={Keyboard.dismiss}
                                value={input}
                                onChangeText={setInput}
                                keyboardType={"numeric"}
                                maxLength={18}
                                style={styles.input}
                                placeholder={"+7 (900) 000-00-00"}
                                placeholderTextColor={"#2eade8"}
                            />
                        </View>
                        <MyButton title={"Войти"} onPress={login} disabled={disabled}/>
                        <View style={styles.checkboxes}>
                            <View>
                                <View style={styles.checkboxItem}>
                                    <TouchableOpacity onPress={() => !agree1 ? setAgree1(true) : setAgree1(false)}>
                                        {agree1 ? <Ionicons name={"checkbox"} size={25} color={"#313130"}/> :
                                            <Ionicons name={"checkbox-outline"} size={25} color={"#313130"}/>}
                                    </TouchableOpacity>
                                    <Text style={styles.checkboxText}>Даю согласие на обработку персональных данных</Text>
                                </View>
                                <View style={styles.checkboxItem}>
                                    <TouchableOpacity onPress={() => !agree2 ? setAgree2(true) : setAgree2(false)}>
                                        {agree2 ? <Ionicons name={"checkbox"} size={25} color={"#313130"}/> :
                                            <Ionicons name={"checkbox-outline"} size={25} color={"#313130"}/>}
                                    </TouchableOpacity>
                                    <Text style={styles.checkboxText}>С условиями оплаты и возврата услуг согласен.</Text>
                                </View>
                            </View>
                        </View>
                </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingTop: height * 0.05
    },
    logoStyle: {
        width: width * 0.50,
        height: width * 0.73,
        marginBottom: width * 0.1,
        alignSelf: "center"
    },
    logoStyleOnFocus: {
        width: width * 0.30,
        height: width * 0.44,
        marginBottom: width * 0.1,
        alignSelf: "center"
    },
    textTitle: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 15
    },
    input: {
        width: width * 0.75,
        height: width * 0.13,
        borderWidth: 2,
        borderColor: "#2eade8",
        borderRadius: 15,
        marginTop: width * 0.04,
        color: "#2eade8",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat_500Medium",
        paddingLeft: width * 0.06
    },
    checkboxes: {
        marginTop: width * 0.07,
        flexDirection: "row",
        alignItems: "center",
        borderLeftColor: "#313130",
        borderLeftWidth: 1,
        width: width * 0.75,
        height: width * 0.08,
        paddingLeft: width * 0.02
    },
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    checkboxText: {
        fontSize: 8,
        fontFamily: "Montserrat_500Medium"
    }
})
export default Login;