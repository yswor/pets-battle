import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilStore = defineStore('util', () => {
  const dataUploadFlag = ref(false)

  function setDataUploadFlag(flag: boolean) {
    dataUploadFlag.value = flag
  }

  return { dataUploadFlag, setDataUploadFlag }
})
