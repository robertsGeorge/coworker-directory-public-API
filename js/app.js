"use strict";
const body = document.querySelector('body');
const gallery = document.querySelector('#gallery');
let coworkers = [];
/* ------------------------
FETCH FUNCTIONS
-------------------------*/

fetch('https://randomuser.me/api/1.2/?nat=gb&results=12')
  .then(checkStatus)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayEmployees(data.results);
    coworkers = data.results;
    displayModal(coworkers[0]); // test displayModal.
  })
  .catch(err => console.log(err));


/*---------------------------------
  HELPER FUNCTIONS
----------------------------------*/ 

/**
 * Checks the http response status of a fetch request
 * @param {object} response A response object (a promise).
 * @returns {object}        A settled response object (a promise - either fulfilled or rejected.
 */
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/**
 * Generates HTML to display employee data from API as cards
 * @param {Array} employees   An array of random employee objects.
 */
function displayEmployees(employees) {
  let html = employees.map(employee => `
    <div class="card" id="${employee.name.first}-${employee.name.last}">
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3> 
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}, ${employee.nat}</p>
      </div>
    </div>
  `).join('');
  
  gallery.innerHTML = html;
}

/**
 * Displays a modal window with more details on the employee clicked on by user
 * @param {employee} employee An object containing the employees data.
 */
function displayModal(employee) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  let html = `
    <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
              <p class="modal-text">${employee.email}</p>
              <p class="modal-text cap">${employee.location.city}, ${employee.nat}</p>
              <hr>
              <p class="modal-text">${employee.phone}</p>
              <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
              <p class="modal-text">Birthday: ${employee.dob.date}</p>
          </div>
      </div>
    </div>
  `;
  modalContainer.innerHTML = html;
  body.appendChild(modalContainer);
}





/* -----------------------------------------------------
Event listeners
--------------------------------------------------------*/

gallery.addEventListener('click', (event) => {

});