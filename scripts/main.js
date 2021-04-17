'use strict'

const monthNames = {
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

const dayNames = {
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

const monthDays = {
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

const specialDays = {
    'Polskie': {
        1: 'Równonoc wiosenna',
        2: 'Przesilenie letnie',
        3: 'Noc Tajemnicy',
        4: 'Równonoc jesienna',
        5: 'Przesilenie zimowe',
        6: 'Noc Wiedźm'
    },
    'Niemieckie': {
        1: 'Mitterfruhl',
        2: 'Sonnstill',
        3: 'Geheimnistag',
        4: 'Mittherbst',
        5: 'Monstille',
        6: 'Hexenstag'
    }
}


/**
 * Data JSON structure
[{
    'year': y,
    'data': [
        {
        'month': m,
        'data': [{
            'day': d,
            'data': ''
        },
        {
        'month': m,
        'data': ''
        }]
    }]
}]
*/
let data = []


/** 
 * Retrieves data from variable for a specific day
 * @param {String} year - current year
 * @param {String} month - German (Reikspiel) name of month; can also be a name of a special holiday
 * @param {String} day - number of selected day; if null, it means that that day is a special holiday
 * @return {String} retrieved data from variable
 */
function getData(year, month, day) {
    let isYearSet = false
    let isMonthSet = false
    let isDaySet = false
    let yindex = -1
    let mindex = -1
    let dindex = -1

    for (let i = 0; i < data.length; i++) {
        if (data[i].year === year) {
            isYearSet = true
            yindex = i
            break
        }
    }
    
    if (!isYearSet) return ''

    for (let i = 0; i < data[yindex].data.length; i++) {
        if (data[yindex].data[i].month === month) {
            isMonthSet = true
            mindex = i
            break
        }
    }
    
    if (!isMonthSet) return ''

    if (day !== null) {
        for (let i = 0; i < data[yindex].data[mindex].data.length; i++) {
            if (data[yindex].data[mindex].data[i].day === day) {
                isDaySet = true
                dindex = i
                break
            }
        }

        if (!isDaySet) return ''
    }

    return (isDaySet) ?
        (data[yindex].data[mindex].data[dindex].data) :
        (data[yindex].data[mindex].data)
}


/** 
 * Saves data from day editor to variable
 * @param {String} year - current year
 * @param {String} month - German (Reikspiel) name of month; can also be a name of a special holiday
 * @param {String} day - number of selected day; if null, it means that that day is a special holiday
 */
function saveData(year, month, day) {
    const text = document.getElementsByTagName('textarea')[0].value
    let isYearSet = false
    let isMonthSet = false
    let isDaySet = false
    let yindex = -1
    let mindex = -1
    let dindex = -1

    for (let i = 0; i < data.length; i++) {
        if (data[i].year === year) {
            isYearSet = true
            yindex = i
            break
        }
    }
    
    if (!isYearSet) {
        data.push({ 'year': year, 'data': [] })
        yindex = data.length - 1
        isYearSet = true
    }

    for (let i = 0; i < data[yindex].data.length; i++) {
        if (data[yindex].data[i].month === month) {
            isMonthSet = true
            mindex = i
            break
        }
    }
    
    if (!isMonthSet) {
        if (day === null) data[yindex].data.push({ 'month': month, data: '' })
        else data[yindex].data.push({ 'month': month, 'data': [] })
        mindex = data[yindex].data.length - 1
        isMonthSet = true
    }

    if (day !== null) {
        for (let i = 0; i < data[yindex].data[mindex].data.length; i++) {
            if (data[yindex].data[mindex].data[i].day === day) {
                isDaySet = true
                dindex = i
                break
            }
        }

        if (!isDaySet) {
            data[yindex].data[mindex].data.push({ 'day': day, data: '' })
            dindex = data[yindex].data[mindex].data.length - 1
            isDaySet = true
        }
    }

    if (isDaySet) {
        data[yindex].data[mindex].data[dindex].data = text
    } else {
        data[yindex].data[mindex].data = text
    }
}


/** 
 * Renders editor for specific day
 */
function renderEditor(el) {
    let month = el.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerText
    const title = document.getElementById('day')
    const obj = specialDays['Niemieckie']

    document.getElementById('editor').style.display = ''
    month = month.substr(month.indexOf(' '))

    title.innerText = el.innerText + (isNaN(parseInt(el.innerText)) ? 
        (' - ' + specialDays['Polskie'][Object.keys(obj).find(key => obj[key] === el.innerText)]) : 
        ('. ' + month))


    const lang = document.getElementById('lang').innerText
    const year = document.getElementById('year').value
    
    month = null
    let day = document.getElementById('day').innerText
    day = day.substring(0, day.indexOf('.'))
    
    if (!isNaN(parseInt(day))) {
        month = document.getElementById('day').innerText
        month = month.substr(month.indexOf(' ') + 1)
    
        const obj = monthNames[lang]
        month = monthNames['Niemieckie'][
            Object.keys(obj).find(key => obj[key] === month)
        ]
    } else {
        month = document.getElementById('day').innerText
        month = month.substring(0, month.indexOf(' '))
    
        day = null
    }

    document.getElementsByTagName('textarea')[0].value = getData(year, month, day)
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
            days[k].className = ''
            days[k].onmouseover = undefined
            days[k].onmouseout = undefined
            days[k].onclick = undefined
        }
        
        for (let d = offset; d < monthDays[m] + offset; d++) {
            day++
            if (day === 34) {
                specialDay++
                days[d].innerText = specialDays['Niemieckie'][specialDay]

                days[d].onmouseover = function(e) {
                    let value = this.innerText
                    let obj = specialDays['Niemieckie']
                    let dialog = document.createElement('div')
                    let plName = specialDays['Polskie'][Object.keys(obj).find(key => obj[key] === value)]

                    dialog.id = 'plName'
                    dialog.innerText = plName
                    document.body.prepend(dialog)
                    dialog.style.top = e.clientY - e.offsetY - (1.5 * dialog.clientHeight) + 'px'
                    dialog.style.left = e.clientX - e.offsetX - (dialog.clientWidth / 4) + 'px'
                }

                days[d].onmouseout = () => {
                    document.getElementById('plName').remove()
                }
            } else {
                days[d].innerText = day
            }

            days[d].className = 'days'

            days[d].onclick = function() {
                renderEditor(this)
            }
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


document.getElementById('save').onclick = function() {
    const lang = document.getElementById('lang').innerText
    const year = document.getElementById('year').value

    let month = null
    let day = document.getElementById('day').innerText
    day = day.substring(0, day.indexOf('.'))

    if (!isNaN(parseInt(day))) {
        month = document.getElementById('day').innerText
        month = month.substr(month.indexOf(' ') + 1)

        const obj = monthNames[lang]
        month = monthNames['Niemieckie'][
            Object.keys(obj).find(key => obj[key] === month)
        ]
    } else {
        month = document.getElementById('day').innerText
        month = month.substring(0, month.indexOf(' '))

        day = null
    }

    saveData(year, month, day)

    console.log(JSON.stringify(data))

    document.getElementById('editor').style.display = 'none'
}


document.getElementById('close').onclick = () => {
    document.getElementById('editor').style.display = 'none'
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
        month = document.createElement('table')
        month.className = 'month'
        thead = document.createElement('thead')
        tbody = document.createElement('tbody')

        name = '<tr><th colspan="8">' + m + '. '
        name += '<span class="monthName">'
        name += monthNames[lang][m]
        name += '</span></th></tr>'

        thead.innerHTML = name

        for (let r = 0; r < 6; r++) {
            tr = document.createElement('tr')

            for (let c = 1; c <= 8; c++) {
                td = document.createElement('td')

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
