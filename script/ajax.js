const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "LTLNTGaph167";

function $(id) {
    return document.getElementById(id);
}

function validateInput(name, height, weight) {
    if (!name || !height || !weight) {
        return "Minden mező kitöltése kötelező.";
    }
    if (name.length > 30 || height.length > 30 || weight.length > 30) {
        return "A mezők maximum 30 karakter hosszúak lehetnek.";
    }
    return null;
}

function readData() {
    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            op: "read",
            code: CODE
        })
    })
    .then(res => res.json())
    .then(data => {
        const output = data.list.map(row => 
            `ID: ${row.id}, Név: ${row.name}, Magasság: ${row.height}, Súly: ${row.weight}`
        ).join("<br>");
        $("read-output").innerHTML = output;

        // statisztikák a height alapján
        const heights = data.list.map(row => parseFloat(row.height)).filter(n => !isNaN(n));
        const sum = heights.reduce((a, b) => a + b, 0);
        const avg = heights.length ? (sum / heights.length).toFixed(2) : 0;
        const max = heights.length ? Math.max(...heights) : 0;
        $("stats-output").innerHTML = `
            <p>Magasság összeg: ${sum}</p>
            <p>Átlag: ${avg}</p>
            <p>Legnagyobb: ${max}</p>
        `;
    });
}

function createRecord() {
    const name = $("create-name").value.trim();
    const height = $("create-height").value.trim();
    const weight = $("create-weight").value.trim();

    const error = validateInput(name, height, weight);
    if (error) {
        $("create-feedback").textContent = error;
        return;
    }

    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            op: "create",
            name, height, weight, code: CODE
        })
    })
    .then(res => res.json())
    .then(data => {
        $("create-feedback").textContent = data == 1 ? "Sikeres létrehozás!" : "Nem sikerült létrehozni.";
        readData();
    });
}

function getDataForId() {
    const id = $("update-id").value.trim();
    if (!id) return;

    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            op: "read",
            code: CODE
        })
    })
    .then(res => res.json())
    .then(data => {
        const record = data.list.find(r => r.id === parseInt(id));
        if (record) {
            $("update-name").value = record.name;
            $("update-height").value = record.height;
            $("update-weight").value = record.weight;
        } else {
            $("update-feedback").textContent = "Nem található rekord ezzel az ID-vel.";
        }
    });
}

function updateRecord() {
    const id = $("update-id").value.trim();
    const name = $("update-name").value.trim();
    const height = $("update-height").value.trim();
    const weight = $("update-weight").value.trim();

    const error = validateInput(name, height, weight);
    if (!id) {
        $("update-feedback").textContent = "ID megadása kötelező.";
        return;
    }
    if (error) {
        $("update-feedback").textContent = error;
        return;
    }

    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            op: "update",
            id, name, height, weight, code: CODE
        })
    })
    .then(res => res.json())
    .then(data => {
        $("update-feedback").textContent = data == 1 ? "Sikeres frissítés!" : "Nem sikerült frissíteni.";
        readData();
    });
}

function deleteRecord() {
    const id = $("delete-id").value.trim();
    if (!id) {
        $("delete-feedback").textContent = "ID megadása kötelező.";
        return;
    }

    fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
            op: "delete",
            id, code: CODE
        })
    })
    .then(res => res.json())
    .then(data => {
        $("delete-feedback").textContent = data == 1 ? "Sikeres törlés!" : "Nem sikerült törölni.";
        readData();
    });
}
