<script setup lang="ts">
import { useStudentStore } from '@/stores/students'

const stuStore = useStudentStore()
</script>

<template>
  <div class="picker-box">
    <div class="picker-item" v-for="student in stuStore.students" :key="student.id">
      {{ student.name }}
    </div>
  </div>
</template>

<style lang="css" scoped></style>
