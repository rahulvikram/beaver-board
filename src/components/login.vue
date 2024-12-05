<script setup>
    import '../assets/base.css'
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'


    const router = useRouter()
    // focus on the email input
    const emailInput = ref(null)
    const errorMessage = ref('') // focus on error message
    onMounted(() => {
        // This code runs after the component is mounted
        emailInput.value?.focus() // Auto-focus the email input
    })

    // call to express endpoint for signup validation
    async function signUpEndpoint(email, password) {
        try {
            // call fetch to send post request to express endpoint
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            })

            // process json response
            const data = await response.json()
            return data;
        } catch (error) {
            console.error('Error signing up:', error)
        }
    }

    const handleLogin = async () => {
        // get the email and password from the input fields
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        
        // done in backend
        // if email exists but password is incorrect, endpoint returns false
        // if email does not exist, endpoint returns true (new user creation)
        // if email exists and password is correct, endpoint returns true
        // call the signup endpoint
        const data = await signUpEndpoint(email, password);

        // if data is true, navigate to dashboard
        if (data) {
            router.push('/dashboard')
        } else {
            errorMessage.value = 'Invalid email or password';
        }
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
        
        <!-- dynamically render error message if user inputs invalid email or password -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      
        <button @click="handleLogin">Login</button>
    </div>
</template>

<style scoped>
.error-message {
    color: red;
    margin-top: 10px;
}
</style>
