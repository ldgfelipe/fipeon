<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          v-if="item.login === true ? logeado : true"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn to="/login" v-if="!logeado" class="primary"> Entrar </v-btn>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-cog-box</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              {{right ? 'mdi-arrow-collapse-left' : 'mdi-arrow-collapse-right' }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>{{right === true ? 'Mover Izquierda' : 'Mover Derecha'}}</v-list-item-title>
        </v-list-item>

        
<v-list-item>
          <v-list-item-action>
            <v-icon light  >
              {{$vuetify.theme.dark ? 'mdi-lightbulb-on-80' : ' mdi-lightbulb-outline'}}
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>

     
             
    <v-switch v-model="$vuetify.theme.dark" :label="!$vuetify.theme.dark===true ? 'Apagar' : 'Encender' "></v-switch>


          </v-list-item-title>

</v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} ldgframe</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapState } from 'vuex'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Inicio',
          login:false,
          to: '/'
        },
         {
          icon: 'mdi-apps',
          title:'tablero',
          login:true,
          to:'/dashboard'
        },
        {
          icon: 'mdi-account',
          title:'perfil',
          login:true,
          to:'/perfil'
        },
        {
          icon: 'mdi-logout',
          title:'Salir',
          login:true,
          to:'/logout'
        }
      ],
      miniVariant: false,


      right: true,
      rightDrawer: false,
      title: 'FLTools'
    }
  },
  computed:{
    ...mapState(['logeado'])
  }
}
</script>
