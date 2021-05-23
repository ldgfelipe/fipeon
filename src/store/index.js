import { createStore } from 'vuex'
import { auth } from '../firebase'

export const store = createStore({
    state(){
        return {
            datosuser:{},
            is_login:false
        }
    },
    mutations:{
       datauserlogin(state,datos){
           state.datosuser=datos
           state.is_login=datos.login
       },
       logout(state){
        state.datosuser={}
        state.is_login=false
       }
    },
    actions:{
        logout({commit}){
            auth.signOut().then(() => {
                    commit('logout')
              }).catch((error) => {
                console.log(error)
              });
              
        }
    },
    getters:{

    },

})