<template>
	<div>
		<adminclientes></adminclientes>
	</div>
</template>
<script>
/* herramientas de uso  
	Gestor de Clientes -> Administración de proyectos -> Proceso de desarrollo de proyectos -> check tareas y porcentajes
										|
										v
					  landind page de proyectos realizados
									
*/
import { mapState,mapActions } from  'vuex'
import adminclientes from '@/components/gestordeclientes.vue'

export default {
mounted(){
	!this.logeado ?  this.$router.push("/") : ""
},	
computed:{
	...mapState(['logeado'])
},
methods:{

},
components:{
	adminclientes
}

}


</script>