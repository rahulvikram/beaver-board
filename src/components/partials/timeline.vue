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
</script>

<template>
  <div>
    <h1>Timeline</h1>
    <div class="timeline">
      <div v-for="assignment in assignments" :key="assignment.id" class="timeline-item">
        <h2>{{ assignment.classId }}</h2>
        <p>{{ assignment.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
