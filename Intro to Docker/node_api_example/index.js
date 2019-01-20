const express = require("express");
const app = express();

//Define port. Default to 3000 if no env var is set.
const port = process.env.PORT ||  3000;

app.get("/", (request, response) => {
    response.send("Hello, CruzHacks!")
});

// Start server to listen on port 3000.
app.listen(port, () => console.log("Listening On Port " + port))
