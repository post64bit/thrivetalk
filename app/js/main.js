window.onload = function () {
    document.getElementById("background-block").style.height = getComputedStyle(document.getElementById("header-elements")).height
} 
function makeBlocksColorful() {
    const blocks = document.getElementsByClassName('block')
    const myColors = ['FFE2DE', 'C4E769', '62D0DF', '0052C1']
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = '#' + myColors[i]
    }
}


function adjustHeaderWidth() {
    let theWidthNeeded = (Number(getComputedStyle(document.getElementById("container")).width.slice(0, -2)) - 40).toString() + 'px'
    document.getElementById('header__top').style.width = theWidthNeeded
}

window.addEventListener('resize', adjustHeaderWidth)

adjustHeaderWidth()

makeBlocksColorful()

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        document.querySelector('.header__top').classList.add('header__top-background')
    } else {
        document.querySelector('.header__top').classList.remove('header__top-background')
    }
});

const headerHam = document.getElementById('header__ham')
const offScreenMenu = document.getElementById('off-screen-menu')
const headerButton = document.getElementById('header__button')


headerHam.addEventListener('click', () => {
    headerHam.classList.toggle('active')
    offScreenMenu.classList.toggle('active')
    headerHam.classList.contains('active') ? headerButton.style.display = 'none' : headerButton.style.display = 'block'
    document.documentElement.classList.toggle('scroll-disable')
})

const hiddenElements = document.querySelectorAll('.hidden')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

hiddenElements.forEach((el) => observer.observe(el))

console.log('hello')


