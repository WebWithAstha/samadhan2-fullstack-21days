const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));

// Mount routes
app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
