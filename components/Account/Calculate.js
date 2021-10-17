import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity,
    FlatList, TextInput, Keyboard, Image, ImageBackground, Animated, Platform} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {LinearGradient} from "expo-linear-gradient";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import MyInput from "../LittleComponents/MyInput";
import MapView, {Marker} from "react-native-maps";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {geocodeLocationByCoords, getLocation} from "./Search/GetLocation";
import Preloader from "../view/Common/Preloader";
import * as SecureStore from 'expo-secure-store';
import {Modalize} from "react-native-modalize";
import MyButton from "../LittleComponents/MyButton";
import {WebView} from "react-native-webview";
import {calculateLocationError, commonError, errorChooseDateOrTime, errorFetchCalculator} from "../alerts";
import { Host, Portal } from 'react-native-portalize';
import regular from "../../assets/regular.png";
import general from "../../assets/general.png";
import afterBuild from "../../assets/afterBuild.png";

import hotelBackground from "../../assets/hotelBackground.png";
import officeBackground from "../../assets/officeBackground.png";
import homeBackground from "../../assets/homeBackground.png";
import cafeBackground from "../../assets/cafeBackground.png";

import radio from "../../assets/Radio.png";
import plus from "../../assets/plus.png";
import clock from "../../assets/Time.png";
import star from "../../assets/Star.png";
import stack from "../../assets/Stack.png";
import hotel from "../../assets/Hotel.png";
import office from "../../assets/Office.png";
import home from "../../assets/Home.png";
import coffee from "../../assets/coffee.png";
import calendar from "../../assets/Calandar.png";
import time from "../../assets/Time-gray.png";
import PaymentModal from "../modals/PaymentModal";
import {Colors} from "../view/colors";
import MarkerCustom from "../view/Common/Marker";
import {accountAPI, calculateAPI} from "../api";
import MyMapView from "./Search/MyMapView";
import {Appearance} from "react-native-appearance";
import {setTokenRequest} from "../utils/Common Functions";
import {AuthContext} from "../../App";
import PaymentScreen from "./PaymentScreen";
import {Ionicons} from "@expo/vector-icons";

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const CalculateRoot = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <Host>
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
                    <Stack.Screen name="Калькулятор" component={Calculate}/>
                    <Stack.Screen name="Платеж" options={{
                        headerBackTitleVisible: false,
                        headerBackImage: () => (
                            <Ionicons name={"close-outline"} size={30} color={"white"}/>
                        )
                    }} component={PaymentScreen}/>
                    <Stack.Screen name="Карта" options={{
                        headerShown: true,
                        headerStyle: {
                            height: width * 0.27
                        },
                        headerTitleAlign: "center",
                        headerLeft: () => null,
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
                    }} component={MyMapView}/>
                </Stack.Navigator>
            </Host>
        );
    }
};

