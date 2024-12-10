<script setup>
const props = defineProps({
  assignment: Object,
  user: Object,
})

const assignment = props.assignment

const getClass = (classId) => {
  return props?.user?.classes[classId]
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date()
}

const deleteAssignment = async () => {
  try {
    const response = await fetch('http://localhost:3000/assignment/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        assignmentId: assignment.id,
        classId: assignment.classId
      })
    })

    const data = await response.json()
    
    if (data.success) {
      // Emit an event to parent component to refresh the timeline
      window.location.reload()
    } else {
      alert('Failed to delete assignment')
    }
  } catch (error) {
    console.error('Error deleting assignment:', error)
    alert('Error deleting assignment')
  }
}
</script>
<template>
  <div class="timeline-item">
    <div class="timeline-card-dot"></div>
    <div class="timeline-card">
      <h2>{{ assignment.name }}</h2>
      <div class="timeline-card-info">
        <p>{{ getClass(assignment.classId).name }}</p>
        <p :class="{ 'overdue': isOverdue(assignment.due) }">{{ formatDate(assignment.due) }}</p>
        <p>{{ assignment.points }} Point{{ assignment.points > 1 ? 's' : '' }}</p>
        <p>{{ assignment.type == 'assignment' ? 'Assignment' : 'Exam' }}</p>
      </div>
    <button class="delete-button" @click="deleteAssignment">Delete</button>
    </div>
  </div>
</template>
<style scoped>
.timeline-item {
  display: flex;
  gap: 25px;
  align-items: center;
  z-index: 100;
  position: relative;
}

.timeline-card-dot {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 100rem;
}

.timeline-card {
  padding: 10px 20px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  border-radius: 1rem;
}

.timeline-card-info {
  display: flex;
  gap: 15px;
}

.overdue {
  color: #ff4444;
}

.delete-button {
  padding: 7px;
  border-radius: 5px;
  color: var(--beaver-white);
  font-size: 14px;
  font-weight: 500;
  background-color: transparent;
  border: 1px solid var(--beaver-orange);
  transition: all 0.2s ease-in-out;
  margin-top: 10px;
  align-self: flex-end;
}

.delete-button:hover {
  background-color: var(--beaver-orange);
  box-shadow: 0 0 10px var(--beaver-orange);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
