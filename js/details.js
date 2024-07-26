// recupero dalla stringa dell'URL il pezzo che contiene la parola chiave per l'id inserita nella home
const actionFigureId = new URLSearchParams(location.search).get(
  "actionFigureId"
);

fetch("https://striveschool-api.herokuapp.com/api/product/" + actionFigureId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNWYzNWYyNjBjYzAwMTVjYzBkZTciLCJpYXQiOjE3MjE5ODI3NzMsImV4cCI6MTcyMzE5MjM3M30.IxgsP-B87OLTZ5eoPfo0vdzdz59V1SSils1h-6iYCBQ",
  },
})
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nella chiamata");
    }
  })
  .then((singleFigure) => {
    console.log(singleFigure);
    const rowFigureDetail = document.getElementById("rowFigureDetail");
    rowFigureDetail.innerHTML = `
          <div class="col-6">
                  <div class="card">
                      <img
                          src="${singleFigure.imageUrl}"
                          class="card-img-top"
                          alt="event pic"
                      />
                      <div class="card-body text-center">
                          <h5 class="card-title">${singleFigure.name}</h5>
                          <p class="card-text">${singleFigure.brand}</p>
                          <p class="card-text">${singleFigure.description}<br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
                          officia laborum exercitationem numquam sunt in iure non, corporis
                          dignissimos, voluptates vitae dicta atque aperiam quisquam repudiandae
                          molestiae. Saepe, cumque dignissimos!</p>
                          <a href="#" class="btn btn-primary">${singleFigure.price}€ <br />AQUISTA SUBITO!!</a>
                      </div>
                  </div>
              </div>
          `;
  })
  .catch((error) => {
    console.log("ERRORE!", error);
  });
