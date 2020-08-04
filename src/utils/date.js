import {t} from '../locale'
// 常量
export const dateObj = {
    month: [
        {
            id: '01',
            key: 'month1',
            name: t('cl.datePicker.months.m1')
        },
        {
            id: '02',
            key: 'month2',
            name: t('cl.datePicker.months.m2')
        },
        {
            id: '03',
            key: 'month3',
            name: t('cl.datePicker.months.m3')
        },
        {
            id: '04',
            key: 'month4',
            name: t('cl.datePicker.months.m4')
        },
        {
            id: '05',
            key: 'month5',
            name: t('cl.datePicker.months.m5')
        },
        {
            id: '06',
            key: 'month6',
            name: t('cl.datePicker.months.m6')
        },
        {
            id: '07',
            key: 'month7',
            name: t('cl.datePicker.months.m7')
        },
        {
            id: '08',
            key: 'month8',
            name: t('cl.datePicker.months.m8')
        },
        {
            id: '09',
            key: 'month9',
            name: t('cl.datePicker.months.m9')
        },
        {
            id: '10',
            key: 'month10',
            name: t('cl.datePicker.months.m10')
        },
        {
            id: '11',
            key: 'month11',
            name: t('cl.datePicker.months.m11')
        },
        {
            id: '12',
            key: 'month12',
            name: t('cl.datePicker.months.m12')
        }
    ],
    week: [
        {
            id: '0',
            key: 'week0',
            name: t('cl.datePicker.weeks.sun')
        },
        {
            id: '1',
            key: 'week1',
            name: t('cl.datePicker.weeks.mon')
        },
        {
            id: '2',
            key: 'week2',
            name: t('cl.datePicker.weeks.tue')
        },
        {
            id: '3',
            key: 'week3',
            name: t('cl.datePicker.weeks.wed')
        },
        {
            id: '4',
            key: 'week4',
            name: t('cl.datePicker.weeks.thu')
        },
        {
            id: '5',
            key: 'week5',
            name: t('cl.datePicker.weeks.fri')
        },
        {
            id: '6',
            key: 'week6',
            name: t('cl.datePicker.weeks.sat')
        }
    ],
};


export const zero = (value) => {
    if (isNaN(parseInt(value)) || !value.toString()) return value;
    if (value < 10) {
        value = '0' + parseInt(value);
    }
    return value.toString();
};

/**
 * 格式化日期格式
 * @param forDate
 * @param format
 * @returns {string|*}
 */
