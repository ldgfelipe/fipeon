<template>
	<v-main>
		Cerrando Sesión
	</v-main>

</template>

<script>
import { mapMutations } from 'vuex'
export default {
mounted(){
	this.cerrandoSesion()
},
	methods:{
		...mapMutations(['cambiaLogin']),
		async cerrandoSesion(){
			await this.$fire.auth.signOut()
			.then((log)=>{
				console.log('Cerrando Sesión')
				
				this.cambiaLogin(false)
				this.$router.push("/")
			})
			.catch((err)=>{
				console.log(err)
				
				this.cambiaLogin(false)
				this.$router.push("/")
			})
		}
	}
}
</script>
