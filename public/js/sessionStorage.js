//limpia la sesion almacenanda
const clearSession = () => {
  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("user_id");
  window.sessionStorage.removeItem("user_email");
  window.sessionStorage.removeItem("user_image");
  window.sessionStorage.removeItem("user_name");
  window.sessionStorage.removeItem("user_rol");
  console.log("Session Clear");
};

//Obtine los datos de la sesion
const getSession = () => {
  let session = {};

  session.token = window.sessionStorage.getItem("token");
  session.userId = window.sessionStorage.getItem("user_id");
  session.userEmail = window.sessionStorage.getItem("user_email");
  session.userImage = window.sessionStorage.getItem("user_image");
  session.userName = window.sessionStorage.getItem("user_name");
  session.userRol = window.sessionStorage.getItem("user_rol");

  return session;
};

//almacena los datos de la sesion
const initSession = (token, user) => {
  window.sessionStorage.setItem("token", token);
  window.sessionStorage.setItem("user_id", user.uid);
  window.sessionStorage.setItem("user_email", user.email);
  window.sessionStorage.setItem("user_image", user.img);
  window.sessionStorage.setItem("user_name", user.name);
  window.sessionStorage.setItem("user_rol", user.rol.rol);
};
