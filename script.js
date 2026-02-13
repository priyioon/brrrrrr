let hasPressedNo = false;


// ================= MUSIC =================

const music = document.getElementById("bgMusic");
let musicStarted = false;


// ================= DATA =================

const noPairs = [
  ["memes/no/sticker1.webp", "memes/no/sticker1_1.webp"],
  ["memes/no/sticker2.webp", "memes/no/sticker2_2.webp"],
  ["memes/no/sticker3.webp", "memes/no/sticker3_3.webp"],
  ["memes/no/sticker4.webp", "memes/no/sticker4_4.webp"]
];

const yesStickers = [
  "memes/yes/sticker5_5.webp"
];

const heheImages = [
  "memes/hehe/1.webp",
  "memes/hehe/2.webp",
  "memes/hehe/3.webp",
  "memes/hehe/4.webp"
];

let noCount = 0;
let lives = 4;


// ================= ELEMENTS =================

const heartsDiv = document.getElementById("hearts");
const popupArea = document.getElementById("popupArea");
const picsBtn = document.getElementById("picsBtn");
const hehePage = document.getElementById("hehePage");
const heheBox = document.getElementById("heheBox");
const closeBtn = document.getElementById("closeHehe");
const dvd = document.getElementById("dvd");


// ================= HEARTS =================

function drawHearts() {
  heartsDiv.innerHTML = "";

  for (let i = 0; i < lives; i++) {
    const img = document.createElement("img");
    img.src = "heart.jpg";
    heartsDiv.appendChild(img);
  }
}

drawHearts();


// ================= POPUPS =================

function clearPopups() {
  popupArea.innerHTML = "";
}

function showPair(a, b) {
  clearPopups();

  const img1 = document.createElement("img");
  img1.src = a;
  img1.className = "popup";

  const img2 = document.createElement("img");
  img2.src = b;
  img2.className = "popup";

  popupArea.appendChild(img1);
  popupArea.appendChild(img2);
}


// ================= YES =================

function playYes() {
if (!hasPressedNo) {
  showMcPopup("wtf how did u press yes first");
  return;
}


  playClick(); // sound

  yesBtn.classList.add("yes-glow"); // glow

  if (!musicStarted) {
    music.play();
    musicStarted = true;
  }

  clearPopups();

  showYesStickers();

  startDVD();

  document.getElementById("picsBtn").style.display = "block";
}


// ================= NO =================

function playNo() {
  
hasPressedNo = true;
  playClick(); // sound

  noBtn.classList.add("shake"); // shake

  setTimeout(() => {
    noBtn.classList.remove("shake");
  }, 400);


  if (!musicStarted) {
    music.play();
    musicStarted = true;
  }

  if (noCount >= noPairs.length) return;

  showPair(
    noPairs[noCount][0],
    noPairs[noCount][1]
  );

  noCount++;
  lives--;

  drawHearts();

  if (lives <= 0) {
    alert("ok bitch press yes aldr");
  }
}



// ================= YES MEMES =================

function showYesStickers() {

  clearPopups();

  const img = document.createElement("img");
  img.src = yesStickers[0];
  img.className = "popup";

  // Make it bigger 💖
  img.style.width = "320px"; // change size if you want

  popupArea.appendChild(img);

  // Remove after 6 seconds
  setTimeout(clearPopups, 6000);
}



// ================= DVD =================

let dvdInterval1 = null;
let dvdInterval2 = null;

function startDVD() {

  startOneDVD("dvd", 2, 2);
  startOneDVD("dvd2", -2, 3);

}

function startOneDVD(id, dxStart, dyStart) {

  const dvd = document.getElementById(id);

  let x = Math.random() * 300 + 50;
  let y = Math.random() * 200 + 50;

  let dx = dxStart;
  let dy = dyStart;

  dvd.style.display = "block";

  if (id === "dvd" && dvdInterval1)
    clearInterval(dvdInterval1);

  if (id === "dvd2" && dvdInterval2)
    clearInterval(dvdInterval2);


  const interval = setInterval(() => {

    x += dx;
    y += dy;

    if (x <= 0 || x >= window.innerWidth - 120) dx *= -1;
    if (y <= 0 || y >= window.innerHeight - 120) dy *= -1;

    dvd.style.left = x + "px";
    dvd.style.top = y + "px";

  }, 20);


  if (id === "dvd") dvdInterval1 = interval;
  if (id === "dvd2") dvdInterval2 = interval;
}



// ================= HEHE =================

function loadHehePics() {

  heheBox.innerHTML = "";

  heheImages.forEach(src => {

    const img = document.createElement("img");
    img.src = src;
    img.className = "hehe-img";

    heheBox.appendChild(img);
  });
}


// Open hehe
picsBtn.onclick = () => {
  hehePage.style.display = "flex";
  loadHehePics();
};


// Close hehe
closeBtn.onclick = () => {
  hehePage.style.display = "none";
};

// Button effects
const clickSound = document.getElementById("clickSound");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

function playClick() {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}
 
function showMcPopup(text) {

  const popup = document.getElementById("mcPopup");
  const box = document.getElementById("mcPopupBox");

  box.innerText = text;

  popup.style.display = "flex";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000); // closes after 2 sec
}


