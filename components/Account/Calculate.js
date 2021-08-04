import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    FlatList,
    TextInput, Keyboard
} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {LinearGradient} from "expo-linear-gradient";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import ModalPickerItem from "../LittleComponents/ModalPickerItem";
import ModalPicker from "../LittleComponents/ModalPicker";
import NumberPicker from "../LittleComponents/NumberPicker";
import MyInput from "../LittleComponents/MyInput";
import MapView from "react-native-maps";
import Svg, {Defs, Path} from "react-native-svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapInput from "./Search/MapInput";
import MyMapView from "./Search/MyMapView";
import {Ionicons} from "@expo/vector-icons";
import {UserContext} from "../Common/UserProvider";

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
            <Stack.Navigator screenOptions={{
                headerTitleContainerStyle: {
                    paddingLeft: width * 0.018,
                    paddingTop: width * 0.06
                },
                headerTitleStyle: {
                    fontFamily: "Montserrat_500Medium",
                    height: "100%",
                    justifyContent: "flex-end",
                    alignSelf: "flex-start",
                    color: "white",
                    fontSize: width * 0.06
                },
                headerBackground: () => (
                    <LinearGradient colors={["#3ad666", "#2eade8"]} start={[0, 1]}
                                    end={[1, 0]}
                                    style={[StyleSheet.absoluteFill, {paddingBottom: width * 0.25}]}>
                    </LinearGradient>
                )
            }}>
                <Stack.Screen name="Калькулятор" component={Calculate}/>
                <Stack.Screen options={{
                    headerLeft: () => null,
                    headerRight: () => <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="checkmark-circle" size={40}/>
                    </TouchableOpacity>
                }} name="Карта" component={MyMapView}/>
            </Stack.Navigator>
        );
    };
};

