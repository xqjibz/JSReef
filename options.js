var opt = require('optimist')
    .usage('Usage: $0')
    .options('m', {
        "alias": 'mongo',
        "default": 'localhost',
        "describe": 'Set mongo database host'
    })
    .options('h', {
    "alias": 'help',
    "describe": 'Show this help'
    })

    ,   argv = opt.argv


if (argv.help) {
    opt.showHelp()
    process.exit(0)
}

module.exports = argv
