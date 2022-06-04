<template>
    <v-main>
         <v-card max-width="500" class="ma-auto">
           <v-card-title class="primary">
                Inicia Sesión
           </v-card-title>
           <v-card-text>

            <v-tabs>
                <v-tab>Entrar</v-tab>
                <v-tab>Registro</v-tab>
                <v-tab-item>
                        <v-text-field v-model="login.user" label="Correo" @keyup.enter="iniciarCorreo()" outlined  />
                        <v-text-field v-model="login.pass" type="password" @keyup.enter="iniciarCorreo()" outlined label="Contraseña" />

                        <v-btn class="primary" @click="iniciarCorreo()">Entrar</v-btn>

                       <v-chip v-if="tpmsj!=''" :color="tpmsj"> {{mensaje ? mensaje : ""}}</v-chip>
                </v-tab-item>
                <v-tab-item>
                    
                        <v-text-field label="Nombre" v-model="registro.nombre" outlined /> 
                        <v-text-field label="Correo" v-model="registro.correo" outlined />
                        <v-text-field label="Contraseña"  v-model="registro.pass" outlined type="password" />
                        <v-btn @click="crearCuenta()" class="primary">Crear Cuenta</v-btn>
                        <v-chip v-if="tpmsj!=''" :color="tpmsj"> {{mensaje ? mensaje : ""}}</v-chip>

                </v-tab-item>

            </v-tabs>
            
           </v-card-text>
       </v-card>
    </v-main>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
    export default {
        data(){
            return {

                login:{},
                registro:{},
                mensaje:"",
                tpmsj:""

            }
        },
        mounted(){
            this.logeado === true ? this.$router.push('/') : ""
        },
        computed:{
            ...mapState(['logeado'])
        },
        methods:{
            ...mapMutations(['cambiaLogin']),
           async iniciarCorreo(){
                /// vaida firebase auth
            await this.$fire.auth.signInWithEmailAndPassword(this.login.user,this.login.pass)
            .then((userCredential) => {
                // Signed in
                this.$router.push("/dashboard")
                 this.alerta("green","Validación correcta")
                    this.cambiaLogin(true)
                // ...
              })
              .catch((error) => {
                this.alerta("red","Error de validación verifique sus datos")
              });
    

            },
            alerta(tp,msj){
                this.tpmsj=tp
                this.mensaje=msj
             setTimeout(()=>{
                this.mensaje=""
                 this.tpmsj=""
             },3000)

            },
            async crearCuenta(){
                await this.$fire.auth.createUserWithEmailAndPassword(this.registro.correo,this.registro.pass)
                .then((user)=>{
                    this.alerta("green","Usuario registrado correctamente")
                        
                    this.creaUsuario()

                })
                .catch((err)=>{
                    this.alerta("red","No se puede registrar en este momento intente mas tarde")
                })

            },
            async creaUsuario(){
                await this.$fire.firestore.collection('usuarios').add(this.registro)
                .then((user)=>{
                    this.registro.uid=user.id
                    this.$fire.firestore.collection('usuarios').doc(user.id).update(this.registro)
                    .then((reg)=>{
                           this.cambiaLogin(true)
                           this.$router.push("/dashboard")
                    })
                     
                })
            }
        }
    }


</script>