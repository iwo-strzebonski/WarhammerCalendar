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

const specialDays = {
    'Polskie': {
        0: 'Noc Wiedźm',
        1: 'Równonoc wiosenna',
        2: 'Przesilenie letnie',
        3: 'Noc Tajemnicy',
        4: 'Równonoc jesienna',
        5: 'Przesilenie zimowe',
    },
    'Niemieckie': {
        0: 'Hexenstag',
        1: 'Mitterfruhl',
        2: 'Sonnstill',
        3: 'Geheimnistag',
        4: 'Mittherbst',
        5: 'Monstille',
    }
}

const starSign = {
    
}

/** Data JSON structure
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
 * @param {string} year - current year
 * @param {string} month - German (Reikspiel) name of month; can also be a name of a special holiday
 * @param {string} day - number of selected day; if null, it means that that day is a special holiday
 * @return {string} retrieved data from variable
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
 * @param {string} year - current year
 * @param {string} month - German (Reikspiel) name of month; can also be a name of a special holiday
 * @param {string} day - number of selected day; if null, it means that that day is a special holiday
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
        if (day === null) {
            data[yindex].data.push({ 'month': month, data: '' })
        }
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

    console.log(text)
    // console.log(JSON.stringify(data))
    console.log(month, day)

    if (isDaySet) {
        data[yindex].data[mindex].data[dindex].data = text

        const monthIndex = Object.keys(monthNames['Niemieckie'])
            .find(key => monthNames['Niemieckie'][key] === month)
            .toString() - 1

        const body = document.getElementsByClassName('monthName')[monthIndex]
            .parentElement
            .parentElement
            .parentElement
            .parentElement
            .children[1]

        let days = []

        for (const row of body.children) {
            days.push(
                Array.from(row.children)
                    .filter(el => el.classList.contains('days'))
            )
        }

        if (text) {
            days.flat()[parseInt(day) - 1].classList.add('day-data')
        } else {
            days.flat()[parseInt(day) - 1].classList.remove('day-data')
        }
    } else {
        data[yindex].data[mindex].data = text

        const specialIndex = Object.keys(specialDays['Niemieckie'])
            .find(key => specialDays['Niemieckie'][key] === month)
            .toString()

        const body = document.getElementsByClassName('specialDay')[specialIndex]
        console.log(specialIndex)

        if (text) {
            body.classList.add('special-data')
        } else {
            body.classList.remove('special-data')
        }
    }
}

/** 
 * Renders editor for specific day of month
 * @param {Object} - element targetted by onclick event
 */
function renderDayEditor(el) {
    const lang = document.getElementById('lang').innerText
    const year = document.getElementById('year').value
    const title = document.getElementById('day')
    
    let month = el.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerText

    document.getElementById('gray').style.display = ''
    month = month.substr(month.indexOf(' '))

    title.innerText = el.innerText + '. ' + month

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
 * Renders editor for specific special holiday
 * @param {Object} - element targetted by onclick event
 */
function renderSpecialEditor(el) {
    const lang = document.getElementById('lang').innerText
    const year = document.getElementById('year').value
    const title = document.getElementById('day')
    let month = el.innerText

    const obj = specialDays[lang]
    month = specialDays['Niemieckie'][
        Object.keys(obj).find(key => obj[key] === month)
    ]

    document.getElementById('gray').style.display = ''
    document.getElementsByTagName('textarea')[0].value = getData(year, month, null)
    title.innerText = el.innerText
}


/** 
 * Add day numbers to calendar.
 * @param {number} year - current year
 */
function setDays(year) {
    const months = document.getElementsByClassName('month')
    const specials = document.getElementsByClassName('specialDay')

    const yData = data.find(el => el.year === year.toString())?.data

    let mData
    let month
    let offset

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        offset = 0
    } else {
        offset = (year % 4) * 2
    }

    for (let m = 1; m <= 12; m++) {
        if (yData) {
            mData = yData.find(el => el.month === monthNames['Niemieckie'][m])?.data
        }

        let len = (m === 1 || m === 7) ? 32 : 33
        let days = []
        let day = 1

        month = months[m - 1].children[1].children

        for (let r = 1; r < 6; r++) {
            for (let i = 0; i < month[r].children.length; i++) {
                days.push(month[r].children[i])
            }
        }

        for (let k = 0; k < days.length; k++) {
            days[k].innerText = ''
            days[k].className = 'day-null'
            days[k].onmouseover = undefined
            days[k].onmouseout = undefined
            days[k].onclick = undefined
        }

        for (let d = offset; d < len + offset; d++, day++) {
            days[d].innerText = day
            days[d].className = 'days'

            if (mData) {
                if (mData.find(el => el.day === day.toString())?.data) {
                    days[d].classList.add('day-data')
                }
            }

            days[d].onclick = function() {
                renderDayEditor(this)
            }
        }

        offset += len - 32
        if (offset >= 8) offset = 0
    }

    for (const i in specialDays['Niemieckie']) {
        specials[i].classList.remove('special-data')

        if (yData) {
            mData = yData.find(el => el.month === specialDays['Niemieckie'][i])?.data
            if (mData) {
                specials[i].classList.add('special-data')
            }
        }
    }
}


