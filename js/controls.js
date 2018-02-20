// MOVEMENT CONTROLS FOR SHIP

export let controls = {
  upPress: 0,
  downPress: 0,
  leftPress: 0,
  rightPress: 0
 };

export const Controls = (controls) =>{


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