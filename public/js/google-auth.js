let googleUser = {};
let url = window.location.hostname.includes("localhost")
  ? `${HOST_DEV}/api/auth/google`
  : `${HOST_PRO}/api/auth/google`;

var startApp = function () {
  gapi.load("auth2", function () {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id:GOOGLE_CLIENT_ID,
      cookiepolicy: "single_host_origin",
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById("customBtn"));
  });
};

function attachSignin(element) {
  auth2.attachClickHandler(
    element,
    {},
    function (googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

      const id_token = googleUser.getAuthResponse().id_token;
      const data = { id_token };

      axios
        .post(url, data)
        .then(function (response) {
          let token = response.data.token;
          let user = response.data.user;

          initSession(token, user);
          console.log(getSession());
          window.location.href='/';
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    function (error) {
      alert(JSON.stringify(error, undefined, 2));
    }
  );
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    clearSession();
    console.log("User signed out.");
  });
}
