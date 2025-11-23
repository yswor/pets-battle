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

const closeModal = () => {
  modalOpen.value = false
}

const accomplishTask = () => {
  modalOpen.value = true
}

const confirmTaskAccomplished = () => {
  modalOpen.value = false

  if (!task.executorId) {
    alert('未知错误')
    return
  }

  const taskItem: TaskType = {
    ...task,
    state: 1,
  }

  taskStore.updateTask(taskItem)

  const oldStudentData = stuStore.studentById(task.executorId)

  if (!oldStudentData) {
    alert('未知错误')
    return
  }

  // 积分变动 更新学生积分信息
  const stuItem: Student = {
    ...oldStudentData,
    coin: oldStudentData?.coin + task.rewardCoin,
  }
  stuStore.updateStudent(stuItem)
}
</script>

<template>
  <div class="btn accomplish-task-btn" @click="() => accomplishTask()">确认完成</div>
  <c-modal :open="modalOpen" @close="closeModal">
    <div class="add-task-modal">
      <div class="title">是否确定任务已完成？</div>
      <div class="form">
        <div class="form-line">
          <div class="label">任务内容</div>
          <div class="value">{{ task.content }}</div>
        </div>
        <div class="form-line">
          <div class="label">积分数</div>
          <div class="value">{{ task.rewardCoin }}</div>
        </div>
        <div class="form-line" v-if="task.executorId">
          <div class="label">分配给</div>
          <div class="value">{{ stuStore.studentById(task.executorId)?.name }}</div>
        </div>
      </div>
      <div class="btns">
        <div class="btn cancel-btn" @click="closeModal">取消</div>
        <div class="btn confirm-btn" @click="confirmTaskAccomplished">确定</div>
      </div>
    </div>
  </c-modal>
</template>

<style scoped>
.accomplish-task-btn {
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
