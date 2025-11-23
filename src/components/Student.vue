<script setup lang="ts">
import Drawer from '@/components/Drawer.vue'
import type { Student } from '@/type'
import { taskStateTextMap } from '@/utils/utils'
import { useTaskStore } from '@/stores/tasks'
import { ref } from 'vue'
import { usePetStore } from '@/stores/pets'
import { useStudentStore } from '@/stores/students'
import { getRandomPetFromPool } from '@/utils/petsPool'
import { useRouter } from 'vue-router'

const { student } = defineProps<{ student: Student }>()
const emit = defineEmits<{
  openDetail: [id: number]
}>()
const router = useRouter()
const petStore = usePetStore()
const taskStore = useTaskStore()
const stuStore = useStudentStore()

const drawerOpen = ref(false)

const closeDetail = () => {
  drawerOpen.value = false
}

const addPet = () => {
  const petItem = getRandomPetFromPool()

  const petData = {
    id: petStore.getNextPetId(),
    petId: petItem.id,
    level: 1,
    exp: 0,
  }

  const stuData = {
    ...student,
    pets: [...student.pets, petData.id],
  }

  stuStore.updateStudent(stuData)

  petStore.addPet({
    ...petData,
    ownerId: student.id,
  })
}

const navToPet = (id: number) => {
  router.push({ name: 'pet', params: { id } })
}
</script>

<template>
  <div class="student-card" key="{{ student.id }}" @click="drawerOpen = true">
    <div class="name">{{ student.name }}</div>
    <div class="coin">{{ student.coin }}</div>
    <div class="btn">查看详情</div>
  </div>
  <drawer :open="drawerOpen" @close="closeDetail">
    <div class="detail">
      <div class="info-line name">
        <div class="label">姓名</div>
        <div class="value">{{ student.name }}</div>
      </div>
      <div class="info-line coin">
        <div class="label">积分</div>
        <div class="value">{{ student.coin }}</div>
      </div>
      <div class="info-line pets">
        <div class="label">宠物</div>
        <div class="value pet-cards">
          <div v-if="student.pets.length">
            <div class="pet-card" v-for="id in student.pets" :key="id" @click="() => navToPet(id)">
              <img class="icon" :src="petStore.petById(id)?.icon" />
              <div class="name">
                {{ petStore.petById(id)?.name }}
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
          <div class="task-card" v-for="taskId in student.tasks" :key="taskId">
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
</template>

<style scoped>
.student-card {
  padding: 12px;
  background: linear-gradient(225deg, #65c11e 0%, #1ec183 100%);
  width: 100%;
  height: 100%;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border: 1px solid #fff;
  color: #fffff0;
}

.student-card:hover {
  border: 1px solid #66bb6a;
  background: #85e18c;
}

.name {
  margin: 0 0 12px;
  text-align: center;
}

.info-line.coin {
  margin: 0 0 12px;
  text-align: center;
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
