const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Metrics
const sdKey1 = document.getElementById("stat-display-key1");
const sdInfo1 = document.getElementById("stat-display-info1");

const sdKey2 = document.getElementById("stat-display-key2");
const sdInfo2 = document.getElementById("stat-display-info2");

const sdKey3 = document.getElementById("stat-display-key3");
const sdInfo3 = document.getElementById("stat-display-info3");

const sdKey4 = document.getElementById("stat-display-key4");
const sdInfo4 = document.getElementById("stat-display-info4");

const sdKey5 = document.getElementById("stat-display-key5");
const sdInfo5 = document.getElementById("stat-display-info5");

const sdKey6 = document.getElementById("stat-display-key6");
const sdInfo6 = document.getElementById("stat-display-info6");

const sdKey7 = document.getElementById("stat-display-key7");
const sdInfo7 = document.getElementById("stat-display-info7");

const sdKey8 = document.getElementById("stat-display-key8");
const sdInfo8 = document.getElementById("stat-display-info8");

const sdKey9 = document.getElementById("stat-display-key9");
const sdInfo9 = document.getElementById("stat-display-info9");

const sdKey10 = document.getElementById("stat-display-key10");
const sdInfo10 = document.getElementById("stat-display-info10");

const sdKey11 = document.getElementById("stat-display-key11");
const sdInfo11 = document.getElementById("stat-display-info11");

const sdKey12 = document.getElementById("stat-display-key12");
const sdInfo12 = document.getElementById("stat-display-info12");

const sdKey13 = document.getElementById("stat-display-key13");
const sdInfo13 = document.getElementById("stat-display-info13");

const log = console.log;

// time
let requestID;
let dt;
let previousTime;

let RETICULE = 20;
let GRID_LINE_COLOR = "lightgray";
let GRID_BG_COLOR = "white";
let GRID_CL_COLOR = "#f00";
let GRID_LEGEND_COLOR = "#00f";

// let GRID_HL_COLOR = {
//   r: 0,
//   g: 0,
//   b: 255,
//   a: 1,
// };

// controls the mask intensity actually
// let GRID_INTENSITY = 0;

// control panel
const dial01GridIntensity = document.querySelector("#dial01");
const dial01ctx = dial01GridIntensity.getContext('2d');
const dial02GridHighlightIntenstiy = document.querySelector("#dial02");
const dial02ctx = dial02GridHighlightIntenstiy.getContext('2d');
