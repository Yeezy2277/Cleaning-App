import React, {createRef, useContext, useEffect, useRef, useState} from 'react';
import MapView, {Marker} from "react-native-maps";
import {geocodeLocationByCoords, geocodeLocationByName, getLocation} from "./GetLocation";
import {Image, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import marker from "../../../assets/marker.png"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {Ionicons} from "@expo/vector-icons";
import Preloader from "../../Common/Preloader";
import {UserContext} from "../../Common/UserProvider";

const width = Dimensions.get("screen").width;

const MyMapView = ({navigation}) => {
    const [ state, dispatch ] = useContext(UserContext)
    const [region, setRegion] = useState({})
    const [location, setLocation] = useState({});
    const [text, setText] = useState();
    useEffect(() => {
        navigation.setOptions({ tabBarVisible: false })
        getInitialState()
        dispatch({ type: "IS_SELECTED_MAP" })
        console.log(state);
    }, [])

    useEffect(() => {
        myRef.current?.setAddressText(text)
    }, [text])

    const myRef = useRef();

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
        geocodeLocationByName(loc).then(r => {
            setRegion({
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
        <View style={{flex: 1}}>
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
                            marginTop: 60,
                            marginLeft: 20,
                            zIndex: 99,
                            position: "absolute"
                        },
                        textInputContainer: {
                            alignItems: "flex-start",
                            paddingHorizontal: width * 0.03,
                            zIndex: 1
                        }
                    }}
                    renderRightButton={() => <TouchableOpacity style={styles.button} onPress={() => myRef.current?.setAddressText("")}>
                        <Ionicons name={"close-circle"} size={40} color={"#313130"}/>
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
                    <View style={StyleSheet.absoluteFillObject}>
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
                            style={{flex: 1}}
                            onPanDrag={e => {
                                setRegion(e.nativeEvent.coordinate)
                            }
                            }
                            onRegionChangeComplete={(reg) => {
                                getNameFromCoords(reg)
                            }}
                            showsUserLocation={false}
                            region={region}>
                        </MapView>
                    </View> : null}
        </View> : <Preloader/>
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
        paddingRight: width * 0.15
    },
    button: {
        width: 40,
        height: 40,
        position: "absolute",
        right: width * 0.05,
        top: width * 0.03
    }
})

export default MyMapView;