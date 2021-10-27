import React, {useRef, forwardRef, useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { Modalize } from 'react-native-modalize';

import { useCombinedRefs } from '../utils/use-combined-refs';
import MyButton from "../LittleComponents/MyButton";
import {WebView} from "react-native-webview";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../view/colors";
import Svg, {Path} from "react-native-svg";
import ToggleCheckbox from "../LittleComponents/SVG/ToggleCheckbox";
import {commonError, successFree, successOrder} from "../alerts";
import {setTokenRequest} from "../utils/Common Functions";
import {calculateAPI} from "../api";
import {AuthContext} from "../../App";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const PaymentModal = forwardRef((props, ref) => {
    const [ state, dispatch ] = useContext(AuthContext)
    const modalizeRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    const [toggle, setToggle] = useState(true);
    const [isWeb, setIsWeb] = useState(false);
    const [isBonus, setBonus] = useState(false);
    const updateBonus = () => {
        console.log(isBonus)
        setBonus(!isBonus);
    }
    const setWebView = type => {
        let finalSum = isBonus ? props.bonusSize >= props.allSum ? 0 : props.allSum - props.bonusSize : props.allSum
        let bonus = props.bonusSize >= props.allSum ? props.allSum : props.bonusSize
        console.log(props.bonusSize);
        setTokenRequest(calculateAPI.createPayment, {
            booking: {
                date: props.info.date,
                time: props.info.time,
                paid: finalSum,
                payment_tupe: type,
                bonus_size: !isBonus ? 0 : bonus
            },
            adress: {
                cleaning_type: props.info.typeClean,
                premises_type: props.info.typeBuilding,
                area: props.info.square,
                door: props.info.doors,
                window: props.info.windows,
                bathroom: props.info.toilets,
                adress: props.info.address,
                flat_or_office: props.info.flatNumber,
                mkad: props.info.mkad,
                price: props.allSum,
                bonuce: props.bonusSum,
                coordinates: props.info.region,
                comment: props.info.comment
            }
        }).then(r => {
            if (r === undefined) {
                commonError();
            } else {
                console.log(props.info);
                if (type === "card") {
                    isBonus && props.bonusSize >= props.allSum ? setTokenRequest(calculateAPI.confirmPayment).then(async r => {
                        if (r === undefined) {
                            commonError();
                        } else {
                            successFree();
                            console.warn(`allsum ${props.allSum}, bonus ${bonus}, finalsum ${finalSum}`)
                            await dispatch({type: "UNSET_DATA_CALCULATOR"});
                            await dispatch({type: "DELETE_INFO_FROM_CALCULATOR"});
                            combinedRef.current.close();
                            props.navigation.navigate("Адреса");
                        }
                    }) : props.openPayment(combinedRef, r.data.token);
                } else {
                    setTokenRequest(calculateAPI.confirmPayment).then(async r => {
                        if (r === undefined) {
                            commonError();
                        } else {
                            successOrder();
                            await dispatch({type: "UNSET_DATA_CALCULATOR"});
                            await dispatch({type: "DELETE_INFO_FROM_CALCULATOR"});
                            combinedRef.current.close();
                            props.navigation.navigate("Адреса");
                        }
                    });
                }
            }
        }).catch(err => {
            commonError();
        })
    }

    const renderContent = () => (
        <View style={[s.content, {height: width * 0.8}]}>
                <View>
                    <Text style={{fontSize: 24, fontWeight: "500", textAlign: "center"}}>Способ оплаты</Text>
                    <MyButton title="Оплата с карты" onPress={() => setWebView("card")} width={width * 0.85}/>
                    <MyButton onPress={() => setWebView("cash")} title="Наличными сотруднику" width={width * 0.85}/>
                    <View style={{flexDirection: "row", alignItems: "flex-start", marginTop: 10, justifyContent: "space-between", width: width * 0.85}}>
                        <Text style={{fontSize: 18, fontWeight: "500", color: "#6e6e6e", marginTop: 20, marginLeft: 5 }}>Использовать бонусы</Text>
                        <TouchableOpacity onPress={updateBonus}>
                            {isBonus ? <ToggleCheckbox active={true}/>
                                : <ToggleCheckbox active={false}/>}
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    );

    return (
        <Modalize scrollViewProps={{
            scrollEnabled: false,
            showsVerticalScrollIndicator: false,
            showsHorizontalScrollIndicator: false
        }} onClosed={() => {
            setIsWeb(false);
            props.setScroll(true);
        }} ref={combinedRef} adjustToContentHeight={toggle}>
            {renderContent()}
        </Modalize>
    );
});

export default PaymentModal;

const s = StyleSheet.create({
    content: {
        paddingTop: 38,
        paddingLeft: 28,
        paddingRight: 24,
        paddingBottom: 35
    }
});
