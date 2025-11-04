<script setup lang="ts">
import { useStudentStore } from '@/stores/students'
import { ref } from 'vue'

const stuStore = useStudentStore()

const tasks = ref([
  {
    id: 1,
    content:
      '打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx擦黑板',
    value: 30,
    state: 'end',
    executorId: 1,
  },
  {
    id: 2,
    content: '准备宠物粮食并清理喂食区',
    value: 10,
    state: 'pending',
    executorId: 2,
  },
  {
    id: 3,
    content: '带狗狗散步30分钟，观察行为和健康状态',
    value: 20,
    state: 'doing',
    executorId: 3,
  },
  {
    id: 4,
    content: '为猫咪换砂并清洗猫砂盆',
    value: 15,
    state: 'end',
    executorId: 4,
  },
  {
    id: 5,
    content: '检查并补充宠物药品和维生素',
    value: 8,
    state: 'pending',
    executorId: 1,
  },
  {
    id: 6,
    content: '修剪指甲与检查耳朵',
    value: 12,
    state: 'doing',
    executorId: 5,
  },
  {
    id: 7,
    content: '给宠物洗澡并吹干（根据季节调整频率）',
    value: 25,
    state: 'pending',
    executorId: 2,
  },
  {
    id: 8,
    content: '清洁和消毒玩具与床铺',
    value: 7,
    state: 'end',
    executorId: 3,
  },
  {
    id: 9,
    content: '预约兽医体检并准备病历记录',
    value: 30,
    state: 'pending',
    executorId: 4,
  },
  {
    id: 10,
    content: '训练基础指令：坐下、过来、等候 10 次',
    value: 18,
    state: 'doing',
    executorId: 1,
  },
  {
    id: 11,
    content: '补充饮用水并清洗水碗',
    value: 5,
    state: 'end',
    executorId: 2,
  },
  {
    id: 12,
    content: '记录今日体重与食量变化',
    value: 6,
    state: 'pending',
    executorId: 3,
  },
  {
    id: 13,
    content: '为小宠物更换垫料并清理笼子',
    value: 14,
    state: 'doing',
    executorId: 4,
  },
  {
    id: 14,
    content: '准备训练奖励零食并分装到小袋中',
    value: 4,
    state: 'end',
    executorId: 5,
  },
  {
    id: 15,
    content: '拍摄宠物近期照片并上传到相册',
    value: 9,
    state: 'pending',
    executorId: 1,
  },
  {
    id: 16,
    content: '更换牵引带并检查磨损情况',
    value: 11,
    state: 'doing',
    executorId: 2,
  },
  {
    id: 17,
    content: '清理猫爬架并修补破损处',
    value: 16,
    state: 'pending',
    executorId: 3,
  },
  {
    id: 18,
    content: '宠物社交时间：安排与朋友的宠物见面',
    value: 13,
    state: 'end',
    executorId: 4,
  },
  {
    id: 19,
    content: '检查门窗安全防护，防止宠物逃跑',
    value: 20,
    state: 'pending',
    executorId: 5,
  },
  {
    id: 20,
    content: '整理并备份疫苗接种记录电子版',
    value: 17,
    state: 'doing',
    executorId: 1,
  },
  {
    id: 21,
    content: '周末大扫除：全面清洁宠物生活区',
    value: 40,
    state: 'pending',
    executorId: 2,
  },
])

const addTask = () => {}

const assignTask = (id: number) => {}
const searchTask = () => {}

const inputHandler = (event: Event) => {
  const target = event.target
  // console.log('input:', target.value)
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="filter">
        <!-- <div class="filter-btn"></div>
        <div class="filter-btn"></div>
        <div class="filter-btn"></div> -->
        <input class="filter-btn" @input="" />
      </div>
      <div class="search-btn" @click="searchTask">搜索</div>
      <div class="add-btn" @click="addTask">新增</div>
    </div>
    <div class="list">
      <div class="task-card" v-for="(task, index) in tasks" :key="task.id">
        <div class="index">{{ index + 1 }}</div>
        <div class="content">{{ task.content }}</div>
        <div class="info">
          <div class="value">奖励：{{ task.value }}积分</div>
          <div class="state">分配给：{{ stuStore.studentById(task.executorId)?.name }}</div>
        </div>
        <div class="btns">
          <div class="btn" @click="() => assignTask(task.id)" v-if="!task.executorId">分配任务</div>
          <div
            class="btn shallow-btn"
            @click="() => assignTask(task.id)"
            v-else-if="task.executorId"
          >
            已分配
          </div>
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

.header .filter {
  flex: 1;
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
}

.info {
  flex-shrink: 0;
  width: 240px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info .value {
  margin: 0 0 8px;
}

.info .state {
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns .btn {
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

.btns .btn.shallow-btn {
  opacity: 0.5;
}
</style>
