let pretime
let endtime
var fired = false
var ended = false
var disp = document.getElementById('cw-display')
var textarea = document.getElementById('decodedtext')
var dotdasharray = []

var beep = new p5.Oscillator('sine');
beep.freq = 440
beep.amp = 1

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('man').style.display = "none"
    document.getElementById('main').innerHTML = '<h1 style="color: red;">Sorry, you can\'t use this on your phone 🙏</h1>'
}

setInterval(() => {
    if ((Date.now() - endtime) > 700) {
        dotdash = dotdasharray.join('')
        disp.innerHTML = dotdash
        if (cwTable.indexOf(dotdash) != -1) textarea.value += String.fromCharCode(cwTable.indexOf(dotdash) + 65)
        dotdasharray = []
    }
}, 500)

document.addEventListener("keydown", (e) => {
    if (e.key == ' ' && !fired) {
        beep.start()
        fired = true
        pretime = Date.now()
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key == ' ') {
        beep.stop()
        fired = false
            // console.log(`You pressed the space button for ${Date.now() - pretime}`)
        checkdotdash(Date.now() - pretime)
    }
    endtime = Date.now()
})

function checkdotdash(time) {
    if (time > 230) {
        dotdasharray.push('-')
    } else {
        dotdasharray.push('.')
    }
}