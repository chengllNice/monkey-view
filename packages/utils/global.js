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

