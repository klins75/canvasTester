document.addEventListener('DOMContentLoaded', startTestBench);
dial01GridIntensity.addEventListener("wheel", controls.gridIntensity);
dial02GridHighlightIntenstiy.addEventListener("wheel", controls.gridHighlightIntensity);


function startTestBench() {  
  testBench.start();
}

const testBench = {
  start: function () {
    clearCanvas.draw();
    // Where it happens

    controls.draw();

    // update via arrays (batch)
    this.requestID = requestAnimationFrame(testBench.start);
  },
  stop: function () {
    cancelAnimationFrame(this.requestID);
  },
  clear: function () {
    clearCanvas.draw();
  },
};
