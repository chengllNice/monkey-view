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
    if(typeof forDate === 'string'){
        let dateArr = forDate.match(/(\d{1,})/g);
        let forYY = dateArr[0] ? dateArr[0] : '';
        let forMM = dateArr[1] ? dateArr[1] : '';
        let forDD = dateArr[2] ? dateArr[2] : '';
        let forhh = dateArr[3] ? dateArr[3] : '';
        let formm = dateArr[4] ? dateArr[4] : '';
        let forss = dateArr[5] ? dateArr[5] : '';
        forDate = new Date(`${forYY}-${forMM}-${forDD} ${forhh}:${formm}:${forss}`);
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
            originDate: dateFormat(firstDate)
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
    let startDate = new Date(date);
    let nowDate = new Date(date);
    startDate.setMonth(0);
    startDate.setDate(1);
    let startDay = startDate.getDay();
    //如果本年第一天为周六则往前推七天作为判断的开始日期
    if(startDay === 6){
        startDate.setDate(1-7);
    }
    let dis = nowDate.getTime() - startDate.getTime();
    return zero(Math.ceil( Math.ceil(dis / (24 * 60 * 60 * 1000)) / 7));
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
    let year = weekNumberInfo.match(yearReg)[1];
    let week = weekNumberInfo.match(weekReg)[1];

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
