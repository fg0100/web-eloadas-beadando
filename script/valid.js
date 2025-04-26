function validate() {
    const genders = {
        "male"   : "Férfi",
        "female" : "Nő",
        "other"  : "Egyéb"
    }

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value;
    let gender = genders[document.getElementById("gender").value];
    let email = document.getElementById("email").value.trim();
    let city = document.getElementById("city").value.trim();

    // Regex névre (legalább két szó)
    let nameRegex = /^([A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű]+ )+[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű]+$/;

    // Regex az emailhoz
    let emailRegex = /^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\.]+@[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\.]+\.[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\.]+$/;

    if (!nameRegex.test(name) || name.length < 4) {
        openDialog("A teljes névnek tartalmaznia kell egy vezeték- és egy keresztnevet! Valamint legalább 4 karakter hosszúnak kell lennie.");
        return;
    }

    if (!emailRegex.test(email)) {
        openDialog("Kérlek adj meg egy érvényes email címet!");
        return;
    }

    if (city.length < 1|| city.length > 58) {
        openDialog("A város nevének 1 és 58 karakter között kell lennie!");
        return;
    }
    if (age < 1 || age > 120){
        openDialog("Az életkornak 1 és 120 közé kell esnie!");
        return;
    }

    var table = document.getElementById("data-table");
    table.innerHTML += ("<tr><td>" + name + "</td><td>" + age + "</td><td>" + gender + "</td><td>" + email + "</td><td>" + city + "</td></tr>");
    
    document.getElementById("name").value = "";
    document.getElementById("age").selectedIndex = 0;
    document.getElementById("gender").selectedIndex = 0;
    document.getElementById("email").value = "";
    document.getElementById("city").value = "";
}

function openDialog(content) {
    document.getElementById("dialog-msg").innerHTML = content;
    document.getElementById("error-dialog").showModal();
}

function closeDialog() {
    document.getElementById("error-dialog").close();
}