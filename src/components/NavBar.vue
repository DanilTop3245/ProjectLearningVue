<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar_btn">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button style="margin-left: 20px;" @click="$router.push('/about')">Информация</my-button>
            <my-button style="margin-left: 20px;" @click="$router.push('/store')">Посты store</my-button>
            <!-- <my-button style="margin-left: 20px;" @click="$router.push('/composition')">Посты composition API</my-button> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "navbar",
    }
</script>

<style scoped>
.navbar {
    height: 60px;
    background-color: lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 2px 2px 4px gray;
}
</style>