document.querySelectorAll('.blog-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const fullArticle = this.parentNode.nextElementSibling;
        fullArticle.style.display = fullArticle.style.display === 'none' ? 'block' : 'none';
    });
});
window.addEventListener('DOMContentLoaded', function() {
    var iframe = document.querySelector('iframe');
    iframe.onload = function() {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    };
});
