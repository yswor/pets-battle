import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Student as StudentType } from '@/type'

export const useStudentStore = defineStore('student', () => {
  const students = ref<StudentType[]>([])

  const studentById = computed(() => {
    return (id: number) => students.value.find((student) => student.id === id)
  })

  const studentsByName = computed(() => {
    return (name: string) => students.value.filter((student) => student.name.indexOf(name) > -1)
  })

  function setStudents(newStudents: StudentType[]) {
    students.value = newStudents
  }

  function updateStudent(updatedStudent: StudentType) {
    const index = students.value.findIndex((student) => student.id === updatedStudent.id)
    if (index !== -1) {
      students.value[index] = updatedStudent
    } else {
      students.value.push(updatedStudent)
    }
  }

  return { students, studentById, studentsByName, setStudents, updateStudent }
})
