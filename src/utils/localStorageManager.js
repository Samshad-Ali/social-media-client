export const KEY_ACCESS_TOKEN = 'access_token';

export const getItem = (key)=>{
    return localStorage.getItem(key)
    // it call to check that is person loged in or not.
}

export const setItem = (key,value)=>{
    return localStorage.setItem(key,value)
    // it call after login to save the access token
}

export const removeItem = (key)=>{
    return localStorage.removeItem(key)
    // it call when we log out from the app
}