const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");
const jokeRoutes = require("./routes/jokeRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");

app.use(cors());
app.use(express.json());
app.use("/api", jokeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