const Calculate = ({navigation}) => {
    const [value, setValue] = useState(12);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [dateValue, setDateValue] = useState("1999-01-01");
    const [timeValue, setTimeValue] = useState("16:00");

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

    const handleConfirmDate = (date) => {
        setDateValue(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`)
        hideDatePicker();
    };
    const handleConfirmTime = (time) => {
        setTimeValue(`${time.getHours()}:${time.getMinutes()}`)
        hideTimePicker();
    };
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        };
    }, []);

    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const [ state, dispatch ] = useContext(UserContext)
    const _keyboardDidShow = () => navigation.navigate("Карта",{
        onGoBack: () => dispatch({ type: "IS_NOT_SELECTED_MAP" }),
    });
    return (
        <FlatList keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} data={["1"]} renderItem={({item}) => (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Тип уборки</Text>
                <ModalPicker options={["Регулярная уборка", "Генеральная уборка", "Уборка после ремонта"]}/>
                <Text style={[styles.text, {marginTop: width * 0.09}]}>Тип помещения</Text>
                <ModalPicker options={["Квартира", "Офис", "Загородный дом", "Кафе или ресторан"]}/>
                <Text style={[styles.text, {marginTop: width * 0.09}]}>Площадь помещения</Text>
                <View style={styles.input}>
                    <TextInput placeholder="12" style={styles.inputField} keyboardType="numeric"/>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>м</Text>
                        <Text style={styles.sup}>2</Text>
                    </View>
                </View>
                <View style={styles.objects}>
                    <View>
                        <Text style={[styles.text, {marginTop: width * 0.09, marginLeft: width * 0.015}]}>Дверей</Text>
                        <View style={styles.input}>
                            <TextInput placeholder="2" style={styles.inputField} keyboardType="numeric"/>
                        </View>
                    </View>
                    <View style={styles.objectItem}>
                        <Text style={[styles.text, {marginTop: width * 0.09, marginLeft: width * 0.015}]}>Окон</Text>
                        <View style={styles.input}>
                            <TextInput placeholder="2" style={styles.inputField} keyboardType="numeric"/>
                        </View>
                    </View>
                    <View style={styles.objectItem}>
                        <Text style={[styles.text, {marginTop: width * 0.09, alignSelf: "center"}]}>Сан узлов</Text>
                        <View style={styles.input}>
                            <TextInput placeholder="2" style={styles.inputField} keyboardType="numeric"/>
                        </View>
                    </View>
                </View>
                <Text style={[styles.text, {marginTop: width * 0.09}]}>Адрес помещения</Text>
                <MyInput placeholder={"Город, улица, дом"}  onSubmitEditing={Keyboard.dismiss}/>
                <MyInput placeholder={"Квартира, офис"} width={width * 0.4} />
                <MyInput placeholder={"Этаж, особенности прохода, комментарии"} height={width * 0.3}/>
                <MapView style={styles.map} initialRegion={{
                    latitude: 55.681769,
                    longitude: 37.865563,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} />
                <Text style={[styles.text, {marginTop: width * 0.09}]}>Дата и время уборки</Text>
                <View style={styles.dateTime}>
                    <View style={[styles.input, {width: width * 0.4, justifyContent: "space-between"}]}>
                        <Text>{dateValue}</Text>
                        <TouchableOpacity onPress={showDatePicker}>
                            <Svg xmlns="http://www.w3.org/2000/svg" height={width * 0.08} width={width * 0.08} viewBox="0 0 512 512">
                                <Defs/>
                                <Path fill="#313130" d="M452 40h-24V0h-40v40H124V0H84v40H60C26.916 40 0 66.916 0 100v352c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60V100c0-33.084-26.916-60-60-60zm20 412c0 11.028-8.972 20-20 20H60c-11.028 0-20-8.972-20-20V188h432v264zm0-304H40v-48c0-11.028 8.972-20 20-20h24v40h40V80h264v40h40V80h24c11.028 0 20 8.972 20 20v48z"/>
                                <Path fill="#313130" d="M76 230h40v40H76zM156 230h40v40h-40zM236 230h40v40h-40zM316 230h40v40h-40zM396 230h40v40h-40zM76 310h40v40H76zM156 310h40v40h-40zM236 310h40v40h-40zM316 310h40v40h-40zM76 390h40v40H76zM156 390h40v40h-40zM236 390h40v40h-40zM316 390h40v40h-40zM396 310h40v40h-40z"/>
                            </Svg>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirmDate}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <View style={[styles.input, {width: width * 0.4, justifyContent: "space-between", marginLeft: width * 0.05}]}>
                        <Text>{timeValue}</Text>
                        <TouchableOpacity onPress={showTimePicker}>
                            <Svg xmlns="http://www.w3.org/2000/svg"  height={width * 0.08} width={width * 0.08} viewBox="0 0 512 512">
                                <Defs/>
                                <Path fill="#313130"
                                      d="M347.216 301.211l-71.387-53.54V138.609c0-10.966-8.864-19.83-19.83-19.83-10.966 0-19.83 8.864-19.83 19.83v118.978c0 6.246 2.935 12.136 7.932 15.864l79.318 59.489a19.713 19.713 0 0011.878 3.966c6.048 0 11.997-2.717 15.884-7.952 6.585-8.746 4.8-21.179-3.965-27.743z"/>
                                <Path fill="#313130"
                                      d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.066-216.341-216.341S136.725 39.659 256 39.659c119.295 0 216.341 97.066 216.341 216.341S375.275 472.341 256 472.341z"/>
                            </Svg>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmTime}
                            onCancel={hideTimePicker}
                        />
                    </View>
                </View>
                <Text style={[styles.calcText, {fontSize: width * 0.06, marginTop: width * 0.04}]}>Итого:  руб.</Text>
                <Text style={styles.calcText}>Стоимость уборки:  руб.</Text>
                <Text style={styles.calcText}>Стоимость дороги:  руб.</Text>
                <Text style={styles.calcText}>Бонусных рублей начислим:  руб.</Text>
            </SafeAreaView>
        )}/>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        marginVertical: width * 0.1,
        paddingHorizontal: width * 0.07
    },
    inputField: {
      width: width * 0.09
    },
    input: {
        width: width * 0.25,
        height: width * 0.13,
        borderWidth: 2,
        borderColor: "#2eade8",
        borderRadius: 15,
        marginTop: width * 0.02,
        color: "#2eade8",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat_500Medium",
        paddingHorizontal: width * 0.03,
        fontSize: width * 0.03
    },
    textContainer: {
        flexDirection: "row",
        paddingBottom: width * 0.01
    },
    text: {
        alignSelf: "flex-start",
        fontSize: width * 0.043,
        fontFamily: "Montserrat_400Regular"
    },
    objects: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    objectItem: {
        marginLeft: width * 0.05
    },
    map: {
        marginTop: width * 0.1,
        width: width * 0.85,
        height: width * 0.5
    },
    dateTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: width * 0.03
    },
    calcText: {
        fontFamily: "Montserrat_500Medium",
        fontSize: width * 0.04
    }
})


export default CalculateRoot;