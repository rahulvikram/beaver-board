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
</script>
<template>
  <div class="timeline-item">
    <div class="timeline-card-dot"></div>
    <div class="timeline-card">
      <h2>{{ assignment.name }}</h2>
      <div class="timeline-card-info">
        <p>{{ getClass(assignment.classId).name }}</p>
        <p>{{ formatDate(assignment.due) }}</p>
        <p>{{ assignment.points }} Point{{ assignment.points > 1 ? 's' : '' }}</p>
        <p>{{ assignment.type == 'assignment' ? 'Assignment' : 'Exam' }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.timeline-item {
  display: flex;
  gap: 25px;
  align-items: center;
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
</style>
