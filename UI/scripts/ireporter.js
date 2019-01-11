
let modalButton = document.querySelector(".btn-record-list");
let modalDisplay = document.querySelector(".modal-list-record");
let modalClose = document.querySelector(".modal-close");

modalButton.addEventListener('click', function(){
  modalDisplay.style.display = "block";
});

modalClose.addEventListener('click', function(){
  modalDisplay.style.display = "none";
})