/**
 * Changes current year on button press
 * @param {number} n 
 */
const changeYear = (n) => {
    let year = parseInt(document.getElementById('year').value) + n
    let len = year.toString().length
    document.getElementById('year').value = year
    document.getElementById('year').size = len - 1 > 0 ? len - 1 : 1
    setDays(year)
}


document.getElementById('prevYear').onclick = changeYear.bind(null, -1)


document.getElementById('nextYear').onclick = changeYear.bind(null, 1)


document.getElementById('lang').onclick = function() {
    let lang = document.getElementById('lang').innerText === 'Polskie' ? 'Niemieckie' : 'Polskie'
    let months = document.getElementsByClassName('monthName')
    let days = document.getElementsByClassName('dayName')
    let sdays = document.getElementsByClassName('specialDay')

    for (let m = 1; m <= 12; m++) {
        months[m - 1].innerText = monthNames[lang][m]
    }

    for (let d = 0; d < days.length; d++) {
        days[d].innerText = dayNames[lang][d % 8 + 1]
    }

    for (let s = 0; s < sdays.length; s++) {
        sdays[s].innerText = specialDays[lang][s]
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
        month = month.substring(month.indexOf(' ') + 1)

        const obj = monthNames[lang]
        month = monthNames['Niemieckie'][
            Object.keys(obj).find(key => obj[key] === month)
        ]
    } else {
        month = document.getElementById('day').innerText
        
        const obj = specialDays[lang]
        month = specialDays['Niemieckie'][
            Object.keys(obj).find(key => obj[key] === month)
        ]

        day = null
    }

    saveData(year, month, day)

    document.getElementById('gray').style.display = 'none'
}


document.getElementById('close').onclick = () => {
    document.getElementById('gray').style.display = 'none'
}


document.getElementById('saveFile').onclick = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], {
        type: 'text/plain'
    }))
    a.setAttribute('download', 'data.json')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    alert('Dane zostały wyeksportowane do pliku z powodzeniem!')
}


document.getElementsByTagName('form')[0].onchange = function(e) {
    const fileList = e.target.files

    const fr = new FileReader()
    fr.onload = () => {
        data = JSON.parse(fr.result)
        setDays(document.getElementById('year').value)
        alert('Dane zostały wczytane z pliku z powodzeniem!')
    }

    fr.readAsText(fileList[0])
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
    let container, month, thead, tbody, tr, td, name, sday

    for (let m = 1; m <= 12; m++) {
        container = document.createElement('div')

        sday = document.createElement('div')
        sday.className = 'specialDay'

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

        sday.onclick = function() {
            renderSpecialEditor(this)
        }

        switch (m) {
        case 1:
            sday.innerText = specialDays[lang][0]
            container.prepend(sday)
            break
        
        case 3:
            sday.innerText = specialDays[lang][1]
            container.append(sday)
            break
        
        case 6:
            sday.innerText = specialDays[lang][2]
            container.append(sday)
            break
        
        case 7:
            sday.innerText = specialDays[lang][3]
            container.append(sday)
            break
        
        case 8:
            sday.innerText = specialDays[lang][4]
            container.append(sday)
            break
        
        case 12:
            sday.innerText = specialDays[lang][5]
            container.append(sday)
            break
        
        default:
            break
        }

        month.append(thead)
        month.append(tbody)
        container.append(month)
        main.append(container)
    }

    setDays(document.getElementById('year').value)
}
