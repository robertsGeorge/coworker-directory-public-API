"use strict";
const body = document.querySelector('body');
const gallery = document.querySelector('#gallery');
let coworkers = [];
let cards = [];





/*---------------------------------
  HELPER FUNCTIONS
----------------------------------*/ 

/**
 * Checks the http response status of a fetch request
 * @param {object} response A response object (a promise).
 * @returns {object}        A settled response object (a promise - either fulfilled or rejected.
 */
const checkStatus = response => {
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
const displayEmployees = employees => {
  let html = employees.map(employee => `
    <div class="card"  id="${employee.email}">
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
const displayModal = employee => {
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
  gallery.insertAdjacentElement('afterend', modalContainer);
}


/**
 * Handles the data for, display and removal of employee details modal window
 * @param {object} event  - The event object triggered by clicking on an employee
 */
const handleModal = event => {
  
  // Within the coworkers array of worker objects, Identify the worker that was clicked
  for (let worker of coworkers) {
    // event.currentTarget identifies the element that the event listener was registered on (div.card).
    // employee email is used to assign an id attribute in displayEmployees() above.
    if (worker.email === event.currentTarget.id) {
      displayModal(worker);

      // remove modal window from view and the DOM:
      document.querySelector('#modal-close-btn').addEventListener('click', () => {
        document.querySelector('.modal-container').remove();
      });
      break;
    }
  }
};



/* --------------------------------------------
FETCH FUNCTION / APP LOGIC
-----------------------------------------------*/

fetch('https://randomuser.me/api/1.2/?nat=gb&results=12')
  .then(checkStatus)
  .then(res => res.json())
  .then(data => {
    displayEmployees(data.results);
    coworkers = data.results;
    cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      card.addEventListener('click', handleModal);
    });
  })
  .catch(err => console.log(err));






