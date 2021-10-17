import {getToken} from "../api";
import * as SecureStore from "expo-secure-store"

export const setTokenRequest = async (request, data) => {
    try {
        const token = await SecureStore.getItemAsync("userToken");
        return await request(token, data);
    } catch (e) {
        console.log(e)
    }

}
