import {isDate, formatDate, parseDate} from '../libs/date';

const basic = {
    sex: {
        1: '男',
        2: '女'
    }
};

const filters = [
    { // date格式化
        name: 'formatDate',
        call (val, format = 'yyyy-MM-dd HH:mm:ss') {
            if (isNaN(val)) {
                return '-';
            }
            let date = Number(val);
            return isDate(date) ? formatDate(date, format) : parseDate(date, format);
        }
    }
];

for (let key in basic) {
    filters.push({
        name: key,
        call (val) {
            return basic[key][val] || val;
        }
    });
}

export default filters;
