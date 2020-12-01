<template>
  <v-app>
    <Alert></Alert>

    <Navbar v-if="isAuthenticated"></Navbar>

    <Overlay></Overlay>

    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Alert from "./components/Alert";

export default {
  name: 'App',
  components: {
    Navbar,
    Overlay,
    Alert
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  }
};
</script>
