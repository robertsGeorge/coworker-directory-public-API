"use strict";

fetch('https://randomuser.me/api/1.2/')
  .then(res => res.json())
  .then(data => console.log(data));