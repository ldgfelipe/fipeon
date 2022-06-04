<template>
	<v-card>
		<v-card-title>
			Lista de tareas
		</v-card-title>
		<v-card-text>

			<v-btn class="secondary" @click="creaNuevaTarea()"><v-icon>mdi-plus</v-icon></v-btn>
			<v-btn class="secondary" @click="cargaTareas()"><v-icon>mdi-reload</v-icon></v-btn>

			<v-data-table :headers="titulotareas" :items="tareas">
				<template v-slot:item.status="{ item }">
					<v-icon>{{item.status ? 'mdi-check' : 'mdi-close'}}</v-icon>
				</template>
				<template v-slot:item.file="{ item }">
					<v-icon v-if="item.file">mdi-folder-file</v-icon>
				</template>

				<template v-slot:item.editar="{ item }">
					<v-btn class="secondary" @click="editarTarea(item)"><v-icon>mdi-pencil</v-icon></v-btn>
				</template>

			</v-data-table>



 
			<v-dialog max-width="600" v-model="tareaventana" persistent >
				<v-card>
					<v-card-title>
						{{action==='crea' ? 'Crear Nueva Tarea' : 'Editar Tarea'}} <v-spacer></v-spacer> <v-btn @click="cierraVentanaTarea()" class="secondary"><v-icon>mdi-close</v-icon></v-btn>
					</v-card-title>
					<v-card-text>
						<v-text-field outlined v-model="tareaData.nombre" label="Nombre de Tarea"></v-text-field>
						<v-textarea label="Información de tarea" outlined v-model="tareaData.descripcion"></v-textarea>
						<v-file-input v-if="!tareaData.file"
							v-model="filetoload"
							  counter
							  show-size
							  truncate-length="22"
							></v-file-input>
							<v-btn   v-if="!tareaData.file" @click="subirArchivo()" class="secondary"><v-icon>mdi-cloud-upload</v-icon></v-btn>
							<v-chip v-if="tareaData.file" color="green">Tiene 1 Archivo<v-icon>mdi-arrow-right-bold-outline</v-icon></v-chip>
							<v-btn @click="abrirArchivo(tareaData.file)"  v-if="tareaData.file" class="primary" ><v-icon>mdi-archive-eye</v-icon></v-btn>
							<v-btn  v-if="tareaData.file" @click="eliminarArchivo(tareaData.file)" class="red"><v-icon>mdi-delete</v-icon></v-btn>

						<v-switch v-model="tareaData.status" :label="!tareaData.status ? 'Pendiente' : 'Finalizado' "></v-switch>
						<v-btn class="secondary" @click="guardaTarea()"><v-icon>mdi-content-save</v-icon></v-btn>
					</v-card-text>
				</v-card>
			</v-dialog>



		</v-card-text>
	</v-card>
</template>
<script>
export default {

	data(){
		return {
			tareaData:{
				nombre:"",
				descripcion:"",
				status:false
			},
			titulotareas:[
			{
				text:"Tarea",
				value:"nombre"
			},
			{
				text:"Archivo",
				value:"file"
			},
			{
				text:"Status",
				value:"status"
			},
			{
				text:"Editar",
				value:"editar"
			}
			],
			action:"",
			tareaventana:false,
			tareas:[],
			filetoload:"",
			msjupload:""

		}
	},
	created(){
		this.cargaTareas()
	},
	methods:{
		eliminarArchivo(file){
			  const storage = this.$fire.storage

               const desertRef = storage.refFromURL (file);


               desertRef.delete().then(()=>{
               	this.tareaData.file=""
               	this.guardaTarea()
               })
		},
		abrirArchivo(p){
			window.open(p,'_blank')
		},
		subirArchivo(){
			
			let storageRef=this.$fire.storage.ref();
			console.log(this.filetoload.type)


			var metadata = {
					  contentType: this.filetoload.type,
					};


				let archivoupload='files/'+this.proyecto.cliente+'/'+this.proyecto.id+'/'+this.filetoload.name;

				 var uploadTask =storageRef.child(archivoupload).put(this.filetoload,metadata)
				
					// Listen for state changes, errors, and completion of the upload.
					uploadTask.on('state_changed', // or 'state_changed'
					  (snapshot) => {
					    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					    this.msjupload='Upload is ' + progress + '% done';
					    switch (snapshot.state) {
					      case 'paused': // or 'paused'
					        this.msjupload='Upload is paused';
					        break;
					      case 'running': // or 'running'
					       this.msjupload='Upload is running';
					        break;
					    }
					  },
					  (error) => {
					    // A full list of error codes is available at
					    // https://firebase.google.com/docs/storage/web/handle-errors
					    switch (error.code) {
					      case 'storage/unauthorized':
					        // User doesn't have permission to access the object
					        break;
					      case 'storage/canceled':
					        // User canceled the upload
					        break;

					      // ...

					      case 'storage/unknown':
					        // Unknown error occurred, inspect error.serverResponse
					        break;
					    }
					  },
					  () => {
					    // Upload completed successfully, now we can get the download URL
					    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					      this.tareaData.file=downloadURL;
					      this.guardaTarea()
					    });
					  }
					);

		},
		creaNuevaTarea(){
			this.action="crea"
			this.tareaventana=true
		},
		editarTarea(p){
			this.action="edita"
			this.tareaventana=true
			this.tareaData=p
		},
		cierraVentanaTarea(){
			this.tareaventana=false
		},
		async guardaTarea(){
			this.tareaData.idproyecto=this.proyecto.id
			this.tareaData.idcliente=this.proyecto.cliente
			if(this.action==='crea'){
				this.tareaData={}
			await this.$fire.firestore.collection('tareas').add(this.tareaData)
			.then((tare)=>{
				this.tareaData.id=tare.id
				this.$fire.firestore.collection('tareas').doc(tare.id).update(this.tareaData)
				this.tareaventana=false
				this.cargaTareas()
			})

		}
		if(this.action==='edita'){
			await this.$fire.firestore.collection('tareas').doc(this.tareaData.id).update(this.tareaData)
			.then((re)=>{
					console.log(re)
						
						this.cargaTareas()
			})
		}
		},
		async cargaTareas(){
			this.tareas=[]
			if(this.proyecto){
			await this.$fire.firestore.collection('tareas').where('idproyecto','==',this.proyecto.id).get()
			.then((tar)=>{
				tar.forEach((ta)=>{
					this.tareas.push(ta.data())
				})
			})
		}
		}
	},
	props:{
		proyecto:{}
	},
	watch:{
		proyecto(){
			if(this.proyecto){
				this.cargaTareas()
			}
		}
	}

}
</script>