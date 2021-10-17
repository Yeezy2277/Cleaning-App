import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Dimensions, Platform, KeyboardAvoidingView, Keyboard, FlatList
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import logo from "../../../assets/logo.png";
import AppLoading from 'expo-app-loading';
import {useFonts, Montserrat_400Regular, Montserrat_500Medium} from "@expo-google-fonts/montserrat"
import {AuthContext} from "../../../App";
import {Ionicons} from "@expo/vector-icons";
import {TextInputMask} from "react-native-masked-text";
import MyButton from "../../LittleComponents/MyButton";
import checkedCheckbox from "../../../assets/checkedCheckbox.png";
import uncheckedCheckbox from "../../../assets/uncheckedCheckbox.png";
import {authAPI} from "../../api";
import {Colors} from "../colors";
import {errorLogin} from "../../alerts";
import {Host, Portal} from 'react-native-portalize';
import {OfferModal} from "../../modals/OfferModal";
import {ConfidencialModal} from "../../modals/ConfidencialModal";


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Login = ({navigation}) => {
    let modalOffer = useRef(null).current;
    let modalConfidencial = useRef(null).current;
    const [agree1, setAgree1] = useState(true);
    const [agree2, setAgree2] = useState(true);

    const [input, setInput] = useState("");
    const [phoneField, setPhoneField] = useState("");
    const [isPending, setIsPending] = useState(true);

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
    const onSubmit = () => {
        authAPI.login(phoneField.getRawValue()).then(r => {
            if (r === undefined) {
                errorLogin();
            } else {
                console.log(r);
                navigation.navigate("Code", {phone: phoneField.getRawValue()});
            }
        }).catch(err => {
            errorLogin();
            console.log(err);
        })
    }

    const disabled = !agree1 || !agree2 || input.length < 18;
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <Host>
                <View style={{flex: 1}}>
                    <FlatList scrollEnabled={false} keyboardShouldPersistTaps='handled' data={["1"]} contentContainerStyle={{flex: 1, backgroundColor: "white"}} renderItem={({item}) => (
                        <View style={keyboardStatus === "Keyboard Shown" ? [styles.container, {justifyContent: "flex-start"}] : styles.container}>
                            <Portal>
                                <OfferModal ref={el => (modalOffer = el)}/>
                                <ConfidencialModal ref={el => (modalConfidencial = el)}/>
                            </Portal>
                            {keyboardStatus === "Keyboard Shown" ? <Image source={logo} style={styles.logoStyleOnFocus}/> :
                                <Image source={logo} style={styles.logoStyle}/>}
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
                                    onChangeText={value => setInput(value)}
                                    ref={(ref) => setPhoneField(ref)}
                                    keyboardType={"numeric"}
                                    maxLength={18}
                                    style={styles.input}
                                    placeholder={"+7 (900) 000-00-00"}
                                    placeholderTextColor={"#6E7191"}
                                />
                            </View>
                            <MyButton title={"Вход"} onPress={onSubmit} disabled={disabled}/>
                            <View style={styles.checkboxes}>
                                <View>
                                    <View style={styles.checkboxItem}>
                                        <TouchableOpacity onPress={() => !agree1 ? setAgree1(true) : setAgree1(false)}>
                                            {agree1 ? <Image source={checkedCheckbox} style={styles.checkboxImg}/> :
                                                <Image source={uncheckedCheckbox} style={styles.checkboxImg}/>}
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={[styles.checkboxText, {marginLeft: width * 0.03}]}>Даю согласие на обработку</Text>
                                            <TouchableOpacity style={{marginLeft: width * 0.03}} onPress={() => modalConfidencial.open()}>
                                                <Text style={[styles.checkboxText, {textDecorationLine: "underline"}]}>персональных данных</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.checkboxItem}>
                                        <TouchableOpacity onPress={() => !agree2 ? setAgree2(true) : setAgree2(false)}>
                                            {agree2 ? <Image source={checkedCheckbox} style={styles.checkboxImg}/> :
                                                <Image source={uncheckedCheckbox} style={styles.checkboxImg}/>}
                                        </TouchableOpacity>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignSelf: "center",
                                            marginLeft: width * 0.03
                                        }}>
                                            <TouchableOpacity style={{flexDirection: "row"}} onPress={() => modalOffer.open()}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    lineHeight: 14,
                                                    color: Colors.violet,
                                                    textDecorationLine: "underline",
                                                    fontWeight: "500"
                                                }}>Договор оферту </Text>
                                            </TouchableOpacity>
                                            <Text style={{
                                                fontSize: 12,
                                                lineHeight: 14,
                                                color: Colors.violet,
                                                fontWeight: "500"
                                            }}> принимаю.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}/>
                </View>
            </Host>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: height * 0.07,
    },
    logoStyle: {
        width: width * 0.50,
        height: width * 0.73,
        marginBottom: width * 0.05,
        alignSelf: "center"
    },
    logoStyleOnFocus: {
        width: width * 0.30,
        height: width * 0.44,
        marginBottom: width * 0.05,
        alignSelf: "center"
    },
    textTitle: {
        fontWeight: "400",
        fontSize: 15,
        color: "#6E7191",
        textAlign: "center"
    },
    input: {
        width: width * 0.75,
        height: width * 0.13,
        borderRadius: 16,
        marginTop: width * 0.04,
        backgroundColor: Colors.lightGray,
        color: Colors.violet,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "500",
        paddingLeft: width * 0.06
    },
    checkboxes: {
        marginTop: width * 0.15,
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.75,
        height: width * 0.08,
    },
    checkboxItem: {
        marginTop: width * 0.03,
        flexDirection: "row",
        alignItems: "center"
    },
    checkboxImg: {
        width: 48,
        height: 48
    },
    checkboxText: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.violet
    }
})
export default Login;
