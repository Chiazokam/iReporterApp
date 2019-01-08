document.getElementById('signin-form').addEventListener('submit', signIn);


function signIn(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://ireporter-heroku.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { email, 
              password })
    } )
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if (error) {
            window.location = './signin.html';
            console.log(error);   
        }
        const { token, user } = data[0];
        localStorage.setItem("token", token);
        if (user.isAdmin === true) {
            window.location = './admin.html';
        }
        else if (user.isAdmin === false ){
            window.location = './profile.html';
        }
        
    })
    .catch((error) => console.log(error))
}
