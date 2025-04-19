// this file gets the created token and userID from the login/register screens 
//and saves it as a constants to be used everywhere in all the screens
//this simplyfies the repititive process of having to call the expo-secure-store lib each and
//every time to get hold of the userid and token

import * as SecureStore from "expo-secure-store";


//saving the token in a getToken constant
export const getToken = async () => {
    return await SecureStore.getItemAsync("token");
}

//saving the userId in a getUserId constant
export const getUserId = async () => {
    return await SecureStore.getItemAsync("userId");
}

export const getArea = async () => {
    return await SecureStore.getItemAsync("area");
}
