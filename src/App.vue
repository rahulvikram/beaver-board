<script setup>
import { RouterLink, RouterView } from 'vue-router'

import './assets/base.css'
</script>

<template>
  <main>
    <RouterView />
  </main>

  <footer>
    <p>Created by Rahul Vikram and Leo Ueno | CS290 Project</p>
  </footer>
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

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-left: 70px;
}

footer > p {
  color: #fff;
  font-weight: 200;
  font-size: 10px;
}
</style>