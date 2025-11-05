import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task as TaskType } from '@/type'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<TaskType[]>([])

  const taskById = computed(() => {
    return (id: number) => tasks.value.find((task) => task.id === id)
  })

  function setTasks(newTask: TaskType[]) {
    tasks.value = newTask
  }

  function updateTask(updatedTask: TaskType) {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    } else {
      tasks.value.push(updatedTask)
    }
  }

  return { tasks, taskById, setTasks, updateTask }
})
