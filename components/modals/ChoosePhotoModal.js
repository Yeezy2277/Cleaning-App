import React, {useRef, forwardRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {Modalize} from 'react-native-modalize';
import * as ImagePicker from 'expo-image-picker';
import {useCombinedRefs} from '../utils/use-combined-refs';
import MyButton from "../LittleComponents/MyButton";

const width = Dimensions.get("screen").width;

const ChoosePhotoModal = forwardRef(({setImage}, ref) => {
    const modalizeRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { statusLibrary } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const { statusCamera } = await ImagePicker.requestCameraPermissionsAsync();
                if (statusLibrary && statusCamera !== 'granted') {
                    alert('Извините, но без прав, вы не сможете выбрать фото');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            combinedRef.current.close();
            setImage({ uri: localUri, name: filename, type });
        }
    };
    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            combinedRef.current.close();
            setImage({ uri: localUri, name: filename, type });
        }
    };

    const renderContent = () => (
        <View style={s.content}>
            <View>
                <Text style={{fontSize: 24, fontWeight: "500", textAlign: "center"}}>Тип фото</Text>
                <MyButton title="Сделать фото" onPress={takeImage} width={width * 0.85}/>
                <MyButton title="Выбрать в библиотеке" onPress={pickImage} width={width * 0.85}/>
            </View>
        </View>
    );

    return (
        <Modalize ref={combinedRef} adjustToContentHeight={toggle}>
            {renderContent()}
        </Modalize>
    );
});

export default ChoosePhotoModal;

const s = StyleSheet.create({
    content: {
        paddingTop: 38,
        paddingLeft: 28,
        paddingRight: 24,
        paddingBottom: 35
    }
});
