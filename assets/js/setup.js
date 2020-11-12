let concentrateElm = document.querySelector('#concentrate')
let shortElm = document.querySelector('#short')
let longElm = document.querySelector('#long')
let stepElm = document.querySelector('#step')

function getValue(elem) {
    let value = elem.value
 
    if (/^\d+$/.test(value) === false || value == 0) {
        value =1         
    }

    elem.value = value

    return parseInt(value)
}

function save(concentrate, short, long, step) {
    localStorage.setItem('setup', JSON.stringify({
        concentrate,
        short,
        long,
        step
    }))
    document.querySelector('.alert').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none'
        window.location = 'index.html'
    }, 1500);
}

document.querySelector('#save').addEventListener('click', (e) => {
    let concentrate = getValue(concentrateElm)
    let short = getValue(shortElm)
    let long = getValue(longElm)
    let step = getValue(stepElm)
    save(concentrate, short, long, step)
})

document.querySelector('#default').addEventListener('click', (e) => {
    concentrateElm.value = 25
    shortElm.value = 5
    long.value = 30
    step.value = 4
    save(25, 5, 30, 4)
})


let setting = localStorage.getItem('setup')
if (setting === null) {
    setting = {
        concentrate: 25,
        short: 5,
        long: 30,
        step: 4
    }
} else {
    setting = JSON.parse(setting)
}

concentrateElm.value = setting.concentrate
shortElm.value = setting.short
longElm.value = setting.long
stepElm.value = setting.step

let modal = null

const openModal = (e) => {
    const target = document.querySelector('#modalSetup')
    target.style.display = null
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-stop-propagation').addEventListener('click', stopPropagation)
}

const stopPropagation = (e) => {
    e.stopPropagation()
} 

const closeModal = (e) => {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-stop-propagation').removeEventListener('click', stopPropagation)

    modal = null
}

document.querySelector('#setup').addEventListener('click', openModal)

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e)
    }
})