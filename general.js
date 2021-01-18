const clearCanvas = {
  vertical: function () {
    // Vertical grid lines
    for (let i = 0; i < canvas.width / RETICULE; i++) {
      vline((i + 1) * RETICULE, GRID_LINE_COLOR);
      // Vertical grid highlights
      if (i % 5 === 0 && i !== 0 && i * RETICULE !== canvas.width / 2) {
        vline(i * RETICULE, rgbaTranslator(controls.GRID_HL_COLOR));
      }
      if (i % 5 === 0 && i !== 0) {
        text(
          `${i * RETICULE}`,
          i * 20,
          15,
          rgbaTranslator(controls.GRID_HL_COLOR)
        );
      }
    }
  },

  horizontal: function () {
    // Horizontal grid lines
    for (let i = 0; i < canvas.height / RETICULE; i++) {
      hline((i + 1) * RETICULE, GRID_LINE_COLOR);
      // grid highlights (usually blue)
      if (i % 5 === 0 && i !== 0 && i * RETICULE !== canvas.height / 2) {
        hline(i * RETICULE, rgbaTranslator(controls.GRID_HL_COLOR));
      }
      if (i % 5 === 0 && i !== 0) {
        text(
          `${i * RETICULE}`,
          canvas.width - 36,
          i * 20 + 5,
          rgbaTranslator(controls.GRID_HL_COLOR)
        );
      }
    }
  },

  centerlines: function () {
    // Centerlines
    hline(canvas.height / 2, GRID_CL_COLOR);
    vline(canvas.width / 2, GRID_CL_COLOR);
  },

  mask: function () {
    drawRect(
      0,
      0,
      canvas.width,
      canvas.height,
      `rgba(255,255,255,${controls.GRID_INTENSITY})`
    );
  },

  draw: function () {
    // Background
    drawRect(0, 0, canvas.width, canvas.height, GRID_BG_COLOR);
    this.vertical();
    this.horizontal();
    this.centerlines();
    this.mask();
  },
};

function text(text, x, y, color) {
  ctx.font = `${(4 * RETICULE) / 5}px monospace`;
  ctx.fillStyle = color || "black";
  ctx.fillText(text, x, y);
}

function hline(y, color, lw, optional) {
  context = optional || ctx;
  context.beginPath();
  context.lineWidth = lw || 1;
  context.strokeStyle = color;
  context.moveTo(0, y);
  context.lineTo(canvas.width, y);
  context.stroke();
}

function vline(x, color, lw, optional) {
  context = optional || ctx;
  context.beginPath();
  context.lineWidth = lw || 1;
  context.strokeStyle = color;
  context.moveTo(x, 0);
  context.lineTo(x, canvas.height);
  context.stroke();
}

function drawCircle(x, y, r, color, optional) {
  context = optional || ctx;
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

function drawRect(x, y, w, h, color, optional) {
  context = optional || ctx;
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function rgbaTranslator(color) {
  let result = `rgba(${color.r.toString()},${color.g.toString()},${color.b.toString()},${color.a.toString()})`;
  return result;
}

const controls = {

  GRID_HL_COLOR: {
    r: 0,
    g: 0,
    b: 255,
    a: 1,
  },

  GRID_INDICATOR_COLOR: {
    r: 0,
    g: 128,
    b: 255,
    a: 1,
  },

  GRID_INTENSITY: 0,

  controlsArray: function() {
    let x = [
      {
        dial: dial01GridIntensity,
        context: dial01ctx,
        controllant: 1 - controls.GRID_INTENSITY
      },
      {
        dial: dial02GridHighlightIntenstiy,
        context: dial02ctx,
        controllant: controls.GRID_HL_COLOR.a
      },
    ]
    return x
  },  

  gridIntensity: function (e) {
    if (controls.GRID_INTENSITY <= 1 && controls.GRID_INTENSITY >= 0) {
      let setting = e.deltaY / 1000;
      controls.GRID_INTENSITY += setting;
      // truncate zeroes and prevent over-adjust
      if (controls.GRID_INTENSITY < 0) {
        controls.GRID_INTENSITY = 0;
      }
      if (controls.GRID_INTENSITY > 1) {
        controls.GRID_INTENSITY = 1;
      }
    }
  },

  gridHighlightIntensity: function (e) {
    if (controls.GRID_HL_COLOR.a <= 1 && controls.GRID_HL_COLOR.a >= 0) {
      let setting = e.deltaY / 1000;
      controls.GRID_HL_COLOR.a -= setting;
      // truncate zeroes and prevent over-adjust
      if (controls.GRID_HL_COLOR.a < 0) {
        controls.GRID_HL_COLOR.a = 0;
      }
      if (controls.GRID_HL_COLOR.a > 1) {
        controls.GRID_HL_COLOR.a = 1;
      }
    }
  },

  draw: function () {
    let array = this.controlsArray();
    array.forEach((control) => {
      drawRect(0, 0, control.dial.width, control.dial.height, "black", control.context);
      for(i=0;i<10;i++){
        control.context.beginPath();
        control.context.moveTo(control.dial.width / 3, (i + 1) * control.dial.height / 10);
        control.context.lineTo(2 * control.dial.width / 3, (i + 1) * control.dial.height / 10);
        control.context.strokeStyle = 'white';
        control.context.lineWidth = 2;
        control.context.stroke();
      }
      let color = this.GRID_INDICATOR_COLOR;
      // dial brightens as it goes to top
      color.g = 255 - (1 - control.controllant) * 255;
      
      hline(
        -control.controllant * control.dial.height + control.dial.height,
        rgbaTranslator(color),
        6,
        control.context
      );
    });
  },  
};

// controls.draw();
