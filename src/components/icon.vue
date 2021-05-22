<template>
  <div style="text-align:center;">
      <el-button @click="show=true">click aqui</el-button> 
      {{show}}
    <transition name="el-fade-in-linear"  >
      <el-image v-show="show"  :src="logo">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
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
    return {
      logo,
      show,
    };
  },
};
</script>
