<script setup lang="ts">
import type { Student } from '@/type'

const { student } = defineProps<{ student: Student }>()

const emit = defineEmits<{
  openDetail: [id: number]
}>()

const clickHandler = () => {
  emit('openDetail', student.id)
}
</script>

<template>
  <div class="student-card" key="{{ student.id }}" @click="clickHandler">
    <div class="name">{{ student.name }}</div>
    <div class="coin">{{ student.coin }}</div>
    <div class="btn">查看详情</div>
  </div>
</template>

<style scoped>
.student-card {
  padding: 12px;
  background: linear-gradient(225deg, #65c11e 0%, #1ec183 100%);
  width: 100%;
  height: 100%;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border: 1px solid #fff;
  color: #fff;
}

.student-card:hover {
  border: 1px solid #66bb6a;
  background: #85e18c;
}

.name {
  margin: 0 0 12px;
  text-align: center;
}

.coin {
  margin: 0 0 12px;
  text-align: center;
}
</style>
