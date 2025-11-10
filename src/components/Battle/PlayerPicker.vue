<script setup lang="ts">
import { useStudentStore } from '@/stores/students'

const emits = defineEmits<{ pick: [number] }>()
const stuStore = useStudentStore()

const pickPlayer = (id: number) => {
  emits('pick', id)
}
</script>

<template>
  <div class="picker-box">
    <div
      class="btn picker-item"
      v-for="student in stuStore.studentsPetReachLevel"
      :key="student.id"
      @click="() => pickPlayer(student.id)"
    >
      {{ student.name }}
    </div>
  </div>
</template>

<style lang="css" scoped>
.picker-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.picker-box .picker-item {
  padding: 4px 12px;
  width: 88px;
  height: 32px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  border: 1px solid #9c27b0;
}
</style>
