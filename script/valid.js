
window.onload = function() {
    loadInitialData()
    var table = document.getElementById("data-table");
    
};

function loadInitialData() {
    const initialData = [
        {
            name: "Ulfric Stormcloak",
            age: 45,
            gender: "Férfi",
            email: "ulfric.stormcloak@tamriel.com",
            city: "Windhelm"
        },
        {
            name: "Lydia Stormblade",
            age: 28,
            gender: "Nő",
            email: "lydia.stromblade@skyrimmail.com",
            city: "Whiterun"
        },
        {
            name: "Lucien Lachance",
            age: 42,
            gender: "Férfi",
            email: "lucien.lachance@tamriel.com",
            city: "Cheydinhal"
        },
        {
            name: "Martin Septim",
            age: 38,
            gender: "Férfi",
            email: "mmartin.septim@kvatch.com",
            city: "Kvatch"
        }
    ];

    const table = document.getElementById("data-table");

    initialData.forEach(data => {
        var newRow = table.insertRow();
        newRow.insertCell(0).innerText = data.name;
        newRow.insertCell(1).innerText = data.age;
        newRow.insertCell(2).innerText = data.gender;
        newRow.insertCell(3).innerText = data.email;
        newRow.insertCell(4).innerText = data.city;

        var actionsCell = newRow.insertCell(5);
        actionsCell.innerHTML = `
          <button onclick="editRow(this)"><i class="fas fa-edit"></i></button>
          <button onclick="deleteRow(this)"><i class="fas fa-trash"></i></button> `;
    });

    if (window.FontAwesome && FontAwesome.dom) {
        FontAwesome.dom.i2svg();
    }

}


function validate() {
    const genders = {
        "male": "Férfi",
        "female": "Nő",
        "other": "Egyéb"
    };    



    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value;
    let genderKey = document.getElementById("gender").value;
    let gender = genders[genderKey];
    let email = document.getElementById("email").value.trim();
    let city = document.getElementById("city").value.trim();

    let nameRegex = /^([A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű]+ )+[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű]+$/;
    let emailRegex = /^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\.]+@[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\.]+\.[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\.]+$/i;

    if (!nameRegex.test(name) || name.length < 4) {
        openDialog("A teljes névnek tartalmaznia kell egy vezeték- és egy keresztnevet! Valamint legalább 4 karakter hosszúnak kell lennie.");
        return;
    }    

    if (!emailRegex.test(email)) {
        openDialog("Kérlek adj meg egy érvényes email címet!");
        return;
    }    

    if (city.length < 1 || city.length > 58) {
        openDialog("A város nevének 1 és 58 karakter között kell lennie!");
        return;
    }    

    if (age < 1 || age > 120) {
        openDialog("Az életkornak 1 és 120 közé kell esnie!");
        return;
    }    

    var table = document.getElementById("data-table");
    var newRow = table.insertRow();

    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = age;
    newRow.insertCell(2).innerText = gender;
    newRow.insertCell(3).innerText = email;
    newRow.insertCell(4).innerText = city;

    var actionsCell = newRow.insertCell(5);
    actionsCell.innerHTML = `
    <button onclick="editRow(this)"><i class="fas fa-edit"></i></button>
    <button onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
`;
  

    clearForm();
}    

function openDialog(content) {
    document.getElementById("dialog-msg").innerHTML = content;
    document.getElementById("error-dialog").showModal();
    document.getElementById("overlay").style.display = "block";
}    

function closeDialog() {
    document.getElementById("error-dialog").close();
    document.getElementById("overlay").style.display = "none";
}    

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").selectedIndex = 0;
    document.getElementById("email").value = "";
    document.getElementById("city").value = "";
}    

function editRow(button) {
    var row = button.parentNode.parentNode;

    document.getElementById("name").value = row.cells[0].innerText;
    document.getElementById("age").value = row.cells[1].innerText;
    document.getElementById("gender").value = row.cells[2].innerText === "Férfi" ? "male" :
                                               row.cells[2].innerText === "Nő" ? "female" : "other";
    document.getElementById("email").value = row.cells[3].innerText;                                           
    document.getElementById("city").value = row.cells[4].innerText;

    row.remove();
}    

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.remove();
}    
