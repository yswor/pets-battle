<script setup lang="ts">
import { useStudentStore } from '@/stores/students'
import type { Student } from '@/type'
import { ref } from 'vue'

const emits = defineEmits<{ pick: [Student] }>()
const stuStore = useStudentStore()

const selectedIndex = ref<number | null>(null)

const pickPlayer = (stu: Student, index: number) => {
  selectedIndex.value = index
  emits('pick', stu)
}
</script>

<template>
  <div class="picker-box">
    <div
      v-for="(student, index) in stuStore.studentsPetReachLevel"
      :class="'btn picker-item' + (selectedIndex === index ? ' selected' : '')"
      :key="student.id"
      @click="() => pickPlayer(student, index)"
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
  margin: 0 12px 12px 0;
}
.picker-box .picker-item.selected {
  background: #9c27b0;
  color: #fff;
}
</style>
