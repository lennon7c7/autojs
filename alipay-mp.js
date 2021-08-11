var clicks = require('./function/clicks.js')
var exists = require('./function/exists.js')
var others = require('./function/others.js')
var sleeps = require('./function/sleeps.js')
var swipes = require('./function/swipes.js')

var zhifubao = require('./module/zhifubao.js')

main()

function main() {
    others.fixDir()
    others.fixDir()

    log('---------- start ----------')

    while(true){
        zhifubao.taskMP()
    }

    log('---------- end ----------')
}
