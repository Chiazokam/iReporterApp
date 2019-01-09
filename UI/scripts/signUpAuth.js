
document.getElementById('signup-form').addEventListener('submit', signUp);


function signUp(e) {
    e.preventDefault();
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const othername = document.getElementById('othername').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    if(!fname || !lname || !othername || !username || !email || !phone || !password) {
        window.location = './signup.html';
        console.log('missing value');
    }

    fetch('https://ireporter-heroku.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { firstname: fname, 
              lastname: lname, 
              othername, 
              username,
              email, 
              phone, 
              password })
    } )
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if (error) {
            console.log(error);   
        }
        //const { token } = data[0];
       // localStorage.setItem("token", token);
        window.location = './signin.html';
    })
    .catch((error) => console.log(error))
}
