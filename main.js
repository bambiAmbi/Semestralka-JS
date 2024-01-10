let datumNyni = new Date(Date.now());
let pocetRadku = localStorage.getItem('0') || 0;


function vymazUkol() {
    if (confirm("Opravdu si přejede daný úkol vymazat?")) {

        var index, table = document.getElementById('ukoly');
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].onclick = function () {
                index = this.rowIndex;
                localStorage.removeItem(table.rows[index].cells[4].innerText);
                table.deleteRow(index);
                aktualizaceTabulky();

            }
        }
    } else {
        event.stopPropagation();
    }

}

function sktrtniUkol() {
    var index, table = document.getElementById('ukoly');
    for(var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            index = this.rowIndex;
            this.classList.toggle("strikeout");

            let radek = JSON.parse(localStorage.getItem(this.cells[4].innerText));

            if(radek.skrtnuto === false) {
                radek.skrtnuto = true;
            } else {
                radek.skrtnuto = false;
            }

            localStorage.setItem(this.cells[4].innerText, JSON.stringify(radek));



        }
    }
}





function pridejUkol() {
    let datum = new Date(document.getElementById('datumUkolu').value);

    if(datum.getDate() < datumNyni.getDate()) {
        alert("Zadali jste špatné datum. Datum musí být dnešní nebo v budoucnu.")
    } else {


    let pocetRadkuAktualni= parseInt(pocetRadku);
    pocetRadkuAktualni++;

    let radek = {
        "nazev" : document.getElementById('nazevUkolu').value,
        "datum" : datum,
        "skrtnuto": false

    }

    localStorage.setItem('0', pocetRadkuAktualni.toString());
    localStorage.setItem(pocetRadkuAktualni, JSON.stringify(radek));
    pocetRadku = localStorage.getItem('0');
    aktualizaceTabulky();
    }
}

function vypocitejZbytek(datumUkolu, datumNyni) {
    let datum = datumUkolu;

    const rozdil = Math.abs(datum - datumNyni);
    const pocetDni = Math.ceil(rozdil / (1000 * 60 * 60 * 24));


    if(pocetDni === 1) {
        return  "zbývá " + pocetDni.toString() + " den";
    } else if (pocetDni >= 2 && pocetDni <= 4) {
        return  "zbývájí " + pocetDni.toString() + " dny";
    } else {
        return  "zbývá " + pocetDni.toString() + " dní";
    }

}

function aktualizaceTabulky() {
    let table = document.getElementById('ukoly');

    table.innerHTML = "";


    for(let i = 0; i < localStorage.length; i++) {
        if(parseInt(localStorage.key(i)) === 0) {
            continue
        } else {
            let aktualniRadek = JSON.parse(localStorage.getItem(localStorage.key(i)));
            let datum = new Date(aktualniRadek.datum);
            let nazev = aktualniRadek.nazev;

            let den = ("0" + datum.getDate()).slice(-2);
            let mesic = ("0" + (datum.getMonth() + 1)).slice(-2);

            let row = table.insertRow(-1);
            row.className = "";
            row.onclick = function () {
                sktrtniUkol()
            };

            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            let c5 = row.insertCell(4);
            c5.hidden = true;


            c1.innerText = nazev;
            c2.innerText = den + "." + mesic + "." + datum.getFullYear();
            c3.innerText = vypocitejZbytek(datum, datumNyni);
            c4.innerHTML = "<i class=\"fa fa-times\" onclick=\"vymazUkol()\"></i>";
            c5.innerHTML = localStorage.key(i);

            if(aktualniRadek.skrtnuto === true) {
                row.classList.toggle("strikeout");
            }


            document.getElementById("nazevUkolu").value = "";
            document.getElementById("datumUkolu").valueAsDate = new Date();

        }
        }
}

function vymaz () {
    localStorage.clear();
}
function ukaz () {
    console.log(localStorage);
}

