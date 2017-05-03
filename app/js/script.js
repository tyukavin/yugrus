'use strict';

// Функция переключения слайдов
function nextSlide(slide, c) {
  for (var i = 0; i < slide.length; i++) {
    slide[i].classList.remove('active');
    allSidebar[i].style.animation = '';
  }
  slide[c].classList.add('active');
}

// Функция запуска слайдера
function playSlideshow(current) {
  // nextSlide(slides, currentSlide);
  // nextSlide(slides1, currentSlide);

  slideInterval = setInterval(function(){
    // Cчетчик слайдов
  	current = (current + 1) % slides.length;
    // Запуск функций сладера
    nextSlide(slides, current);
    nextSlide(itemPannel, current);
  }, sec);
}

// Функция остановки слайдера
function pauseSlideshow() {
  clearInterval(slideInterval);
}

// Вставка сайдбаров
var sidebar = [];
var side = document.querySelectorAll('.item h3');
var parentDiv = [];
for (var k = 0; k < side.length; k++) {
  sidebar[k] = document.createElement('div');
  sidebar[k].classList.add('sidebar');
  parentDiv[k] = side[k].parentNode;
  // console.log(parentDiv[k]);
  // console.log(parentDiv[k].insertBefore(sidebar[k], side[k]));
  parentDiv[k].insertBefore(sidebar[k], side[k]);
}

// Слайдер основного контента
var slides = document.querySelectorAll('.slider .slide');
var itemPannel = document.querySelectorAll('.item');
var currentSlide = 0;
// var currentSlide1 = 0;
var slideInterval;
var sec = 5000;
var allSidebar = document.querySelectorAll('.sidebar');

// Запуск слайдера
// playSlideshow(currentSlide);



for (var d = 0; d < itemPannel.length; d++) {
  // console.log(itemPannel[d]);

  itemPannel[d].addEventListener('mouseover', function () {
    // console.log('Навели!');
    // nextSlide(slides, d);
    // console.log(this);
    pauseSlideshow();

    for (var u = 0; u < slides.length; u++) {
      itemPannel[u].classList.remove('active');
    }
    // this.classList.add('active');

    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
      if ( this.getAttribute('data-item') == slides[i].getAttribute('data-number') ) {
        slides[i].classList.add('active');
      }
    }
  });

  itemPannel[d].addEventListener('mouseout', function () {
    // console.log('Увели!');
    this.classList.add('active');
    // nextSlide(itemPannel, this.getAttribute('data-item'));
    console.log(this.getAttribute('data-item'));
    playSlideshow(+this.getAttribute('data-item'));
  });
}




// Отработка при наведении на .slider-block
var sliderBlock = document.querySelectorAll('.slider-block');
for ( var h = 0; h < sliderBlock.length; h++) {

  sliderBlock[h].addEventListener('mouseover', function (e) {
    var elemSidebar = document.querySelector('.pannel .active .sidebar');
  	e.stopPropagation();
    console.log('Навели!');
    elemSidebar.style.animation = 'sidebar-2 .5s linear forwards';
    pauseSlideshow();
  });
  sliderBlock[h].addEventListener('mouseout', function (e) {
    var elemSidebar = document.querySelector('.pannel .active .sidebar');
  	e.stopPropagation();
    console.log('Увели!');
    elemSidebar.style.animation = 'sidebar 5s linear forwards';
    playSlideshow(+this.getAttribute('data-slide'));
  });
}


// var sidebar = document.createElement('div');
// sidebar.className = 'sidebar';
// var side = document.querySelectorAll('.pannel li a');
// for (var f = 0; f < side.length; f++) {
//   side[f].appendChild(sidebar);
// }


// Слайдер кнопок
var siemaEl = document.querySelectorAll('.siema'),
    prevEl = document.querySelectorAll('.prev'),
    nextEl = document.querySelectorAll('.next'),
    arr = [];

for (var i = 0; i < siemaEl.length; i++)(function(i) {

  var mySiema = new Siema({
    selector: siemaEl[i],
    duration: 300,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: true,
    onInit: function(){},
    onChange: function(){},
  });

  arr.push(mySiema);

  // Siema.prototype.addPagination = function() {
  //
  //   var container = document.createElement('div');
  //   container.className = 'buttons-pagination';
  //   this.selector.insertBefore(container, this.selector.firstChild);
  //
  //   for (var j = 1; j <= siemaEl[i].querySelectorAll('.container-button-group').length; j++) {
  //     // var btnContainer = document.createElement('div');
  //     var btn = document.createElement('button');
  //     // btnContainer.className = 'buttons-pagination';
  //     // this.selector.insertBefore(btnContainer, this.selector.firstChild);
  //     // btn.textContent = j;
  //     btn.addEventListener('click', function() {
  //       btn.classList.remove('active');
  //       this.classList.toggle('active');
  //       return arr[i].goTo(j);
  //     });
  //     container.appendChild(btn);
  //   }
  // }
  // var elem = document.querySelectorAll('.buttons-pagination button:first-child');
  // console.log(elem);
  // elem.classList.add('active');


  // arr[i].addPagination();

  prevEl[i].addEventListener('click', function(){
    arr[i].prev();
  });
  nextEl[i].addEventListener('click', function(){
    arr[i].next();
  });

})(i);


// Слайдер на странице товара в блоке фоток
// var lory = require('lory.min.js');

// document.addEventListener('DOMContentLoaded', function () {
//   var multiSlides = document.querySelector('.js_multislides');
//
//   lory(multiSlides, {
//     infinite: 4,
//     slidesToScroll: 4
//   });
// });
