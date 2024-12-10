<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { getUser } from '../utils/getUserInfo'
import '../assets/base.css'

const router = useRouter()


// user object
const user = ref(null)

// get user on mount
onMounted(async () => {
  // get user data
  const userData = await getUser();
  console.log(userData)

  if (!userData) {
    router.push('/login')
  }
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
    <div class="timeline-view">
        
    </div>
    <div id="add-button">
      <button id="add-assignment-button">Add Assignment</button>
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

#add-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
}

#add-assignment-button {
  padding: 7px;
  border-radius: 5px;
  color: var(--beaver-white);
  font-size: 14px;
  font-weight: 500;
  /* box-shadow: inset 0 -12  0px 30px -30px rgba(255, 255, 255, 0.014); */
  /* box-shadow: 0 0 18px var(--beaver-orange); */
  background-color: transparent;
  border: 1px solid var(--beaver-orange);
  transition: all 0.2s ease-in-out;
}

#add-assignment-button:hover {
    background-color: var(--beaver-orange);
    box-shadow: 0 0 10px var(--beaver-orange);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

nav {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  gap: 20px;
}

nav a {
  font-size: 18px;
  text-decoration: none;
  color: var(--beaver-orange);
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

nav a:hover {
  cursor: pointer;
  background-color: var(--beaver-orange);
  color: var(--beaver-white);
}

nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
