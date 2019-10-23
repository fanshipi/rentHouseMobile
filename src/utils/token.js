const KEY = "hzzf_token"
export const setToken = (token) => {
 window.localStorage.setItem(KEY,token)
}

export const getToken = () =>{
    return window.localStorage.getItem(KEY)
}
export const isAuthenticated = ()=>{
    return getToken()
}

export const deleteToken = ()=>{
    window.localStorage.removeItem(KEY)
}