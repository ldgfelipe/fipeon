<template>
    <div class="templatesite">
      
      <layout />

    </div>

</template> 
<script>

import layout from './layout/layout.vue'

export default {
  name: 'App',
  setup(){

  },
  components:{
    layout
  }
}
</script>

<style>
.templatesite{
  background-image: url('./assets/images/footer.png');
  background-position: bottom;
  background-repeat: no-repeat;
  margin:0px;
  padding:0px;
  min-height:400px;
  height:100%;

}
</style>
