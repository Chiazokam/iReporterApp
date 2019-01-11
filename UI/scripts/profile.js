document.getElementById('logout').addEventListener('click', logOut);

function logOut() {
    localStorage.removeItem('token');
    window.location = './index.html';
}