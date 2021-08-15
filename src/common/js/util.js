/**
 * 解析 url 参数
 * @example ?id=123%a=b
 * @returns Object {id: 123, a: b}
 * @export
 * @param {*} params
 */
export function urlParse (params) {
  let url = window.location.search;
  let obj = {};
  // ^ 表示非，[?&] 匹配到 ?, [^?&] 匹配 id， +=[^?&]+ 匹配到 =123
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=123', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
