import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";

const width = Dimensions.get("screen").width;

export default function GooglePlacesInput() {
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyB1LhEAWQxJrm2Vp5Dci-cvcFcYEFdOD_Y',
                    language: 'ru',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
});
