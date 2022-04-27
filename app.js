
// Co je za úkol v tomto projektu:

// 1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
// HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.


function nactiRecepty(pole) {
  pole.forEach(recept => {
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


nactiRecepty(recepty);

function skryjRecepty() {
  let receptyElement = document.getElementById("recepty");
  while (receptyElement.firstChild) {
    receptyElement.removeChild(receptyElement.firstChild);
  }
  
}
// 2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
// by se měl seznam receptů vyfiltrovat podle hledaného slova.

const hledaniInput = document.getElementById("hledat");

hledaniInput.addEventListener("input", e => {
  const hodnota = e.target.value;
  console.log(hodnota.toLowerCase().split(" "));
})



// 3) Doplň filtrovanání receptů podle kategorie.

let vyberKategorie = document.getElementById("kategorie");

vyberKategorie.addEventListener("change", e => {
  const zvolenaKategorie = e.target.value;
  console.log(zvolenaKategorie);
  
  
  const vysledek = recepty.filter(najdiKategorii);
  function najdiKategorii(recept) {
    if(recept.stitek === zvolenaKategorie) {
      return true;
    }
  }
  console.log(vysledek);
  skryjRecepty();
  nactiRecepty(vysledek);

})


// 4) Doplň řazení receptů podle hodnocení.

let vyberRazeni = document.getElementById("razeni");



vyberRazeni.addEventListener("change", e => {
  const zvoleneRazeni = e.target.value;
  console.log(zvoleneRazeni);
  
  if (zvoleneRazeni === "1") {
    let nejlepsi = recepty.sort((a, b) => b.hodnoceni - a.hodnoceni);
    skryjRecepty();
    nactiRecepty(nejlepsi);
  } else if (zvoleneRazeni === "2") {
    skryjRecepty();
    let nejhorsi = recepty.sort((a, b) => b.hodnoceni - a.hodnoceni).reverse();
    skryjRecepty();
    nactiRecepty(nejhorsi);
  }
})






// 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
// Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
// recept-hodnoceni, recept-nazev, recept-popis.

// 6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
