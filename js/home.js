const getProducts = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
    .then((figures) => {
      console.log(figures);
      figures.forEach((singleFigure) => {
        const newSigleFigure = `
        <div class="col-12 col-md-4 col-lg-3">
                <div class="card">
                    <img
                        src="${singleFigure.imageUrl}"
                        class="card-img-top"
                        alt="event pic"
                    />
                    <div class="card-body text-center">
                        <h5 class="card-title">${singleFigure.name}</h5>
                        <p class="card-text">${singleFigure.brand}</p>
                        <p class="card-text">${singleFigure.description}</p>

                        <a href="./details.html?actionFigureId=${singleFigure._id}" class="btn btn-primary w-50 mb-2">Vai ai dettagli</a>
                        <a href="./modify.html?actionFigureId=${singleFigure._id}" class="btn btn-primary w-50">Modifica</a>
                    </div>
                </div>
            </div>
        `;
        const rowFigure = document.getElementById("rowFigure");
        rowFigure.innerHTML += newSigleFigure;
      });
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
};
getProducts();
