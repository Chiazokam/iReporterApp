function initMap(latitude, longitude){
        let myLatLng = {lat: latitude, lng: longitude};
        let map = new google.maps.Map(document.querySelector('.map'), {
                center: myLatLng, 
                zoom: 4
              });
        let marker = new google.maps.Marker({
                map: map,
                position: myLatLng
              });
      }

function loadMap() {
        fetch('https://ireporter-heroku.herokuapp.com/api/v1/redflags', {
        headers: {
                'token': token,
        }
        })
        .then((res) => res.json())
        .then((response) => {
        const { data } = response;
        data.forEach((record) => {
                let newLocation = record.location.split(',');
                let lat = Number(newLocation[0]);
                let long = Number(newLocation[1]);

                initMap(lat, long);
                })
        })
}

window.onload = loadMap;