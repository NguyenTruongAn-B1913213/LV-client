<template>
    <div class="fchat">
        <div class="fchat-main">
            <img src="https://bizweb.dktcdn.net/100/378/435/themes/755692/assets/logo.png?1663489820792" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'F-chat',

}
</script>

<style>
/* body {
    width: 100%;
    height: 100%;
} */

.fchat {
    cursor: pointer;
    position: relative;
}

.fchat-main {
    position: fixed;
    z-index: 999;
    right: 0;
    /* width: 10%; */
    height: 550px;
}

.fchat-main img {
    background-size: cover;
    position: absolute;
    bottom: 100px;
    right: 50px;
    width: 80px;
    height: 80px;
    z-index: 9999;
    background: #fff;
    border-radius: 50%;
}
</style>