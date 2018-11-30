
let modalButton = document.querySelector(".btn-record-list");
let modalDisplay = document.querySelector(".modal-list-record");
let modalClose = document.querySelector(".modal-close");

modalButton.addEventListener('click', function(){
  modalDisplay.style.display = "block";
});

modalClose.addEventListener('click', function(){
  modalDisplay.style.display = "none";
})

function initMap(){
  let myLatLng = {lat: 6.500000, lng: 3.350000};
  let map = new google.maps.Map(document.querySelector('.map'), {
          center: myLatLng,
          zoom: 4
        });
  let marker = new google.maps.Marker({
          map: map,
          position: myLatLng
        });
}
