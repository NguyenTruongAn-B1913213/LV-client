<template>
  <TheHeader />
  <fchat />
  <boxfchat />
  <router-view />
  <thefooter />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import thefooter from "./components/TheFooter.vue"
import fchat from "./components/Fchat.vue"
import boxfchat from "./components/Box-Fchat.vue"

export default {
  name: "App",
  components: {
    TheHeader,
    thefooter,
    fchat,
    boxfchat
  },
};
</script>

<style></style>
