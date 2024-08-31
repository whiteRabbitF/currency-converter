<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>


<style lang="scss" scoped>
#app {
  font-family: "Franklin Gothic Book";
}
</style>
