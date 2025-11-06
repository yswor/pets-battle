<script setup lang="ts">
import CModal from '@/components/CModal.vue'
import { useStudentStore } from '@/stores/students'
import { useTaskStore } from '@/stores/tasks'
import type { Pet as PetType, Student, Task as TaskType } from '@/type'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { taskStateTextMap } from '@/utils/utils'
import { usePetStore } from '@/stores/pets'
import { petLevelByCoin } from '@/utils/petsPool'

const stuStore = useStudentStore()
const taskStore = useTaskStore()
const petStore = usePetStore()

const { tasks } = storeToRefs(taskStore)

const list = ref(tasks.value)
const searchText = ref('')
const addTaskModalOpen = ref(false)
const taskContent = ref('')
const executor = ref('')
const executorOptions = ref<Student[]>([])
const selectedExecutor = ref<Student | null>(null)
const taskCoin = ref('')

const assignTaskModelOpen = ref(false)
const curTask = ref<TaskType | null>(null)

const taskAccomplishedModelOpen = ref(false)

const addTask = () => {
  addTaskModalOpen.value = true
}

const assignTask = (task: TaskType) => {
  assignTaskModelOpen.value = true
  curTask.value = task
}

const searchTask = () => {
  if (!searchText) {
    list.value = tasks.value
  } else {
    list.value = tasks.value.filter((t) => t.content.indexOf(searchText.value) > -1)
  }
}

const clearNewTaskModelData = () => {
  taskContent.value = ''
  executor.value = ''
  executorOptions.value = []
  selectedExecutor.value = null
}

