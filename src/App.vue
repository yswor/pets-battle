<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import Wrapper from './layouts/Wrapper.vue'
import { useStudentStore } from './stores/students'
import storage from './utils/storage'
import { usePetStore } from './stores/pets'
import { useTaskStore } from './stores/tasks'
import DataUpload from './components/DataUpload.vue'
import { useUtilStore } from './stores/util'

const stuStore = useStudentStore()
const petStore = usePetStore()
const taskStore = useTaskStore()
const utilStore = useUtilStore()

const handleBeforeUnload = () => {
  storage.set('students', stuStore.students)
  storage.set('pets', petStore.pets)
  storage.set('tasks', taskStore.tasks)
}

onMounted(() => {
  // 检测是否导入过学生数据
  const dataUploaded = storage.get('dataUploaded')
  utilStore.setDataUploadFlag(Boolean(dataUploaded))

  const students = storage.get('students')
  if (students) {
    stuStore.setStudents(students)
  }

  const pets = storage.get('pets')
  if (pets) {
    petStore.setPets(pets)
  }

  const maxPetId = storage.get('maxPetId')
  if (maxPetId) {
    petStore.setMaxPetId(maxPetId)
  }

  const tasks = storage.get('tasks')
  if (tasks) {
    taskStore.setTasks(tasks)
  }

  const maxTaskId = storage.get('maxTaskId')
  if (maxTaskId) {
    taskStore.setMaxTaskId(maxTaskId)
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <DataUpload v-if="!utilStore.dataUploadFlag" />
  <Wrapper />
</template>

<style scoped></style>
