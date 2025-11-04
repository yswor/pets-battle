import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Student as StudentType } from '@/type'

export const useStudentStore = defineStore('student', () => {
  const students = ref<StudentType[]>([])

  const studentById = computed(() => {
    return (id: number) => students.value.find((student) => student.id === id)
  })

  function setStudents(newStudents: StudentType[]) {
    students.value = newStudents
  }

  return { students, studentById, setStudents }
})
