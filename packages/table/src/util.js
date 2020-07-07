import {deepClone} from "main/utils/global";

export const randomStr = (len = 32) => {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return `${str}`
};

/**
 * if colums has children
 * @param cols
 * @param isParent
 * @returns {Array}
 */
export const getAllColumns = (cols, parentCols) => {
    let result = [];
    cols.forEach(item => {
        if(!item.hide){
            if(parentCols){
                item.__parentId = parentCols.__id;
                item.__level = parentCols.__level + 1;
            }else{
                item.__level = 1;
            }
            if (item.children) {
                result.push(...getAllColumns(item.children, item))
            }
            result.push(item);
        }
    });
    return result;
};


export const setGroupTableHead = (columns) => {
    let deepColumns = [];
    columns.forEach(item=>{
        if(!item.__parentId){
            deepColumns.push(item)
        }
    });

    let maxLevel = 1;//children最大层次

    const setColSpanforColumns = (column, parentColumn) => {
        if(parentColumn){
            column.__level = parentColumn.__level + 1;
            if(maxLevel < column.__level) maxLevel = column.__level;
        }

        if(column.children){
            let __colSpan = 0;
            column.children.forEach(subColumn=>{
                setColSpanforColumns(subColumn, column);
                __colSpan += subColumn.__colSpan;
            });
            column.__colSpan = __colSpan;
        }else{
            column.__colSpan = 1;
        }
    };

    deepColumns.forEach((item)=>{
        item.__level = 1;
        setColSpanforColumns(item);
    });


    let headRows = [];
    for (let i = 0; i < maxLevel; i++){
        headRows.push([]);
    }

    let allColumns = getAllColumns(deepColumns);

    allColumns.forEach(item=>{
        if(item.children){
            item.__rowSpan = 1;
        }else{
            item.__rowSpan = maxLevel - item.__level + 1;
        }
        headRows[item.__level - 1].push(item);
    });

    return headRows;
};

/**
 * set defaultProps
 * @param cols
 */
export const setCloneColumnsDefaultProps = (cols) => {
    let columns = deepClone(getAllColumns(cols));

    columns.forEach((column, index)=>{
        column.__isChecked = column.isChecked || false;//全选的状态
        column.__isDisabled = column.isDisabled || false;//全选的状态

        let columnsWidth = column.width ? parseFloat(column.width) : '';
        let columnsMinWidth = column.minWidth ? parseFloat(column.minWidth) : '';

        column.__index = index;
        column.__width = Math.max(columnsWidth, columnsMinWidth);
        column.__sort = column.sort || false;
        column.__filterCheckedValues = [];//筛选项的value值，数组类型
        column.__isFilterChecked = false;//是否确认筛选
    });

    return columns;
};


export const removeBodyColumnsHaveChildren = (columns) => {
    let newBodyCloneColumns = [];
    columns.forEach(item=>{
        if(!item.children){
            newBodyCloneColumns.push(item)
        }
    });
    return newBodyCloneColumns;
};


export const sortFixedColumns = (columns, fixedType) => {
    let left = [];
    let center = [];
    let right = [];
    let result = [];
    columns.filter(item=>{
        if(item.fixed && item.fixed === 'left'){
            left.push(item);
        }else if(item.fixed && item.fixed === 'right'){
            right.push(item);
        }else{
            center.push(item)
        }
    });

    if(fixedType && fixedType === 'right'){
        result.push(...right, ...center, ...left);
    }else{
        result.push(...left, ...center, ...right);
    }
    return result;
};


export const fixedIds = (columns, fixedType) => {
    let ids = [];
    columns.forEach(item=>{
        if(item.__width && item.fixed && item.fixed === fixedType){
            ids.push(item.__id)
        }
    });
    return ids;
};


export const emitDataFormat = (data) => {
    let type = data instanceof Array ? 'array' : (data instanceof Object ? 'object' : '');
    if(!type) return;
    let result = type === 'array' ? [] : {};
    if(type === 'array'){
        data.forEach(item=>{
            if(item instanceof Object){
                let obj = {};
                Object.keys(item).forEach(key=>{
                    if(typeof key === 'string' && !key.includes('__')){
                        obj[key] = item[key]
                    }
                });
                result.push(obj);
            }
        });
    }else{
        Object.keys(data).forEach(key=>{
            if(typeof key === 'string' && !key.includes('__')){
                result[key] = data[key]
            }
        });
    }
    return result;
};
