<script setup>
    import '../assets/base.css'
    import { ref, onMounted } from 'vue'

    // focus on the email input
    const emailInput = ref(null)
    onMounted(() => {
        // This code runs after the component is mounted
        emailInput.value?.focus() // Auto-focus the email input
    })
</script>

<template>
    <div id="login-modal">
        <h1>Login</h1>
        <h3>Sign in to your account to continue</h3>
        <label for="email">Email
            <input ref="emailInput" type="email" placeholder="Email">
        </label>
        <label for="password">Password
            <input type="password" placeholder="Password">
        </label>
        <button>Login</button>
    </div>
</template>

<style scoped>

</style>
