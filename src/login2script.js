const l1 = document.getElementById('name');
const t1 = "Aditya";
l1.textContent += t1;

const l2 = document.getElementById('weight');
const t2 = 123+" Kg";
l2.textContent += t2;

const l3 = document.getElementById('height');
const t3 = 160 + " cm";
l3.textContent += t3; 

const l4 = document.getElementById('sex');
const t4 = "Male";
l4.textContent += t4; 

const d = new Date(2018,11,20);
const l5 = document.getElementById('dob');
const d1 = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
l5.textContent += d1;

let img = document.createElement('img');
img.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
document.getElementById('xray').appendChild(img);
let img1 = document.createElement('img');
img1.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
document.getElementById('diag').appendChild(img1);