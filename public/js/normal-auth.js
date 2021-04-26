let url = window.location.hostname.includes("localhost")
  ? `${HOST_DEV}/api/auth/login`
  : `${HOST_PRO}/api/auth/login`;

const login = ()=>{
    let email= document.getElementById('email').value;
    let password= document.getElementById('password').value;
    axios
        .post(url, {email,password})
        .then(function (response) {
          let token = response.data.token;
          let user = response.data.user;

          initSession(token, user);
          console.log(getSession());
          window.location.href='/'
        })
        .catch(function (error) {
          console.log(error);
        });
}

const logout = ()=>{

}