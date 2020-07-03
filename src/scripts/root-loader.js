// Listen to and handle the "appready" event, which will be emitted by the application
document.addEventListener('appready', () => {
    var pageLoader = document.querySelector('.page-loader');
    pageLoader.classList.add('loaded');

    setTimeout(() => {
        pageLoader.remove();
    }, 500);
});
