<script setup lang="ts">
import { ref } from 'vue'
import Student from '@/components/Student.vue'
import type { Student as StudentType } from '@/type'
import Drawer from '@/components/Drawer.vue'

const students = ref<StudentType[]>([
  {
    id: 1,
    name: '张三',
    coin: 100,
    pets: [{ id: 1, name: '小黑龙', owner: '张三', icon: '' }],
    receivedGifts: [{ id: 1, senderId: 13, receiverId: 1, type: '番茄', value: 30 }],
    sendGifts: [{ id: 2, senderId: 1, receiverId: 14, type: '鸡蛋', value: 10 }],
  },
  {
    id: 2,
    name: '李四',
    coin: 150,
    pets: [{ id: 2, name: '火凤凰', owner: '李四', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 3,
    name: '王五',
    coin: 80,
    pets: [{ id: 3, name: '冰龙', owner: '王五', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 4,
    name: '赵六',
    coin: 200,
    pets: [{ id: 4, name: '雷鸟', owner: '赵六', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 5,
    name: '陈七',
    coin: 120,
    pets: [{ id: 5, name: '幽灵猫', owner: '陈七', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 6,
    name: '杨八',
    coin: 90,
    pets: [{ id: 6, name: '独角兽', owner: '杨八', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 7,
    name: '吴九',
    coin: 175,
    pets: [{ id: 7, name: '石头人', owner: '吴九', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 8,
    name: '郑十',
    coin: 135,
    pets: [{ id: 8, name: '飞马', owner: '郑十', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 9,
    name: '黄一',
    coin: 160,
    pets: [{ id: 9, name: '海豚', owner: '黄一', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 10,
    name: '周二',
    coin: 110,
    pets: [{ id: 10, name: '闪电鸟', owner: '周二', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 11,
    name: '吕三',
    coin: 95,
    pets: [{ id: 11, name: '树精', owner: '吕三', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 12,
    name: '戴四',
    coin: 185,
    pets: [{ id: 12, name: '水晶兽', owner: '戴四', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 13,
    name: '孙五',
    coin: 140,
    pets: [{ id: 13, name: '风精灵', owner: '孙五', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 14,
    name: '马六',
    coin: 170,
    pets: [{ id: 14, name: '地龙', owner: '马六', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 15,
    name: '胡七',
    coin: 125,
    pets: [{ id: 15, name: '火狐', owner: '胡七', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 16,
    name: '朱八',
    coin: 145,
    pets: [{ id: 16, name: '冰凤凰', owner: '朱八', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 17,
    name: '秦九',
    coin: 155,
    pets: [{ id: 17, name: '雷龙', owner: '秦九', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 18,
    name: '尹十',
    coin: 130,
    pets: [{ id: 18, name: '光精灵', owner: '尹十', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 19,
    name: '何一',
    coin: 190,
    pets: [{ id: 19, name: '暗影豹', owner: '何一', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 20,
    name: '施二',
    coin: 105,
    pets: [{ id: 20, name: '金鹰', owner: '施二', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 21,
    name: '张明',
    coin: 165,
    pets: [{ id: 21, name: '银狼', owner: '张明', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 22,
    name: '李华',
    coin: 115,
    pets: [{ id: 22, name: '铜虎', owner: '李华', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 23,
    name: '王芳',
    coin: 195,
    pets: [{ id: 23, name: '岩熊', owner: '王芳', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 24,
    name: '赵强',
    coin: 180,
    pets: [{ id: 24, name: '水獭', owner: '赵强', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 25,
    name: '陈勇',
    coin: 85,
    pets: [{ id: 25, name: '火猴', owner: '陈勇', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 26,
    name: '杨雪',
    coin: 175,
    pets: [{ id: 26, name: '冰熊', owner: '杨雪', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 27,
    name: '吴磊',
    coin: 135,
    pets: [{ id: 27, name: '雷豹', owner: '吴磊', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 28,
    name: '郑霞',
    coin: 205,
    pets: [{ id: 28, name: '风鹰', owner: '郑霞', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 29,
    name: '黄龙',
    coin: 145,
    pets: [{ id: 29, name: '光虎', owner: '黄龙', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 30,
    name: '周凤',
    coin: 160,
    pets: [{ id: 30, name: '暗龙', owner: '周凤', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 31,
    name: '吕云',
    coin: 120,
    pets: [{ id: 31, name: '星兽', owner: '吕云', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 32,
    name: '戴峰',
    coin: 190,
    pets: [{ id: 32, name: '月魔', owner: '戴峰', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 33,
    name: '孙琳',
    coin: 140,
    pets: [{ id: 33, name: '雾兽', owner: '孙琳', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 34,
    name: '马婷',
    coin: 175,
    pets: [{ id: 34, name: '云龙', owner: '马婷', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 35,
    name: '胡斌',
    coin: 155,
    pets: [{ id: 35, name: '霜虎', owner: '胡斌', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 36,
    name: '朱莉',
    coin: 130,
    pets: [{ id: 36, name: '炎狼', owner: '朱莉', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 37,
    name: '秦浩',
    coin: 200,
    pets: [{ id: 37, name: '雷凤', owner: '秦浩', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 38,
    name: '尹丽',
    coin: 145,
    pets: [{ id: 38, name: '影豹', owner: '尹丽', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 39,
    name: '何强',
    coin: 165,
    pets: [{ id: 39, name: '冰鹰', owner: '何强', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 40,
    name: '施然',
    coin: 185,
    pets: [{ id: 40, name: '风虎', owner: '施然', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 41,
    name: '张锋',
    coin: 150,
    pets: [{ id: 41, name: '水龙', owner: '张锋', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 42,
    name: '李雨',
    coin: 170,
    pets: [{ id: 42, name: '火凤', owner: '李雨', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 43,
    name: '王震',
    coin: 125,
    pets: [{ id: 43, name: '土熊', owner: '王震', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 44,
    name: '赵雪',
    coin: 195,
    pets: [{ id: 44, name: '电豹', owner: '赵雪', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 45,
    name: '陈明',
    coin: 135,
    pets: [{ id: 45, name: '光鹰', owner: '陈明', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 46,
    name: '杨帆',
    coin: 180,
    pets: [{ id: 46, name: '暗狼', owner: '杨帆', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 47,
    name: '吴晨',
    coin: 160,
    pets: [{ id: 47, name: '星凤', owner: '吴晨', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 48,
    name: '郑阳',
    coin: 140,
    pets: [{ id: 48, name: '月虎', owner: '郑阳', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 49,
    name: '黄峰',
    coin: 175,
    pets: [{ id: 49, name: '雾豹', owner: '黄峰', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 50,
    name: '周琪',
    coin: 155,
    pets: [{ id: 50, name: '云鹰', owner: '周琪', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
  {
    id: 51,
    name: '吕星',
    coin: 190,
    pets: [{ id: 51, name: '霜龙', owner: '吕星', icon: '' }],
    receivedGifts: [],
    sendGifts: [],
  },
])

const drawerOpen = ref(false)

const curStudent = ref<StudentType | null>(null)

const showDetail = (id: number) => {
  curStudent.value = students.value.find((s) => s.id === id) || null
  drawerOpen.value = true
}

const closeDetail = () => {
  drawerOpen.value = false
}
</script>

<template>
  <div class="container">
    <div class="list">
      <div class="student-item" v-for="student in students" :key="student.id">
        <Student :student="student" @openDetail="showDetail" />
      </div>
    </div>
    <Drawer :open="drawerOpen" @close="closeDetail">
      <div class="detail">
        <h2>学生详情</h2>
        <div class="name">
          <div class="label">姓名</div>
          <div class="value">{{ curStudent?.name }}</div>
        </div>
        <div class="coin">
          <div class="label">积分</div>
          <div class="value">{{ curStudent?.coin }}</div>
        </div>
      </div>
    </Drawer>
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
}
</style>
