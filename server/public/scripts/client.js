
console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // dynamic click listener for transfer update button
  $('#viewKoalas').on('click', '.transferBtn', putUpdateKoalaTranser)
  // load existing koalas on page load
  getKoalas();
  // renderKoalas()
}); // end doc ready

function setupClickListeners() {
  $("#addButton").on("click", handleAdd ) 

    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    
    // call saveKoala with the new obejct
    // saveKoala(newKoala);
}


function handleAdd() {
  console.log('clicked Submit button');
  
  let newKoala ={
    name: $('#nameIn').val(),
    gender: $('#genderIn').val(),
    age: $('#ageIn').val(),
    readyToTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  }

  saveKoala(newKoala)
}

function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then( response => {
    // console log the response
    console.log(response);
    // render the koalas
    renderKoalas(response);
  }).catch( err => {
    // console log the error
    console.log('Error in GET', err);
  });
} // end getKoalas

function renderKoalas(koalas) {
  // empty the table to refresh each time
  $('#viewKoalas').empty();

  // loop through koalas to append to DOM
  for (let i = 0; i < koalas.length; i++) {
    let koala = koalas[i];
    // for each koala, append a new row to the table
    $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.readyToTransfer}</td>
        <td>${koala.notes}</td>
        <td><button class="transferBtn" data-id="${koala.id}">Ready for Transfer</button></td>
      </tr>
    `);
  }
}

function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  // ajax call to server to post koalas
  // create new koala object to post to server

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


// delete koala function
/**
 * NOTE -- ***** need to add to click listener *****
 * @param {number} koalaId 
 */
function deleteKoala(koalaId) {
  $.ajax({
    method: "DELETE",
    url: `/koalas/${koalaId}`,
  })
    .then((response) => {
      console.log(`Bye, ${koalaId}`);
      getKoalas();
    })
    .catch((error) => {
      console.log("There was an Error", error);
    });
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

