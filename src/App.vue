<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import './assets/base.css'

const router = useRouter()

async function logout() {
  console.log('logging out')
  // clear the session storage
  sessionStorage.clear();
  await fetch('http://localhost:3000/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // redirect to the login page
  router.push('/');
}
</script>

<template>
  <main>
    <RouterView />
  </main>

  <footer>
    <p>Created by Rahul Vikram and Leo Ueno | CS290 Project |<button @click="logout">Logout</button></p>

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
  bottom: 0px;
  width: 100%;
  text-align: center;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
}

footer > p {
  color: #fff;
  font-weight: 200;
  font-size: 11px;
}

footer > p > button {
  color: #fff;
  font-family: 'Inter Tight', sans-serif;
  font-weight: 200;
  font-size: 11px;
  border: none;
  text-decoration: underline;
  background-color: transparent;
}

</style>