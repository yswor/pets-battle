<script setup lang="ts">
import nameGenerator from '@/utils/nameGenerator'
import { ref } from 'vue'

const name = ref('')
const password = ref('')

const addAccount = () => {}

const gName = ref(nameGenerator())

const generateName = () => {
  gName.value = nameGenerator()
}
</script>

<template>
  <div class="container">
    <div class="block">
      <div>推荐用户名: {{ gName }}</div>
      <div class="btn" @click="generateName">随机生成</div>
    </div>
    <div class="block">
      <div class="form">
        <div class="form-line">
          <div class="label">姓名</div>
          <input type="text" class="input" v-model="name" />
        </div>
        <div class="form-line">
          <div class="label">密码</div>
          <input type="text" class="input" v-model="password" />
        </div>
      </div>
      <div class="btn confirm" @click="addAccount">确认</div>

      <div>{{ name }} - {{ password }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
.block {
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
}
.confirm {
  width: 100px;
  height: 40px;
  background-color: #4caf50;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 16px;
}
</style>
