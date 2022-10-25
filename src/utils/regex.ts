// 非0正整数
export const regPositive = /^[1-9]\d*$/

// 非 0 正整数 或 空
export const regPositiveOrEmpty = /\s*|^[1-9]\d*$/

// 中国 11 位手机号格式
export const regMobileCN = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g

export const regUserName = /^[\w/-]+$/
