// const url =
//     'https://script.google.com/macros/s/AKfycbz4fPJWrqsjHIrv27y14Bgs4HG16LM1FUzqAY3ItwGQrohq5i7_jJqEpyt6UBNUcen40w/exec'

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
    output.innerHTML = ''
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



const url = 'https://script.google.com/macros/s/AKfycbzG9TqrOgyIRdqC0SgsJqZaHPKlgCf78XUWP87TQxOwTepB1ZY92km_EAfr6rn3zX2v8Q/exec'

const myInput1 = document.createElement('input')
const myInput2 = document.createElement('input')
const label1 = document.createTextNode('Name:')
const label2 = document.createTextNode('Score:')
myInput1.setAttribute('type', 'text')
myInput2.setAttribute('type', 'number')
myInput1.value = 'Yavorskyi Oleksandr'
myInput2.value = 1000
output.append(label1)
output.append(myInput1)
output.append(label2)
output.append(myInput2)
btn.onclick = sendData

function sendData() {
    const formData = new FormData()
    formData.append('name', myInput1.value)
    formData.append('score', myInput2.value)
    fetch(url, {
        method : 'POST',
        body : formData
    }).then(rep => rep.json()).then(data => {
        console.log(data);
    })
}


