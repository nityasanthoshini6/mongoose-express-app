const url = "http://127.0.0.1:8000/api/v1/movies";

// Read all movies
const readAllMovies = () => {
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      console.log("All movies:");
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while fetching all movies:", err);
    });
};

// Read movie by ID
const readMovieById = (id) => {
  fetch(`${url}/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("Movie by ID:");
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while fetching movie:", err);
    });
};

// Create movie
const createMovie = (payload) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("Movie created:");
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while creating movie:", err);
    });
};

// Update movie by ID
const updateMovie = (id, payload) => {
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("Movie updated:");
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while updating movie:", err);
    });
};

// Delete movie by ID
const deleteMovie = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("Movie deleted:");
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while deleting movie:", err);
    });
};

// Call only one function at a time

//readAllMovies();

/**createMovie({
title: "RRR",
director: "S. S. Rajamouli",
category: "Action",
price: 250,
});**/

//readMovieById("6acdddf88bd562bd96a8780e");

/**updateMovie("6acdddf88bd562bd96a8780e", {
  price: 300,
  category: "Action Drama",
 });**/

deleteMovie("6acdddf88bd562bd96a8780e");