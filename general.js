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

// Drawing Functions --------------------
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
  // log(`drawCircle here.\nx: ${x}\ny: ${y}\nr: ${r}\n color: ${color}\ncontext: ${context.canvas.id}\n`);
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  // log('after fill()')
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

// General Functions --------------------

function toDeg(n) {
  let result = (n * 180) / Math.PI;
  return result;
}
function toRad(n) {
  let result = (n * Math.PI) / 180;
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

  controlsArray: function () {
    let x = [
      {
        dial: dial01GridIntensity,
        context: dial01ctx,
        controllant: 1 - controls.GRID_INTENSITY,
      },
      {
        dial: dial02GridHighlightIntenstiy,
        context: dial02ctx,
        controllant: controls.GRID_HL_COLOR.a,
      },
    ];
    return x;
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
      drawRect(
        0,
        0,
        control.dial.width,
        control.dial.height,
        "black",
        control.context
      );
      for (i = 0; i < 10; i++) {
        control.context.beginPath();
        control.context.moveTo(
          control.dial.width / 3,
          ((i + 1) * control.dial.height) / 10
        );
        control.context.lineTo(
          (2 * control.dial.width) / 3,
          ((i + 1) * control.dial.height) / 10
        );
        control.context.strokeStyle = "white";
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

const monitors = {
  highlight: function (e) {
    let div = e.target;
    switch (div.className) {
      case "stat-display-key":
        let bg =
          e.target.style.border === "1px solid rgb(136, 136, 136)"
            ? "1px solid gold"
            : "1px solid rgb(136, 136, 136)";
        e.target.style.border = bg;
        break;
    }
  },
};

const test = {
  att: {
    x: 10,
    y: 300,
    r: 10,
    color: "green",
  },

  draw: () => {
    // log('draw here');
    let x = test.att.x,
      y = test.att.y,
      r = test.att.r,
      color = test.att.color;
    // log(`x: ${x}`)
    drawCircle(x, y, r, color);
  },

  update: () => {
    // log('update here')
    test.att.x++;
    test.draw();
  },
};

const test2 = {
  draw: () => {
    // log('test2 called.')
    drawCircle(100, 100, 20, "blue");
  },
  update: () => {
    test2.draw();
  },
};

const test3 = {
  draw: () => {
    // log('test3 called')
    drawCircle(600, 300, 20, "blue");
  },
  update: () => {
    test3.draw();
  },
};

class Circlon {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel = {
      x: 0,
      y: 0
    };
    this.angVel =8;
    this.color = color;
    this.headingInstruction = 360;
    this.keyPressed = "";
    this.keys = {
      arrLeft: false,
      arrRight: false,
      arrUp: false,
      arrDown: false,
      rKey: false,
      eKey: false,
    };
  }
  draw() {
    // Save and rotate
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.headingInstruction * Math.PI) / 180);
    ctx.translate(-this.x, -this.y);
    // Green Circle
    drawCircle(this.x, this.y, this.r, this.color);
    // Cross lines
    ctx.beginPath();
    ctx.strokeStyle = "black";
    // ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y - this.r);
    ctx.lineTo(this.x, this.y + this.r);
    ctx.moveTo(this.x - this.r, this.y);
    ctx.lineTo(this.x + this.r, this.y);
    ctx.stroke();
    // Little yellow compass north circle
    drawCircle(this.x + (17 * this.r) / 20, this.y, this.r / 20, "yellow");
    // Restore from the rotation
    ctx.restore();
  }
  update() {
    if (this.keys.rKey) {
      this.headingInstruction++;
    }
    if (this.keys.eKey) {
      this.headingInstruction--;
    }
    if (this.keys.arrUp) {
      this.y--;
    }
    if (this.keys.arrDown) {
      this.y++;
    }
    if (this.keys.arrLeft) {
      this.x--;
    }
    if (this.keys.arrRight) {
      this.x++;
    }
    // MODULUS
    if(this.headingInstruction < 0) {
      this.headingInstruction += 360;
    }
    if(this.headingInstruction > 360) {
      this.headingInstruction -= 360;
    }  

    let bearing = this.getTargetRelativeCoors(targetCircle);

    // temporary get rid of these!
    // sdKey8.innerHTML = 'target bearing rads';
    // sdInfo8.innerHTML = (bearing.b).toFixed(2);

    if(Math.abs(this.heading - toDeg(bearing.b)) > 0) {
      if(this.heading - toDeg(bearing.b) < 0) {
        this.headingInstruction += 1 * this.angVel;
      }
      if(this.heading - toDeg(bearing.b) > 0) {
        this.headingInstruction -= 1 * this.angVel;
      }
    }
    if(Math.abs(this.heading - toDeg(bearing.b)) < 0) {
      this.headingInstruction = this.heading;
    }

    this.x += this.vel.x;
    this.y += this.vel.y;

    this.seek();
    this.draw();
  }

  seek() {
    let targ = this.getTargetRelativeCoors(targetCircle);
    let r = targ.r;
    let directionX = targ.x < 0 ? "back" : "forward";
    let directionY = targ.y < 0 ? "back" : "forward";
    if(r > 100) {
      this.walk(directionX, directionY);
    }
    if(r <= 100) {
      this.stopWalking();
    }
  }

  walk(directionX, directionY) {
    this.vel.x = directionX === "forward" ? 1 : -1;
    this.vel.y = directionY === "forward" ? 1 : -1;
  }

  stopWalking() {
    this.vel.x = 0;
    this.vel.y = 0;
  }

  keydown(key) {
    this.keyPressed = key;
    switch (key) {
      case "ArrowLeft":
        this.keys.arrLeft = true;
        break;
      case "ArrowRight":
        this.keys.arrRight = true;
        break;
      case "ArrowUp":
        this.keys.arrUp = true;
        break;
      case "ArrowDown":
        this.keys.arrDown = true;
        break;
      case "r":
        this.keys.rKey = true;
        break;
      case "e":
        this.keys.eKey = true;
        break;
    }
  }
  keyup(key) {
    this.keyPressed = "";
    switch (key) {
      case "ArrowLeft":
        this.keys.arrLeft = false;
        break;
      case "ArrowRight":
        this.keys.arrRight = false;
        break;
      case "ArrowUp":
        this.keys.arrUp = false;
        break;
      case "ArrowDown":
        this.keys.arrDown = false;
        break;
      case "r":
        this.keys.rKey = false;
        break;
      case "e":
        this.keys.eKey = false;
        break;
    }
  }
  getTargetRelativeCoors(target) {
    let dx = target.x - this.x;
    let dy = target.y - this.y;
    let r = Math.sqrt(dx * dx + dy * dy);
    
    let b = Math.atan(dy / dx);

    // polar coordinate conversion
    if (dx < 0) {
      b = Math.PI + b
    }
    if (dx > 0 && dy < 0) {
      b = 2 * Math.PI + b
    }

    return {
      x: dx,
      y: dy,
      r,
      b,
    };
  }

  get heading() {
    return this.headingInstruction % 360;
  }
}

