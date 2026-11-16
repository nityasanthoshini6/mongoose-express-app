import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Problem while connecting MongoDB:", err);
  });

// Movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: String,
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

// Create movie
app.post("/api/v1/movies", (req, res, next) => {
  const movie = req.body;
  const newMovie = new Movie(movie);

  newMovie
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Movie created successfully",
        data: result,
      });
    })
    
   .catch((err) => {
     console.error("Create movie error:", err);
     err.status = 500;
     next(err);
});

});

// Get all movies
app.get("/api/v1/movies", (req, res, next) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  Movie.find(filter)
    .then((result) => {
      res.status(200).json({
        message: "Movies retrieved successfully",
        data: result,
      });
    })
    .catch((err) => {
      err.status = 500;
      err.message = "Problem while retrieving movies";
      next(err);
    });
});

// Get movie by ID
app.get("/api/v1/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((result) => {
      if (!result) {
        const error = new Error("Movie not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Movie retrieved successfully",
        data: result,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
        err.message = "Problem while retrieving movie";
      }

      next(err);
    });
});

// Update movie by ID
app.put("/api/v1/movies/:id", (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  Movie.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .then((result) => {
      if (!result) {
        const error = new Error("Movie not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Movie updated successfully",
        data: result,
      });
    })
    
.catch((err) => {
  console.error("Update movie error:", err);
  err.status = 500;
  next(err);
});

});

// Delete movie by ID
app.delete("/api/v1/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        const error = new Error("Movie not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Movie deleted successfully",
        data: result,
      });
    })
    
.catch((err) => {
  console.error("Delete movie error:", err);
  err.status = 500;
  next(err);
});

});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});