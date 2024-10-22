
// 参数1：样式数据 参数2：排除的字段
export const transStyle = (stys:any, notList?:Array<string>) => {
  const pxProp = ['width', 'height']
  const result:any = {}
  let keys:any = []
  keys = Object.keys(stys)
  if (notList && notList.length) {
    keys = keys.filter((item:string) => !notList?.includes(item))
  }
  keys.forEach((key:string) => {
    if (pxProp.includes(key)) {
      result[key] = stys[key] + 'px'
    } else {
      result[key] = stys[key]
    }
  })
  return result
}