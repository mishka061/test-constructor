document.addEventListener('DOMContentLoaded', function () {
    let currentPage = window.location.pathname;
    let headerBtnCreate = document.querySelector('.headerBtnCreate');
    let headerBtnProfile = document.querySelector('.headerBtnProfile');

    if (currentPage === '/test') {
        headerBtnProfile.classList.remove('active');
        headerBtnCreate.classList.add('active');
       
    }
    if (currentPage.indexOf('/profile') !== -1) {
        headerBtnCreate.classList.remove('active');
        headerBtnProfile.classList.add('active');
    }
});














