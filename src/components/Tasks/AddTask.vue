<script setup lang="ts">
import { ref } from 'vue'
import CModal from '../CModal.vue'
import type { Student, Task as TaskType } from '@/type'
import { useStudentStore } from '@/stores/students'
import { useTaskStore } from '@/stores/tasks'

const stuStore = useStudentStore()
const taskStore = useTaskStore()

const modalOpen = ref(false)
const taskContent = ref('')
const executor = ref('')
const executorOptions = ref<Student[]>([])
const selectedExecutor = ref<Student | null>(null)
const taskCoin = ref('')

const addTask = () => {
  modalOpen.value = true
}

const clearNewTaskModelData = () => {
  taskContent.value = ''
  executor.value = ''
  executorOptions.value = []
  selectedExecutor.value = null
}

const closeTaskModal = () => {
  modalOpen.value = false
  clearNewTaskModelData()
}

const handleContentInput = (t: any) => {
  const value = t.target.value.trim()
  taskContent.value = value
}

const handleExecutorInput = (t: any) => {
  const value = t.target.value.trim()
  executor.value = value
  if (value) {
    executorOptions.value = stuStore.studentsByName(value)
  } else {
    executorOptions.value = []
  }
}

const selectExecutor = (stu: Student) => {
  selectedExecutor.value = stu
  executor.value = stu.name
  executorOptions.value = []
}

const confirmAddTask = () => {
  if (!taskContent.value || !taskCoin.value || !Number(taskCoin.value)) {
    alert('任务信息未填写完成')
    return
  }

  modalOpen.value = false

  const taskId = taskStore.getNextTaskId()

  const taskItem: TaskType = {
    id: taskId,
    content: taskContent.value,
    rewardCoin: Number(taskCoin.value),
    executorId: selectedExecutor.value?.id,
    state: 0,
  }

  if (selectedExecutor.value?.id) {
    const updatedStudent = {
      ...selectedExecutor.value,
      tasks: [...selectedExecutor.value.tasks, taskId],
    }
    stuStore.updateStudent(updatedStudent)
  }

  taskStore.updateTask(taskItem)
  clearNewTaskModelData()
}
</script>

<template>
  <div class="add-btn" @click="addTask">新增</div>
  <c-modal :open="modalOpen" @close="closeTaskModal">
    <div class="add-task-modal">
      <div class="title">新建任务</div>
      <div class="form">
        <div class="form-line">
          <div class="label">任务内容</div>
          <input class="input" @input="handleContentInput" :value="taskContent" />
        </div>
        <div class="form-line">
          <div class="label">积分数</div>
          <input type="number" class="input" v-model="taskCoin" />
        </div>
        <div class="form-line">
          <div class="label">分配给</div>
          <input class="input" :value="executor" @input="handleExecutorInput" />
        </div>
        <div class="selector" v-if="executorOptions.length">
          <div
            class="executor-item"
            v-for="stu in executorOptions"
            @click="() => selectExecutor(stu)"
          >
            {{ stu.name }}
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="btn cancel-btn" @click="closeTaskModal">取消</div>
        <div class="btn confirm-btn" @click="confirmAddTask">确定</div>
      </div>
    </div>
  </c-modal>
</template>

<style scoped>
.add-btn {
  width: 128px;
  height: 40px;
  border-radius: 20px;
  background: #ffc107;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #5d4037;
  font-size: 16px;
  cursor: pointer;
}

.add-task-modal {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.add-task-modal .title {
  font-size: 20px;
  margin: 0 0 24px;
  font-weight: 600;
  color: #000;
}

.add-task-modal .form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 40px;
}

.add-task-modal .form .form-line {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 24px 0 0;
}
.add-task-modal .form .form-line:first-child {
  margin: 0;
}
.add-task-modal .form .form-line .label {
  width: 100%;
  font-weight: 600;
  margin: 0 0 12px;
}
.add-task-modal .form .form-line .input {
  width: 100%;
  height: 32px;
  border: 1px solid #666;
  border-radius: 8px;
  padding: 0 12px;
  outline: none;
}
.add-task-modal .form .selector {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 96%;
  box-shadow: 0 2px 4px 2px #00000020;
  padding: 0 10px;
}
.add-task-modal .form .selector .executor-item {
  height: 32px;
  width: 100%;
  padding: 0 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px dashed #1a9d6a;
}

.add-task-modal .btns {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-task-modal .btns .cancel-btn,
.add-task-modal .btns .confirm-btn {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #ffc107;
}
.add-task-modal .btns .confirm-btn {
  margin-left: 12px;
  background: #1a9d6a;
  width: 100%;
  height: 100%;
}
</style>
