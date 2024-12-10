<script setup>
import { reactive } from 'vue'

const props = defineProps({
  user: Object,
})

const user = props.user

console.log('USER', user)

const assignments = reactive([])

for (const classObj of user.classes) {
  for (const assignment of classObj.assignments) {
    assignment.classId = classObj.id
    assignments.push(assignment)
  }
}
console.log(assignments);
</script>

<template>
    <div class="profile">
        <h1>{{ user.name }}</h1>
    </div>
</template>

<style scoped></style>
