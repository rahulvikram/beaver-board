<script setup>
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const assignments = reactive([])

onMounted(() => {
  console.log('TDLYLILY', props.user)
  const user = props.user

  if (user && user.classes) {
    assignments.length = 0
    for (const classId in user.classes) {
      const classObj = user.classes[classId]
      for (const assignmentId in classObj.assignments) {
        const assignment = classObj.assignments[assignmentId]
        assignment.classId = classObj.id
        assignments.push(assignment)
      }
    }
    console.log('User assignments', assignments)
  }
})
</script>

<template>
  <div class="profile">
    <h1>{{ user.name }}'s Profile</h1>
    <div class="user-profile">
      <div class="profile-field">
        <label>Name:</label>
        <span>{{ user.name }}</span>
      </div>
      
      <div class="profile-field">
        <label>Email:</label>
        <span>{{ user.email }}</span>
      </div>

      <div class="profile-field">
        <label>Classes Enrolled:</label>
        <span>{{ Object.values(user.classes).map(classObj => classObj.name).join(', ') }}</span>
    </div>

      <div class="profile-field">
        <label>Number of Assignments:</label>
        <span>{{ assignments.length }}</span>
      </div>
    </div>

    
    <!-- <h1>Timeline</h1>
    <div class="timeline">
      <div v-for="assignment in assignments" :key="assignment.id" class="timeline-item">
        <h2>{{ assignment.classId }}</h2>
        <p>{{ assignment.name }}</p>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.profile {
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
}

.profile h1 {
  margin: 0;
  font-weight: 600;
  font-size: 34px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.user-profile {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.profile-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.profile-field label {
  font-weight: 500;
  color: var(--beaver-white);
}

.profile-field span {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 17px;
}
</style>