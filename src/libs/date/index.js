import dateUtil from './util';

const toDate = function (date) {
    return isDate(date) ? new Date(date) : null;
};

const isDate = function (date) {
    if (date === null || date === undefined) return false;
    if (isNaN(new Date(date).getTime())) return false;
    return true;
};

const formatDate = function (date, format = 'yyyy-MM-dd') {
    date = toDate(date);
    if (!date) return '';
    return dateUtil.format(date, format);
};

const parseDate = function (string, format = 'yyyy-MM-dd') {
    return dateUtil.parse(string, format);
};

export {
    toDate,
    isDate,
    formatDate,
    parseDate
};
