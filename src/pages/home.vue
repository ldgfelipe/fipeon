<template>
  <el-main>
    <logo />

    <div v-if="store.state.is_login === false"  style="text-align:center;">
         <el-button @click="loginGoogle">
        <img
          src="https://img.icons8.com/cute-clipart/2x/google-logo.png"
          width="50"
        />
      </el-button>
      <!-- <el-button > <img src="http://download.seaicons.com/download/i97461/sicons/flat-shadow-social/sicons-flat-shadow-social-facebook.ico" width="50" /> </el-button>-->
      <el-button @click="loginUser = true"
        ><img
          src="https://lh3.googleusercontent.com/proxy/nnOcE5j2tFogAjqbPeGWSX1XWdQWB3AWBms1NLKAIIlkkc7er_uQ_aIA0tzjfHc7jDdWbDWr_8_26r6KPYkCyQ"
          width="50"
      /></el-button>
    </div>
    <div v-if="store.state.is_login === true"  style="text-align:center;">
   <b>  Usuario: {{ store.state.datosuser.correo }}</b><br />
   <el-button @click="goto('/dashboard')" >Mi tablero</el-button>  <el-button @click="logout()" >Cerrar Sesión</el-button>
    </div>

    <el-dialog v-model="loginUser" width="20%" center destroy-on-close>
      <div style="text-align:center;">
        <label>Usuario</label>
        <el-input
          type="text"
          placeholder="Usuario"
          v-model="access.user"
          style="text-align:center"
        />
        <label>Password</label>
        <el-input
          type="password"
          placeholder="Contraseña"
          v-model="access.pass"
          style="text-align:center"
        />
<br />
           Tipo de Acceso:
      <el-switch
        v-model="loginregister"
        active-color="blue"
        inactive-color="green"
      />{{ loginregister === false ? "Acceder" : "Regístrate"
      }}<br /><br /><br />

        <el-button type="primary" @click="loginUserPass">Ingresar</el-button>


      </div>
    </el-dialog>
  </el-main>
</template>
<script>
import { ref } from "vue";
import logo from "@/components/icon.vue";
import { fb, auth, db } from "../firebase";
import { useStore } from "vuex";
import router  from '../router'
export default {
  setup() {
    const store = useStore();
    const access = ref({});
    const datauser = ref({});
    const loginUser = ref(false);
    const loginregister = ref(false);
    const mensaje = ref("")

    const loginGoogle = async () => {
      try {
        const provider = new fb.auth.GoogleAuthProvider();
        const user = await auth.signInWithPopup(provider);
        var useradd = {
          uidLogin: user.user.uid,
          correo: user.user.email,
          emailVerified: user.user.emailVerified,
          phoneNumber: user.user.phoneNumber,
          photoURL: user.user.photoURL,
          registroBy: "google",
          login: true,
        };
        db.collection('Usuarios').where('uidLogin','==',user.user.uid).get()
        .then((us)=>{
          if(us.empty===true){
               db.collection("Usuarios").add(useradd);
          }
               store.commit("datauserlogin", useradd);

        })
     
      } catch (error) {
                 mensaje.value=error.message;
      }
    };
  const goto = (os) =>{
    router.push(os)
  }
    const loginUserPass = async () => {
      if (loginregister.value === true) {
        await auth
          .createUserWithEmailAndPassword(access.value.user, access.value.pass)
          .then((userCredencial) => {
            loginUser.value = false;
            var useradd = {
              uidLogin: userCredencial.user.uid,
              correo: userCredencial.user.email,
              emailVerified: userCredencial.user.emailVerified,
              phoneNumber: userCredencial.user.phoneNumber,
              photoURL: userCredencial.user.photoURL,
              registroBy: "userpass",
              login: true,
            };

            db.collection("Usuarios").add(useradd);
            store.commit("datauserlogin", useradd);
          })
          .catch((error) => {
                     mensaje.value=error.message;
          });
      } else {
        await auth
          .signInWithEmailAndPassword(access.value.user, access.value.pass)
          .then((userCredencial) => {
            // Signed in
            loginUser.value = false;
            var useradd = {
              uidLogin: userCredencial.user.uid,
              correo: userCredencial.user.email,
              emailVerified: userCredencial.user.emailVerified,
              phoneNumber: userCredencial.user.phoneNumber,
              photoURL: userCredencial.user.photoURL,
              registroBy: "userpass",
              login: true,
            };

            store.commit("datauserlogin", useradd);
            // ...
          })
          .catch((error) => {
            mensaje.value=error.message;
          });
      }
    };

    const logout = ()=>{
      store.dispatch('logout')
    }


    return {
      loginGoogle,
      loginUser,
      access,
      datauser,
      store,
      loginUserPass,
      loginregister,
      mensaje,
      logout,
      goto
    };
  },
  mounted() {},
  components: {
    logo,
  },
};
</script>
<style></style>
