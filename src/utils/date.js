import {t} from '../locale'
// 常量
export const dateObj = {
    month: [
        {
            id: 1,
            name: t('cl.datePicker.months.m1')
        },
        {
            id: 2,
            name: t('cl.datePicker.months.m2')
        },
        {
            id: 3,
            name: t('cl.datePicker.months.m3')
        },
        {
            id: 4,
            name: t('cl.datePicker.months.m4')
        },
        {
            id: 5,
            name: t('cl.datePicker.months.m5')
        },
        {
            id: 6,
            name: t('cl.datePicker.months.m6')
        },
        {
            id: 7,
            name: t('cl.datePicker.months.m7')
        },
        {
            id: 8,
            name: t('cl.datePicker.months.m8')
        },
        {
            id: 9,
            name: t('cl.datePicker.months.m9')
        },
        {
            id: 10,
            name: t('cl.datePicker.months.m10')
        },
        {
            id: 11,
            name: t('cl.datePicker.months.m11')
        },
        {
            id: 12,
            name: t('cl.datePicker.months.m12')
        }
    ],
    week: [
        {
            id: 0,
            name: t('cl.datePicker.weeks.sun')
        },
        {
            id: 1,
            name: t('cl.datePicker.weeks.mon')
        },
        {
            id: 2,
            name: t('cl.datePicker.weeks.tue')
        },
        {
            id: 3,
            name: t('cl.datePicker.weeks.wed')
        },
        {
            id: 4,
            name: t('cl.datePicker.weeks.thu')
        },
        {
            id: 5,
            name: t('cl.datePicker.weeks.fri')
        },
        {
            id: 6,
            name: t('cl.datePicker.weeks.sat')
        }
    ],
    reg: /d{1,4}|M{1,4}|yy(?:yy)?|([HhMsWm])\1?|[aA]|"[^"]*"|'[^']*'/g,
    yyyy: /yyyy/g,
    yy: /yy/g,
    MM: /MM/g,
    M: /M/g,
    dd: /dd/g,
    d: /d/g,
    hh: /hh/g,
    h: /h/g,
    HH: /HH/g,
    H: /H/g,
    mm: /mm/g,
    m: /m/g,
    ss: /ss/g,
    s: /s/g,
    A: /A/g,
    a: /a/g,
    WW: /WW/g,
    W: /W/g,
    fourNumberReg: /\d{4}/,
    twoNumberReg: /\d\d?/,
    // eslint-disable-next-line no-useless-escape
    word: /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
};


