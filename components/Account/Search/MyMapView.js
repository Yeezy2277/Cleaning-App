import React, {createRef, useContext, useEffect, useRef, useState} from 'react';
import MapView, {Marker} from "react-native-maps";
import {geocodeLocationByCoords, geocodeLocationByName, getLocation} from "./GetLocation";
import {Image, View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Keyboard, TextInput} from "react-native";
import marker from "../../../assets/marker.png"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {Ionicons} from "@expo/vector-icons";
import Preloader from "../../view/Common/Preloader";
import MyButton from "../../LittleComponents/MyButton";
import MyInput from "../../LittleComponents/MyInput";
import Close from "../../LittleComponents/SVG/Close";
import {LinearGradient} from "expo-linear-gradient";
import Location from "../../LittleComponents/SVG/Location";
import {Colors} from "../../view/colors";
import MapButton from "../../modals/MapButton";
import Svg, {Rect} from "react-native-svg";
import ModalLine from "../../LittleComponents/SVG/ModalLine";
import loc from "../../../assets/location.png";
import {AlwaysOpen} from "../../modals/AlwaysOpen";
import {Host, Portal} from 'react-native-portalize';
import Responsive from 'react-native-lightweight-responsive';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const MyMapView = ({navigation, route}) => {
    const tabBarHeight = useBottomTabBarHeight();
    const [tabHeight, setTabHeight] = useState(tabBarHeight);
    const [region, setRegion] = useState({})
    const [location, setLocation] = useState({});
    const [camera, setCamera] = useState({});
    const [text, setText] = useState();
    useEffect(() => {
        getInitialState()
        console.warn(height)
    }, [])

    useEffect(() => {
        myRef.current?.setAddressText(text)
    }, [text])

    useEffect(() => {
        (async () => {
            const cam = await mapRef.current?.getCamera()
            setCamera(cam);
            console.log(camera);
        })()
    }, [region])

    const myRef = useRef();
    const mapRef = useRef();

    const getInitialState = () => {
                setRegion(route.params.region);
                setLocation(route.params.initialRegion);
    }

    const getCoordsFromName = (loc) => {
        geocodeLocationByName(loc).then(async (r) => {
            setRegion({
                latitude: r.lat,
                longitude: r.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            })
            mapRef.current?.animateToRegion({
                latitude: r.lat,
                longitude: r.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            })
        })
    }

    const getNameFromCoords = (reg) => {
        geocodeLocationByCoords(reg.latitude, reg.longitude).then(r => {
            setText(r.results[0].formatted_address)
        })
    }
    return (
        region.latitude ?
                <SafeAreaView style={{flex: 2, zIndex: 0, backgroundColor: "white"}}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: verticalScale(30), paddingLeft: 24, paddingRight: 26}}>
                        <GooglePlacesAutocomplete
                            ref={myRef}
                            placeholder='Поиск нужного места'
                            minLength={2} // minimum length of text to search
                            returnKeyType={'search'} // Can be left out for default return key listViewDisplayed={false}    // true/false/undefined
                            onPress={(data) => { // 'details' is provided when fetchDetails = true
                                getCoordsFromName(data.description);
                            }
                            }
                            styles={{
                                textInput: styles.input,
                                listView: {
                                    zIndex: 100,
                                },
                                textInputContainer: {
                                    alignItems: "flex-start",
                                    zIndex: 100
                                }
                            }}
                            renderRightButton={() => <TouchableOpacity style={styles.button}
                                                                       onPress={() => myRef.current?.setAddressText("")}>
                                <Close/>
                            </TouchableOpacity>}
                            textInputProps={{
                                clearButtonMode: 'never',
                            }}
                            query={{
                                key: 'AIzaSyB1LhEAWQxJrm2Vp5Dci-cvcFcYEFdOD_Y',
                                language: 'ru'
                            }}

                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={300}
                        />
                    </View>
                    {
                        region['latitude'] ?
                            <View style={{zIndex: 1, width, marginTop: verticalScale(30), height: "100%"}}>
                                <Image source={marker} style={{
                                    zIndex: 3,
                                    position: 'absolute',
                                    width: 28,
                                    height: 37,
                                    marginTop: -37,
                                    marginLeft: -11,
                                    left: '50%',
                                    top: '50%'
                                }}/>
                                <TouchableOpacity style={[styles.locationButton, {bottom: tabHeight + 119 - width * 0.14 + 143}]} onPress={() => {
                                    mapRef.current.animateToRegion(location);
                                }
                                }>
                                    <Image source={loc} style={styles.locImg}/>
                                </TouchableOpacity>
                                <MapView
                                    ref={mapRef}
                                    style={{flex: 1, zIndex: 1, height: 50}}
                                    onPress={Keyboard.dismiss}
                                    onRegionChange={() => {
                                        Keyboard.dismiss()
                                    }
                                    }
                                    onRegionChangeComplete={(reg) => {
                                        getNameFromCoords(reg)
                                        setRegion(reg)
                                    }}
                                    initialRegion={region}>
                                </MapView>
                                <View style={[styles.bottomMenu, {height: 119, bottom: tabHeight + 119 - width * 0.14}]}>
                                    <ModalLine/>
                                    <MyButton width={width * 0.85}  title={"Выбрать"} onPress={async () => {
                                        navigation.goBack();
                                        await route.params.updateAddress(myRef.current?.getAddressText(), region, camera)
                                    }}/>
                                </View>
                            </View> : null}
                </SafeAreaView>
            : <Preloader/>
    );
}

const styles = StyleSheet.create({
    input: {
        width: width * 0.85,
        height: 56,
        borderWidth: 2,
        borderColor: "#2eade8",
        borderRadius: 15,
        color: Colors.violet,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "500",
        paddingLeft: width * 0.03,
        fontSize: 15,
        backgroundColor: "#fff",
        paddingRight: width * 0.12,
        zIndex: 100
    },
    button: {
        width: 40,
        height: 40,
        position: "absolute",
        right: 1,
        top: verticalScale(15),
        zIndex: 100
    },
    bottomMenu: {
        width,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        position: "absolute",
        paddingBottom: width * 0.05 + 8,
        zIndex: 100
    },
    locationButton: {
        position: "absolute",
        bottom: "50%",
        right: "7%",
        width: scale(70),
        height: verticalScale(70),
        zIndex: 100,
    },
    locImg: {
        width: Responsive.width(70),
        height: Responsive.width(70),
        borderRadius: 70,
        zIndex: 100
    }
})

export default MyMapView;
