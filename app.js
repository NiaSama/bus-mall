'use strict';
//need array of images DONE
//we need a constructor function for products DONE
//we need an event listener
//we need an image respoistory
//we need need to randomize the images
//we need a vote counter
//we need a view counter
//we need an event handler
//we need to display the list with DOM manipulation
//we need to know total clicks
//we need to make sure the images do not repeat
//all the DOM appending

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.all = []; //put information that's been randomized into this array
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;
Product.dataArray = []; // pushing all 25 clicks from users here

function Product(name) {
  this.name = name;
  if (name === 'usb') {
    this.path = 'img/' + name + '.gif';
  } else if (name === 'sweep') {
    this.path = 'img/' + name + '.png';
  } else {
    this.path = 'img/' + name + '.jpg';
  }
  this.votes = 0;
  this.views = 0;
  this.percentage = 0;
  Product.all.push(this);
}

Product.prototype.calculatePercentage = function() {
  //votes/views * 100 then round = percentag
  this.percentage = Math.round((this.votes / this.views) * 100);
  
};

for (var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}
function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}

function displayPics() {
  var currentlyShowing = [];
  //make left image unique
  currentlyShowing[0] = makeRandom();
  while (Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    console.error('Dupilcate, rerun!');
    currentlyShowing[0] = makeRandom();
  }
  //make center image unique
  currentlyShowing[1] = makeRandom();
  while (currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    console.error('Duplicate at center or in prior view! Re-run!');
    currentlyShowing[1] = makeRandom();
  }
  //make right image unique
  currentlyShowing[2] = makeRandom();
  while (currentlyShowing[2] === currentlyShowing[1] || currentlyShowing[2] === currentlyShowing[0] || Product.justViewed.indexOf(currentlyShowing[2]) !== -1) {
    console.error('Duplicate at right or in prior view! Re-run!');
    currentlyShowing[2] = makeRandom();
  }
  //take it to the DOM
  for (var i = 0; i < 3; i++) {
    Product.pics[i].src = Product.all[currentlyShowing[i]].path;
    Product.pics[i].id = Product.all[currentlyShowing[i]].name;
    Product.all[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}
//event listener for keeping track of total clicks on images
function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  //make total clicks stops at 25
  if (Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    //show list after the last click
    showTally();
    renderChart();
  }
  //this is how we direct the user to click on a specific image
  if (event.target.id === 'image_container') {
    alert(' Need to click on an image. ');
  }
  else {
    //start to add  up the clicks and log it in the console
    Product.totalClicks += 1;
    for (var i = 0; i < Product.names.length; i++) {
      if (event.target.id === Product.all[i].name) {
        Product.all[i].votes += 1;
        console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views.');
      }
    }
    displayPics(); //why do i have to call this here instead of outside the handleClick function MARIOOOO@@@@@@@@@@@@@@@
  }
}
//show tally using the list in the DOM once the event listner has been removed.
function showTally() {
  for (var i = 0; i < Product.all.length; i++) {
    Product.all[i].calculatePercentage();
    Product.dataArray.push(Product.all[i].percentage);
    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views, which is ' + Product.all[i].percentage + '%.';
    //append the li to the Product.tally created above globally for the ul
    Product.tally.appendChild(liEl);
  }
}
//event listener
Product.container.addEventListener('click', handleClick);
displayPics(); //to show the first three pics 



//first add the cdn link to the head of your html
//find the chart object in the console and inspect it ex: myChart, myChart.data, myChart.datasets[0].data
//the data renders how hight he bar chart will be
//data: [], will hold the votes for each product image
//Labels: ['red' etc] will hold the name for each product
//myChart.update() is the method you will need to keep an eye on
//ex: myChart.data.datasets[0].data[0] = 4 assigns a new value to it
//myChart.update() //should change the value and update the chart

// chart
function renderChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
      datasets: [
        {
          label: 'Number of Votes',
          data: Product.dataArray, // data is all of the votes
        }
      ],
      bacgroundColor: [
        'green'
      ],
      borderWidth: 1,
      borderColor: 'grey',
      hoverBorderWidth: 3,
      hoverBorderColor: 'black',
    },
    options: {
      title: {
        display: true,
        text: 'Votes for Products',
        fontSize: 25,
      },
    }
  });
}