export const parseDateObj = (o, f, r) => {
    r = parseInt(r);
    switch (f) {
        case 'yyyy':
            o.year = r;
            break;
        case 'yy':
            var nowDate = new Date();
            var fullYear = nowDate.getFullYear();
            fullYear = fullYear.toString().substring(0,2);
            o.year = fullYear + r;
            break;
        case 'MM':
            o.month = r - 1;
            break;
        case 'M':
            o.month = r - 1;
            break;
        case 'dd':
            o.date = r;
            break;
        case 'd':
            o.date = r;
            break;
        case 'hh':
            o.hour = r;
            break;
        case 'h':
            o.hour = r;
            break;
        case 'HH':
            o.hour = r >= 12 ? r + 12 : r;
            break;
        case 'H':
            o.hour = r >= 12 ? r + 12 : r;
            break;
        case 'mm':
            o.minute = r;
            break;
        case 'm':
            o.minute = r;
            break;
        case 'ss':
            o.second = r;
            break;
        case 's':
            o.second = r;
            break;
        case 'A':
            o.apm = r;
            break;
        case 'a':
            o.apm = r;
            break;
        case 'WW':
            o.week = r;
            break;
        case 'W':
            o.week = r;
            break;
    }
}


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
    format = format || 'yyyy-MM-dd';
    if(typeof forDate === 'string'){
        let dateArr = forDate.match(/(\d{1,})/g);
        let dateSeparator = '-';
        let timeSeparator = ':';
        let foryy = dateArr[0] ? (dateArr[0].length !== 4 ? dateArr[0].substring(0,4) : dateArr[0]) : '';
        let forMM = dateArr[1] ? dateSeparator + (dateArr[1].length > 2 ? dateArr[1].substring(0,2) : dateArr[1]) : '';
        let fordd = dateArr[2] ? dateSeparator + (dateArr[2].length > 2 ? dateArr[2].substring(0,2) : dateArr[2]) : '';
        let forhh = dateArr[3] ? ' ' + (dateArr[3].length > 2 ? dateArr[3].substring(0,2) : dateArr[3]) : '';
        let formm = dateArr[4] ? timeSeparator + (dateArr[4].length > 2 ? dateArr[4].substring(0,2) : dateArr[4]) : '';
        let forss = dateArr[5] ? timeSeparator + (dateArr[5].length > 2 ? dateArr[5].substring(0,2) : dateArr[5]) : '';
        if(foryy && foryy.length !== 4) foryy = new Date().getFullYear().toString();
        if(forMM && Math.abs(forMM) > 12) forMM = '12';
        if(fordd && Math.abs(fordd) > 31) fordd = '31';
        if(forhh && Math.abs(forhh) > 59) forhh = '59';
        if(formm && Math.abs(formm) > 59) formm = '59';
        if(forss && Math.abs(forss) > 59) forss = '59';
        forDate = new Date(`${foryy}${forMM}${fordd}${forhh}${formm}${forss}`);
    }else{
        forDate = new Date(forDate);
    }
    let fullYear = forDate.getFullYear();
    let year = fullYear.toString().substring(2);
    let month = forDate.getMonth() + 1;
    let date = forDate.getDate();
    let hours = forDate.getHours();
    let minutes = forDate.getMinutes();
    let second = forDate.getSeconds();
    let apm = hours >= 12 ? 'pm' : 'am';
    let week = getWeekNumber(forDate).week;

    //12小时制
    let upperHours = hours >= 12 ? hours - 12 : hours;

    if(format === 'timestamp'){
        return forDate.getTime();
    }

    return format.replace(dateObj.yyyy, fullYear)
        .replace(dateObj.yy, year)
        .replace(dateObj.MM, zero(month))
        .replace(dateObj.M, month)
        .replace(dateObj.dd, zero(date))
        .replace(dateObj.d, date)
        .replace(dateObj.hh, zero(hours))
        .replace(dateObj.h, hours)
        .replace(dateObj.HH, zero(upperHours))
        .replace(dateObj.H, upperHours)
        .replace(dateObj.mm, zero(minutes))
        .replace(dateObj.m, minutes)
        .replace(dateObj.ss, zero(second))
        .replace(dateObj.s, second)
        .replace(dateObj.A, apm.toUpperCase())
        .replace(dateObj.a, apm.toLowerCase())
        .replace(dateObj.WW, zero(week))
        .replace(dateObj.W, week)
};

/**
 * 转换格式化的日期为标准日期格式
 * @param formatDate 格式化的日期
 * @param format 日期格式
 */
