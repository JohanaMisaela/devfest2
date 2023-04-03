module.exports.signUpErrors = (err) => {
  let errors = { name: "", email: "", pwd: "mauvais password" };

  if (err.message.includes("name")) errors.name = "name incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("pwd"))
    errors.pwd = "le mot de passe doit faire 6 caractères minimum";

  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("name"))
    errors.name = "ce name est déjà pris";

  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = {
    email: "",
    pwd: "",
  };

  if (err.message.includes("email")) errors.email = "Email inconnu";
  if (err.message.includes("pwd")) errors.pwd = "Mot de passe incorrect";
  return errors;
};
module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalide file"))
    errors.format = "format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "La taille depass de 500ko";

  return errors;
};

// image error
module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalide file"))
    errors.format = "format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "La taille depass de 500ko";

  return errors;
};
