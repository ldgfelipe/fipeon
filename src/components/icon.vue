<template>
  <div style="text-align:center; height:140px;">
      <transition name="el-fade-in-linear">
        <div v-show="show">
          <el-image :src="logo">
            <template #placeholder>
              <div class="image-slot ">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
        </div>
      </transition>
    </div>

</template>
<style scoped></style>
<script>
import { ref } from "vue";

export default {
  setup() {
    const logo = ref(require("@/assets/images/logofipeon.png"));
    const show = ref(false);
    const ejecutaImg=()=>{
      setTimeout(()=>{
           show.value=true
      },1000)
    }
    return {
      logo,
      show,
      ejecutaImg
      
    };
  },
  mounted(){
    this.ejecutaImg()
  }
};
</script>
