
let token = localStorage.getItem('token');

fetch('https://ireporter-heroku.herokuapp.com/api/v1/redflags', {
    headers: {
        'token': token,
    }
})
.then((res) => res.json())
.then((response) => {
    const { data } = response;

    if (data === undefined) {
      let output = '<h2>- <span class="span-bold-letter">N</span>o Redflags Recorded -</h2>';
      document.getElementById('output').innerHTML = output;
    } else {
      let output = '<h2>- <span class="span-bold-letter">V</span>iew Red-Flags -</h2>';
      data.forEach((record) => {
        let newLocation = record.location.split(',');
        let lat = Number(newLocation[0]);
        let long = Number(newLocation[1]);
        output +=  `
        <div class="view-record-box">
        <table>
          <tbody>
            <tr>
              <td class="table-icon"></td>
              <td class="table-icon"><i class="far fa-edit"></i><i class="fas fa-trash-alt"></i></td>
            </tr>
            <tr>
              <td class="head-table">Title</td>
              <td class="body-table">${record.title}</td>
            </tr>
            <tr>
              <td class="head-table">Date</td>
              <td class="body-table">${record.createdon}</td>
            </tr>
            <tr>
              <td class="head-table">Description</td>
              <td class="body-table">${record.comment}</td>
            </tr>
            <tr>
              <td class="head-table">Status</td>
              <td class="body-table">${record.status}</td>
            </tr>
            <tr>
              <td class="head-table">Location</td>
              <td>
                <div class="map">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`
    })
    document.getElementById('output').innerHTML = output;
    }
});



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
  