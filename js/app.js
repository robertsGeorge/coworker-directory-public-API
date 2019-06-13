"use strict";

/* ------------------------
FETCH FUNCTIONS
-------------------------*/

fetch('https://randomuser.me/api/1.2/?results=12')
  .then(res => res.json())
  .then(data => console.log(data));


/*---------------------------------
  HELPER FUNCTIONS
----------------------------------*/ 

