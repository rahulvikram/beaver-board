<script setup>
import { reactive } from 'vue'

const props = defineProps({
  user: Object,
})

const user = props.user

const assignments = reactive([])

console.log('TDLYLILY', user)

for (const classObj of user.classes) {
  for (const assignment of classObj.assignments) {
    assignment.classId = classObj.id
    assignments.push(assignment)
  }
}
</script>

<template>
  <div>
    <h1>Timeline</h1>
    <div class="timeline">
      <div class="timeline-item">
        <h2>Class 1</h2>
        <p>Assignment 1</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
