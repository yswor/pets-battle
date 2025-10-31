<script setup lang="ts">
</script>

<template>
    <div class="container">
        <nav class="sidebar">
            <router-link class="nav-item" to="/" active-class="active">宠物列表</router-link>
            <router-link class="nav-item" to="/tasks" active-class="active">任务管理</router-link>
            <router-link class="nav-item" to="/battle" active-class="active">宠物对战</router-link>
            <router-link class="nav-item" to="/gifts" active-class="active">好友赠送</router-link>
            <router-link class="nav-item" to="/settings" active-class="active">系统设置</router-link>
        </nav>
        <div class="content">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.container {
    border: 16px solid #4CAF50;
    background-color: #4CAF50;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: flex-start;
}

.sidebar {
    padding-right: 16px;
    width: 12vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.nav-item {
    border: 1px solid #fff;
    margin: 8px 8px 8px 0;
    background-color: #66BB6A;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    color: #fff;
    font-size: 20px;
    box-shadow: 0 2px 10px 4px #4CAF50;
}

.nav-item:hover {
    background: #4CAF50;
}

.nav-item.active {
    border: 1px solid #4CAF50;
    background: #4CAF50;
}

.content {
    border-radius: 12px;
    flex: 1;
    background: #F1F8E9;
}
</style>