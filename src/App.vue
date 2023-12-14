<template>
  <TheHeader />
  <fchat v-if="token" @click="toggleChatbot" />
  <boxfchat v-if="isChatbotEnabled" :isChatbotEnabled="isChatbotEnabled" :toggleChatbot="toggleChatbot" />
  <router-view />
  <thefooter />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import thefooter from "./components/TheFooter.vue"
import fchat from "./components/Fchat.vue"
import boxfchat from "./components/Box-Fchat.vue"
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    TheHeader,
    thefooter,
    fchat,
    boxfchat
  },
  data() {
    return {
      isChatbotEnabled: false
    };
  },
  computed: {
    ...mapState({
      role: (state) => state.role,
      token: (state) => state.token
    }),

  },
  methods: {
    toggleChatbot() {
      this.isChatbotEnabled = !this.isChatbotEnabled
    },

  }
};
</script>

<style></style>
