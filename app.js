'use strict';
//array to store objects
Merch.allMerch = [];
//array to store imgEl info
Merch.imgElArray = [];
//constructor function
function Merch(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numShown = 0;
  this.numVoted = 0;
  Merch.allMerch.push(this);
}
//to use my constructor to create new Merch instances 
var allMerch = [
  new Merch('R2-D2 Bag', 'img/bag.jpg'),
  new Merch('Banana Cutter', 'img/banana.jpg'),
  new Merch('Restroom iPad Holder', 'img/bathroom.jpg'),
  new Merch('Sandle Boots', 'img/boots.jpg'),
  new Merch('Breakfast Machine', 'img/breakfast.jpg'),
  new Merch('Meatball Gum', 'img/bubblegum.jpg'),
  new Merch('Bump Chair', 'img/chair.jpg'),
  new Merch('Action-hulhu', 'img/cthulhu.jpg'),
  new Merch('Buack!', 'img/dog-duck.jpg'),
  new Merch('Dragon Meat', 'img/dragon.jpg'),
  new Merch('Speen', 'img/pen.jpg'),
  new Merch('Pet-cuum', 'img/pet-sweep.jpg'),
  new Merch('Pizza Scissors', 'img/scissors.jpg'),
  new Merch('Rest in Shark', 'img/shark.jpg'),
  new Merch('Infant-cuum', 'img/sweep.png'),
  new Merch('Tauntaun', 'img/tauntaun.jpg'),
  new Merch('Unicorn Meat', 'img/unicorn.jpg'),
  new Merch('OctopUSB', 'img/usb.gif'),
  new Merch('Penrose Can', 'img/water-can.jpg'),
  new Merch('Wine Pod', 'img/wine-glass.jpg'),
];

//listener, something to be clicked...all about events!

var imgEl1 = document.getElementById('firstMerch-pic');
var imgEl2 = document.getElementById('secondMerch-pic');
var imgEl3 = document.getElementById('thirdMerch-pic');



//create one function so 3 images change with one click
imgEl1.addEventListener('click', randomMerch);
imgEl2.addEventListener('click', randomMerch);
imgEl3.addEventListener('click', randomMerch);

//randomly display 3 of the pictures

function randomMerch() {
  var randomIndex = Math.floor(Math.random() * Merch.allMerch.length); //make random number
  imgEl1.src = Merch.allMerch[randomIndex].filepath; //use random number
  Merch.imgElArray.push(randomIndex); //save random number
  // re-asign randomIndex to generate a new random number for imgEl2
  do {
    randomIndex = Math.floor(Math.random() * Merch.allMerch.length);
  } while (randomIndex === Merch.imgElArray[0]);
  imgEl2.src = Merch.allMerch[randomIndex].filepath;
  Merch.imgElArray.push(randomIndex);

  // re-asign randomIndex to generate a new random number for imgEl3
  do {
    randomIndex = Math.floor(Math.random() * Merch.allMerch.length);
  } while (randomIndex === Merch.imgElArray[0] && randomIndex === Merch.imgElArray[1]);
  imgEl3.src = Merch.allMerch[randomIndex].filepath;
  Merch.imgElArray.push(randomIndex);
}

randomMerch();