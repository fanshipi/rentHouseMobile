import { axios } from './axios'

const KEY = 'hkzf_city_key'

// 获取city
const getCity = () => {
  // return JSON.parse(window.localStorage.getItem(KEY))
  return window.localStorage.getItem(KEY)
}
// 设置city
export const setCity= (city) => {
  window.localStorage.setItem(KEY, JSON.stringify(city))
}

const BMap = window.BMap
//  {label:'深圳',value:'AREA|a6649a11-be98-b150'}
export function getCurrentCity() {
  const city = getCity()
  if (!city) {
    // Promise.resolve('foo')等价于new Promise(resolve=>resolve('foo'))
    return new Promise(resolve => {
      var myCity = new BMap.LocalCity()
      myCity.get(async result => {
        //   console.log(result);
          
        let res = await axios.get(`/area/info?name=${result.name}`)
        // console.log(res)
        // resole出去
        resolve(res.data.body)
        // 保存data
        setCity(res.data.body)
      })
    })
  } else {
    // 将现有对象转为 Promise 对象
    // console.log(city)//{label:"深圳",value: "AREA|a6649a11-be98-b150"}
    return Promise.resolve(JSON.parse(city))
  }
}
