// Page loaded
document.addEventListener("DOMContentLoaded", startTestBench);

// Dial01 wheel event
dial01GridIntensity.addEventListener("wheel", controls.gridIntensity);

// Dial02 wheel event
dial02GridHighlightIntenstiy.addEventListener(
  "wheel",
  controls.gridHighlightIntensity
);
// Keys Event
document.addEventListener('keydown', (e)=> {
  allTheThings.forEach((thing) => {
    thing.keydown(e.key)
  })
})
// Keys Event
document.addEventListener('keyup', (e)=> {
  allTheThings.forEach((thing) => {
    thing.keyup(e.key)
  })
})
// Monitor Select
logPanel.addEventListener("click", monitors.highlight);



// Start test bench
function startTestBench() {
  const circlon = new Circlon(400,300,30,'green');
  targetCircle = new Target(600, 450,30,'rgba(255,0,0,.5)');
  allTheThings.push(circlon);
  allTheThings.push(targetCircle)
  
  testBench.start();

}

const testBench = {
  start: function () {
    // Set the canvas
    clearCanvas.draw();
    // Control Panel
    controls.draw();

    // update via arrays (batch);
    allTheThings.forEach((thing) => {
      thing.update();
    })

    // Metrics nightmare
    // metrics();



    this.requestID = requestAnimationFrame(testBench.start);
  },

  stop: function () {
    cancelAnimationFrame(this.requestID);
  },

  clear: function () {
    clearCanvas.draw();
  },

};

// function metrics() {
//   let self = allTheThings[0];
//   let target = allTheThings[1];
//   sdKey1.innerHTML = 'Player headInst';
//   sdInfo1.innerHTML = `${(self.headingInstruction).toFixed(0)}`

//   sdKey2.innerHTML = 'heading';
//   sdInfo2.innerHTML = `${(self.heading).toFixed(0)}`

//   sdKey3.innerHTML = 'target dx';
//   sdInfo3.innerHTML = `${self.getTargetRelativeCoors(target).x}`

//   sdKey4.innerHTML = 'target dy';
//   sdInfo4.innerHTML = `${self.getTargetRelativeCoors(target).y}`  

//   sdKey5.innerHTML = 'target distance';
//   sdInfo5.innerHTML = `${(self.getTargetRelativeCoors(target).r).toFixed(0)}`

//   sdKey6.innerHTML = 'target bearing';
//   sdInfo6.innerHTML = `${(self.getTargetRelativeCoors(target).b).toFixed(3)}`

//   sdKey7.innerHTML = 'target bearing adj';
//   sdInfo7.innerHTML = `${toDeg((self.getTargetRelativeCoors(target).b)).toFixed(0)}`

//   sdKey8.innerHTML = 'wheredigo?';
//   sdInfo8.innerHTML = `${self.x}`

//   sdKey12.innerHTML = 'key event';
//   sdInfo12.innerHTML = `${self.keyPressed}`
// }