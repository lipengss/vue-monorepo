const typeList: Map<string, { label: string }> = new Map([
    ['int', { label: 'int（整数型）'}],
    ['float', { label: 'float（单精度浮点型）'}],
    ['double', { label: 'double（双精度浮点型）'}],
    ['enum', { label: 'enum（枚举型）' }],
    ['boolean', { label: 'boolean（布尔型）'} ],
    ['string', { label: 'string（字符串）' }],
    ['date', { label: 'date（时间型）' }],
])

const unitList: Map<string, { label: string }> = new Map([
    ['kW·h', { label: 'kW·h / 千瓦时'}],
    ['Wh', { label: 'Wh / 瓦时'}],
    ['kW', { label: 'kW / 千瓦特'}],
    ['W', { label: 'W / 瓦特' }],
    ['mW', { label: 'mW / 毫瓦'} ],
])

const readWriteList = new Map([
    [ false, {label: '只读'}],
    [ true, { label: '读写'}]
])

export {
    typeList,
    unitList,
    readWriteList
}