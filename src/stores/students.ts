import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Student as StudentType } from '@/type'
import { usePetStore } from './pets'

export const useStudentStore = defineStore('student', () => {
  const students = ref<StudentType[]>([])

  const studentById = computed(() => {
    return (id: number) => students.value.find((student) => student.id === id)
  })

  const studentsByName = computed(() => {
    return (name: string) => students.value.filter((student) => student.name.indexOf(name) > -1)
  })

  const studentsPetReachLevel = computed(() => {
    const petStore = usePetStore()
    const listPetsReachLevel: StudentType[] = students.value
      .filter((s) => s.pets.length > 0)
      .filter((s) => {
        return s.pets.some(
          (pId) => petStore.petById(pId)?.level && petStore.petById(pId)?.level! > 1,
        )
      })

    return listPetsReachLevel
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

  return {
    students,
    studentById,
    studentsByName,
    studentsPetReachLevel,
    setStudents,
    updateStudent,
  }
})
