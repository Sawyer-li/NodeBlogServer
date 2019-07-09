const log4js = require('log4js');
log4js.configure({
    appenders: {
        ruleConsole: {type: 'console'},
        ruleFile: {
            type: 'dateFile',
            // 这个目录是相对于根目录的，即与app.js 是同一级的
            filename: 'logs/server-',
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 3,
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {appenders: ['ruleConsole', 'ruleFile'], level: 'debug'}
    }
});
const logger = log4js.getLogger('normal');

exports.logger = logger;
exports.log4use = function (app) {
    app.use(log4js.connectLogger(logger, {level: 'info', format: ':method :url'}));
}
