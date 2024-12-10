<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ref, computed, reactive } from 'vue'
import { getUser, addAssignment } from '../utils/getUserInfo'
import '../assets/base.css'

import Timeline from './partials/timeline.vue'

const router = useRouter()

// user object
const user = reactive({
  id: '',
  email: '',
  name: '',
  classes: {},
  password: '',
})

getUser()
  .then((data) => {
    console.log('Fetched user data:', data)
    user.id = data.id
    user.email = data.email
    user.name = data.name
    user.classes = data.classes
    user.password = data.password
  })
  .catch((error) => {
    console.error('Error fetching user data:', error)
    router.push('/login')
  })

const showAddAssignmentModal = ref(false)

const DEFAULT_NEW_ASSIGNMENT = {
  name: '',
  due: '',
  class: '',
  points: 0,
  type: 'assignment',
}

const newAssignment = reactive({ ...DEFAULT_NEW_ASSIGNMENT })

const submitNewAssignment = async () => {
  newAssignment.date = new Date(newAssignment.date).getTime()

  const response = await addAssignment(newAssignment)

  if (!response.success) {
    alert(response.message)
  } else {
    alert('Assignment added successfully')
    showAddAssignmentModal.value = false

    // Assign default values to newAssignment
    newAssignment = { ...DEFAULT_NEW_ASSIGNMENT }
  }
}
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
    
    <RouterView v-if="Object.keys(user.classes).length > 0" :user="user" />

    <div id="add-button">
      <button id="add-assignment-button" @click="showAddAssignmentModal = true">
        Add Assignment
      </button>
    </div>

    <div v-if="showAddAssignmentModal" class="modal">
      <h2>Add Assignment</h2>
      <input type="text" v-model="newAssignment.name" placeholder="Assignment Name" />
      <input type="date" v-model="newAssignment.due" placeholder="Due Date" />
      <select v-model="newAssignment.class" placeholder="Class">
        <option v-for="classObj in user.classes" :key="classObj.id" :value="classObj.id">
          {{ classObj.name }}
        </option>
      </select>
      <input type="number" v-model="newAssignment.points" placeholder="Points" />
      <select v-model="newAssignment.type" placeholder="Type">
        <option value="assignment">Assignment</option>
        <option value="exam">Exam</option>
      </select>
      <div class="modal-buttons">
        <button @click="submitNewAssignment">Submit</button>
        <button @click="showAddAssignmentModal = false">Cancel</button>
      </div>
    </div>
  </div>
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
  padding: 3px 14px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  position: relative;
}

nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: var(--beaver-orange);
  transition: all 0.2s ease-in-out;
  transform: translateX(-50%);
}

nav a:hover::after {
  width: calc(100% - 32px);
}

nav a:hover {
  cursor: pointer;
  color: var(--beaver-orange);
  background-color: transparent;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

nav a.router-link-exact-active::after {
  width: calc(100% - 32px);
}

nav a:not(.router-link-exact-active)::after {
  width: 0;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  min-width: 390px;
  flex-direction: column;
  align-items: left;
  border-radius: 10px;
  padding: 50px 45px;
  gap: 25px;
  background-color: #0d0e14;
  color: var(--beaver-white);
  box-shadow: 
    inset 0 120px 30px -30px rgba(255, 255, 255, 0.014),
    0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal h2 {
  margin: 0;
  font-weight: 600;
  font-size: 34px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.modal input,
.modal select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgb(87, 87, 87);
  background-color: #121212;
  outline: 1px solid transparent;
  transition: outline 0.2s ease-in-out;
  color: white;
  font-size: 17px;
  width: 100%;
}

.modal input:focus,
.modal select:focus {
  outline: 1px solid var(--beaver-orange);
  outline-offset: -1px;
  transition: outline 0.2s ease-in-out;
  caret-color: white;
}

.modal-buttons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.modal-buttons button {
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  flex: 1;
}

.modal-buttons button:first-child {
  background-color: var(--beaver-orange);
  color: var(--beaver-white);
  border: none;
  box-shadow: 0 0 10px var(--beaver-orange);
}

.modal-buttons button:first-child:hover {
  box-shadow: 0 0 18px var(--beaver-orange);
  cursor: pointer;
}

.modal-buttons button:last-child {
  background-color: transparent;
  color: var(--beaver-white);
  border: 1px solid var(--beaver-orange);
}

.modal-buttons button:last-child:hover {
  background-color: var(--beaver-orange);
  box-shadow: 0 0 10px var(--beaver-orange);
  cursor: pointer;
}
</style>
