
export const zero = (value) => {
    if(value < 10){
        value = '0' + value;
    }
    return value.toString();
};

/**
 * 格式化日期格式
 * @param forDate
 * @param format
 * @returns {string|*}
 */
export const dateFormat = (forDate, format = 'YYYYMMDD') => {
    if(!forDate || !format) return forDate;
    forDate = new Date(forDate);

    let year = forDate.getFullYear();
    let month = zero(forDate.getMonth() + 1);
    let date = zero(forDate.getDate());
    let hours = zero(forDate.getHours());
    let minutes = zero(forDate.getMinutes());
    let second = zero(forDate.getSeconds());

    return format.replace('YYYY', year).replace('MM', month).replace('DD', date).replace('hh', hours).replace('mm', minutes).replace('ss', second);
};

/**
 * 指定日期下的所有月份或者所有日期
 * @param forYear 指定年
 * @param forMonth 指定月 如果此值不存在则返回指定年下的月份
 * @returns {[]|*[]|*}
 */
export const dateOrMonth = (forYear, forMonth) => {

    let forDate;
    if(!forYear) return forYear;
    if(forMonth){
        forDate = new Date(forYear, forMonth - 1, 1);
    }else{
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }

    let result = [];
    let year = forDate.getFullYear();
    let month = forDate.getMonth();
    let nowDate = zero(new Date().getDate());

    // 获取当前月第一天的日期
    let firstDate = new Date(year, month, 1);
    let firstDay = firstDate.getDay();//第一天是周几
    //获取当前月最后一天的日期
    let endDate = new Date(year, month + 1, 0);
    let endDay = firstDate.getDay();//最后一天是周几
    //当前月天数
    let currentTotalDay = endDate.getDate() - firstDate.getDate() + 1;

    if(firstDay > 0){
        let firstDateCopy = new Date(year, month, 1);
        for (let i = 0; i < firstDay; i++){
            firstDateCopy.setDate(firstDateCopy.getDate() - 1);
            result.push({
                year: firstDateCopy.getFullYear().toString(),
                month: zero(firstDateCopy.getMonth() + 1),
                date: zero(firstDateCopy.getDate()),
                isNowDate: nowDate === zero(firstDateCopy.getDate()),
                isNowMonth: false,
            });
        }
        result.reverse();
    }

    result.push({
        year: firstDate.getFullYear().toString(),
        month: zero(firstDate.getMonth() + 1),
        date: zero(firstDate.getDate()),
        isNowDate: nowDate === zero(firstDate.getDate()),
        isNowMonth: true,
    });
    for (let i = 1; i < currentTotalDay; i++){
        firstDate.setDate(firstDate.getDate() + 1);
        result.push({
            year: firstDate.getFullYear().toString(),
            month: zero(firstDate.getMonth() + 1),
            date: zero(firstDate.getDate()),
            isNowDate: nowDate === zero(firstDate.getDate()),
            isNowMonth: true,
        });
    }

    if(endDay < 6){
        let endDateCopy = endDate;
        for (let i = 0; i < 6 - endDay; i++){
            endDateCopy.setDate(endDateCopy.getDate() + 1);
            result.push({
                year: endDateCopy.getFullYear().toString(),
                month: zero(endDateCopy.getMonth() + 1),
                date: zero(endDateCopy.getDate()),
                isNowDate: nowDate === zero(endDateCopy.getDate()),
                isNowMonth: false,
            });
        }
    }

    return result;
};