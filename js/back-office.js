const actionFigureId = new URLSearchParams(location.search).get(
  "actionFigureId"
);
if (actionFigureId) {
  fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + actionFigureId,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNWYzNWYyNjBjYzAwMTVjYzBkZTciLCJpYXQiOjE3MjE5ODI3NzMsImV4cCI6MTcyMzE5MjM3M30.IxgsP-B87OLTZ5eoPfo0vdzdz59V1SSils1h-6iYCBQ",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella chiamata");
      }
    })
    .then((singleFigure) => {
      console.log("singleFigure", singleFigure);

      document.getElementById("imageUrl").value = singleFigure.imageUrl;
      document.getElementById("name").value = singleFigure.name;
      document.getElementById("description").value = singleFigure.description;
      document.getElementById("brand").value = singleFigure.brand;
      document.getElementById("price").value = singleFigure.price;
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
}
let methods;
if (actionFigureId) {
  // modalità modifica
  methods = "PUT";
} else {
  // modalità creazione
  methods = "POST";
}
let URLToUse;
if (actionFigureId) {
  // modalità modifica
  URLToUse =
    "https://striveschool-api.herokuapp.com/api/product/" + actionFigureId;
} else {
  // modalità creazione
  URLToUse = "https://striveschool-api.herokuapp.com/api/product/";
}

class ActionFigure {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}
const eventForm = document.getElementById("eventForm");
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //   recupero id dei vari campi
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;
  //   creo l'oggetto con le varie proprietà
  const newActionFigure = new ActionFigure(
    name,
    description,
    brand,
    imageUrl,
    price
  );
  // chiamata POST per creare l'oggetto preso dal form
  fetch(URLToUse, {
    method: methods,
    body: JSON.stringify(newActionFigure),
    //   rendo l'oggetto una stringa
    headers: {
      "Content-Type": "application/json",
      // ricordo al API che questo oggetto è un oggetto e non una stringa quindi ritrasformarlo in oggetto
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNWYzNWYyNjBjYzAwMTVjYzBkZTciLCJpYXQiOjE3MjE5ODI3NzMsImV4cCI6MTcyMzE5MjM3M30.IxgsP-B87OLTZ5eoPfo0vdzdz59V1SSils1h-6iYCBQ",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("ActionFigure inserito");
      } else {
        alert("Errore nell'inserimento dei dati");
        throw new Error("Errore nel salvataggio");
      }
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
});