const Calculate = ({navigation, route}) => {
    const [ state, dispatch ] = useContext(AuthContext);
    let modal = useRef(null).current;

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [type, setType] = useState("");
    const [prices, setPrices] = useState({
        regular: 0,
        general: 0,
        afterBuild: 0,
        flat: 0,
        office: 0,
        home: 0,
        cafe: 0,
        square: 0,
        door: 0,
        window: 0,
        toilet: 0,
        mkad: 0
    })

    const [isErrorField, setErrorField] = useState(false);
    const [info, setInfo] = useState({});
    const [square, setSquare] = useState("");
    const [squareMeter, setSquareMeter] = useState("");
    const [doorCount, setDoorCount] = useState("");
    const [windowCount, setWindowCount] = useState("");
    const [toiletCount, setToiletCount] = useState("");
    const [mileageMkad, setMileageMkad] = useState("");
    const [flat, setFlat] = useState("");
    const [comment, setComment] = useState("");
    const [bonusKoef, setBonusKoef] = useState(0.05)
    const [colorPicker, setColorPicker] = useState("");

    const [regularState, setRegularState] = useState(true);
    const [generalState, setGeneralState] = useState(false);
    const [afterBuildState, setAfterBuildState] = useState(false);

    const [hotelState, setHotelState] = useState(true);
    const [officeState, setOfficeState] = useState(false);
    const [homeState, setHomeState] = useState(false);
    const [cafeState, setCafeState] = useState(false);

    const [bonusSize, setBonusSize] = useState(0);

    const [allSum, setAllSum] = useState(0);
    const [cleanSum, setCleanSum] = useState(0);
    const [roadSum, setRoadSum] = useState(0);
    const [bonusSum, setBonusSum] = useState(0);

    const [dateValue, setDateValue] = useState("Дата");
    const [dateString, setDateString] = useState(null);
    const [timeValue, setTimeValue] = useState("Время");

    const mapRef = useRef();
    const mainFlatList = useRef(null);
    const cleanFlatList = useRef(null);
    const buildFlatList = useRef(null);

    const [isPending, setIsPending] = useState(true);
    const [region, setRegion] = useState({});
    const [initialRegion, setInitialRegion] = useState({});

    const [address, setAddress] = useState("");
    const updateAddress = async (string, reg, camera) => {
        setAddress(string);
        setRegion(reg)
        camera.zoom = 12;
        mapRef.current?.animateCamera(camera)
        console.log(string);
        console.log(reg);
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmDate = date => {
        setDateString(`${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}.${date.getFullYear()}`);
        setDateValue(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`);
        hideDatePicker();
    };
    const handleConfirmTime = time => {
        setTimeValue(`${time.getHours() < 10 ? "0" : ""}${time.getHours()}:${time.getMinutes() < 10 ? "0" : ""}${time.getMinutes()}`);
        hideTimePicker();
    };
    const [isScroll, setScroll] = useState(true);
    const getInitialState = () => {
        getLocation().then(
            (data) => {
                console.log(data);
                setRegion({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                })
                setInitialRegion({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                })
                geocodeLocationByCoords(data.latitude, data.longitude).then(r => {
                    setAddress(r.results[0].formatted_address);
                    setTokenRequest(accountAPI.getAccount).then(r => {
                        if (r === undefined) {
                            calculateLocationError(getInitialState)
                        } else {
                            console.log(r);
                            setBonusSize(r.data.main_info.bonus_balance);
                            console.log(`bonus size ${r.data.main_info.bonus_balance}`)
                            calculateAPI.getOptions().then(r => {
                                let obj = {...prices};
                                obj.regular = r.data.type_regular;
                                obj.general = r.data.type_general;
                                obj.afterBuild = r.data.type_after_repair;
                                obj.flat = r.data.type_building_flat;
                                obj.office = r.data.type_building_office;
                                obj.house = r.data.type_building_house;
                                obj.cafe = r.data.type_building_cafe;
                                obj.square = r.data.area;
                                obj.door = r.data.door;
                                obj.window = r.data.window;
                                obj.toilet = r.data.bathroom;
                                obj.mkad = r.data.mkad;
                                setPrices(obj);
                                console.log(obj);
                                setColorPicker(Appearance.getColorScheme());
                                setIsPending(false);
                            })
                        }
                    }).catch(() => calculateLocationError(getInitialState))
                })
            }
        ).catch(() => calculateLocationError(getInitialState));
    }
    useEffect(() => {
        (async () => {
            getInitialState()
        })()
    }, [])
    useEffect(() => {
        if (state.isSetData) {
            setIsPending(true);
            setTokenRequest(calculateAPI.getAddress, {id: state.id}).then(r => {
                if (r === undefined) {
                    commonError();
                } else {
                    console.warn(r);
                    setAddress(r.data.adress);
                    setSquareMeter(String(r.data.area));
                    setToiletCount(String(r.data.bathroom));
                    if (r.data.cleaning_type === "Регулярная уборка") {
                        setRegularState(true);
                        setGeneralState(false);
                        setAfterBuildState(false);
                    } else if (r.data.cleaning_type === "Генеральная уборка") {
                        setRegularState(false);
                        setGeneralState(true);
                        setAfterBuildState(false);
                    } else {
                        setRegularState(false);
                        setGeneralState(false);
                        setAfterBuildState(true);
                    }
                    if (r.data.premises_type === "Квартира") {
                        setHotelState(true);
                        setOfficeState(false);
                        setHomeState(false);
                        setCafeState(false);
                    } else if (r.data.premises_type === "Офис") {
                        setHotelState(false);
                        setOfficeState(true);
                        setHomeState(false);
                        setCafeState(false);
                    } else if (r.data.premises_type === "Загородный дом") {
                        setHotelState(false);
                        setOfficeState(false);
                        setHomeState(true);
                        setCafeState(false);
                    } else {
                        setHotelState(false);
                        setOfficeState(false);
                        setHomeState(false);
                        setCafeState(true);
                    }
                    setComment(r.data.comment);
                    setRegion(r.data.coordinates);
                    setDoorCount(String(r.data.door));
                    setFlat(r.data.flat_or_office == 0 ? "" : r.data.flat_or_office);
                    setMileageMkad(r.data.mkad == 0 ? "" : String(r.data.mkad));
                    setWindowCount(String(r.data.window));
                    setDateValue("Дата");
                    setTimeValue("Время");
                    setIsPending(false);
                }
            }).catch(err => {
                console.log(err);
                commonError();
            })
        } else if (state.isNeedDelete) {
            getInitialState()
            setErrorField(false);
            setRegularState(true);
            setGeneralState(false);
            setAfterBuildState(false);
            setHotelState(true);
            setOfficeState(false);
            setHomeState(false);
            setCafeState(false);
            setComment("");
            setDoorCount("");
            setFlat("");
            setMileageMkad("");
            setWindowCount("");
            setSquareMeter("");
            setToiletCount("");
            setDateValue("Дата");
            setTimeValue("Время");
        }
    }, [state])
    useEffect(() => {
        let object = {};
        object.typeClean = regularState ? prices.regular
            : generalState ? prices.general : afterBuildState ? prices.afterBuild : null;
        object.typeBuilding = hotelState ? prices.flat
            : officeState ? squareMeter === "0" || squareMeter === "" ? 0 : prices.office : homeState ? squareMeter === "0" || squareMeter === "" ? 0 : prices.home
                : cafeState ? squareMeter === "0" || squareMeter === "" ? 0 : prices.cafe : null;
        object.priceSquare = object.typeClean + object.typeClean * object.typeBuilding;
        object.square = squareMeter !== "0" || squareMeter !== "" ? squareMeter * object.priceSquare : 0;
        object.doors = doorCount * prices.door;
        object.windows = windowCount * prices.window;
        object.toilets = toiletCount * prices.toilet;
        console.log(`squareMeter - ${squareMeter} ; priceSquare - ${object.priceSquare} ; square - ${object.square}`);
        console.log(object.square);
        setCleanSum(object.typeClean * object.typeBuilding + object.square + object.doors + object.windows + object.toilets);
    }, [regularState, generalState, afterBuildState, hotelState, officeState, homeState, cafeState, square,
        squareMeter, doorCount, windowCount, toiletCount]);
    useEffect(() => {
        setRoadSum(mileageMkad * 40)
    }, [mileageMkad])
    useEffect(() => {
        console.log(modal);
    })
    useEffect(() => {
        setCleanSum(Math.round(cleanSum));
        setAllSum(Math.round(cleanSum + roadSum));
        setBonusSum(Math.round(allSum * bonusKoef));
    }, [cleanSum, roadSum, allSum])
    const updateType = (data) => {
        setType(data);
        console.log(type);
    }
    const updateSquare = (data) => {
        setSquare(data);
        console.log(square);
    }
    const type1 = [
        {id: 1, icon: clock, text: "Регулярная уборка", background: regular, borderColor: Colors.green, state: regularState, setState: setRegularState},
        {id: 2, icon: star, text: "Генеральная уборка", background: general, borderColor: Colors.blue, state: generalState, setState: setGeneralState},
        {id: 3, icon: stack, text: "После ремонта", background: afterBuild, borderColor: Colors.orange, state: afterBuildState, setState: setAfterBuildState}
    ];
    const type2 = [
        {id: 1, icon: hotel, text: "Квартира", background: hotelBackground, borderColor: Colors.green, state: hotelState, setState: setHotelState},
        {id: 2, icon: office, text: "Офис", background: officeBackground, borderColor: Colors.blue, state: officeState, setState: setOfficeState},
        {id: 3, icon: home, text: "Загородный дом", background: homeBackground, borderColor: Colors.orange, state: homeState, setState: setHomeState},
        {id: 4, icon: coffee, text: "Кафе или ресторан", background: cafeBackground, borderColor: Colors.red, state: cafeState, setState: setCafeState}
    ]
    const openPayment = (combinedRef, token) => {
        navigation.navigate("Платеж", {combinedRef, token})
    }
    const openModal = () => {
        if (squareMeter === "") {
            setErrorField(true);
            errorFetchCalculator();
        } else {
            if (timeValue === "Время" || dateValue === "Дата") {
                errorChooseDateOrTime()
            } else {
                const object = {};
                object.typeClean = regularState ? "Регулярная уборка" : generalState ? "Генеральная уборка" : "После ремонта";
                object.typeBuilding = hotelState ? "Квартира" : officeState ? "Офис" : homeState ? "Загородный дом" : "Общепит";
                object.square = Number(squareMeter);
                object.doors = doorCount === "" ? 0 : Number(doorCount);
                object.windows = windowCount === "" ? 0 : Number(windowCount);
                object.toilets = toiletCount === "" ? 0 : Number(toiletCount);
                object.address = address;
                object.flatNumber = Number(flat);
                object.mkad = Number(mileageMkad) ?? 0;
                object.comment = comment;
                object.date = dateValue;
                object.time = timeValue;
                object.region = {...region};
                setInfo(object);
                modal.open()
                setScroll(false);
            }
        }
    }
    return (
        isPending ? <Preloader/> :
            <FlatList ref={mainFlatList} scrollEnabled={isScroll} style={{flex: 1, backgroundColor: "white"}} keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator={false} data={["1"]}
                      renderItem={({item}) => (
                          <Host>
                              <Portal>
                                  <PaymentModal openPayment={openPayment} navigation={navigation} info={info} bonusSize={bonusSize} allSum={allSum}
                                                bonusSum={bonusSum} setScroll={setScroll} setModalOpen={setModalOpen} ref={el => (modal = el)} />
                              </Portal>
                              <SafeAreaView style={styles.container}>
                                  <Text style={[styles.text, {marginHorizontal: width * 0.07}]}>Тип уборки</Text>
                                  <View style={{flexDirection: "row", alignItems: "center", marginTop: 20, zIndex: 3}}>
                                      <FlatList keyboardShouldPersistTaps='handled' ref={cleanFlatList} keyExtractor={item => String(item.id)} showsHorizontalScrollIndicator={false}
                                                horizontal={true} data={type1} renderItem={({item}) => (
                                          <View>
                                              <View style={{padding: 2, borderRadius: 21, borderWidth: item.state ? 1 : 0,
                                                  borderColor: item.borderColor, marginLeft: 23, marginRight: item.id === 3 ? 23 : 0}}>
                                                  <TouchableOpacity style={{width: 230, height: 130, borderRadius: 18}} onPress={() => {
                                                      setRegularState(false);
                                                      setGeneralState(false);
                                                      setAfterBuildState(false);
                                                      item.setState(true);
                                                  }}>
                                                      <ImageBackground source={item.background} style={{width: 230, height: 130, borderRadius: 18,
                                                          paddingLeft: 9, paddingRight: 14}}>
                                                          <View>
                                                              <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                                                                  marginTop: 12}}>
                                                                  <Image source={item.icon} style={{width: 24, height: 24}}/>
                                                                  {item.state ? <Image source={radio} style={{width: 24, height: 24}}/> : null}
                                                              </View>
                                                              <Text style={styles.textType}>{item.text}</Text>
                                                              <Image source={plus} style={{width: 15, height: 13, marginTop: 30}}/>
                                                          </View>
                                                      </ImageBackground>
                                                  </TouchableOpacity>
                                              </View>
                                          </View>
                                      )}/>
                                  </View>
                                  <Text style={[styles.text, {marginTop: width * 0.09, marginHorizontal: width * 0.07,}]}>Тип помещения</Text>
                                  <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                                      <FlatList keyboardShouldPersistTaps='handled' ref={buildFlatList} keyExtractor={item => String(item.id)} showsHorizontalScrollIndicator={false}
                                                horizontal={true} data={type2} renderItem={({item}) => (
                                          <View>
                                              <View style={{padding: 2, borderRadius: 23, borderWidth: item.state ? 1 : 0, borderColor: item.borderColor,
                                                  marginLeft: 20, marginRight: item.id === 4 ? 23 : 0}}>
                                                  <TouchableOpacity style={{width: 130, height: 130}} onPress={() => {
                                                      setHotelState(false);
                                                      setOfficeState(false);
                                                      setHomeState(false);
                                                      setCafeState(false);
                                                      item.setState(true);
                                                  }}>
                                                      <ImageBackground source={item.background} style={{width: 130, height: 130, paddingLeft: 14,
                                                          paddingRight: 14}}>
                                                          <View>
                                                              <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                                                                  marginTop: 12}}>
                                                                  <Image source={item.icon} style={{width: 24, height: 24}}/>
                                                                  {item.state ? <Image source={radio} style={{width: 24, height: 24}}/> : null}
                                                              </View>
                                                              <Text style={styles.textType}>{item.text}</Text>
                                                              <Image source={plus} style={{width: 15, height: 13, marginTop: item.id >= 3 ? 10 : 30}}/>
                                                          </View>
                                                      </ImageBackground>
                                                  </TouchableOpacity>
                                              </View>
                                          </View>
                                      )}/>
                                  </View>
                                  <Text style={[styles.text, {marginTop: width * 0.09, marginHorizontal: width * 0.07}]}>Площадь помещения</Text>
                                  <View style={[styles.input, {marginHorizontal: width * 0.07, borderWidth: isErrorField && squareMeter === "" ? 2 : 0,
                                      borderColor: "red"}]}>
                                      <TextInput value={squareMeter} onChangeText={setSquareMeter} placeholder="0" placeholderTextColor={Colors.violet}
                                                 style={styles.inputField} keyboardType="numeric"/>
                                      <View style={styles.textContainer}>
                                          <Text style={[styles.text, {color: Colors.violet}]}>м</Text>
                                          <Text style={styles.sup}>2</Text>
                                      </View>
                                  </View>
                                  <View style={[styles.objects, {marginHorizontal: width * 0.07}]}>
                                      <View>
                                          <Text style={[styles.text, {
                                              marginTop: width * 0.09,
                                              marginLeft: width * 0.015
                                          }]}>Дверей</Text>
                                          <View style={[styles.input]}>
                                              <TextInput value={doorCount} onChangeText={setDoorCount} placeholder="0"
                                                         style={styles.inputField} keyboardType="numeric" placeholderTextColor={Colors.violet}/>
                                          </View>
                                      </View>
                                      <View style={styles.objectItem}>
                                          <Text style={[styles.text, {
                                              marginTop: width * 0.09,
                                              marginLeft: width * 0.015
                                          }]}>Окон</Text>
                                          <View style={[styles.input]}>
                                              <TextInput value={windowCount} onChangeText={setWindowCount} placeholder="0"
                                                         style={styles.inputField} keyboardType="numeric" placeholderTextColor={Colors.violet}/>
                                          </View>
                                      </View>
                                      <View style={styles.objectItem}>
                                          <Text style={[styles.text, {marginTop: width * 0.09, alignSelf: "center"}]}>Сан
                                              узлов</Text>
                                          <View style={[styles.input]}>
                                              <TextInput value={toiletCount} onChangeText={setToiletCount} placeholder="0"
                                                         style={styles.inputField} keyboardType="numeric" placeholderTextColor={Colors.violet}/>
                                          </View>
                                      </View>
                                  </View>
                                  <Text style={[styles.text, {marginTop: width * 0.09, marginHorizontal: width * 0.07}]}>Адрес помещения</Text>
                                  <View style={{marginHorizontal: width * 0.07}}>
                                      <MyInput placeholder={"Город, улица, дом"} value={address}
                                               onFocus={() => navigation.navigate("Карта", {updateAddress, region, initialRegion})}/>
                                      <View style={styles.inputRow}>
                                          <MyInput placeholder={"Квартира/Оф."} value={flat} onChangeText={setFlat} width={width * 0.4} marginTop={30}
                                                   keyboardType={"numeric"}/>
                                          <View style={styles.paddingView}/>
                                          <MyInput value={mileageMkad} onChangeText={setMileageMkad} marginTop={30} placeholder={"Км от МКАД"}
                                                   width={width * 0.4} keyboardType={"numeric"}/>
                                      </View>
                                      <MyInput marginTop={30} value={comment} onChangeText={setComment} placeholder={"Этаж, особенности прохода, комментарии"}
                                               multiline={true}
                                               height={96}/>
                                      <View pointerEvents="none" style={styles.mapContainer}>
                                          <MapView style={styles.map} scrollEnabled={false} region={region} ref={mapRef}>
                                              <Marker coordinate={region}>
                                                  <MarkerCustom/>
                                              </Marker>
                                          </MapView>
                                      </View>
                                      <Text style={[styles.text, {marginTop: width * 0.09}]}>Дата и время уборки</Text>
                                      <View style={styles.dateTime}>
                                          <TouchableOpacity onPress={showDatePicker} style={[styles.input, {width: width * 0.4,
                                              justifyContent: "space-between", paddingLeft: 24}]}>
                                              <Text style={{color: dateValue === "Дата" ? Colors.violet : Colors.black, fontSize: 15}}>
                                                  {dateValue === "Дата" ? dateValue : dateString}</Text>
                                                  <Image source={calendar} style={{width: 20, height: 20}}/>
                                              <DateTimePickerModal
                                                  isVisible={isDatePickerVisible}
                                                  cancelTextIOS={"Отмена"}
                                                  isDarkModeEnabled={colorPicker === "dark"}
                                                  confirmTextIOS={"Подтвердить"}
                                                  locale="ru_RU"
                                                  minimumDate={new Date()}
                                                  display={Platform.OS === "ios" ? "inline" : "default"}
                                                  headerTextIOS={"Выберите дату"}
                                                  mode="date"
                                                  onConfirm={handleConfirmDate}
                                                  onCancel={hideDatePicker}
                                              />
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={showTimePicker} style={[styles.input, {
                                              width: width * 0.4,
                                              justifyContent: "space-between",
                                              paddingLeft: 24
                                          }]}>
                                              <Text style={{color: timeValue === "Время" ? Colors.violet : Colors.black, fontSize: 15}}>{timeValue}</Text>
                                                  <Image source={time} style={{width: 20, height: 20}}/>
                                              <DateTimePickerModal
                                                  isVisible={isTimePickerVisible}
                                                  cancelTextIOS={"Отмена"}
                                                  isDarkModeEnabled={colorPicker === "dark"}
                                                  confirmTextIOS={"Подтвердить"}
                                                  mode="time"
                                                  onConfirm={handleConfirmTime}
                                                  onCancel={hideTimePicker}
                                              />
                                          </TouchableOpacity>
                                      </View>
                                      <Text style={[styles.calcText, {fontSize: 20, fontWeight: "500", marginTop: 30, color: Colors.black}]}>
                                          Итого: {allSum} руб.</Text>
                                      <Text style={styles.calcText}>Стоимость уборки: {cleanSum} руб.</Text>
                                      <Text style={styles.calcText}>Стоимость дороги: {roadSum} руб.</Text>
                                      <Text style={styles.calcText}>Бонусных рублей начислим: {bonusSum} руб.</Text>
                                      <View style={{marginTop: width * 0.04}}>
                                          <MyButton title="Заказать уборку" onPress={openModal} width={width * 0.85}/>
                                      </View>
                                  </View>
                              </SafeAreaView>
                          </Host>
                      )}/>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        marginVertical: width * 0.1,
        backgroundColor: "white",
        zIndex: 2
    },
    inputField: {
        width: width * 0.09,
        fontSize: 15
    },
    input: {
        width: width * 0.25,
        height: width * 0.13,
        borderRadius: 15,
        marginTop: 15,
        color: Colors.blue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "500",
        paddingHorizontal: 24,
        fontSize: 15,
        backgroundColor: Colors.lightGray
    },
    textContainer: {
        flexDirection: "row",
        paddingBottom: width * 0.01
    },
    text: {
        alignSelf: "flex-start",
        fontSize: width * 0.05,
        color: Colors.black,
        fontWeight: "500",
    },
    sup: {
        alignSelf: "flex-start",
        fontSize: width * 0.03,
        color: Colors.violet,
        fontWeight: "500",
    },
    textType: {
        color: "white",
        fontSize: 15,
        marginTop: 11
    },
    paddingView: {
        paddingHorizontal: width * 0.024
    },
    objects: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    objectItem: {
        marginLeft: width * 0.05
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mapContainer: {
        marginTop: width * 0.1,
        width: width * 0.85,
        height: width * 0.5,
        borderRadius: 15,
        zIndex: 5,
        overflow: "hidden"
    },
    map: {
        width: width * 0.84,
        height: width * 0.5,
    },
    dateTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: width * 0.03
    },
    calcText: {
        fontWeight: "400",
        color: Colors.violet,
        fontSize: 15,
        marginTop: 5
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})


export default CalculateRoot;
