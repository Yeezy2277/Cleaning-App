import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    TextInput, Keyboard
} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {LinearGradient} from "expo-linear-gradient";
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import ModalPicker from "../LittleComponents/ModalPicker";
import MyInput from "../LittleComponents/MyInput";
import MapView, {Marker} from "react-native-maps";
import Svg, {Defs, Path} from "react-native-svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {UserContext} from "../Common/UserProvider";
import MarkerCustom from "../Common/Marker";
import {getLocation} from "./Search/GetLocation";
import Preloader from "../Common/Preloader";
import * as SecureStore from 'expo-secure-store';
import {Modalize} from "react-native-modalize";
import Modal from 'react-native-modal';
import MyButton from "../LittleComponents/MyButton";
import {WebView} from "react-native-webview";

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
            </Stack.Navigator>
        );
    }
    ;
};

const Calculate = ({navigation, route}) => {
    const modalizeRef = useRef<Modalize>null;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [type, setType] = useState("");
    const [square, setSquare] = useState("");
    const [squareMeter, setSquareMeter] = useState(null);
    const [doorCount, setDoorCount] = useState(null);
    const [windowCount, setWindowCount] = useState(null);
    const [toiletCount, setToiletCount] = useState(null);
    const [mileageMkad, setMileageMkad] = useState(null);
    const [bonusKoef, setBonusKoef] = useState(0.05)

    const [allSum, setAllSum] = useState(0);
    const [cleanSum, setCleanSum] = useState(0);
    const [roadSum, setRoadSum] = useState(0);
    const [bonusSum, setBonusSum] = useState(0);

    const [money, setMoney] = useState({
        typeClean: 0,
        typeBuilding: 0,
        priceSquare: 0,
        square : 0,
        doors: 0,
        windows: 0,
        toilets: 0
    });

    const [dateValue, setDateValue] = useState("1999-01-01");
    const [timeValue, setTimeValue] = useState("16:00");

    const [isOpenInput, setIsOpenInput] = useState(false);

    const mapRef = useRef();
    const [isPending, setIsPending] = useState(true);
    const [region, setRegion] = useState({});

    const [address, setAddress] = useState("");
    const updateAddress = async (string, reg, camera) => {
        setAddress(string);
        setRegion(reg)
        camera.zoom = 12;
        mapRef.current?.animateCamera(camera)
        console.warn(string);
        console.warn(reg);
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

    const handleConfirmDate = (date) => {
        setDateValue(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`)
        hideDatePicker();
    };
    const handleConfirmTime = (time) => {
        setTimeValue(`${time.getHours()}:${time.getMinutes()}`)
        hideTimePicker();
    };
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
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
                setIsPending(false);
            }
        );
    }
    useEffect(() => {
        (async () => {
            getInitialState()
            await SecureStore.setItemAsync("square", "100")
        })()
    }, [])
    useEffect(() => {
        let object = {...money};
        object.typeClean = type === "Регулярная уборка" ? 50
            : type === "Генеральная уборка" ? 100 : type === "Уборка после ремонта" ? 120 : null
        object.typeBuilding = square === "Квартира" ? 0
            : square === "Офис" ? 0.5 : square === "Загородный дом" ? 0.8 : square === "Кафе или ресторан" ? 1.5 : null
        object.priceSquare = object.typeClean + object.typeClean * object.typeBuilding;
        object.square = squareMeter * object.priceSquare;
        object.doors = doorCount * 500
        object.windows = windowCount * 500
        object.toilets = toiletCount * 600
        console.warn(`squareMeter - ${squareMeter} ; priceSquare - ${object.priceSquare} ; square - ${object.square}`)
        console.warn(object.square)
        setCleanSum(object.typeClean * object.typeBuilding + object.square + object.doors + object.windows + object.toilets)
    }, [type, square, squareMeter, doorCount, windowCount, toiletCount])
    useEffect(() => {
        setRoadSum(mileageMkad * 40)
    }, [mileageMkad])
    useEffect(() => {
        setAllSum(cleanSum + roadSum)
        setBonusSum(allSum  * bonusKoef)
    }, [cleanSum, roadSum])
    const updateType = (data) => {
        setType(data);
        console.warn(type);
    }
    const updateSquare = (data) => {
        setSquare(data);
        console.warn(square);
    }
    const renderItem = (item) => (
        <View>
            <Text>{item.heading}</Text>
        </View>
    );
    return (
        isPending ? <Preloader/> :
        <FlatList keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} data={["1"]}
                  renderItem={({item}) => (
                      <SafeAreaView style={styles.container}>
                          <Text style={styles.text}>Тип уборки</Text>
                          <ModalPicker callback={updateType} options={["Регулярная уборка", "Генеральная уборка", "Уборка после ремонта"]}/>
                          <Text style={[styles.text, {marginTop: width * 0.09}]}>Тип помещения</Text>
                          <ModalPicker callback={updateSquare} options={["Квартира", "Офис", "Загородный дом", "Кафе или ресторан"]}/>
                          <Text style={[styles.text, {marginTop: width * 0.09}]}>Площадь помещения</Text>
                          <View style={styles.input}>
                              <TextInput value={squareMeter} onChangeText={setSquareMeter} placeholder="12" style={styles.inputField} keyboardType="numeric"/>
                              <View style={styles.textContainer}>
                                  <Text style={styles.text}>м</Text>
                                  <Text style={styles.sup}>2</Text>
                              </View>
                          </View>
                          <View style={styles.objects}>
                              <View>
                                  <Text style={[styles.text, {
                                      marginTop: width * 0.09,
                                      marginLeft: width * 0.015
                                  }]}>Дверей</Text>
                                  <View style={styles.input}>
                                      <TextInput value={doorCount} onChangeText={setDoorCount} placeholder="2" style={styles.inputField} keyboardType="numeric"/>
                                  </View>
                              </View>
                              <View style={styles.objectItem}>
                                  <Text style={[styles.text, {
                                      marginTop: width * 0.09,
                                      marginLeft: width * 0.015
                                  }]}>Окон</Text>
                                  <View style={styles.input}>
                                      <TextInput value={windowCount} onChangeText={setWindowCount} placeholder="2" style={styles.inputField} keyboardType="numeric"/>
                                  </View>
                              </View>
                              <View style={styles.objectItem}>
                                  <Text style={[styles.text, {marginTop: width * 0.09, alignSelf: "center"}]}>Сан
                                      узлов</Text>
                                  <View style={styles.input}>
                                      <TextInput value={toiletCount} onChangeText={setToiletCount} placeholder="2" style={styles.inputField} keyboardType="numeric"/>
                                  </View>
                              </View>
                          </View>
                          <Text style={[styles.text, {marginTop: width * 0.09}]}>Адрес помещения</Text>
                          <MyInput placeholder={"Город, улица, дом"} value={address} onFocus={() => navigation.navigate("Карта", {updateAddress, region })}/>
                          <View style={styles.inputRow}>
                              <MyInput placeholder={"Квартира, офис"} width={width * 0.4} keyboardType={"numeric"}/>
                              <View style={styles.paddingView}/>
                              <MyInput value={mileageMkad} onChangeText={setMileageMkad} placeholder={"Км от МКАД"} width={width * 0.4} keyboardType={"numeric"}/>
                          </View>
                          <MyInput placeholder={"Этаж, особенности прохода, комментарии"} multiline={true} height={width * 0.3}/>
                          <View pointerEvents="none" style={styles.mapContainer}>
                              <MapView style={styles.map} scrollEnabled={false} region={region} ref={mapRef}>
                                  <Marker coordinate={region}>
                                      <MarkerCustom/>
                                  </Marker>
                              </MapView>
                          </View>
                          <Text style={[styles.text, {marginTop: width * 0.09}]}>Дата и время уборки</Text>
                          <View style={styles.dateTime}>
                              <View style={[styles.input, {width: width * 0.4, justifyContent: "space-between"}]}>
                                  <Text>{dateValue}</Text>
                                  <TouchableOpacity onPress={showDatePicker}>
                                      <Svg xmlns="http://www.w3.org/2000/svg" height={width * 0.08} width={width * 0.08}
                                           viewBox="0 0 512 512">
                                          <Defs/>
                                          <Path fill="#313130"
                                                d="M452 40h-24V0h-40v40H124V0H84v40H60C26.916 40 0 66.916 0 100v352c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60V100c0-33.084-26.916-60-60-60zm20 412c0 11.028-8.972 20-20 20H60c-11.028 0-20-8.972-20-20V188h432v264zm0-304H40v-48c0-11.028 8.972-20 20-20h24v40h40V80h264v40h40V80h24c11.028 0 20 8.972 20 20v48z"/>
                                          <Path fill="#313130"
                                                d="M76 230h40v40H76zM156 230h40v40h-40zM236 230h40v40h-40zM316 230h40v40h-40zM396 230h40v40h-40zM76 310h40v40H76zM156 310h40v40h-40zM236 310h40v40h-40zM316 310h40v40h-40zM76 390h40v40H76zM156 390h40v40h-40zM236 390h40v40h-40zM316 390h40v40h-40zM396 310h40v40h-40z"/>
                                      </Svg>
                                  </TouchableOpacity>
                                  <DateTimePickerModal
                                      isVisible={isDatePickerVisible}
                                      mode="date"
                                      onConfirm={handleConfirmDate}
                                      onCancel={hideDatePicker}
                                  />
                              </View>
                              <View style={[styles.input, {
                                  width: width * 0.4,
                                  justifyContent: "space-between",
                                  marginLeft: width * 0.05
                              }]}>
                                  <Text>{timeValue}</Text>
                                  <TouchableOpacity onPress={showTimePicker}>
                                      <Svg xmlns="http://www.w3.org/2000/svg" height={width * 0.08} width={width * 0.08}
                                           viewBox="0 0 512 512">
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
                          <Text style={[styles.calcText, {fontSize: width * 0.06, marginTop: width * 0.04}]}>Итого: {allSum} руб.</Text>
                          <Text style={styles.calcText}>Стоимость уборки: {cleanSum} руб.</Text>
                          <Text style={styles.calcText}>Стоимость дороги: {roadSum} руб.</Text>
                          <Text style={styles.calcText}>Бонусных рублей начислим: {bonusSum} руб.</Text>
                          <View style={{marginTop: width * 0.04}}>
                              <MyButton title="Заказать уборку" onPress={setModalVisible} width={width * 0.85}/>
                              <Modal isVisible={isModalVisible}>
                                  <View style={{flex: 1}}>
                                      <WebView source={{ html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n' +
                                              '<html>\n' +
                                              ' <head>\n' +
                                              '  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
                                              '  <title>Прием платежа с помощью виджета ЮKassa</title>\n' +
                                              '\n' +
                                              '  <!--Подключение библиотеки для инициализации виджета ЮKassa-->\n' +
                                              '  <script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>\n' +
                                              ' </head>\n' +
                                              ' <body>\n' +
                                              '  <p>Ниже отобразится платежная форма. Если вы еще не создавали платеж и не передавали токен для инициализации виджета, появится сообщение об ошибке.</p>\n' +
                                              '\n' +
                                              '  <!--Контейнер, в котором будет отображаться платежная форма-->\n' +
                                              '  <div id="payment-form"></div>\n' +
                                              '\n' +
                                              '  <p>Данные банковской карты для оплаты в <b>тестовом магазине</b>:</p>\n' +
                                              '  <ul>\n' +
                                              '   <li>номер — <b>5555 5555 5555 4477</b></li>\n' +
                                              '   <li>срок действия — <b>01/30</b> (или другая дата, больше текущей)</li>\n' +
                                              '   <li>CVC — <b>123</b> (или три любые цифры)</li>\n' +
                                              '   <li>код для прохождения 3-D Secure — <b>123</b> (или три любые цифры)</li>\n' +
                                              '  </ul>\n' +
                                              '  <p><a href=https://yookassa.ru/developers/using-api/testing#test-bank-card>Другие тестовые банковские карты</a></p>\n' +
                                              '\n' +
                                              '  <script>\n' +
                                              '  //Инициализация виджета. Все параметры обязательные.\n' +
                                              '  const checkout = new window.YooMoneyCheckoutWidget({\n' +
                                              '      confirmation_token: \'ct-28a1fb1b-000f-5000-a000-14386a42388b\', //Токен, который перед проведением оплаты нужно получить от ЮKassa\n' +
                                              '      return_url: \'https://example.com/\', //Ссылка на страницу завершения оплаты, это может быть любая ваша страница\n' +
                                              '\n' +
                                              '      //При необходимости можно изменить цвета виджета, подробные настройки см. в документации\n' +
                                              '       //customization: {\n' +
                                              '        //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX\n' +
                                              '        //colors: {\n' +
                                              '            //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля\n' +
                                              '            //controlPrimary: \'#00BF96\', //Значение цвета в HEX\n' +
                                              '\n' +
                                              '            //Цвет платежной формы и ее элементов\n' +
                                              '            //background: \'#F2F3F5\' //Значение цвета в HEX\n' +
                                              '        //}\n' +
                                              '      //},\n' +
                                              '      error_callback: function(error) {\n' +
                                              '          console.log(error)\n' +
                                              '      }\n' +
                                              '  });\n' +
                                              '\n' +
                                              '  //Отображение платежной формы в контейнере\n' +
                                              '  checkout.render(\'payment-form\');\n' +
                                              '  </script>\n' +
                                              ' </body>\n' +
                                              '</html>'}}/>
                                  </View>
                              </Modal>
                          </View>
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
        fontSize: width * 0.03,
        backgroundColor: "#fff"
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
        borderWidth: 2,
        borderColor: "#2eade8",
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
        fontFamily: "Montserrat_500Medium",
        fontSize: width * 0.04
    }
})


export default CalculateRoot;