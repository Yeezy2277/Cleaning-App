import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {createStackNavigator} from "@react-navigation/stack";
import CirclePlus from "../LittleComponents/SVG/CirclePlus";
import {Colors} from "../view/colors";
import MapView, {Marker} from "react-native-maps";
import MarkerCustom from "../view/Common/Marker";
import MyButton from "../LittleComponents/MyButton";
import {AuthContext} from "../../App";
import {calculateAPI} from "../api";
import {setTokenRequest} from "../utils/Common Functions";
import Preloader from "../view/Common/Preloader";

const width = Dimensions.get("screen").width;

const Stack = createStackNavigator();

const AddressesRoot = ({navigation}) => {
    const [ state, dispatch ] = useContext(AuthContext)
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
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Расчет");
                }} style={{paddingRight: 24}}>
                    <CirclePlus/>
                </TouchableOpacity>
            )
        }}>
            <Stack.Screen name="Ваши адреса" component={Addresses}/>
        </Stack.Navigator>
    );
};

const Addresses = ({navigation}) => {
    const [state, dispatch] = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    useEffect(() => {
        dispatch({type: "CANCEL_DELETE_INFO_FROM_CALCULATOR"})
        setTokenRequest(calculateAPI.getAddresses).then(r => {
            console.log(r);
            setData(r.data);
            setIsPending(false);
        })
    }, [])
    const onSubmit = id => {
        navigation.navigate("Расчет");
        dispatch({type: "SET_DATA_CALCULATOR", token : "dummy-auth-token", id})
    }
    return isPending ? <Preloader/> : <FlatList keyboardShouldPersistTaps='handled' style={{flex: 1, backgroundColor: "white"}} data={data} keyExtractor={index => index.toString()} renderItem={({item}) => (
        <SafeAreaView style={styles.container}>
            <View style={styles.item}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Text style={styles.title}>{item.adress.premises_type}: {item.adress.area} м2</Text>
                    <Text style={styles.title}>№{item.id}</Text>
                </View>
                <Text style={styles.description}>{item.adress.adress}</Text>
                {/*<View pointerEvents="none" style={styles.mapContainer}>*/}
                {/*    <MapView style={styles.map} scrollEnabled={false} initialRegion={item.coordinates}>*/}
                {/*        <Marker coordinate={item.coordinates}>*/}
                {/*            <MarkerCustom/>*/}
                {/*        </Marker>*/}
                {/*    </MapView>*/}
                {/*</View>*/}
                <Text style={[styles.title, {marginTop: 10}]}>Цена: {item.adress.price} руб</Text>
                <MyButton onPress={() => onSubmit(item.adress.id)} title={"Заказать уборку"} width={width * 0.74}/>
            </View>
        </SafeAreaView>
    )
    }/>
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 40
    },
    rightBtn: {
        width: width * 0.08,
        height: width * 0.08,
        justifyContent: "flex-end"
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.whiteGray,
        borderRadius: 12,
        width: width * 0.85,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    title: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: "500"
    },
    description: {
        lineHeight: 19,
        fontSize: 15,
        fontWeight: "400",
        color: Colors.violet,
        marginTop: 10,
        width: "85%"
    },
    mapContainer: {
        marginTop: 10,
        width: width * 0.85,
        height: width * 0.5,
        zIndex: 1,
        overflow: "hidden",
        marginBottom: 0
    },
    map: {
        width: width * 0.74,
        height: width * 0.5,
        marginBottom: 0
    },
})

export default AddressesRoot;
