import setLang from '../lang';

const lang = {
    m: {
        locale: 'zh-TW',
        select: {
            loading: '加載中',
            emptyData: '暫無數據',
            placeholder: '請選擇',
        },
        datepicker: {
            selectDate: '選擇日期',
            selectTime: '選擇時間',
            ok: '確定',
            clean: '清空',
            year: '年',
            month: '月',
            startTime: '開始時間',
            endTime: '結束時間',
            weeks: {
                sun: '日',
                mon: '一',
                tue: '二',
                wed: '三',
                thu: '四',
                fri: '五',
                sat: '六'
            },
            months: {
                m1: '1月',
                m2: '2月',
                m3: '3月',
                m4: '4月',
                m5: '5月',
                m6: '6月',
                m7: '7月',
                m8: '8月',
                m9: '9月',
                m10: '10月',
                m11: '11月',
                m12: '12月'
            }
        },
        drawer: {
            okText: '確定',
            cancelText: '取消'
        },
        modal: {
            okText: '確定',
            cancelText: '取消'
        },
        page: {
            total: '共',
            item: '條',
            goto: '跳至',
            page: '頁'
        },
        popover: {
            okText: '確定',
            cancelText: '取消'
        },
        table: {
            emptyData: '暫無數據',
            all: '全部',
            reset: '重置',
            filter: '篩選'
        },
        tree: {
            emptyData: '暫無數據'
        },
        image: {
            errorText: '加載失敗'
        },
        cascader: {
            loading: '加載中',
            emptyData: '暫無數據',
            placeholder: '請選擇'
        }
    }
};

setLang(lang);

export default lang;