export const formatToDate = (formatDate, format) => {
    if(!format || typeof format !== 'string') {
        throw new Error('Invalid format faild');
    }

    if(!formatDate) return;

    if(typeof formatDate !== 'string') formatDate = dateFormat(formatDate, format);


    let isValid = true;
    let dateInfo = {};
    format.replace(dateObj.reg, function ($0) {

        let len = $0.length;
        let reg = len === 4 ? dateObj.fourNumberReg : dateObj.twoNumberReg;
        if($0 === 'a' || $0 === 'A') reg = dateObj.word;
        let index = formatDate.search(reg);

        if(index < 0) isValid = false;

        formatDate.replace(reg, function (result) {
            parseDateObj(dateInfo, $0, result);
            formatDate = formatDate.substring(index + result.length)
            return result;
        })
    })

    if(!isValid) return;

    if(dateInfo.week){
        let computedDate = convertWeekToDate(dateInfo.year, dateInfo.week);
        dateInfo.month = computedDate.month - 1;
        dateInfo.date = computedDate.date;
    }

    let today = new Date();

    let date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.date || 1, dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0)

    return date;
}

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
            let key = new Date(firstDateCopy);
            result.push({
                year: firstDateCopy.getFullYear(),
                month: firstDateCopy.getMonth() + 1,
                date: firstDateCopy.getDate(),
                isNowDate: false,
                isNowMonth: false,
                key: key,
                format: dateFormat(firstDateCopy),
                week: getWeekNumber(key).week
            });
        }
        result.reverse();
    }
    for (let i = 0; i < currentTotalDay; i++) {
        let key = new Date(firstDate);
        result.push({
            year: firstDate.getFullYear(),
            month: firstDate.getMonth() + 1,
            date: firstDate.getDate(),
            isNowDate: nowDate === dateFormat(firstDate),
            isNowMonth: true,
            key: key,
            format: dateFormat(firstDate),
            week: getWeekNumber(key).week
        });
        firstDate.setDate(firstDate.getDate() + 1);
    }


    if (endDay < 6 || result.length < 6 * 7) {
        let endDateCopy = endDate;
        let num = Math.max(6 - endDay, 42 - result.length);
        for (let i = 0; i < num; i++) {
            endDateCopy.setDate(endDateCopy.getDate() + 1);
            let key = new Date(endDateCopy);
            result.push({
                year: endDateCopy.getFullYear(),
                month: endDateCopy.getMonth() + 1,
                date: endDateCopy.getDate(),
                isNowDate: false,
                isNowMonth: false,
                key: key,
                format: dateFormat(endDateCopy),
                week: getWeekNumber(key).week
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
    if(!forYear) return [];
    forYear = forYear.toString();
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
            id: startYear,
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
        return Math.ceil(dis / (24 * 60 * 60 * 1000) / 7);
    }

    let nowDate = new Date(date);
    let _nowDate = nowDate.getDate();
    let nowDay = nowDate.getDay();
    if(nowDay >= 4){
        nowDate.setDate(_nowDate - (nowDate.getDay() - 4));
    }else {
        nowDate.setDate(_nowDate + (4 - nowDate.getDay()));
    }
    return {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        week: computedWeekNumber(nowDate),
    }
};

/**
 * 根据年、周反推日期
 * @param year
 * @param week
 * @returns {Date}
 */
export const convertWeekToDate = (year, week) => {
    //根据周数反推月数

    //计算周四的时间戳 所以减去3
    let m = (week * 7 - 3) * 24 * 60 * 60 * 1000;

    let startDate = new Date(`${year}-01-01`);
    startDate.setHours(0)
    let startDay = startDate.getDay();
    if(startDay <= 4){
        startDate.setDate(1 - startDay);
    }else {
        startDate.setDate(7 - startDay);
    }
    let currentDate = new Date(startDate.getTime() + m);

    return {
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate()
    };
}

/**
 * 获取指定年指定周数的信息
 * @param weekNumberInfo
 * @param format
 * @returns {*}
 */
export const getWeekNumberInfo = (weekNumberInfo, format) => {
    if(!weekNumberInfo || !format) return weekNumberInfo;
    let formatMatch = format.match(/(\S*)yyyy(\S*)WW(\S*)/);
    let yearReg = new RegExp(`${formatMatch[1]}(\\d*)${formatMatch[2]}`);
    let weekReg = new RegExp(`${formatMatch[2]}(\\d*)${formatMatch[3]}`);

    let regResult = weekNumberInfo.match(yearReg);
    let year;
    let month;
    let week;
    if(regResult){
        year = weekNumberInfo.match(yearReg)[1];
        week = weekNumberInfo.match(weekReg)[1];


        //根据周数反推月数

        //计算周四的时间戳 所以减去3
        let m = (week * 7 - 3) * 24 * 60 * 60 * 1000;

        let startDate = new Date(`${year}-01-01`);
        startDate.setHours(0)
        let startDay = startDate.getDay();
        if(startDay <= 4){
            startDate.setDate(1 - startDay);
        }else {
            startDate.setDate(7 - startDay);
        }
        let currentDate = new Date(startDate.getTime() + m);
        month = currentDate.getMonth() + 1;
    }else {
        year = getWeekNumber(weekNumberInfo).year;
        month = getWeekNumber(weekNumberInfo).month;
        week = getWeekNumber(weekNumberInfo).week;
    }
    return {
        year: year,
        month: month,
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
