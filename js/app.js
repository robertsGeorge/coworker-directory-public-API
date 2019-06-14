"use strict";
const body = document.querySelector('body');
const gallery = document.querySelector('#gallery');

/* ------------------------
FETCH FUNCTIONS
-------------------------*/

fetch('https://randomuser.me/api/1.2/?nat=gb&results=12')
  .then(checkStatus)
  .then(res => res.json())
  .then(data => {
    console.log(data.results);
    displayEmployees(data.results);
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
    <div class="card">
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

