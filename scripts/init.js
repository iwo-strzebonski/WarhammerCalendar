'use strict'

document.getElementById('prevYear').onclick = () => {
    let currYear = parseInt(document.getElementById('year').value) - 1
    let len = currYear.toString().length
    document.getElementById('year').value = currYear
    document.getElementById('year').size = len > 0 ? len : 1
}

document.getElementById('nextYear').onclick = () => {
    let currYear = parseInt(document.getElementById('year').value) + 1
    let len = currYear.toString().length
    document.getElementById('year').value = currYear
    document.getElementById('year').size = len > 0 ? len : 1
}

document.getElementById('lang').onclick = function() {
    let lang = document.getElementById('lang').innerText === 'Polskie' ? 'Niemieckie' : 'Polskie'
    document.getElementById('lang').innerText = lang
}

switch (document.getElementById('ed').innerText) {
case 'II':
    document.getElementById('year').value = '2522'
    document.getElementById('year').size = 3
    break
    
default:
    document.getElementById('year').value = '0'
    document.getElementById('year').size = 1
    break
}

document.getElementById('year').oninput = function() {
    let currYear = parseInt(document.getElementById('year').value)
    let len = currYear.toString().length
    this.size = len > 0 ? len : 1
}