export const dateFormat = (forDate, format) => {
    if (!forDate) return forDate;
    format = format || 'YYYY-MM-DD';
    if(format && format.indexOf('WW') !== -1){
        // forDate
        let weekInfo = getWeekNumberInfo(forDate, format);
        return format.replace('YYYY', weekInfo.year).replace('WW', weekInfo.weekNumber);
    }
    if(typeof forDate === 'string'){
        let dateArr = forDate.match(/(\d{1,})/g);
        let dateSeparator = '-';
        let timeSeparator = ':';
        let forYY = dateArr[0] ? zero(dateArr[0].length !== 4 ? dateArr[0].substring(0,4) : dateArr[0]) : '';
        let forMM = dateArr[1] ? dateSeparator + zero(dateArr[1].length > 2 ? dateArr[1].substring(0,2) : dateArr[1]) : '';
        let forDD = dateArr[2] ? dateSeparator + zero(dateArr[2].length > 2 ? dateArr[2].substring(0,2) : dateArr[2]) : '';
        let forhh = dateArr[3] ? ' ' + zero(dateArr[3].length > 2 ? dateArr[3].substring(0,2) : dateArr[3]) : '';
        let formm = dateArr[4] ? timeSeparator + zero(dateArr[4].length > 2 ? dateArr[4].substring(0,2) : dateArr[4]) : '';
        let forss = dateArr[5] ? timeSeparator + zero(dateArr[5].length > 2 ? dateArr[5].substring(0,2) : dateArr[5]) : '';
        if(forYY && forYY.length !== 4) forYY = new Date().getFullYear().toString();
        if(forMM && Math.abs(forMM) > 12) forMM = '12';
        if(forDD && Math.abs(forDD) > 31) forDD = '31';
        if(forhh && Math.abs(forhh) > 59) forhh = '59';
        if(formm && Math.abs(formm) > 59) formm = '59';
        if(forss && Math.abs(forss) > 59) forss = '59';
        forDate = new Date(`${forYY}${forMM}${forDD}${forhh}${formm}${forss}`);
    }else{
        forDate = new Date(forDate);
    }
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
export const dateOnMonth = (forYear, forMonth) => {

    let forDate;
    if (!forYear) return forYear;
    if (forMonth) {
        forDate = new Date(forYear, forMonth - 1, 1);
    } else {
        return dateObj.month;
    }

    let result = [];
    let year = forDate.getFullYear();
    let month = forDate.getMonth();
    let nowDate = dateFormat(new Date());

    // 获取当前月第一天的日期
    let firstDate = new Date(year, month, 1);
    let firstDay = firstDate.getDay();//第一天是周几
    //获取当前月最后一天的日期
    let endDate = new Date(year, month + 1, 0);
    let endDay = firstDate.getDay();//最后一天是周几
    //当前月天数
    let currentTotalDay = endDate.getDate() - firstDate.getDate() + 1;

    if (firstDay > 0) {
        let firstDateCopy = new Date(year, month, 1);
        for (let i = 0; i < firstDay; i++) {
            firstDateCopy.setDate(firstDateCopy.getDate() - 1);
            result.push({
                year: firstDateCopy.getFullYear().toString(),
                month: zero(firstDateCopy.getMonth() + 1),
                date: zero(firstDateCopy.getDate()),
                isNowDate: false,
                isNowMonth: false,
                key: dateFormat(firstDateCopy),
                originDate: dateFormat(firstDateCopy),
                week: getWeekNumber(firstDateCopy),
            });
        }
        result.reverse();
    }

    result.push({
        year: firstDate.getFullYear().toString(),
        month: zero(firstDate.getMonth() + 1),
        date: zero(firstDate.getDate()),
        isNowDate: nowDate === dateFormat(firstDate),
        isNowMonth: true,
        key: dateFormat(firstDate),
        originDate: dateFormat(firstDate),
        week: getWeekNumber(firstDate),
    });
    for (let i = 1; i < currentTotalDay; i++) {
        firstDate.setDate(firstDate.getDate() + 1);
        result.push({
            year: firstDate.getFullYear().toString(),
            month: zero(firstDate.getMonth() + 1),
            date: zero(firstDate.getDate()),
            isNowDate: nowDate === dateFormat(firstDate),
            isNowMonth: true,
            key: dateFormat(firstDate),
            originDate: dateFormat(firstDate),
            week: getWeekNumber(firstDate),
        });
    }


    if (endDay < 6 || result.length < 6 * 7) {
        let endDateCopy = endDate;
        let num = Math.max(6 - endDay, 42 - result.length);
        for (let i = 0; i < num; i++) {
            endDateCopy.setDate(endDateCopy.getDate() + 1);
            result.push({
                year: endDateCopy.getFullYear().toString(),
                month: zero(endDateCopy.getMonth() + 1),
                date: zero(endDateCopy.getDate()),
                isNowDate: false,
                isNowMonth: false,
                key: dateFormat(endDateCopy),
                originDate: dateFormat(endDateCopy),
                week: getWeekNumber(endDateCopy),
            });
        }
    }

    return result;
};

/**
 * 格式化年列表
 * @param forYear
 * @returns {[]|Array}
 */
export const yearListInit = (forYear) => {
    if(!forYear || forYear.length !== 4) return [];
    let result = [];
    let yearSplitArr = forYear.split('');
    let startYear = [];//四位的年份字符串
    startYear[0] = yearSplitArr[0];
    startYear[1] = yearSplitArr[1];
    startYear[2] = yearSplitArr[2];
    startYear[3] = '0';
    startYear = parseInt(startYear.join(''));


    for (let i = 0; i <= 9; i++){
        result.push({
            id: startYear.toString(),
            key: `year${startYear}`,
            name: startYear.toString(),
        });
        startYear++;
    }
    return result;
};

/**
 * 获取指定日期在本年中的周数
 * @param date
 * @returns {number|*}
 */
export const getWeekNumber = (date) => {
    if(!date) return date;

    let computedWeekNumber = (date) => {
        let startDate = new Date(date);
        let nowDate = new Date(date);

        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMonth(0);
        startDate.setDate(1);
        let startDay = startDate.getDay();
        if(startDay <= 4){
            startDate.setDate(1 - startDay);
        }else if(startDay > 4){
            startDate.setDate(1 + 7 - startDay);
        }
        let dis = nowDate.getTime() - startDate.getTime();
        return zero(Math.ceil(dis / (24 * 60 * 60 * 1000) / 7));
    }

    let nowDate = new Date(date);
    let _nowDate = nowDate.getDate();
    let nowDay = nowDate.getDay();
    if(nowDay >= 4){
        nowDate.setDate(_nowDate - (nowDate.getDay() - 4));
        return computedWeekNumber(nowDate)
    }else {
        nowDate.setDate(_nowDate + (4 - nowDate.getDay()));
        return computedWeekNumber(nowDate)
    }
};

/**
 * 获取指定年指定周数的信息
 * @param weekNumberInfo
 * @param format
 * @returns {*}
 */
export const getWeekNumberInfo = (weekNumberInfo, format) => {
    if(!weekNumberInfo || !format) return weekNumberInfo;
    let formatMatch = format.match(/(\S*)YYYY(\S*)WW(\S*)/);
    let yearReg = new RegExp(`${formatMatch[1]}(\\d*)${formatMatch[2]}`);
    let weekReg = new RegExp(`${formatMatch[2]}(\\d*)${formatMatch[3]}`);
    let year = weekNumberInfo.match(yearReg) ? weekNumberInfo.match(yearReg)[1] : new Date(weekNumberInfo).getFullYear();
    let week = weekNumberInfo.match(yearReg) ? weekNumberInfo.match(weekReg)[1] : getWeekNumber(weekNumberInfo);


    let date = new Date(`${year}-01-01`);
    let startDay = date.getDay();
    // 获取本年中第一个周六所在的日期
    while (startDay !== 6){
        date.setDate(date.getDate() + 1);
        startDay = date.getDay();
    }
    // 获取每一个周六得日期并获取周数
    let month = 1;
    let _week = 1;
    while (month < 12 && parseInt(_week) !== parseInt(week)){
        _week = getWeekNumber(date.setDate(date.getDate() + 7));
        month = date.getMonth() + 1;
    }
    return {
        year: year,
        month: zero(month),
        weekNumber: week
    };
};

/**
 * 排序日期数组
 * @param date
 * @returns {*}
 */
export const sortDate = (date = []) => {
    if(!Array.isArray(date)) return date;
    let result = JSON.parse(JSON.stringify(date));
    result.sort((a, b)=>{
        let date1 = new Date(a);
        let date2 = new Date(b);
        let time1 = date1.getTime();
        let time2 = date2.getTime();
        return time1 > time2;
    });
    return result;
};
