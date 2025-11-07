<script setup lang="ts">
import { ref } from 'vue'
import Student from '@/components/Student.vue'
import type { Student as StudentType } from '@/type'
import Drawer from '@/components/Drawer.vue'
import { useStudentStore } from '@/stores/students'
import { usePetStore } from '@/stores/pets'
import { useTaskStore } from '@/stores/tasks'
import { getIconByPetLevel, getPetItemName, getRandomPetFromPool } from '@/utils/petsPool'
import { taskStateTextMap } from '@/utils/utils'

const stuStore = useStudentStore()
const petStore = usePetStore()
const taskStore = useTaskStore()
const drawerOpen = ref(false)

const curStudent = ref<StudentType | null>(null)

const showDetail = (id: number) => {
  curStudent.value = stuStore.students.find((s) => s.id === id) || null
  drawerOpen.value = true
}

const closeDetail = () => {
  drawerOpen.value = false
}

const addPet = () => {
  if (!curStudent.value) return

  const petItem = getRandomPetFromPool()

  const petData = {
    id: petStore.getNextPetId(),
    petId: petItem.id,
    level: 1,
  }

  const stuData = {
    ...curStudent.value,
    pets: [...curStudent.value.pets, petData.id],
  }

  stuStore.updateStudent(stuData)

  petStore.addPet({
    ...petData,
    ownerId: curStudent.value.id,
  })

  curStudent.value = stuData
}
</script>

<template>
  <div class="container">
    <div class="list">
      <div class="student-item" v-for="student in stuStore.students" :key="student.id">
        <Student :student="student" @openDetail="showDetail" />
      </div>
    </div>
    <drawer :open="drawerOpen" @close="closeDetail">
      <div class="detail">
        <div class="info-line name">
          <div class="label">姓名</div>
          <div class="value">{{ curStudent?.name }}</div>
        </div>
        <div class="info-line coin">
          <div class="label">积分</div>
          <div class="value">{{ curStudent?.coin }}</div>
        </div>
        <div class="info-line pets">
          <div class="label">宠物</div>
          <div class="value pet-cards">
            <div v-if="curStudent?.pets.length">
              <div class="pet-card" v-for="id in curStudent?.pets" :key="id">
                <img
                  class="icon"
                  :src="
                    getIconByPetLevel({
                      id: petStore.petById(id)?.petId,
                      level: petStore.petById(id)?.level,
                    })
                  "
                />
                <div class="name">
                  {{
                    getPetItemName({
                      id: petStore.petById(id)?.petId,
                      level: petStore.petById(id)?.level,
                    })
                  }}
                </div>
              </div>
            </div>
            <div v-else>
              <div class="add-pet btn" @click="addPet">获取宠物</div>
            </div>
          </div>
        </div>
        <div class="info-line tasks">
          <div class="label">任务</div>
          <div class="value task-cards">
            <div class="task-card" v-for="taskId in curStudent?.tasks" :key="taskId">
              <div class="content">{{ taskStore.taskById(taskId)?.content }}</div>
              <div class="state">
                状态：<span
                  :class="taskStore.taskById(taskId)!.state === 0 ? 'warn-text' : 'green-text'"
                  >{{
                    taskStore.taskById(taskId)
                      ? taskStateTextMap[taskStore.taskById(taskId)!.state]
                      : ''
                  }}</span
                >
              </div>
              <div class="coin">奖励：{{ taskStore.taskById(taskId)?.rewardCoin }}积分</div>
            </div>
          </div>
        </div>
        <!-- TODO: 礼物赠送情况 -->
      </div>
    </drawer>
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

.list {
  flex: 1;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
}

.student-item {
  width: calc((100% - 16px * 8) / 8);
  margin: 0 16px 16px 0;
}

.detail {
  width: 100%;
  height: 100%;
  border: 10px solid #ddd;

  padding: 12px;
}

.info-line {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 18px;
}
.info-line .label {
  font-weight: 600;
  color: #5d4037;
  flex-shrink: 0;
  margin-right: 16px;
}
.info-line .value {
  color: #8d6e63;
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.info-line .value.pet-cards {
}

.pet-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 16px;
  margin-bottom: 8px;

  background: #fff;
  width: 80px;
  height: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.pet-card .icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(225deg, #7ed938 0%, #09ba76 100%);
  border-radius: 4px;
  margin: 0 0 12px;
}

.pet-card .name {
  font-size: 12px;
  color: #333;
  text-align: center;
}

.task-cards {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.task-card {
  width: 100%;
  min-height: 36px;
  padding: 8px 12px;
  margin: 0 0 12px;
  box-shadow: 0 2px 8px #00000020;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  background: #fff;
  color: #333;
}
.task-card .content {
  flex: 1;
  font-size: 14px;
}
.task-card .state,
.task-card .coin {
  font-size: 14px;
  margin-left: 12px;
  flex-shrink: 0;
}

.warn-text {
  color: red;
}

.green-text {
  color: #1a9d6a;
}
</style>
