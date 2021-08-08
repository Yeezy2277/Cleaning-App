import React, {createRef, useContext, useEffect, useRef, useState} from 'react';
import MapView, {Marker} from "react-native-maps";
import {geocodeLocationByCoords, geocodeLocationByName, getLocation} from "./GetLocation";
import {Image, View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Keyboard, TextInput} from "react-native";
import marker from "../../../assets/marker.png"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {Ionicons} from "@expo/vector-icons";
import Preloader from "../../Common/Preloader";
import {UserContext} from "../../Common/UserProvider";
import MyButton from "../../LittleComponents/MyButton";
import MyInput from "../../LittleComponents/MyInput";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const customStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#263c3f"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b9a76"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#38414e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#212a37"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1f2835"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2f3948"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#515c6d"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    }
]

const MyMapView = ({navigation, route}) => {
    const [region, setRegion] = useState({})
    const [location, setLocation] = useState({});
    const [camera, setCamera] = useState({});
    const [text, setText] = useState();
    useEffect(() => {
        getInitialState()
    }, [])

    useEffect(() => {
        myRef.current?.setAddressText(text)
    }, [text])

    useEffect(() => {
        (async () => {
            const cam = await mapRef.current?.getCamera()
            setCamera(cam);
            console.warn(camera);
        })()
    }, [region])

    const myRef = useRef();
    const mapRef = useRef();

    const getInitialState = () => {
        getLocation().then(
            (data) => {
                console.log(data);
                setRegion(route.params.region)
                setLocation({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                })
            }
        );
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
            <SafeAreaView style={{flex: 1, zIndex: 0}}>
                <View style={{flexDirection: "row", marginVertical: width * 0.05}}>
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
                                paddingHorizontal: width * 0.03,
                                zIndex: 100
                            }
                        }}
                        renderRightButton={() => <TouchableOpacity style={styles.button}
                                                                   onPress={() => myRef.current?.setAddressText("")}>
                            <Ionicons name={"close-circle"} size={20} color={"#313130"}/>
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
                        <View style={{zIndex: 1, width, height: height * 0.73}}>
                            <Image source={marker} style={{
                                width: 40,
                                height: 40,
                                zIndex: 3,
                                position: 'absolute',
                                marginTop: -37,
                                marginLeft: -11,
                                left: '50%',
                                top: '50%'
                            }}/>
                            <MapView
                                ref={mapRef}
                                style={{flex: 1, zIndex: 1}}
                                onPress={Keyboard.dismiss}
                                onRegionChange={() => {
                                    Keyboard.dismiss()
                                }
                                }
                                onRegionChangeComplete={(reg) => {
                                    getNameFromCoords(reg)
                                    setRegion(reg)
                                }}
                                showsUserLocation={false}
                                initialRegion={region}>
                            </MapView>
                            <TouchableOpacity style={styles.locationButton} onPress={() => {
                                mapRef.current.animateToRegion(location);
                            }
                            }>
                                <Ionicons name={"navigate-circle"} size={70} color={"#313130"}/>
                            </TouchableOpacity>
                            <View style={styles.bottomMenu}>
                                <MyButton title={"Выбрать"} onPress={async () => {
                                    navigation.goBack();
                                    await route.params.updateAddress(myRef.current?.getAddressText(), region, camera)
                                }}/>
                            </View>
                        </View> : null}
            </SafeAreaView> : <Preloader/>
    );
}

const styles = StyleSheet.create({
    input: {
        width: width * 0.85,
        height: width * 0.13,
        borderWidth: 2,
        borderColor: "#2eade8",
        borderRadius: 15,
        marginTop: width * 0.02,
        color: "#2eade8",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat_500Medium",
        paddingLeft: width * 0.03,
        fontSize: width * 0.03,
        backgroundColor: "#fff",
        paddingRight: width * 0.12,
        zIndex: 100
    },
    button: {
        width: 40,
        height: 40,
        position: "absolute",
        right: width * 0.03,
        top: width * 0.058,
        zIndex: 100
    },
    bottomMenu: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: width * 0.02,
        zIndex: 100
    },
    locationButton: {
        position: "absolute",
        bottom: width * 0.3,
        right: width * 0.07,
        width: width * 0.2,
        height: width * 0.2,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99
    }
})

export default MyMapView;