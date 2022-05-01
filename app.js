
// Co je za úkol v tomto projektu:

// 1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
// HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

let kopie = recepty.slice(0);
let zobrazeneRecepty = recepty;


nactiRecepty(recepty);
function nactiRecepty(pole) {
  pole.forEach(recept => {
    let receptElement = document.createElement("div");
    receptElement.className = "recept";
    receptElement.dataset.id = recept.id;
    receptElement.addEventListener("click", () => {
      zobrazDetail(recept);
    })

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
  const zadanaHodnota = e.target.value.toLowerCase();
  const vyhledane = recepty.filter(najdiRecepty);
  function najdiRecepty(recept) {
    let obsah = recept.nadpis + recept.popis;
      if (obsah.toLowerCase().indexOf(zadanaHodnota) > -1) {
        return true
      }
  }
  zobrazeneRecepty = vyhledane;
  skryjRecepty();
  nactiRecepty(zobrazeneRecepty);
})



// 3) Doplň filtrovanání receptů podle kategorie.


let vyberKategorie = document.getElementById("kategorie");
vyberKategorie.addEventListener("change", e => {
  const zvolenaKategorie = e.target.value;
  console.log(zvolenaKategorie);
  if (zvolenaKategorie === "vse") {
    skryjRecepty();
    zobrazeneRecepty = kopie;
    nactiRecepty(zobrazeneRecepty);
  } else {
      const vysledek = recepty.filter(najdiKategorii);
      function najdiKategorii(recept) {
        if(recept.stitek === zvolenaKategorie) {
          return true;
        }
      }
      zobrazeneRecepty = vysledek;
      skryjRecepty();
      nactiRecepty(zobrazeneRecepty);
    }
});



// 4) Doplň řazení receptů podle hodnocení.

let vyberRazeni = document.getElementById("razeni");
vyberRazeni.addEventListener("change", e => {
  const zvoleneRazeni = e.target.value;
  
  if (zvoleneRazeni === "1") {
    let nejlepsi = zobrazeneRecepty.sort((a, b) => b.hodnoceni - a.hodnoceni);
    skryjRecepty();
    nactiRecepty(nejlepsi);
  } else if (zvoleneRazeni === "2") {
    skryjRecepty();
    let nejhorsi = zobrazeneRecepty.sort((a, b) => b.hodnoceni - a.hodnoceni).reverse();
    skryjRecepty();
    nactiRecepty(nejhorsi);
  } else if (zvoleneRazeni === "0") {
    skryjRecepty();
    nactiRecepty(kopie);
  }
});



// 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
// Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
// recept-hodnoceni, recept-nazev, recept-popis.


function zobrazDetail(recept) {
  let receptFotoElement = document.getElementById("recept-foto");
  receptFotoElement.src = recept.img;
  receptFotoElement.alt = recept.nadpis;

  let receptHodnoceniElement = document.getElementById("recept-hodnoceni");
  receptHodnoceniElement.textContent = recept.hodnoceni;

  let receptKategorieElement = document.getElementById("recept-kategorie");
  receptKategorieElement.textContent = recept.kategorie;

  let receptNazevElement = document.getElementById("recept-nazev");
  receptNazevElement.textContent = recept.nadpis;

  let receptPopisElement = document.getElementById("recept-popis");
  receptPopisElement.textContent = recept.popis;

  localStorage.posledniRecept = JSON.stringify(recept);
}


// 6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.


if (localStorage.length > 0 ) {
  let posledniRecept = JSON.parse(localStorage.posledniRecept);
  zobrazDetail(posledniRecept);
} else {
  zobrazDetail(recepty[0]);
}