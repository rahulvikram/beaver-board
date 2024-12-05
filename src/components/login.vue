<script setup>
    import '../assets/base.css'
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'


    const router = useRouter()
    // focus on the email input
    const emailInput = ref(null)
    onMounted(() => {
        // This code runs after the component is mounted
        emailInput.value?.focus() // Auto-focus the email input
    })

    const handleLogin = () => {
        // TODO: make call to express endpoint for login validation
        
        // Navigate to dashboard after successful login
        router.push('/dashboard')
    }
</script>

<template>
    <div id="signup-modal">
        <h1>Login</h1>
        <h3 class="subtext">Sign in to continue</h3>
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="example@email.com">

        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Must be 8 characters">

        <button @click="handleLogin">Login</button>
    </div>
</template>

<style scoped>

</style>
