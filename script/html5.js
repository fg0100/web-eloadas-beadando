function show(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Web storage
function saveToStorage() {
    const value = document.getElementById("storeInput").value;
    localStorage.setItem("demo", value);
}

function readFromStorage() {
    alert(localStorage.getItem("demo"));
}

// Web Worker
let worker;
function startWorker() {
    if (typeof (Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker(URL.createObjectURL(new Blob([`
          onmessage = function(e) {
            let sum = 0;
            for (let i = 0; i < 1e7; i++) { sum += i; }
            postMessage(sum);
          };
        `])));
        }
        worker.onmessage = function (e) {
            document.getElementById("workerResult").textContent = "Eredmény: " + e.data;
        };
        worker.postMessage("");
    } else {
        document.getElementById("workerResult").textContent = "Nem támogatott.";
    }
}

// Simulated SSE
function simulateSSE() {
    document.getElementById("sseData").textContent = "Üzenet a szervertől: Helló világ!";
}

// Geolocation
function getLocation() {
    const output = document.getElementById("geoOutput");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                output.textContent = `Szélesség: ${pos.coords.latitude}, Hosszúság: ${pos.coords.longitude}`;
            },
            err => {
                output.textContent = "Hozzáférés megtagadva vagy hiba.";
            });
    } else {
        output.textContent = "A böngésző nem támogatja.";
    }
}

// Drag and Drop
function allowDrop(ev) { ev.preventDefault(); }

function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// Canvas rajzolásS
window.onload = function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 30 + 5;
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fill();
    }
  };