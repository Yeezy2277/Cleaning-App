import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {createStackNavigator} from "@react-navigation/stack";
import avatar from "../../assets/user.png";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import MyButton from "../LittleComponents/MyButton";
import MyInput from "../LittleComponents/MyInput";
import * as SecureStore from "expo-secure-store";
import ModalPickerItem from "../LittleComponents/ModalPickerItem";
import {Colors} from "../view/colors";
import {accountAPI} from "../api";
import {setTokenRequest} from "../utils/Common Functions";
import Preloader from "../view/Common/Preloader";
import PickerIcon from "../LittleComponents/SVG/PickerIcon";
import {Host, Portal} from 'react-native-portalize';
import PaymentModal from "../modals/PaymentModal";
import {commonError, errorChooseDateOrTime, profileAlertError, profileAlertSuccess} from "../alerts";
import ChoosePhotoModal from "../modals/ChoosePhotoModal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {AuthContext} from "../../App";

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const AccountContainer = () => {
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
            <Stack.Screen name="??????????????" component={Account}/>
        </Stack.Navigator>
    );
};

const Account = () => {
    const [ state, dispatch ] = useContext(AuthContext)

    const [info, setInfo] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [image, setImage] = useState(null);
    const [phone, setPhone] = useState(null);
    const options = ["???????????????????? ???????? (?????????????? ????????)", "?????????????????????? ???????? (????????????????)"]
    const [chooseData, setChooseData] = useState(options[0])
    const [isModalVisible, setModalVisible] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        setTokenRequest(accountAPI.getAccount).then(r => {
            console.log(r)
            setInfo(r.data.main_info);
            !r.data.main_info.company ? setChooseData(options[0]) : setChooseData(options[1]);
            setPhone(r.data.phone);
            setIsPending(false);
        })
    }, [])
    useEffect(() => {
        state.isBonus ? setTokenRequest(accountAPI.getAccount).then(r => {
            console.log(r)
            setInfo(r.data.main_info);
            !r.data.main_info.company ? setChooseData(options[0]) : setChooseData(options[1]);
            setPhone(r.data.phone);
            setIsPending(false);
        }) : null
    }, [state])
    useEffect(() => {
        console.log(info);
    } ,[info])
    const onSubmit = () => {
        console.log(info);
        setIsPending(true);
        let formdata = new FormData();
        formdata.append("name", info.name ?? "");
        formdata.append("surname", info.surname ?? "");
        formdata.append("patronymic", info.patronymic ?? "");
        formdata.append("company", chooseData === options[1]);
        formdata.append("inn", info.inn ?? "");
        formdata.append("mail", info.mail ?? "");
        formdata.append("photo", image?.uri ? image : "");
        setTokenRequest(accountAPI.updateAccount, formdata).then(r => {
            setIsPending(false);
            if (r === undefined) {
                profileAlertError();
            } else {
                let obj = {...info};
                obj.company = chooseData === options[1] ? "??????????????????????": "????????????????????"
                setInfo(obj);
                profileAlertSuccess();
            }
        }).catch(err => {
            setIsPending(false);
            console.log(err);
            profileAlertError();
        })
    }
    const changeModalVisibility = (bool) => {
        setModalVisible(bool)
    }
    const setData = (option) => {
        setChooseData(option)
    }
    const updateField = (field, value) => {
        let object = {...info};
        object[field] = value;
        setInfo(object);
    }
    const onLeave = () => {
        SecureStore.deleteItemAsync("userToken").then(r => {
            dispatch({type: "SIGN_OUT"});
        })
    }
    let modal = useRef(null).current;
    const openModal = () => {
        modal.open()
    }
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return isPending ? <Preloader/>
            : <Host>
                <KeyboardAwareScrollView>
                    <Portal>
                        <ChoosePhotoModal setImage={setImage} image={image} setModalOpen={setModalOpen} ref={el => (modal = el)}/>
                    </Portal>
                    <FlatList keyboardShouldPersistTaps='handled' style={{flex: 1, backgroundColor: "white"}} showsVerticalScrollIndicator={false} data={["1"]}
                              renderItem={({item}) => (
                                  <SafeAreaView style={styles.container}>
                                      <View style={styles.headerContainer}>
                                          <View style={styles.header}>
                                              <TouchableOpacity onPress={openModal}>
                                                  <Image
                                                      source={image?.uri ? {uri: image?.uri} : info.photo !== null ? {uri: `http://185.46.11.52/${info.photo}`} : avatar}
                                                      style={styles.image}/>
                                                  <TouchableOpacity onPress={onLeave}>
                                                      <Text style={{color: Colors.violet, marginTop: 5}}>??????????</Text>
                                                  </TouchableOpacity>
                                              </TouchableOpacity>
                                              <View style={styles.imageContainer}>
                                                  <Text style={[styles.text, {
                                                      fontSize: width * 0.047,
                                                      color: Colors.black
                                                  }]}>+{phone}</Text>
                                                  <Text style={styles.text}>{info.surname ?? "??????????????"}</Text>
                                                  <Text
                                                      style={styles.text}>{info.name ?? "??????"} {info.patronymic ?? "????????????????"}</Text>
                                                  <Text
                                                      style={styles.text}>{!info.company ? "????????????????????" : "??????????????????????"} ????????</Text>
                                                  <Text
                                                      style={[styles.text, {color: Colors.black}]}>????????????: {info.bonus_balance} ??????.</Text>
                                              </View>
                                          </View>
                                      </View>
                                      <Text style={[styles.textTitle, {marginTop: width * 0.09}]}>??????????????</Text>
                                      <MyInput marginTop={15} value={info.surname}
                                               onChangeText={value => updateField("surname", value)}
                                               placeholder={"????????????"}/>
                                      <Text style={[styles.textTitle, {marginTop: 30}]}>??????</Text>
                                      <MyInput marginTop={15} value={info.name}
                                               onChangeText={value => updateField("name", value)} placeholder={"????????"}/>
                                      <Text style={[styles.textTitle, {marginTop: 30}]}>????????????????</Text>
                                      <MyInput marginTop={15} value={info.patronymic}
                                               onChangeText={value => updateField("patronymic", value)}
                                               placeholder={"????????????????"}/>
                                      <Text style={[styles.textTitle, {marginTop: 30}]}>?????? ????????????????</Text>
                                      <SafeAreaView>
                                          <TouchableOpacity style={styles.containerModal}
                                                            onPress={() => changeModalVisibility(true)}>
                                              <Text style={styles.textModal}>{chooseData}</Text>
                                              <View style={styles.pickerIcon}>
                                                  <PickerIcon/>
                                              </View>
                                          </TouchableOpacity>
                                          <Modal
                                              transparent={true}
                                              animationType={"fade"}
                                              visible={isModalVisible}
                                              onRequestClose={() => changeModalVisibility(false)}>
                                              <ModalPickerItem changeModalVisibility={changeModalVisibility}
                                                               setData={setData}
                                                               options={options}/>
                                          </Modal>
                                      </SafeAreaView>
                                      {chooseData === options[1] ? <View>
                                          <Text style={[styles.textTitle, {marginTop: 30}]}>?????????????? ?????? ?????? ????????????????</Text>
                                          <MyInput maxLength={12} keyboardType={"numeric"} marginTop={15} value={info.inn}
                                                   onChangeText={value => updateField("inn", value)} placeholder={"??????"}/>
                                          <Text style={[styles.textTitle, {marginTop: 30}]}>E-Mail ?????? ????????????</Text>
                                          <MyInput keyboardType={"email-address"} marginTop={15} value={info.mail}
                                                   onChangeText={value => updateField("mail", value)}
                                                   placeholder={"E-Mail"}/>
                                      </View> : null}
                                      <MyButton onPress={onSubmit} title={"??????????????????"} width={width * 0.85}/>
                                  </SafeAreaView>
                              )}/>
                </KeyboardAwareScrollView>
            </Host>
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 32,
        paddingHorizontal: width * 0.07,
    },
    headerContainer: {
        backgroundColor: Colors.lightGray,
        width,
        paddingLeft: 28,
        paddingBottom: 32
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingTop: 22
    },
    imageContainer: {
        marginLeft: 23
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 48,
        marginTop: 4
    },
    text: {
        fontWeight: "400",
        marginTop: 2,
        fontSize: 15,
        alignSelf: "flex-start",
        color: "#6E7191"
    },
    textTitle: {
        alignSelf: "flex-start",
        fontSize: width * 0.043,
        fontWeight: "400",
    },
    containerModal: {
        marginTop: 15,
        height: 56,
        paddingLeft: 24,
        paddingRight: width * 0.03,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: Colors.lightGray,
        width: width * 0.85
    },
    textModal: {
        fontWeight: "400",
        fontSize: 15
    },
    pickerIcon: {
        paddingRight: 25,
        height: width * 0.12,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default AccountContainer;
