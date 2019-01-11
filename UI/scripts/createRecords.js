document.getElementById('create-redflag-form').addEventListener('submit', createRedflag);

const token = localStorage.getItem('token');

function createRedflag(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const longitude = document.getElementById('longitude').value;
    const latitude = document.getElementById('latitude').value;
    const comment = document.getElementById('comment').value;
    const images = document.getElementById('image').value;
    const videos = document.getElementById('video').value;
    const location = `${latitude}, ${longitude}`;
        
    
    if(!token) {
        //window.location = './create_redflag.html';
        console.log('Permission denied');
    } else {
        fetch('https://ireporter-heroku.herokuapp.com/api/v1/redflags', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify(
            { title, 
              location,
              comment,
              images,
              videos })
    })
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if(error) {
            console.log(error);
        } else {
            //window.location = './create_redflag.html';
            console.log(data[0].message); 
        }
    })
    .catch((error) => console.log(error))
    }
}