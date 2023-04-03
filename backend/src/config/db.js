const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb+srv://josia:jude02@cluster0.fb53b9l.mongodb.net/HeinFor", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connected ♥♥"))
  .catch((err) => console.log("Error de connexion mongo " + err));