const closeTaskModal = () => {
  addTaskModalOpen.value = false
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

  addTaskModalOpen.value = false

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

const closeAssignModel = () => {
  assignTaskModelOpen.value = false
  executorOptions.value = []
  curTask.value = null
}

const confirmAssignTask = () => {
  if (!curTask.value?.id) {
    alert('未知错误')
    return
  }
  if (!selectedExecutor.value?.id) {
    alert('未选择任务分配对象')
    return
  }
  assignTaskModelOpen.value = false

  const taskItem: TaskType = {
    ...curTask.value,
    executorId: selectedExecutor.value?.id,
  }

  taskStore.updateTask(taskItem)

  executorOptions.value = []
  curTask.value = null
}

const closeTaskAccomplishedModel = () => {
  taskAccomplishedModelOpen.value = false
  curTask.value = null
}

const accomplishTask = (task: TaskType) => {
  taskAccomplishedModelOpen.value = true
  curTask.value = task
}

const confirmTaskAccomplished = () => {
  taskAccomplishedModelOpen.value = false

  if (!curTask.value || !curTask.value.executorId) {
    alert('未知错误')
    return
  }

  const taskItem: TaskType = {
    ...curTask.value,
    state: 1,
  }

  taskStore.updateTask(taskItem)

  const oldStudentData = stuStore.studentById(curTask.value.executorId)

  if (!oldStudentData) {
    alert('未知错误')
    return
  }

  // 积分变动 更新学生积分信息以及宠物等级
  const stuItem: Student = {
    ...oldStudentData,
    coin: oldStudentData?.coin + curTask.value.rewardCoin,
  }
  stuStore.updateStudent(stuItem)

  const curPetItem = stuItem.pets[stuItem.pets.length - 1]
  if (curPetItem && curPetItem?.id) {
    const oldPet = petStore.petById(curPetItem?.id)
    if (!oldPet) {
      alert('未知错误')
      return
    }
    const pet: PetType = {
      ...oldPet,
      level: petLevelByCoin(stuItem.coin),
    }
    petStore.updatePet(pet)
  }

  curTask.value = null
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="search-box">
        <input class="search-input" v-model="searchText" />
      </div>
      <div class="search-btn" @click="searchTask">搜索</div>
      <div class="add-btn" @click="addTask">新增</div>
    </div>
    <div class="list">
      <div class="task-card" v-for="(task, index) in list" :key="task.id">
        <div class="index">{{ index + 1 }}</div>
        <div class="content">{{ task.content }}</div>
        <div class="value">奖励：{{ task.rewardCoin }}积分</div>
        <div class="execute">
          <div v-if="task.executorId">
            分配给：{{ stuStore.studentById(task.executorId)?.name }}
          </div>
          <div v-else>未分配</div>
        </div>
        <div :class="'state' + (task.state === 0 ? ' warn-text' : ' green-text')">
          {{ taskStateTextMap[task.state] }}
        </div>
        <div class="btns">
          <div class="btn" @click="() => assignTask(task)" v-if="!task.executorId">分配任务</div>
          <div
            class="btn"
            v-else-if="task.executorId && task.state === 0"
            @click="() => accomplishTask(task)"
          >
            确认完成
          </div>
        </div>
      </div>
    </div>
    <!-- 新增任务弹窗 -->
    <CModal :open="addTaskModalOpen" @close="closeTaskModal">
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
    </CModal>
    <!-- 任务分配弹窗 -->
    <CModal :open="assignTaskModelOpen" @close="closeAssignModel">
      <div class="add-task-modal">
        <div class="title">分配任务</div>
        <div class="form">
          <div class="form-line">
            <div class="label">任务内容</div>
            <div class="value">{{ curTask?.content }}</div>
          </div>
          <div class="form-line">
            <div class="label">积分数</div>
            <div class="value">{{ curTask?.rewardCoin }}</div>
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
          <div class="btn confirm-btn" @click="confirmAssignTask">确定</div>
        </div>
      </div>
    </CModal>
    <!-- 确认任务完成弹窗 -->
    <CModal :open="taskAccomplishedModelOpen" @close="closeTaskAccomplishedModel">
      <div class="add-task-modal">
        <div class="title">是否确定任务已完成？</div>
        <div class="form">
          <div class="form-line">
            <div class="label">任务内容</div>
            <div class="value">{{ curTask?.content }}</div>
          </div>
          <div class="form-line">
            <div class="label">积分数</div>
            <div class="value">{{ curTask?.rewardCoin }}</div>
          </div>
          <div class="form-line" v-if="curTask?.executorId">
            <div class="label">分配给</div>
            <div class="value">{{ stuStore.studentById(curTask?.executorId)?.name }}</div>
          </div>
        </div>
        <div class="btns">
          <div class="btn cancel-btn" @click="closeTaskAccomplishedModel">取消</div>
          <div class="btn confirm-btn" @click="confirmTaskAccomplished">确定</div>
        </div>
      </div>
    </CModal>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  margin: 0 0 16px;
  display: flex;
  justify-content: flex-end;
}

.header .add-btn {
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

.header .search-btn {
  width: 128px;
  height: 40px;
  border-radius: 20px;
  background: #ffc107;
  margin: 0 16px 0 0;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #5d4037;
  font-size: 16px;
  cursor: pointer;
}

.header .search-box {
  flex: 1;
  height: 40px;
  border: 2px solid #666;
  border-radius: 20px;
  margin-right: 32px;
  overflow: hidden;
  padding: 0 20px;
}

.header .search-box .search-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0;
  line-height: 20px;
  font-size: 18px;
}

.list {
  overflow: auto;
}

.task-card {
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-radius: 8px;
  margin: 0 0 16px;

  background: #fff9e6;
  color: #5d4037;
}
.index {
  flex-shrink: 0;
  width: 56px;
  text-align: center;
}
.content {
  flex: 1;
  margin-right: 120px;
}

.info {
  flex-shrink: 0;
  width: 240px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.value,
.state,
.execute {
  margin-right: 48px;
  font-size: 14px;
}

.state.warn-text {
  color: red;
}

.state.green-text {
  color: #1a9d6a;
}

.list .btns {
  display: flex;
  justify-content: center;
  align-items: center;
}

.list .btns .btn {
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

.list .btns .btn.shallow-btn {
  opacity: 0.5;
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
