
// Co je za úkol v tomto projektu:

// 1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
// HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

// 2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
// by se měl seznam receptů vyfiltrovat podle hledaného slova.

// 3) Doplň filtrovanání receptů podle kategorie.

// 4) Doplň řazení receptů podle hodnocení.

// 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
// Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
// recept-hodnoceni, recept-nazev, recept-popis.

// 6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.



// GLOBÁLNÍ PROMĚNNÉ:

let puvodniPole = recepty.slice(0);
let zobrazeneRecepty = recepty;


// EVENT-LISTENERY NA OVLÁDACÍ PRVKY:

document.getElementById("hledat").addEventListener("input", vyhledavac);
document.getElementById("kategorie").addEventListener("change", trideni);
document.getElementById("razeni").addEventListener("change", serazeni);


// GENEROVÁNÍ SEZNAMU RECEPTŮ: 

nactiRecepty(recepty);

// GENEROVÁNÍ DETAILU RECEPTU:

posledniRecept();



// DEFINICE FUNKCÍ:

function nactiRecepty(pole) {

  pole.forEach(recept => {
    let receptElement = document.createElement("div");
    receptElement.className = "recept";
    receptElement.dataset.id = recept.id;
    receptElement.addEventListener("click", () => { zobrazDetail(recept); })

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



function zobrazDetail(recept) {

  document.getElementById("recept-foto").src = recept.img;
  document.getElementById("recept-foto").alt = recept.nadpis;

  document.getElementById("recept-hodnoceni").textContent = recept.hodnoceni;

  document.getElementById("recept-kategorie").textContent = recept.kategorie;

  document.getElementById("recept-nazev").textContent = recept.nadpis;

  document.getElementById("recept-popis").textContent = recept.popis;

  localStorage.posledniRecept = JSON.stringify(recept);
}



function posledniRecept() {

  if (localStorage.length > 0 ) {


    zobrazDetail(JSON.parse(localStorage.posledniRecept));
  
  } else {
  
    zobrazDetail(recepty[0]);
  
  }
}



// FUNKCE OVLÁDACÍCH PRVKŮ: 


function vyhledavac(event) {

  function filtrNazvu(recept) {
      if (recept.nadpis.toLowerCase().indexOf(event.target.value.toLowerCase() ) > -1) {
        return true
      }
  }

  skryjRecepty();
  zobrazeneRecepty = recepty.filter(filtrNazvu);
  nactiRecepty(zobrazeneRecepty);
}



function trideni (event) {

  const zvolenaKategorie = event.target.value;

  function filtrKategorie(recept) {
    if(recept.stitek === zvolenaKategorie) {
      return true;
    }
  }

  if (zvolenaKategorie === "vse") {

    skryjRecepty();
    zobrazeneRecepty = puvodniPole;
    nactiRecepty(zobrazeneRecepty);

  } else {

      skryjRecepty();
      zobrazeneRecepty = recepty.filter(filtrKategorie);
      nactiRecepty(zobrazeneRecepty);

    }
};



function serazeni(event) {

  const zvoleneRazeni = event.target.value;
  
  if (zvoleneRazeni === "1") {

    let nejlepsi = zobrazeneRecepty.sort((a, b) => b.hodnoceni - a.hodnoceni);
    skryjRecepty();
    nactiRecepty(nejlepsi);

  } else if (zvoleneRazeni === "2") {

    let nejhorsi = zobrazeneRecepty.sort((a, b) => b.hodnoceni - a.hodnoceni).reverse();
    skryjRecepty();
    nactiRecepty(nejhorsi);

  } else {

    skryjRecepty();
    nactiRecepty(puvodniPole);
  }
};