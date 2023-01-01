let xhr = new XMLHttpRequest(); //on creer un objet xhttpRequest
xhr.open("GET", "movies.json", true); // on veut récupérer quelque chose donc c'est get et le chemin de la ressource
xhr.send(); // pour déclencher la demande de la ressource;
let table_rows;
let arr;
xhr.onload = function () {
  arr = JSON.parse(this.responseText);
  htmldata(arr);
  table_rows = document.querySelectorAll("tbody tr");
  console.log(table_rows);
};
function htmldata(arr) {
  let tablerow = "";
  // pour récupérer les éléments de json puis afficher sur navigateur
  for (let i = 0; i < arr.length; i++) {
    let acteurs = "";
    // pour récupérer les éléments des acteurs
    for (let k = 0; k < arr[i].Acteurs.length; k++) {
      acteurs += `<p>${arr[i].Acteurs[k].NomPrénom} ${arr[i].Acteurs[k].Nationalité}</p>`;
    }
    tablerow += `<tr>
        <td scope="row">${arr[i].Titre}</td>
        <td>${arr[i].Réalisateur}</td>
        <td>${arr[i].Durée}</td>
        <td>${arr[i].Annéedeproduction}</td>
        <td><img src="${arr[i].Poster}"</td>
        <td>${arr[i].Festivals}</td>
        <td>${acteurs}</td>
 </tr>`;
    tablebody = document.getElementById("infotable");
    tablebody.innerHTML = tablerow;
  }
}

let arrNew = []; // pour filtrer data d'array

//=========================== la méthode de recherche ============================//
document.getElementById("search").addEventListener("keyup", function () {
  let search = this.value.toLowerCase();
  arrNew = arr.filter(function (val) {
    if (
      val.Titre.toLowerCase().includes(search) ||
      val.Réalisateur.toLowerCase().includes(search) ||
      val.Durée.toLowerCase().includes(search) ||
      val.Annéedeproduction.toLowerCase().includes(search) ||
      val.Festivals.includes(search)
    ) {
      let newObj = {
        Titre: val.Titre,
        Réalisateur: val.Réalisateur,
        Durée: val.Durée,
        Annéedeproduction: val.Annéedeproduction,
        Poster: val.Poster,
        Festivals: val.Festivals,
        Acteurs: val.Acteurs,
      };
      return newObj;
    } else {
      tablebody.innerHTML = "";
    }
  });
  console.log(arrNew);
  htmldata(arrNew);
  console.log("test");
});
//================================= la méthode de sorte =========================//
// Titre
const titleHeader = document.querySelector("#title");
let moviesSortedByTitle = false;
titleHeader.addEventListener("click", (e) => {
  if (!moviesSortedByTitle) {
    arr.sort((a, b) => a.Titre.localeCompare(b.Titre));
    moviesSortedByTitle = true;
  } else {
    arr.reverse();
  }
  htmldata(arr);
});
// Réalisateur
const directorHeader = document.querySelector("#director");
let moviesSortedByDirector = false;
directorHeader.addEventListener("click", (e) => {
  if (!moviesSortedByDirector) {
    arr.sort((a, b) => a.Réalisateur.localeCompare(b.Réalisateur));
    moviesSortedByDirector = true;
  } else {
    arr.reverse();
  }
  htmldata(arr);
});
// Durée
const durationHeader = document.querySelector("#duration");
let moviesSortedByDuration = false;
durationHeader.addEventListener("click", (e) => {
  if (!moviesSortedByDuration) {
    arr.sort((a, b) => a.Durée.localeCompare(b.Durée));
    moviesSortedByDuration = true;
  } else {
    arr.reverse();
  }
  htmldata(arr);
});
// Année de production
const dateHeader = document.querySelector("#date");
let moviesSortedByDate = false;
dateHeader.addEventListener("click", (e) => {
  if (!moviesSortedByDate) {
    data.sort((a, b) => a.Annéedeproduction - b.Annéedeproduction);
    moviesSortedByDate = true;
  } else {
    data.reverse();
  }
  showData(data);
});
