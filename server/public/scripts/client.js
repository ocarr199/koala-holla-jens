console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $("#addButton").on("click", function () {
    console.log("in addButton on click");
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: "testName",
      age: "testName",
      gender: "testName",
      readyForTransfer: "testName",
      notes: "testName",
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
} // end getKoalas

function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  // ajax call to server to post koalas
}




















// on click, generate id and call updateKoalaTransfer
function putUpdateKoalaTranser(){
  let id = $(this).data('id')
  updateKoalaTranser(id)
}

function updateKoalaTransfer( koalaId ){
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaId}`
  }).then( (response) => {
    console.log('Koala transfer update:', response);
    getKoalas();
}).catch(err =>{
    console.log('transfer was not updated');
    alert('there was an error with updating')
})
}