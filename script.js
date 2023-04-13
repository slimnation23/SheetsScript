const url =
    'https://script.google.com/macros/s/AKfycbz4fPJWrqsjHIrv27y14Bgs4HG16LM1FUzqAY3ItwGQrohq5i7_jJqEpyt6UBNUcen40w/exec'

const btn = document.querySelector('.btn')
const output = document.querySelector('.output')
btn.textContent = 'Get Sheet data'
btn.onclick = (e) => {
    fetch(url)
        .then(rep => rep.json())
        .then(data => {
            console.log(data)
            const headings = data[0]
            const rows = data.slice(1)
            outputData(headings, rows)
        })
}

function outputData(headings, rows) {
    const tabl = maker('table', output, 'table')
    const heading = maker('tr', tabl, 'row')
    headings.forEach(ele => {
        const el = maker('th', heading, 'th')
        el.textContent = ele
    })
    rows.forEach(row => {
        const r = maker('tr', tabl, 'row')
        row.forEach(col => {
            const el = maker('td', r, 'td')
            el.textContent = col
        })
    })
}

function maker(t, parent, c) {
    const el = document.createElement(t)
    el.classList.add(c)
    return parent.appendChild(el)
}
