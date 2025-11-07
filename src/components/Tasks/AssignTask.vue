<script setup lang="ts">
import { useStudentStore } from '@/stores/students'
import CModal from '../CModal.vue'
import { useTaskStore } from '@/stores/tasks'
import type { Student, Task as TaskType } from '@/type'
import { ref } from 'vue'

const { task } = defineProps<{ task: TaskType }>()

const stuStore = useStudentStore()
const taskStore = useTaskStore()

const modalOpen = ref(false)
const executor = ref('')
const executorOptions = ref<Student[]>([])
const selectedExecutor = ref<Student | null>(null)

const assignTask = () => {
  modalOpen.value = true
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

const clearData = () => {
  executor.value = ''
  executorOptions.value = []
}

const closeAssignModel = () => {
  modalOpen.value = false
  clearData()
}

const confirmAssignTask = () => {
  if (!selectedExecutor.value?.id) {
    alert('未选择任务分配对象')
    return
  }
  modalOpen.value = false

  const taskItem: TaskType = {
    ...task,
    executorId: selectedExecutor.value?.id,
  }

  taskStore.updateTask(taskItem)

  const updatedStudent = {
    ...selectedExecutor.value,
    tasks: [...selectedExecutor.value.tasks, taskItem.id],
  }
  stuStore.updateStudent(updatedStudent)

  clearData()
}
</script>

<template>
  <div class="btn assign-task-btn" @click="() => assignTask()">分配任务</div>
  <c-modal :open="modalOpen" @close="closeAssignModel">
    <div class="add-task-modal">
      <div class="title">分配任务</div>
      <div class="form">
        <div class="form-line">
          <div class="label">任务内容</div>
          <div class="value">{{ task.content }}</div>
        </div>
        <div class="form-line">
          <div class="label">积分数</div>
          <div class="value">{{ task.rewardCoin }}</div>
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
        <div class="btn cancel-btn" @click="closeAssignModel">取消</div>
        <div class="btn confirm-btn" @click="confirmAssignTask">确定</div>
      </div>
    </div>
  </c-modal>
</template>

<style scoped>
.assign-task-btn {
  width: 80px;
  height: 32px;
  border-radius: 16px;

  background: #ffc107;
  color: #5d4037;
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
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
