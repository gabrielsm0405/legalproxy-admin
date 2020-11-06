<template>
  <v-app>
    <Navbar v-if="isAuthenticated"></Navbar>

    <Overlay></Overlay>

    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";

export default {
  name: 'App',
  components: {
    Navbar,
    Overlay
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  }
};
</script>
