import axios from 'axios'

const ERR_OK = 0

export function get(url) {
  return function(params) {
    return axios.get(url, {
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
