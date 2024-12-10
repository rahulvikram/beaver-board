<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { getUser } from '../../utils/getUserInfo';
import '../../assets/base.css'

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
    <div class="profile">
        <p>Fuck this stupid class</p>
    </div>
</template>

<style scoped>
.profile {
    background-color: transparent;
}
</style>
