const url =
    'https://script.google.com/macros/s/AKfycbwknELcF4sr20LFxGT1FRnpWHY9oy0b3OxzmiMzaebWMInLGspok-pQCXU66-lLWm-M_Q/exec'
const btn = document.querySelector('.btn')
const output = document.querySelector('.output')
btn.textContent = 'Start Game'
btn.onclick = startGame
const game = {
    data: {},
    que: 0,
    score: 0,
    ans: [],
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
    if (el.correct == el.selOpt) {
        game.score++
        const main = maker('div', output, 'main', 'Correct answer')
        el.style.color = 'white'
        el.style.backgroundColor = 'green'
    } else {
        const main = maker(
            'div',
            output,
            'main',
            `Wrong answer was ${el.correct}`
        )
        el.style.color = 'white'
        el.style.backgroundColor = 'red'
    }
    const btn1 = maker('button', output, 'btn1', 'Next Question')
    game.que++
    const total = game.data.length - game.que
    console.log(`remaining ${total}`)
    if (total == 0) {
        btn.textContent = 'Game over See Score'
        btn1.onclick = endGame
    } else {
        btn1.onclick = loadQuestion
    }
    console.log(el.correct, el.selOpt)
}

function endGame() {
    // output.textContent = JSON.stringify(game)
    output.innerHTML = ''
    game.ans.forEach((ele, ind) => {
        let html = `Q:${game.data[ind].question} C:${game.data[ind].answer} R:${ele}`
        const div = maker('div', output, 'main', html)
        const bg = game.data[ind].answer == ele ? 'green' : 'red'
        div.style.color = bg
    })
    const htmlScore = `Your final score: ${game.score} correct out of ${game.data.length} questions`
    const div = maker('div', output, 'main', htmlScore)
    div.style.fontSize = '1.5em'
    const userIn = maker('div', output, 'main', '')
    const myInput1 = document.createElement('input')
    myInput1.setAttribute('type', 'text')
    const label1 = document.createTextNode('Name:')
    userIn.append(label1)
    myInput1.value = 'Yavorskyi Oleksandr'
    userIn.append(myInput1)
    const btnSend = maker('button', userIn, 'btn1', 'Send score')
    btnSend.onclick = () => {
        sendData(myInput1.value, userIn)
    }
    console.log(game)
}

function sendData(valName, ele) {
    const formData = new FormData()
    formData.append('name', valName)
    formData.append('score', game.score)
    formData.append('total', game.data.length)
    fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then((rep) => rep.json())
        .then((data) => {
            console.log(data)
            ele.innerHTML = `Score Submited, Thank You`
        })
}

function maker(t, parent, c) {
    const el = document.createElement(t)
    el.classList.add(c)
    return parent.appendChild(el)
}
