const { get } = require("../../routes/koala.router");

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
  // create new koala object to post to server
  let newKoala ={
    name: $('#nameIn').val(),
    gender: $('#genderIn').val(),
    age: $('#ageIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  }
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
    }).then(function(response) {
      console.log('Response from server.', response);
      getKoalas();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add new koala');
    });
}
