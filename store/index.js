const state = () => ({
  logeado: false,
  listadoclientes: [],
  listadoproyectos: [],
  listadotareas: [],
  proyectoSeleccionado:{},
  nproyectos:0
})

const mutations = {
  cambiaLogin(state, data) {
    state.logeado = data
  },
  cambiaClientes(state, data) {
 
    state.listadoclientes = data
  },
  cambiaProyectos(state, data) {
    state.listadoproyectos = data
  },
  cambiaTareas(state, data) {
    state.listadotareas = data
  },
  cambiaProyectoSeleccionado(state,data){
    state.proyectoSeleccionado=data
  },
  cambiaNproyectos(state,data){
    state.nproyectos=data
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (authUser) {
      state.logeado = true
    } else {
      state.logeado = false
    }
  },
}

const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  },
  async cargaClientes(ctx,datos){
      await this.$fire.firestore
        .collection('clientes')
        .get()
        .then((clients) => {
          var clientes = []
          clients.forEach((cl) => {
            clientes.push(cl.data())
          })
          ctx.commit('cambiaClientes',clientes)
        })
  },
  cargaTareas(ctx,datos){

  },
  async cargaProyectos(ctx,datos){
    await this.$fire.firestore
    .collection('proyectos')
    .where('cliente', '==', ctx.state.proyectoSeleccionado.uid)
    .get()
    .then((project) => {
      ctx.commit('cambiaNproyectos',project.docs.length)
      project.forEach((pro) => {
        proyectos.push(pro.data())
      })
      this.cambiaProyectos(proyectos)
    })
  }
}

export { state, mutations, actions }
