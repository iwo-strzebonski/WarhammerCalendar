'use strict'

let monthNames = {
    'Polskie': {
        1: 'Powiedźmie',
        2: 'Zmiana Roku',
        3: 'Czas Orki',
        4: 'Czas Sigmara',
        5: 'Czas Lata',
        6: 'Przed Tajemnicą',
        7: 'Po Tajemnicy',
        8: 'Czas Zbiorów',
        9: 'Czas Warzenia',
        10: 'Czas Mrozów',
        11: 'Czas Ulryka',
        12: 'Przedwiedźmie',
    },
    'Niemieckie': {
        1: 'Nachexen',
        2: 'Jahrdrung',
        3: 'Pflugzeit',
        4: 'Sigmarzeit',
        5: 'Sommerzeit',
        6: 'Vorgeheim',
        7: 'Nachgeheim',
        8: 'Erntezeit',
        9: 'Brauzeit',
        10: 'Kaldezeit',
        11: 'Ulriczeit',
        12: 'Vorhexen',
    }
}

let dayNames = {
    'Polskie': {
        1: 'Dzień Pracy',
        2: 'Dzień Poboru',
        3: 'Dzień Targowy',
        4: 'Dzień Wypieków',
        5: 'Dzień Podatków',
        6: 'Dzień Królewski',
        7: 'Początek Tygodnia',
        8: 'Dzień Świąteczny'
    },
    'Niemieckie': {
        1: 'Wallentag',
        2: 'Aubentag',
        3: 'Marktag',
        4: 'Backertag',
        5: 'Bezahltag',
        6: 'Konistag',
        7: 'Angestag',
        8: 'Festag'
    }
}

let monthDays = {
    1: 32,
    2: 34,
    3: 33,
    4: 33,
    5: 34,
    6: 34,
    7: 32,
    8: 34,
    9: 33,
    10: 33,
    11: 34,
    12: 34
}

let specialDays = {
    1: 'Mitterfruhl',
    2: 'Sonnstill',
    3: 'Geheimnistag',
    4: 'Mitterbst',
    5: 'Monstille',
    6: 'Hexenstag'
}

/** 
* Add day numbers to calendar.
* @param {Number} year - current year
*/
function setDays(year) {
    let months = document.getElementsByClassName('month')
    let month
    let days, day
    let specialDay = 0

    let offset

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        offset = 0
    } else {
        offset = (year % 4) * 2
    }

    for (let m = 1; m <= 12; m++) {
        days = []
        day = 0

        month = months[m - 1].children[1].children

        for (let r = 1; r < 6; r++) {
            for (let i = 0; i < month[r].children.length; i++) {
                days.push(month[r].children[i])
            }
        }

        for (let k = 0; k < days.length; k++) {
            days[k].innerText = ''
        }
        
        for (let d = offset; d < monthDays[m] + offset; d++) {
            day++
            if (day === 34) {
                specialDay++
                days[d].innerText = specialDays[specialDay]
            } else days[d].innerText = day
        }

        offset += monthDays[m] - 32
        if (offset >= 8) offset = 0
    }
}

document.getElementById('prevYear').onclick = () => {
    let year = parseInt(document.getElementById('year').value) - 1
    let len = year.toString().length
    document.getElementById('year').value = year
    document.getElementById('year').size = len - 1 > 0 ? len -1 : 1
    setDays(year)
}

document.getElementById('nextYear').onclick = () => {
    let year = parseInt(document.getElementById('year').value) + 1
    let len = year.toString().length
    document.getElementById('year').value = year
    document.getElementById('year').size = len - 1 > 0 ? len - 1 : 1
    setDays(year)
}

document.getElementById('lang').onclick = function() {
    let lang = document.getElementById('lang').innerText === 'Polskie' ? 'Niemieckie' : 'Polskie'
    let months = document.getElementsByClassName('monthName')
    let days = document.getElementsByClassName('dayName')

    for (let m = 1; m <= 12; m++) {
        months[m - 1].innerText = monthNames[lang][m]
    }

    for (let d = 0; d < days.length; d++) {
        days[d].innerText = dayNames[lang][d % 8 + 1]
    }

    document.getElementById('lang').innerText = lang
}

document.getElementById('year').oninput = function() {
    let year = parseInt(this.value)
    let len = year.toString().length
    this.size = len - 1 > 0 ? len - 1 : 1
    setDays(year)
}

window.onload = () => {
    switch (document.getElementById('ed').innerText) {
    case 'II':
        document.getElementById('year').value = 2522
        document.getElementById('year').size = 3
        break
        
    default:
        document.getElementById('year').value = 1
        document.getElementById('year').size = 1
        break
    }

    let main = document.getElementsByTagName('main')[0]
    let lang = document.getElementById('lang').innerText
    let month, thead, tbody, tr, td, name
    
    for (let m = 1; m <= 12; m++) {
        month = document.createElement('TABLE')
        month.className = 'month'
        thead = document.createElement('THEAD')
        tbody = document.createElement('TBODY')

        name = '<tr><th colspan="8">' + m + '. '
        name += '<span class="monthName">'
        name += monthNames[lang][m]
        name += '</span></th></tr>'

        thead.innerHTML = name

        for (let r = 0; r < 6; r++) {
            tr = document.createElement('TR')

            for (let c = 1; c <= 8; c++) {
                td = document.createElement('TD')

                if (r === 0) {
                    td.className = 'dayName'
                    td.innerText = dayNames[lang][c]
                }

                tr.append(td)
            }

            tbody.append(tr)
        }

        month.append(thead)
        month.append(tbody)
        main.append(month)
    }

    setDays(document.getElementById('year').value)
}
