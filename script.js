const url = 'https://script.google.com/macros/s/AKfycbzG9TqrOgyIRdqC0SgsJqZaHPKlgCf78XUWP87TQxOwTepB1ZY92km_EAfr6rn3zX2v8Q/exec'
const btn = document.querySelector('.btn')
const output = document.querySelector('.output')
btn.textContent = 'Start Game'
btn.onclick = startGame
const game = {
    data: {},
    que: 0,
    score: 0,
    ans: []
}

function startGame() {
    btn.style.display = 'none'
    output.textContent = 'Starting game, loading data...'   
    btn.textContent = 'Get Sheet data'
    btn.onclick = (e) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                game.data = data
                buildGame()
            })
            .then(rep => rep.json())
            .then(data => {
                console.log(data)
                const headings = data[0]
                const rows = data.slice(1)
                outputData(headings, rows)
            })
    }
}
    

function buildGame() {
    console.log(game.data)
    loadQuestion()
}

function loadQuestion() {
    const q = game.data[game.que]
    output.innerHTML = ''
    const main = maker('div', output, 'main', '')
    const que = maker('div', main, 'question', `${q.question}?`)
    q.opts.sort(() => {
        return Math.random() - 0.5
    })
    const tabl = maker('table', output, 'table')
    const heading = maker('tr', tabl, 'row')
    headings.forEach(ele => {
        const el = maker('th', heading, 'th')
        el.textContent = ele
    })
    q.opts.forEach((el) => {
        const span = maker('span', main, 'box', el)
        span.correct = q.answer
        span.selOpt = el
        span.classList.add('box1')
        span.addEventListener('click', checker)
    })
    rows.forEach(row => {
        const r = maker('tr', tabl, 'row')
        row.forEach(col => {
            const el = maker('td', r, 'td')
            el.textContent = col
        })
    })
    console.log(q)
}

function checker(e) {
    const el = e.target
    game.ans.push(el.selOpt)
    const boxs = document.querySelectorAll('.box')
    boxs.forEach((ele) => {
        ele.removeEventListener('click', checker)
        ele.style.color = '#bbb'
        ele.classList.remove('box1')
        ele.disabled = true
    })
    if(el.correct == el.selOpt) {
        game.score++
        const main = maker('div', output, 'main', 'Correct answer')
        el.style.color = 'white'
        el.style.backgroundColor = 'green'
    } else {
        const main = maker('div', output, 'main', `Wrong answer was ${el.correct}`)
        el.style.color = 'white'
        el.style.backgroundColor = 'red'
    }
    const btn1 = maker('button', output, 'btn1', `Next Question`)
    game.que++
    const total = game.data.length-game.que
    console.log(`remaining ${total}`)
    if (total == 0) {
        btn.textContent = 'Game over See Score'
        btn1.onclick = endGame
    } else {
        btn1.onclick = loadQuestion
    }
    console.log(el.correct, el.selOpt);
}
    
function maker(t, parent, c) {
    const el = document.createElement(t)
    el.classList.add(c)
    return parent.appendChild(el)
}

function endGame() {
    // output.textContent = JSON.stringify(game)
    output.innerHTML = ''
    game.ans.forEach((ele, ind) => {
        let html = `Q:${game.data[ind].question} C:${game.data[ind].answer} R:${ele}`
        const div = maker('div', output, 'main', html)
        const bg = (game.data[ind].answer == ele) ? 'green' : 'red'
        div.style.color = bg
    })
}





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


