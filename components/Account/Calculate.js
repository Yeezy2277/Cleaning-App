import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    FlatList,
    TextInput
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

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const CalculateRoot = () => {
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
    };
};

const Calculate = () => {
    const [value, setValue] = useState(12);
    return (
        <FlatList showsVerticalScrollIndicator={false} data={["1"]} renderItem={({item}) => (
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
                <MyInput placeholder={"Город, улица, дом"} />
                <MyInput placeholder={"Квартира, офис"} width={width * 0.4} />
                <MyInput placeholder={"Этаж, особенности прохода, комментарии"} height={width * 0.3}/>
                <MapView style={styles.map} initialRegion={{
                    latitude: 55.681769,
                    longitude: 37.865563,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} />
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
        paddingLeft: width * 0.03,
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
    }
})


export default CalculateRoot;