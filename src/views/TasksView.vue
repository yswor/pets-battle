<script setup lang="ts">
import { useStudentStore } from '@/stores/students'
import { useTaskStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { taskStateTextMap } from '@/utils/utils'
import AddTask from '@/components/Tasks/AddTask.vue'
import AssignTask from '@/components/Tasks/AssignTask.vue'
import AccomplishTask from '@/components/Tasks/AccomplishTask.vue'

const stuStore = useStudentStore()
const taskStore = useTaskStore()

const { tasks } = storeToRefs(taskStore)

const list = ref(tasks.value)
const searchText = ref('')

const searchTask = () => {
  if (!searchText) {
    list.value = tasks.value
  } else {
    list.value = tasks.value.filter((t) => t.content.indexOf(searchText.value) > -1)
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="search-box">
        <input class="search-input" v-model="searchText" />
      </div>
      <div class="search-btn" @click="searchTask">搜索</div>
      <add-task />
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
          <assign-task :task="task" v-if="!task.executorId" />
          <accomplish-task :task="task" v-else-if="task.executorId && task.state === 0" />
        </div>
      </div>
    </div>
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
</style>
