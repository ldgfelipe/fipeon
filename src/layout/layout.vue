<template>
  <router-view />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");

body {
  font-family: "Rubik", sans-serif;
}
</style>
<script>
import { store } from "../store";
import { auth } from '../firebase'
import router  from '../router'
export default {
  setup() {
      
    const valsesion = async () => {
        console.log('cargando autenticación')
                await auth.onAuthStateChanged((user)=>{
    
      if (user) {
                     console.log(user)
                    var useradd = {
                    uidLogin:user.uid,
                    correo:user.email,
                    emailVerified:user.emailVerified,
                    phoneNumber:user.phoneNumber,
                    photoURL:user.photoURL,
                    registroBy: "google",
                    login: true,
                };
        store.commit("datauserlogin", useradd);
      }else{
          router.push("/")
      }
      })
    };

    return {
      valsesion,
    };
  },
  mounted() {
    this.valsesion();
  },
};
</script>
