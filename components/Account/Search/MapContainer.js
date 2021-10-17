import React from 'react';
import { View } from 'react-native';
import {geocodeLocationByName, geocodeLocationByCoords, getLocation} from "./GetLocation";
import MapInput from "./MapInput";
import MyMapView from "./MyMapView";
class MapContainer extends React.Component {
    state = {
        region: {}
    };

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        geocodeLocationByName(loc).then(r => {
            this.setState({
                region: {
                    latitude: r.lat,
                    longitude: r.lng,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                }
            });
        })
    }
    getNameFromCoords(reg) {
        geocodeLocationByCoords(reg.latitude, reg.longitude).then(r => {
            console.log(r.results[0].formatted_address);
        })
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <MapInput notifyChange={(loc) => {
                        this.getCoordsFromName(loc)
                        console.log(loc);
                    }}
                    />
                </View>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => {
                                    this.onMapRegionChange(reg)
                                    // console.log(reg)
                                    this.getNameFromCoords(reg)
                                }} />
                        </View> : null}
            </View>
        );
    }
}

export default MapContainer;
