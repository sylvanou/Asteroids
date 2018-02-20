// THIS IS YOUR JAVASCRIPT DOCUMENT!
import { Controls , controls} from '../js/controls';
import { createAsteroids } from '../js/createAsteroids';


// window.onload = function () {

let xPosition = 100;
let yPosition = 100;
let xSpeed = 1;
let ySpeed = 0;
let maxSpeed = 5;

let collide = new Audio('http://sumbac.fvi-grad.com/Asteroids/explosion.wav');

// Create Asteroids
createAsteroids();

// declare & initialize movement variables
Controls(controls);

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
    if (controls.upPressed == 1)
      ySpeed = Math.max(ySpeed - 1, -1 * maxSpeed);
    if (controls.downPressed == 1)
      ySpeed = Math.min(ySpeed + 1, 1 * maxSpeed)
    if (controls.rightPressed == 1)
      xSpeed = Math.min(xSpeed + 1, 1 * maxSpeed);
    if (controls.leftPressed == 1)
      xSpeed = Math.max(xSpeed - 1, -1 * maxSpeed);

    // deceleration
    if (controls.upPressed == 0 && controls.downPressed == 0)
      slowDownY();
    if (controls.leftPressed == 0 && controls.rightPressed == 0)
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