class Target extends Circlon {
  constructor(x, y, r, color) {
    super(x, y, r, color);
    this.keys = {
      wKey: false,
      aKey: false,
      sKey: false,
      dKey: false,
      cKey: false,
      dKey: false,
    };
    this.vel = 8;
    this.angVel = 3;
  }
  update() {
    if (this.keys.vKey) {
      this.headingInstruction+= this.angVel;
    }
    if (this.keys.cKey) {
      this.headingInstruction-= this.angVel;
    }
    if (this.keys.wKey) {
      this.y-= this.vel;
    }
    if (this.keys.sKey) {
      this.y+= this.vel;
    }
    if (this.keys.aKey) {
      this.x-= this.vel;
    }
    if (this.keys.dKey) {
      this.x+= this.vel;
    }
    this.draw();
  }

  keydown(key) {
    this.keyPressed = key;
    switch (key) {
      case "w":
        this.keys.wKey = true;
        break;
      case "a":
        this.keys.aKey = true;
        break;
      case "s":
        this.keys.sKey = true;
        break;
      case "d":
        this.keys.dKey = true;
        break;
      case "c":
        this.keys.cKey = true;
        break;
      case "v":
        this.keys.vKey = true;
        break;
    }
  }
  keyup(key) {
    this.keyPressed = "";
    switch (key) {
      case "w":
        this.keys.wKey = false;
        break;
      case "a":
        this.keys.aKey = false;
        break;
      case "s":
        this.keys.sKey = false;
        break;
      case "d":
        this.keys.dKey = false;
        break;
      case "c":
        this.keys.cKey = false;
        break;
      case "v":
        this.keys.vKey = false;
        break;
    }
  }


}
