<template>
	<div>
<h2> Administrador de clientes</h2>

		<v-btn class="secondary" @click="nuevocliente()"> <v-icon>mdi-plus</v-icon> </v-btn>

<v-data-table :headers="titulos" :items="clientes">
	<template v-slot:item.editar="{ item }">
		<v-btn @click="editarcliente(item)"><v-icon>mdi-file-document-edit</v-icon></v-btn>
		<v-btn @click="editaproyectos(item)"><v-icon>mdi-lan</v-icon></v-btn>
	</template>
</v-data-table>



	<v-dialog v-model="admincliente" max-width="500">
		<v-card  >
			<v-card-title class="secondary">
				{{action==='registro' ? 'Nuevo Cliente' : 'Edita Cliente'}}
			</v-card-title>
			<v-card-text>
				<br />
				<v-text-field label="Nombre de cliente" v-model="cliendata.nombre" outlined />
				<v-text-field label="Negocio " v-model="cliendata.negocio" outlined />
				<v-text-field label="Giro de Negocio o Empresa " v-model="cliendata.giro" outlined />
				<v-text-field label="Sitio Web" v-model="cliendata.web" outlined />
				<v-text-field label="Teléfono" v-model="cliendata.telefono" outlined />
				<v-text-field label="Correo" v-model="cliendata.correo" outlined />
				<v-textarea label="Observaciones" v-model="cliendata.observaciones" outlined ></v-textarea>
				<v-btn @click="guardarDatos()" class="secondary">{{action==='registro' ? 'Registra' : 'Actualizar'}}</v-btn>

			</v-card-text>
		</v-card>


	</v-dialog>



	<v-dialog v-model="proyectos" fullscreen>
		<proyectosdata :cliente="dataproyect" @cierraproyecto="cierraProyect($event)"></proyectosdata>
	</v-dialog>


	</div>
</template>
<script>
import proyectosdata from '@/components/proyectosdata.vue'
export default {
	data(){
		return {
			titulos:[
			{
				text:'Cliente',
				value:'nombre'
			},
			{
				text:'Teléfono',
				value:'telefono'
			},
			{
				text:'Proyectos',
				value:'nproyectos'
			},
			{
				text:'Editar',
				value:'editar'
			}
			],
			clientes:[],
			admincliente:false,
			action:"",
			cliendata:{},
			proyectos:false,
			dataproyect:{}

		}
	},
	created(){
		this.cargaclientes()

	},
	components:{
		proyectosdata
	},
	methods:{
		cierraProyect(){
			this.proyectos=false
			this.dataproyect={}
		},
		nuevocliente(){
			this.action='registro'
			this.admincliente=true
		},
		async cargaclientes(){
			this.clientes=[]
			await this.$fire.firestore.collection('clientes').get()
			.then((clients)=>{
				clients.forEach((cl)=>{
					this.clientes.push(cl.data())
				})
			})
		},
		async guardarDatos(){
				if(this.action==='registro'){
					await this.$fire.firestore.collection('clientes').add(this.cliendata)
					.then((client)=>{
						this.cliendata.uid=client.id
							this.$fire.firestore.collection('clientes').doc(client.id).update(this.cliendata)
							.then((locli)=>{
								this.admincliente=false
								this.cargaclientes()
							})
					})
				}
				if(this.action==='editar'){
					this.$fire.firestore.collection('clientes').doc(this.cliendata.uid).update(this.cliendata)
							.then((locli)=>{
								this.admincliente=false
								this.cargaclientes()
							})
				}
		},
		editarcliente(data){
			this.action="editar"
			this.admincliente=true
			this.cliendata=data
		},
		editaproyectos(p){
			this.proyectos=true
			this.dataproyect=p
		}
	}
}
</script>