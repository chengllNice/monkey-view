export const deepClone = (data) => {
    let result;
    let dataType;
    if (typeof data === 'object') {
        if (data instanceof Array) {
            result = [];
            dataType = 'array';
        }
        else {
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
        for (let i in data) {
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
    let div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';

    document.body.appendChild(div);

    let scrollBarWidth = div.offsetWidth - div.clientWidth;

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
    for (let i = 0; i < length; i++){
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
            let pathArray = path.split('.');
            let getValue = function(obj, pathArray) {
                let key = pathArray.shift();
                if (typeof obj[key] == 'undefined' || obj[key] == null) {
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


