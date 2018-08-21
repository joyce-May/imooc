var moment = require('moment')

module.exports = {
    getFormatDate: function (date, type) {
        if (type === 1) {
            return moment(date).format('YYYY-MM-DD')
        }
        if (type === 2) {
            return moment(date).format('YYYY年M月D日')
        }
    }
}