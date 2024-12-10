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
        credentials: 'include'
    })
    // get user data from response
    const data = await response.json()

    const user = {
        id: "OBz3Qb0DVHKyJtAvK6e8",
        name: "Rahul Vikram",
        email: "indian@example.com",
        password: "kjvh9$$ij%%%#jF",
        classes: {
            "0lv92s48vK": {
                name: "CS162",
                assignments: {
                    "30a36953-79b9-4e43-9a6e-b9130e95297e": {
                        id: "30a36953-79b9-4e43-9a6e-b9130e95297e",
                        name: "Exam 1",
                        due: 300,
                        points: 100,
                        type: "exam"
                    },
                    "83519aff-0dcf-466a-9cc6-91503d979762": {
                        id: "83519aff-0dcf-466a-9cc6-91503d979762",
                        name: "Assignment 2",
                        due: 300,
                        points: 1,
                        type: "assignment"
                    }
                }
            }
        }
    };
    return user;
}

// user object
const user = ref(null)

// get user on mount
onMounted(async () => {
    // get user data
    const userData = await getUser();
    console.log(userData);

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
