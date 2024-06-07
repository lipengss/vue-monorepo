import numeral from "numeral";

function formatNum(num: string | number, format:string = '0.00') {
    return numeral(num).format(format);
}

export {
    formatNum
}