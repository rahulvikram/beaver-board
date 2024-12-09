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
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }) // send our email and password to the backend
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

        if (password.length < 8) {
            errorMessage.value = 'Password must be at least 8 characters'
            return
        }
        // done in backend
        // if email exists but password is incorrect, endpoint returns false
        // if email does not exist, endpoint returns true (new user creation)
        // if email exists and password is correct, endpoint returns true
        // call the signup endpoint
        const data = await signUpEndpoint(email, password);
        
        // console.log(data)

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
        <div class="modal-section" id="modal-header">
            <h1>Login</h1>
            <h3 class="subtext">Sign in to BeaverBoard to continue</h3>
        </div>
        <div class="modal-section" id="modal-email">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="beaver@oregonstate.edu">
        </div>

        <div class="modal-section" id="modal-password">   
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Must be 8 characters">
        </div>
        
        <!-- dynamically render error message if user inputs invalid email or password -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button @click="handleLogin" id="login-button">Login</button>
    </div>
</template>

<style scoped>
.error-message {
    color: red;
    margin-top: 10px;
}

#signup-modal {
    display: flex;
    min-width: 400px;
    flex-direction: column;
    align-items: left;
    /* border: 0.5px solid var(--beaver-orange); */
    border-radius: 10px;
    padding: 50px 45px;
    gap: 25px;
}

.modal-section {
    display: flex;
    flex-direction: column;
    align-items: left;
}

.modal-section > label {
    margin-bottom: 2px;
    font-weight: 500;
}

.modal-section > input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgb(87, 87, 87);
    background-color: #121212;
    outline: 1px solid transparent;
    transition: outline 0.2s ease-in-out;
    color: white;
    font-size: 17px;
}

.modal-section > input:focus {
    outline: 1px solid var(--beaver-orange);
    outline-offset: -1px;
    transition: outline 0.2s ease-in-out;
    caret-color: white;
}

#login-button {
    padding: 10px;
    border-radius: 5px;
    font-size: 17px;
    font-weight: 500;
    box-shadow: inset 0 -120px 30px -30px rgba(255, 255, 255, 0.014);
    box-shadow: 0 0 10px var(--beaver-orange);
    border: 1px solid var(--beaver-orange);
    transition: all 0.2s ease-in-out;
}

#login-button:hover {
    /* background-color: transparent; */
    /* border: 1px solid var(--beaver-orange); */
    box-shadow: 0 0 18px var(--beaver-orange);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}


#signup-modal {
    background-color: #0d0e14;
    color: var(--beaver-white);
    box-shadow: 
        /* Inner glow from top only */
        inset 0 120px 30px -30px rgba(255, 255, 255, 0.014),
        /* Subtle outer shadow for depth */
        0 0 15px rgba(0, 0, 0, 0.3);

    /* background: linear-gradient(145deg, #151515, #101010); */
}

#modal-header > h1 {
    margin: 0;
    font-weight: 600;
    font-size: 34px;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

#modal-header > h3 {
    margin: 0;
    font-weight: 400;
    font-size: 18px;
}

#login-button {
    padding: 10px;
    background-color: var(--beaver-orange);
    color: var(--beaver-white);
    border: none;
}
</style>
