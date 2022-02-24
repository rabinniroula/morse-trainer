let pretime
let endtime
var fired = false
var ended = false
var disp = document.getElementById('cw-display')
var textarea = document.getElementById('decodedtext')
var clearbtn = document.getElementById('clear')
var dotdasharray = []

var beep = new p5.Oscillator('sine');
beep.freq = 440
beep.amp = 1

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('man').style.display = "none"
}

setInterval(() => {
    if ((Date.now() - endtime) > 700) {
        dotdash = dotdasharray.join('')
        disp.innerHTML = dotdash
        if (cwTable.indexOf(dotdash) != -1) textarea.value += String.fromCharCode(cwTable.indexOf(dotdash) + 65)
        dotdasharray = []
    }
}, 500)

clearbtn.onclick = () => { textarea.value = "" }

disp.onmousedown = () => st()
disp.onmouseup = () => en()

function st() {
    beep.start()
    fired = true
    pretime = Date.now()
}

function en() {
    beep.stop()
    fired = false
        // console.log(`You pressed the space button for ${Date.now() - pretime}`)
    checkdotdash(Date.now() - pretime)
    endtime = Date.now()
}

document.addEventListener("keydown", (e) => {
    if (e.key == ' ' && !fired) {
        st()
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key == ' ') {
        en()
    }
})

function checkdotdash(time) {
    if (time > 230) {
        dotdasharray.push('-')
    } else {
        dotdasharray.push('.')
    }
}