// const url =
//     'https://script.google.com/macros/s/AKfycbz4fPJWrqsjHIrv27y14Bgs4HG16LM1FUzqAY3ItwGQrohq5i7_jJqEpyt6UBNUcen40w/exec'

// const btn = document.querySelector('.btn')
// const output = document.querySelector('.output')
// btn.textContent = 'Get Sheet data'
// btn.onclick = (e) => {
//     fetch(url)
//         .then(rep => rep.json())
//         .then(data => {
//             console.log(data)
//             const headings = data[0]
//             const rows = data.slice(1)
//             outputData(headings, rows)
//         })
// }

// function outputData(headings, rows) {
//     output.innerHTML = ''
//     const tabl = maker('table', output, 'table')
//     const heading = maker('tr', tabl, 'row')
//     headings.forEach(ele => {
//         const el = maker('th', heading, 'th')
//         el.textContent = ele
//     })
//     rows.forEach(row => {
//         const r = maker('tr', tabl, 'row')
//         row.forEach(col => {
//             const el = maker('td', r, 'td')
//             el.textContent = col
//         })
//     })
// }

// function maker(t, parent, c) {
//     const el = document.createElement(t)
//     el.classList.add(c)
//     return parent.appendChild(el)
// }

const url = 'https://script.google.com/macros/s/AKfycbyKpAVfTF0e_E9KhrKhCWNdGOCOcgJjgm0aVDK9Seoim96cmldc7-tRT6Vkx2JMObFclA/exec'

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
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            game.data = data
            buildGame()
        })
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
    q.opts.forEach((el) => {
        const span = maker('span', main, 'box', el)
        span.correct = q.answer
        span.selOpt = el
        span.classList.add('box1')
        span.addEventListener('click', checker)
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

function endGame() {
    // output.textContent = JSON.stringify(game)
    output.innerHTML = ''
    game.ans.forEach((ele, ind) => {
        let html = `Q:${game.data[ind].question} C:${game.data[ind].answer} R:${ele}`
        const div = maker('div', output, 'main', html)
        const bg = (game.data[ind].answer == ele) ? 'green' : 'red'
        div.style.color = bg
    })
    const htmlScore = `${game.score} out of ${game.data.length}`
    const div = maker('div', output, 'main', htmlScore)
    console.log(game);
}

function maker(t, p, c, h) {
    const el = document.createElement(t)
    el.classList.add(c)
    el.innerHTML = h
    return p.appendChild(el)
}
