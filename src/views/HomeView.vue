<script setup lang="ts">
import { ref } from 'vue';
import Pet from '@/components/Pet.vue';

const pets = ref([
  { id: 1, name: '小白', owner: '张三', icon: 'icon1.png' },
  { id: 2, name: '小黑', owner: '李四', icon: 'icon2.png' },
  { id: 3, name: '小花', owner: '王五', icon: 'icon3.png' },
  { id: 4, name: '小黄', owner: '赵六', icon: 'icon4.png' },
  { id: 5, name: '小灰', owner: '钱七', icon: 'icon5.png' },
  { id: 6, name: '小橙', owner: '孙八', icon: 'icon6.png' },
  { id: 7, name: '小蓝', owner: '周九', icon: 'icon7.png' },
  { id: 8, name: '小红', owner: '陈八', icon: 'icon8.png' },
  { id: 9, name: '小绿', owner: '王九', icon: 'icon9.png' },
  { id: 10, name: '小紫', owner: '刘十', icon: 'icon10.png' },
  { id: 11, name: '小霞', owner: '赵十一', icon: 'icon11.png' },
  { id: 12, name: '小雪', owner: '孙十二', icon: 'icon12.png' },
  { id: 13, name: '小雨', owner: '周十三', icon: 'icon13.png' },
  { id: 14, name: '小风', owner: '吴十四', icon: 'icon14.png' },
  { id: 15, name: '小林', owner: '郑十五', icon: 'icon15.png' },
  { id: 16, name: '小峰', owner: '冯十六', icon: 'icon16.png' },
  { id: 17, name: '小刚', owner: '陈十七', icon: 'icon17.png' },
  { id: 18, name: '小丽', owner: '褚十八', icon: 'icon18.png' },
  { id: 19, name: '小燕', owner: '卫十九', icon: 'icon19.png' },
  { id: 20, name: '小娜', owner: '蒋二十', icon: 'icon20.png' },
  { id: 21, name: '小敏', owner: '沈二一', icon: 'icon21.png' },
  { id: 22, name: '小强', owner: '韩二二', icon: 'icon22.png' },
  { id: 23, name: '小杰', owner: '杨二三', icon: 'icon23.png' },
  { id: 24, name: '小琴', owner: '朱二四', icon: 'icon24.png' },
  { id: 25, name: '小彤', owner: '秦二五', icon: 'icon25.png' },
  { id: 26, name: '小宇', owner: '尤二六', icon: 'icon26.png' },
  { id: 27, name: '小浩', owner: '许二七', icon: 'icon27.png' },
  { id: 28, name: '小亮', owner: '何二八', icon: 'icon28.png' },
  { id: 29, name: '小凯', owner: '吕二九', icon: 'icon29.png' },
  { id: 30, name: '小鹏', owner: '施三十', icon: 'icon30.png' },
  { id: 31, name: '小博', owner: '张三一', icon: 'icon31.png' },
  { id: 32, name: '小辰', owner: '王三二', icon: 'icon32.png' },
  { id: 33, name: '小宁', owner: '李三三', icon: 'icon33.png' },
  { id: 34, name: '小晨', owner: '赵三四', icon: 'icon34.png' },
  { id: 35, name: '小冬', owner: '孙三五', icon: 'icon35.png' },
  { id: 36, name: '小夏', owner: '周三六', icon: 'icon36.png' },
  { id: 37, name: '小秋', owner: '吴三七', icon: 'icon37.png' },
  { id: 38, name: '小彪', owner: '郑三八', icon: 'icon38.png' },
  { id: 39, name: '小虎', owner: '冯三九', icon: 'icon39.png' },
  { id: 40, name: '小龙', owner: '陈四十', icon: 'icon40.png' },
  { id: 41, name: '小翔', owner: '褚四一', icon: 'icon41.png' },
  { id: 42, name: '小瑞', owner: '卫四二', icon: 'icon42.png' },
  { id: 43, name: '小聪', owner: '蒋四三', icon: 'icon43.png' },
  { id: 44, name: '小颖', owner: '沈四四', icon: 'icon44.png' },
  { id: 45, name: '小蕾', owner: '韩四五', icon: 'icon45.png' },
  { id: 46, name: '小菲', owner: '杨四六', icon: 'icon46.png' },
  { id: 47, name: '小洁', owner: '朱四七', icon: 'icon47.png' },
  { id: 48, name: '小军', owner: '秦四八', icon: 'icon48.png' },
  { id: 49, name: '小兰', owner: '尤四九', icon: 'icon49.png' },
  { id: 50, name: '小童', owner: '许五十', icon: 'icon50.png' },
  { id: 51, name: '小乐', owner: '何五一', icon: 'icon51.png' },
  { id: 52, name: '小辰2', owner: '吕五二', icon: 'icon52.png' },
  { id: 53, name: '小皓', owner: '施五三', icon: 'icon53.png' },
  { id: 54, name: '小聪2', owner: '张五四', icon: 'icon54.png' },
  { id: 55, name: '小影', owner: '王五五', icon: 'icon55.png' }
])
</script>

<template>
  <div class="container">
    <h1 class="header">宠物列表</h1>
    <div class="list">
      <div class="pet-item" v-for="pet in pets" :key="pet.id">
        <Pet :pet="pet" />
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
  flex-shrink: 0;
  margin: 0 0 12px;
}

.list {
  flex: 1;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
}

.pet-item {
  width: calc(100% / 8);
  height: 400px;
  margin: 0 16px 16px 0;
}
</style>
