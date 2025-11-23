<script setup lang="ts">
import { usePetStore } from '@/stores/pets'
import { useStudentStore } from '@/stores/students'
import { useTaskStore } from '@/stores/tasks'
import { useUtilStore } from '@/stores/util'
import storage from '@/utils/storage'
import { computed, ref } from 'vue'
import { read, utils } from 'xlsx'

const stuStore = useStudentStore()
const utilStore = useUtilStore()
const petStore = usePetStore()
const taskStore = useTaskStore()

const jsonData = ref<any | null>(null)
const error = ref('')

const formattedJson = computed(() => {
  return jsonData.value ? JSON.stringify(jsonData.value, null, 2) : ''
})

function handleUpload(e: any) {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev: any) => {
    /* 1. 读取工作簿 */
    const wb = read(ev.target.result, { type: 'array' })
    /* @ts-ignore  2. 拿第一张表的第一列（从第2行开始）  */
    const sheet = wb.Sheets[wb.SheetNames[0]]
    const names = utils.sheet_to_json(sheet, { header: 1 }).slice(1).flat()
    /* 3. 转成目标结构 */
    const list = names.map((n, idx) => ({
      id: idx + 1,
      name: n,
      pets: [],
      gifts: [],
      tasks: [],
      coin: 0,
    }))

    jsonData.value = list
  }
  reader.readAsArrayBuffer(file)
}

const confirmUpload = () => {
  if (!jsonData) {
    alert('没有数据')
    return
  }

  if (!Array.isArray(jsonData.value)) {
    alert('数据格式错误')
    return
  }

  storage.set('dataUploaded', true)
  utilStore.setDataUploadFlag(true)
  storage.set('students', jsonData.value)
  stuStore.setStudents(jsonData.value)
}

const resetData = () => {
  stuStore.resetStudents()
  petStore.resetPets()
  taskStore.resetTasks()

  storage.clear()
}
</script>

<template>
  <div class="data-upload-box">
    <input type="file" accept=".xlsx,.xls" @change="handleUpload" />
    <div v-if="error" style="color: red">{{ error }}</div>
    <pre class="pre-box" v-if="jsonData">{{ formattedJson }}</pre>

    <div class="btn confirm-btn" @click="confirmUpload">确认导入数据</div>
    <div class="btn confirm-btn reset-btn" @click="resetData">重置本地数据</div>
  </div>
</template>

<style scoped>
.data-upload-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2000;
  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.data-upload-box .confirm-btn {
  margin: 40px 0 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 40px;
  border: 1px solid #333;
}
.data-upload-box .confirm-btn.reset-btn {
  margin: 44px 0 0;
}
.data-upload-box .pre-box {
  width: 100%;
  height: 400px;
  overflow: auto;
}
</style>
