import axios from 'axios'

const urlMap = {
  development: '/',
  production: 'http://xxx.com/sell/'
}

const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0
console.log(baseUrl)

export function get(url) {
  return function(params) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(() => { })
  }
}

// export function get(url) {
//   return async function(params) {
//     try {
//       const res = await axios.get(url, {
//         params
//       })
//       const { errno, data } = res.data
//       if (errno === ERR_OK) {
//         return data
//       }
//     } catch (e) { }
//   }
// }
