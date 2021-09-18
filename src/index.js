import './scss/main.scss'

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide')
    }, 2000);
})



document.getElementById('mobileNavigationButton').addEventListener('click', () => {
    document.getElementById('headerNavigation').classList.toggle('visible')
})