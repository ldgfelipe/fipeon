<template>
  <v-card>
    <v-card-title class="primary">
      {{ proyectoSeleccionado.negocio }}
      <v-spacer></v-spacer>
      <v-btn class="secondary" @click="cierraProyect()"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-btn class="secondary" @click="crearProyecto()"
        ><v-icon>mdi-archive-plus-outline</v-icon></v-btn
      >

      <v-btn class="secondary" @click="cargaProyectos()"
        ><v-icon>mdi-reload</v-icon></v-btn
      >

      <v-row>
        <v-col
          cols="12"
          md="4"
          v-if="listadoproyectos.length > 0"
          v-for="(proj, index) in listadoproyectos"
          :key="'project' + index"
        >
          <v-card>
            <v-card-title>
              {{ proj.nombre }}
            </v-card-title>
            <v-card-text>
              Status:<b> {{ proj.status }}</b>

              <hr />

              Proceso:<b>{{ proj.porcentaje }}%</b><br /><br />

              <v-btn @click="editaProyecto(proj)"
                ><v-icon>mdi-application-parentheses</v-icon></v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="projWork">
        <v-card>
          <v-card-title class="primary">
            {{
              action === 'crear' ? 'Crear Nuevo Proyecto' : 'Editar Projecto'
            }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              label="Nombre"
              v-model="projData.nombre"
            ></v-text-field>
            <v-text-field
              outlined
              label="Descripción"
              v-model="projData.descripcion"
            ></v-text-field>
            <v-autocomplete
              v-model="projData.tags"
              :items="tipoProyecto"
              chips
              label="Palabras Clave de Projecto"
              full-width
              hide-details
              hide-no-data
              hide-selected
              multiple
              single-line
            ></v-autocomplete>
            <v-btn class="secondary" @click="guardarCambios()">{{
              action === 'crear' ? 'Crear' : 'Actualizar'
            }}</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editproyect" persistent fullscreen>
        <editaproyecto
          :proyecto="infoproyect"
          @cierraEditProyect="cierraEditPro($event)"
        ></editaproyecto>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import editaproyecto from '@/components/editaproyecto.vue'
export default {
  data() {
    return {
      projWork: false,
      action: '',
      projData: {},
      editproyect: false,
      infoproyect: {},
      nproyectos: 0,
      tipoProyecto: [
        'Publicidad Redes',
        'Editar Imagenes',
        'Wordpress',
        'vuejs',
        'javascript',
        'php',
        'Laravel',
        'Excel',
        'React',
        'Angular',
        'Ruby',
        'Python',
      ],
    }
  },
  computed: {
    ...mapState(['listadoproyectos', 'listadoclientes','proyectoSeleccionado']),
  },
  created() {
    this.cargaProyectos()
  },
  methods: {
    ...mapMutations(['cambiaProyectos']),
    cierraEditPro(p) {
      this.editproyect = p
      this.infoproyect = {}
    },
    cierraProyect() {
      this.$emit('cierraproyecto', false)
    },
    crearProyecto() {
      this.projWork = true
      this.action = 'crear'
    },
    editaProyecto(p) {
      this.editproyect = true
      this.infoproyect = p
    },
    guardarCambios() {
      this.projData.cliente = this.proyectoSeleccionado.uid
      if (this.action === 'crear') {
        this.$fire.firestore
          .collection('proyectos')
          .add(this.projData)
          .then((npro) => {
            this.projData.id = npro.id
            this.$fire.firestore
              .collection('proyectos')
              .doc(npro.id)
              .update(this.projData)
              .then((data) => {
                this.projWork = false
                this.cargaProyectos()
              })
          })
      }
    },
    async updataDatosProyecto() {
      this.proyectoSeleccionado.nproyectos = this.nproyectos
      await this.$fire.firestore
        .collection('clientes')
        .doc(this.proyectoSeleccionado.uid)
        .update(this.proyectoSeleccionado)
    },
    async cargaProyectos() {
      var proyectos = []
      this.nproyectos = 0
      await this.$fire.firestore
        .collection('proyectos')
        .where('cliente', '==', this.proyectoSeleccionado.uid)
        .get()
        .then((project) => {
          this.nproyectos = project.docs.length
          project.forEach((pro) => {
            proyectos.push(pro.data())
          })
          this.cambiaProyectos(proyectos)
        })
      this.updataDatosProyecto()
    },
  },
  components: {
    editaproyecto,
  },
}
</script>
