<script setup>
import { RouterLink, RouterView } from 'vue-router'

import './assets/base.css'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

main {
  /* min-height: 100vh; */
  font-family: 'Inter Tight', sans-serif;
  background-color: #020208;
}
</style>
