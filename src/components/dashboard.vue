<script setup>
import { defineAsyncComponent } from 'vue'
import { ref, computed } from 'vue'
import '../assets/base.css'
</script>

<template>
    <div class="dashboard">
        <header>
            <!-- navbar for different dashboard views -->
            <nav>
                <RouterLink to="/dashboard">Timeline</RouterLink>
                <RouterLink to="/dashboard/classes">Classes</RouterLink>
                <RouterLink to="/dashboard/calendar">Calendar</RouterLink>
                <RouterLink to="/dashboard/profile">Profile</RouterLink>
            </nav>
        </header>
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
