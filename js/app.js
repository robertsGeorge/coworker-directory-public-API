"use strict";

/* ------------------------
FETCH FUNCTIONS
-------------------------*/

fetch('https://randomuser.me/api/1.2/?nat=gb&results=12')
  .then(checkStatus)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));


/*---------------------------------
  HELPER FUNCTIONS
----------------------------------*/ 

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}