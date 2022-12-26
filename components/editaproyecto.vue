<template>
  <v-card>
    <v-card-title class="primary">
      {{ proyecto.nombre }} <v-spacer></v-spacer>
      <v-btn @click="cerrarEditProyect()" class="secondary"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4" elevations="10">
          <v-select
            v-model="proyectdata.status"
            :items="['en proceso', 'pendiente']"
          ></v-select>
          <hr />
          <h3>Calcula Porcentaje de desarrollo</h3>
          <v-btn class="secondary" @click="validaporcentaje()"
            ><v-icon>mdi-reload</v-icon></v-btn
          >
          <br /><br />
          <div style="width: 100%; font-size: 50px; text-align: center">
            {{ porcentaje }}%
          </div>
          <div>
            Total de tareas:{{ this.ntareas }}
            <hr />
            Tareas Terminadas: {{ this.tareasTerminadas }}
          </div>
        </v-col>
        <v-col cols="12" md="8" elevations="10">
          <listapendientes :proyecto="proyectdata"></listapendientes>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn class="secondary" @click="guardarDatosProyeecto()"
            ><v-icon>mdi-content-save</v-icon></v-btn
          >
          <v-btn class="secondary" @click="eliminarTarea()"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import listapendientes from '@/components/listapendientes.vue'
export default {
  data() {
    return {
      proyectdata: {},
      ntareas: 0,
      tareasTerminadas: 0,
      porcentaje: 0,
    }
  },

  methods: {
    validaporcentaje() {
      this.ntareas = 0
      this.tareasTerminadas = 0
      this.porcentaje = 0

      this.$fire.firestore
        .collection('tareas')
        .where('idproyecto', '==', this.proyecto.id)
        .get()
        .then((tareas) => {
          console.log('cargando tareas')
          this.ntareas = tareas.docs.length

          tareas.forEach((p) => {
            if (p.data().status === true) {
              this.tareasTerminadas = this.tareasTerminadas + 1
            }
          })

          this.porcentaje = (this.tareasTerminadas / this.ntareas) * 100

          this.proyectdata.ntareas = this.ntareas
          this.proyectdata.porcentaje = this.porcentaje
          this.proyectdata.tareasTerminadas = this.tareasTerminadas
        })
    },
    cerrarEditProyect() {
      this.$emit('cierraEditProyect', false)
    },
    /// elimina el proyecto
    eliminarTarea() {
      this.$fire.firestore
        .collection('proyectos')
        .doc(this.proyectdata.id)
        .delete()
        .then((data) => {
          this.cerrarEditProyect()
        })
    },
    async guardarDatosProyeecto() {
      await this.$fire.firestore
        .collection('proyectos')
        .doc(this.proyecto.id)
        .update(this.proyectdata)
        .then((datos) => {
          console.log(datos)
        })
    },
  },
  components: {
    listapendientes,
  },
  props: {
    proyecto: {},
  },
  created() {
    this.proyectdata = this.proyecto
    this.ntareas = this.proyectdata.ntareas ? this.proyectdata.ntareas : 0
    this.tareasTerminadas = this.proyectdata.tareasTerminadas
      ? this.proyectdata.tareasTerminadas
      : 0
    this.porcentaje = this.proyectdata.porcentaje
      ? this.proyectdata.porcentaje
      : 0
  },
  watch: {
    proyecto() {
      this.proyectdata = this.proyecto
      this.ntareas = this.proyectdata.ntareas ? this.proyectdata.ntareas : 0
      this.tareasTerminadas = this.proyectdata.tareasTerminadas
        ? this.proyectdata.tareasTerminadas
        : 0
      this.porcentaje = this.proyectdata.porcentaje
        ? this.proyectdata.porcentaje
        : 0
    },
  },
}
</script>
