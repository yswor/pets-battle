<script setup lang="ts">
import Student from '@/components/Student.vue'
import { useStudentStore } from '@/stores/students'

const stuStore = useStudentStore()
</script>

<template>
  <div class="container">
    <div class="list">
      <div class="student-item" v-for="student in stuStore.students" :key="student.id">
        <Student :student="student" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list {
  flex: 1;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
}

.student-item {
  width: calc((100% - 16px * 8) / 8);
  margin: 0 16px 16px 0;
}
</style>
