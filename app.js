
// Co je za úkol v tomto projektu:

// 1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
// HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.


function nactiRecepty() {
  recepty.forEach(recept => {
    let receptElement = document.createElement("div");
    receptElement.className = "recept";

    let receptObrazekDivElement = document.createElement("div");
    receptObrazekDivElement.className = "recept-obrazek";

    let receptObrazekElement = document.createElement("img");
    receptObrazekElement.src = recept.img;
    receptObrazekElement.alt = recept.nadpis;


    let receptInfoElement = document.createElement("div");
    receptInfoElement.className = "recept-info"; 

    let receptNazevElement = document.createElement("h3");
    receptNazevElement.textContent = recept.nadpis;

    document.getElementById("recepty").appendChild(receptElement);
    receptElement.appendChild(receptObrazekDivElement);
    receptObrazekDivElement.appendChild(receptObrazekElement);
    receptElement.appendChild(receptInfoElement);
    receptInfoElement.appendChild(receptNazevElement);
  })
}
nactiRecepty();



// 2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
// by se měl seznam receptů vyfiltrovat podle hledaného slova.




// 3) Doplň filtrovanání receptů podle kategorie.

// 4) Doplň řazení receptů podle hodnocení.

// 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
// Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
// recept-hodnoceni, recept-nazev, recept-popis.

// 6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
