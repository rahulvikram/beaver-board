<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import '../assets/base.css'

const router = useRouter()

async function getUser() {
  const response = await fetch('http://localhost:3000/info', {
    method: 'POST',
    credentials: 'include',
  })
  // get user data from response
  const data = await response.json()
  return data
}

// user object
const user = ref(null)

// get user on mount
onMounted(async () => {
  // get user data
  const userData = await getUser()
  console.log(userData)

  // check if user is logged in
})
</script>

<template>
  <div class="dashboard">
    <header>
      <!-- navbar for different dashboard views -->
      <nav>
        <RouterLink to="/dashboard">Timeline</RouterLink>
        <RouterLink to="/dashboard/classes">Classes</RouterLink>
        <RouterLink to="/dashboard/profile">Profile</RouterLink>
      </nav>
    </header>
    <div>
      <!-- <p>{{ user.name }}</p> -->
    </div>
  </div>
  <main>
    <!-- renders various views based on the route -->
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
