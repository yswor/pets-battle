<script setup lang="ts"></script>

<template>
  <div class="wrap-layout-container">
    <nav class="wrap-layout-sidebar">
      <router-link class="wrap-layout-nav-item" to="/" active-class="active">学生列表</router-link>
      <router-link class="wrap-layout-nav-item" to="/pets" active-class="active"
        >宠物列表</router-link
      >
      <router-link class="wrap-layout-nav-item" to="/tasks" active-class="active"
        >任务列表</router-link
      >
      <router-link class="wrap-layout-nav-item" to="/entry" active-class="active">入口</router-link>
      <!-- <router-link class="wrap-layout-nav-item" to="/settings" active-class="active">系统设置</router-link> -->
    </nav>
    <div class="wrap-layout-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrap-layout-container {
  border: 16px solid #4caf50;
  background-color: #4caf50;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
}

.wrap-layout-sidebar {
  padding-right: 16px;
  width: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrap-layout-nav-item {
  border: 1px solid #fff;
  margin: 8px 8px 8px 0;
  background-color: #66bb6a;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  color: #fff;
  font-size: 20px;
  box-shadow: 0 2px 10px 4px #4caf50;
}

.wrap-layout-nav-item:hover {
  background: #4caf50;
}

.wrap-layout-nav-item.active {
  border: 1px solid #4caf50;
  background: #4caf50;
}

.wrap-layout-content {
  border-radius: 12px;
  flex: 1;
  background: #f1f8e9;
}
</style>
