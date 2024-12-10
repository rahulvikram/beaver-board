<script setup>
import { reactive, onMounted, watch } from 'vue'

import TimelineAssignment from './timelineAssignment.vue'

const props = defineProps({
  user: Object,
})

const timeline = reactive([])

onMounted(() => {
  console.log('TDLYLILY', props.user)
  const user = props.user

  if (user && user.classes) {
    timeline.length = 0

    const assignments = []
    for (const classId in user.classes) {
      const classObj = user.classes[classId]
      for (const assignmentId in classObj.assignments) {
        const assignment = classObj.assignments[assignmentId]
        assignment.classId = classId
        assignments.push(assignment)
      }
    }

    assignments.sort((a, b) => a.due - b.due)

    let lastAssignment = null
    for (const assignment of assignments) {
      if (!lastAssignment) continue

      const dueDateDiff = assignment.due - lastAssignment.due

      lastAssignment = assignment
    }

    timeline.push(...assignments)

    console.log('User timeline', timeline)
  }
})
</script>

<template>
  <div class="timeline">
    <TimelineAssignment
      v-for="assignment in timeline"
      :key="assignment.id"
      :assignment="assignment"
      :user="user"
    />
  </div>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
