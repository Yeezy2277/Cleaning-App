import React, {useEffect, useRef, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Montserrat_400Regular, Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import {Dimensions, View, StyleSheet} from "react-native";
import {geocodeLocationByCoords, geocodeLocationByName} from "./GetLocation";

const width = Dimensions.get("screen").width;

function MapInput({onSubmitEditing}) {
    const [text, setText] = useState();
    const [region, setRegion] = useState({})
    useEffect(() => {
        myRef.current?.setAddressText(text)
    }, [text])

    const myRef = useRef();
    const getCoordsFromName = (loc) => {
        geocodeLocationByName(loc).then(r => {
            setRegion({
                latitude: r.lat,
                longitude: r.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            })
        })
        console.log(loc)
    }
    const getNameFromCoords = (reg) => {
        geocodeLocationByCoords(reg.latitude, reg.longitude).then(r => {
            setText(r.results[0].formatted_address)
        })
    }
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_500Medium
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    ref={myRef}
                    placeholder={props.placeholder}
                    minLength={2} // minimum length of text to search
                    autoFocus={true}
                    returnKeyType={'search'} // Can be left out for default return key
                    listViewDisplayed={false}    // true/false/undefined
                    onPress={(data) => { // 'details' is provided when fetchDetails = true
                        console.log(data);
                    }
                    }
                    styles={{
                        textInput: {
                            width: width * 0.85,
                            height: width * 0.13,
                            borderWidth: 2,
                            borderColor: "#2eade8",
                            borderRadius: 15,
                            marginTop: width * 0.02,
                            color: "#2eade8",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "500",
                            paddingLeft: width * 0.03,
                            fontSize: width * 0.03,
                        },
                        textInputContainer: {
                            width: width * 0.85,
                        }
                    }}
                    query={{
                        key: 'AIzaSyB1LhEAWQxJrm2Vp5Dci-cvcFcYEFdOD_Y',
                        language: 'ru'
                    }}
                    textInputProps={{onSubmitEditing}}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={300}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MapInput;
