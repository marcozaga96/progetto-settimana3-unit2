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
    const rowFigureDetail = document.getElementById("rowModify");
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
                            <p class="card-text">${singleFigure.description}</p>
                            <a href="./back-office.html?actionFigureId=${singleFigure._id}" class="btn btn-primary w-50 mb-2">Modifica</a>
                            <button class="btn btn-danger w-50" onclick="deleteActionFigure()">Elimina</button>
                        </div>
                    </div>
                </div>
            `;
  })
  .catch((error) => {
    console.log("ERRORE!", error);
  });

const deleteActionFigure = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + actionFigureId,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNWYzNWYyNjBjYzAwMTVjYzBkZTciLCJpYXQiOjE3MjE5ODI3NzMsImV4cCI6MTcyMzE5MjM3M30.IxgsP-B87OLTZ5eoPfo0vdzdz59V1SSils1h-6iYCBQ",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("ACTIONFIGURE ELIMINATO");
        location.assign("./home.html");
      } else {
        throw new Error("Problema nell'eliminazione");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
