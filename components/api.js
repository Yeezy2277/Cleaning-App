import axios from 'react-native-axios';
import * as SecureStore from "expo-secure-store";

export const getToken = async () => {
    return await SecureStore.getItemAsync("userToken")
}

const config = {
    baseURL: "https://mmclean.ru/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
};
const configFormData = {
    baseURL: "https://mmclean.ru/",
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};
const client = axios.create(config);
const clientFormFata = axios.create(configFormData);
export const authAPI = {
    login(phone) {
        return client.post(`api/auth/`, {phone})
    },
    code(data) {
        return client.post(`api/code/`, data)
    }
}
export const accountAPI = {
    getAccount(token) {
        return client.get(`api/account/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    updateAccount(token, data) {
        return clientFormFata.post(`api/update-account/`, data, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    }
}

export const supportAPI = {
    getQuestions(token) {
        return client.get(`api/get-questions/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    getOptions() {
        return client.get(`api/get-options/`)
    },
    createQuestions(token, data) {
        return client.post(`api/create-questions/`, data, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    }
}

export const calculateAPI = {
    getAddresses(token) {
        return client.get(`api/get-all-adress/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    getAddress(token, data) {
        return client.post(`api/get-adress/`, data, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    updateAddress(token, data) {
        return client.post(`api/update-adress/`, data, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    createPayment(token, data) {
        return client.post(`api/create-payment/`, data, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    confirmPayment(token) {
        return client.get(`api/confirm-payment/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    getOptions() {
        return client.get(`api/get-options/`)
    }
}
