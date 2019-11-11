import {deepClone} from "../../../utils/global";

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
                item.level = parentCols.level + 1;
            }else{
                item.level = 1;
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
            column.level = parentColumn.level + 1;
            if(maxLevel < column.level) maxLevel = column.level;
        }

        if(column.children){
            let colSpan = 0;
            column.children.forEach(subColumn=>{
                setColSpanforColumns(subColumn, column);
                colSpan += subColumn.colSpan;
            });
            column.colSpan = colSpan;
        }else{
            column.colSpan = 1;
        }
    };

    deepColumns.forEach((item)=>{
        item.level = 1;
        setColSpanforColumns(item);
    });


    let headRows = [];
    for (let i = 0; i < maxLevel; i++){
        headRows.push([]);
    }

    let allColumns = getAllColumns(deepColumns);

    allColumns.forEach(item=>{
        if(item.children){
            item.rowSpan = 1;
        }else{
            item.rowSpan = maxLevel - item.level + 1;
        }
        headRows[item.level - 1].push(item);
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
        column.defaultStatusProps = column.defaultStatusProps || {};
        column.defaultStatusProps.isChecked = column.defaultStatusProps.isChecked || false;
        column.defaultStatusProps.isDisabled = column.defaultStatusProps.isDisabled || false;

        let columnsWidth = column.width ? parseFloat(column.width) : '';
        let columnsMinWidth = column.minWidth ? parseFloat(column.minWidth) : '';

        column.__index = index;
        column.__width = Math.max(columnsWidth, columnsMinWidth);
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
