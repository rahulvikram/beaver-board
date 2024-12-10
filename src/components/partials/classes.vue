<script setup>
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({
  user: Object,
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

// Add this computed function to check if assignment is overdue
const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date()
}

const addClass = async () => {
  // Prompt user for class name
  const className = prompt('Enter class name:')
  
  if (!className) return // Exit if user cancels or enters empty string
  
  try {
    const response = await fetch('http://localhost:3000/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name: className })
    })

    const data = await response.json()
    
    if (data.success) {
      // Refresh the page to show new class
      window.location.reload()
    } else {
      alert(data.message || 'Failed to add class')
    }
  } catch (error) {
    console.error('Error adding class:', error)
    alert('Error adding class')
  }
}

</script>

<template>
  <div class="classes-container-wrapper">
    <h1>Classes</h1>
    <div v-if="user && user.classes" class="classes-container">
      <div v-for="(classObj, classId) in user.classes" :key="classId" class="class-section">
        <h2>{{ classObj.name }}</h2>
        <div class="assignments-list">
          <div v-if="Object.keys(classObj.assignments || {}).length === 0" class="no-assignments">
            No assignments
          </div>
          <div v-else v-for="(assignment, assignmentId) in classObj.assignments" :key="assignmentId" class="assignment-item">
            <h3>{{ assignment.name }}</h3>
            <p :class="{ 'overdue': isOverdue(assignment.due) }">
              Due: {{ new Date(assignment.due).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <button class="add-class-button" @click="addClass">Add Class</button>
  </div>
</template>

<style scoped>
.classes-container-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.classes-container-wrapper h1 {
  font-size: 34px;
  font-weight: 600;
  color: var(--beaver-white);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);

}

.classes-container {
  display: flex;
  flex-direction: row;
  gap: 25px;
  padding: 20px;
}

.class-section {
  background-color: #0d0e14;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 
    inset 0 120px 30px -30px rgba(255, 255, 255, 0.014),
    0 0 15px rgba(0, 0, 0, 0.3);
}

.class-section h2 {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  margin-bottom: 15px;
}

.assignments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.assignment-item {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease-in-out;
}

.assignment-item:hover {
  border-color: var(--beaver-orange);
  box-shadow: 0 0 10px rgba(255, 122, 0, 0.2);
}

.assignment-item h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--beaver-white);
}

.assignment-item p {
  margin: 5px 0 0 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.no-assignments, .no-classes {
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.5);
}

.overdue {
  color: #ff4444 !important;
}

.add-class-button {
  margin-bottom: 20px;
  padding: 7px;
  border-radius: 5px;
  color: var(--beaver-white);
  font-size: 14px;
  font-weight: 500;
  background-color: transparent;
  border: 1px solid var(--beaver-orange);
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
}

.add-class-button:hover {
  background-color: var(--beaver-orange);
  box-shadow: 0 0 10px var(--beaver-orange);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
