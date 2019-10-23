const KEY = "hzzf_token"
export const setToken = (token) => {
 window.localStorage.setItem(KEY,token)
}

export const getToken = () =>{
    return window.localStorage.getItem(KEY)
}