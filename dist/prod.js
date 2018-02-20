/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_controls__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_createAsteroids__ = __webpack_require__(2);
// THIS IS YOUR JAVASCRIPT DOCUMENT!




// window.onload = function () {

let xPosition = 100;
let yPosition = 100;
let xSpeed = 1;
let ySpeed = 0;
let maxSpeed = 5;

let collide = new Audio('http://sumbac.fvi-grad.com/Asteroids/explosion.wav');

// Create Asteroids
Object(__WEBPACK_IMPORTED_MODULE_1__js_createAsteroids__["a" /* createAsteroids */])();

// declare & initialize movement variables
Object(__WEBPACK_IMPORTED_MODULE_0__js_controls__["a" /* Controls */])(__WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */]);

function slowDownX() {
  if (xSpeed > 0)
    xSpeed = xSpeed - 1;
  if (xSpeed < 0)
    xSpeed = xSpeed + 1;
}

function slowDownY() {
  if (ySpeed > 0)
    ySpeed = ySpeed - 1;
  if (ySpeed < 0)
    ySpeed = ySpeed + 1;
}


  var shipHealth = 1000;
  var loopCounter = 0;
  var asteroidCounter = 0;


  function gameLoop() {

    // SPACESHIP MOVEMENT

    // new position
    xPosition = xPosition + xSpeed;
    yPosition = yPosition + ySpeed;

    // actually change on-screen position by adjusting CSS
    document.getElementById("ship").style.left = xPosition;
    document.getElementById("ship").style.top = yPosition;

    // change speed when user presses keys
    if (__WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].upPressed == 1)
      ySpeed = Math.max(ySpeed - 1, -1 * maxSpeed);
    if (__WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].downPressed == 1)
      ySpeed = Math.min(ySpeed + 1, 1 * maxSpeed)
    if (__WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].rightPressed == 1)
      xSpeed = Math.min(xSpeed + 1, 1 * maxSpeed);
    if (__WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].leftPressed == 1)
      xSpeed = Math.max(xSpeed - 1, -1 * maxSpeed);

    // deceleration
    if (__WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].upPressed == 0 && __WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].downPressed == 0)
      slowDownY();
    if (__WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].leftPressed == 0 && __WEBPACK_IMPORTED_MODULE_0__js_controls__["b" /* controls */].rightPressed == 0)
      slowDownX();

    // check position of ship on screen
    var shipBox = document.getElementById("ship").getBoundingClientRect();

    // ASTEROID MOVEMENT

    // count how many times we've been through the gameLoop
    loopCounter++;

    // every 33 cycles (three times a second), launch a new asteroid BY GIVING IT A CLASS OF "MOVING"
    // but only do this 100 times
    if (loopCounter >= 32 && asteroidCounter <= 99) {
      document.getElementById("asteroid" + asteroidCounter.toString()).className = "moving";
      asteroidCounter++;
      loopCounter = 0;
    }

    // every cycle, check & update status of each moving asteroid
    var arrayOfMovingAsteroids = document.getElementsByClassName("moving");
    for (var i = 0; i < arrayOfMovingAsteroids.length; i++) {

      // move current asteroid 2px to the left (but remove it from the "moving" array if it's already offscreen)
      if (parseInt(arrayOfMovingAsteroids[i].style.right) < 3000) {
        arrayOfMovingAsteroids[i].style.right = parseInt(arrayOfMovingAsteroids[i].style.right) + 5 + 'px';
      } else {
        arrayOfMovingAsteroids[i].className = "";
      }

      // get "bounding box" of current asteroid
      var asteroidBox = arrayOfMovingAsteroids[i].getBoundingClientRect();

      // detect if asteroid's bounding box overlaps with space ship's bounding box
      var collision = !(asteroidBox.right < shipBox.left ||
        asteroidBox.left > shipBox.right ||
        asteroidBox.bottom < (shipBox.top + 30) ||
        asteroidBox.top > (shipBox.bottom - 30));

      if (collision) {
        shipHealth = (shipHealth - parseInt(arrayOfMovingAsteroids[i].style.height)); // ship loses number of health points relative to size of asteroid
        if (shipHealth >= 0) {
          document.getElementById("healthCounter").innerHTML = "SHIELDS: " + shipHealth;
        } else {
          document.getElementById("healthCounter").style.fontSize = "400";
          document.getElementById("healthCounter").style.textAlign = "center";
          document.getElementById("healthCounter").innerHTML = "GAME OVER";
          document.getElementById("ship").remove();  // ship disappears
        }
        collide.currentTime = 0;  // load explosion sound (creative commons license: https://www.freesound.org/people/Veiler/sounds/264031/)
        collide.play();  // play explosion sound
        arrayOfMovingAsteroids[i].remove();  // asteroid disappears
      }

    }

    // loop
    setTimeout(gameLoop, 10);
  }

  gameLoop();



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return controls; });
// MOVEMENT CONTROLS FOR SHIP

let controls = {
  upPress: 0,
  downPress: 0,
  leftPress: 0,
  rightPress: 0
 };

const Controls = (controls) =>{


 const keyDown = (e) => {
  let keyPressed = e.keyCode;
  if (keyPressed === 38)
    controls.upPressed = 1;
  if (keyPressed === 40)
    controls.downPressed = 1;
  if (keyPressed === 37)
    controls.leftPressed = 1;
  if (keyPressed === 39)
    controls.rightPressed = 1;
  // console.log(keyPressed);
};
 const keyUp = (e) => {
  let keyPressed = e.keyCode;
  if (keyPressed === 38)
    controls.upPressed = 0;
  if (keyPressed === 40)
    controls.downPressed = 0;
  if (keyPressed === 37)
    controls.leftPressed = 0;
  if (keyPressed === 39)
    controls.rightPressed = 0;
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


};
/* harmony export (immutable) */ __webpack_exports__["a"] = Controls;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// GENERATE ASTEROIDS IN HTML DOCUMENT

const createAsteroids = () => {
for (var i = 0; i < 100; i++) {

    var asteroid = new Image();
    asteroid.id = "asteroid" + i.toString();
    asteroid.src = "http://sumbac.fvi-grad.com/Asteroids/asteroid.png";
    asteroid.style.height = (((Math.random() * 6) + 0)*30);
    asteroid.style.position = "absolute";
    asteroid.style.top = (((Math.random() * 6) + 0)*100);
    asteroid.style.right = -200;
    var asteroidPosition = asteroid.style.right;
    var asteroidID = asteroid.id;
  
    document.body.appendChild(asteroid);
  
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = createAsteroids;


/***/ })
/******/ ]);