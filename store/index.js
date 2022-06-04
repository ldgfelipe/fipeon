 const state = () => ({
  logeado:false
})


 const mutations  = {

 	cambiaLogin(state,data){
 		state.logeado=data

 	},
     ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
if(authUser){
    state.logeado=true
}else{
   state.logeado=false
}


}
 }

 const actions = {
onAuthStateChangedAction: (ctx, { authUser, claims }) => {
  if (!authUser) {
    // claims = null
    // Perform logout operations
  } else {
    // Do something with the authUser and the claims object...
  }
}
 }

export {
	state,
	mutations,
    actions
}