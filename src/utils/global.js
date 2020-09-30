export const deepClone = (data) => {
    let result;
    let dataType;
    if (typeof data === 'object') {
        if (data instanceof Array) {
            result = [];
            dataType = 'array';
        } else {
            result = {};
            dataType = 'object';
        }
    } else {
        return data
    }

    if (dataType === 'array') {
        for (let i = 0; i < data.length; i++) {
            result.push(deepClone(data[i]))
        }
    } else if (dataType === 'object') {
        // eslint-disable-next-line no-unused-vars
        for (const i in data) {
            result[i] = deepClone(data[i]);
        }
    }
    return result;
};

/**
 * 获取滚动条的宽度
 * @returns {number}
 */
export const getScrollBarWidth = () => {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';

    document.body.appendChild(div);

    const scrollBarWidth = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);

    return scrollBarWidth;
};

/**
 * 生成指定位数的随机数字符串
 * @param length
 * @returns {string}
 */
export const createRandom = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
};

/**
 * 返回指定路径下data的值, 支持对象和数组的取值
 * @param obj
 * @param path eg1: a.b.c  eg2:0.1.2
 * @returns {string, object}
 */
export const getObjectValueByPath = function(obj, path) {
    try {
        if ((typeof obj === 'object' || Array.isArray(obj)) && path) {
            const pathArray = path.split('.');
            const getValue = function(obj, pathArray) {
                const key = pathArray.shift();
                if (typeof obj[key] === 'undefined' || obj[key] == null) {
                    return '';
                }
                if (pathArray.length === 0) {
                    return obj[key];
                }
                obj = obj[key];
                return getValue(obj, pathArray);
            }
            return getValue(obj, pathArray);
        }
        return '';
    } catch (error) {
        console.error(error);
    }
}

/**
 * 16进制色值转rgba
 * @param color
 * @param alpha
 * @returns {string}
 */
export const colorToRgba = (color, alpha = 1) => {
    // 16进制颜色值的正则
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

    if (typeof color !== 'string') return color;
    if (!reg.test(color)) return color;

    // 把颜色值变成小写
    color = color.toLowerCase();
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
        let colorNew = '#';
        for (let i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        color = colorNew;
    }
    // 处理六位的颜色值，转为RGBA
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
        colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
    }
    return `rgba(${colorChange.join(',')}, ${alpha})`;
};
