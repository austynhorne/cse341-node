const express = require("express");
const app = express();
const homeRouter = require("./routes/home");

app.use("/", homeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
