<script setup lang="ts">
import { onMounted } from 'vue'
import Wrapper from './layouts/Wrapper.vue'
import { useStudentStore } from './stores/students'
import storage from './utils/storage'
import { usePetStore } from './stores/pets'

const stuStore = useStudentStore()
const petStore = usePetStore()

onMounted(() => {
  const students = storage.get('students')
  if (students) {
    stuStore.setStudents(students)
  }

  const pets = storage.get('pets')
  if (pets) {
    petStore.setPets(pets)
  }
})
</script>

<template>
  <Wrapper />
</template>

<style scoped></style>
