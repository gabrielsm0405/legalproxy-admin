<template>
  <v-app>
    <Alert></Alert>

    <Navbar v-if="isAuthenticated"></Navbar>

    <Overlay></Overlay>

    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
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
    ...mapState("user_data", ["signout"])
  },
  watch: {
    signout() {
      if (this.signout) {
        this.$router.push({ path: "/signout" });
      }
    },
    isAuthenticated(){
      if(this.isAuthenticated){
        this.get_user_data()
      }
    }
  },
  methods: {
    ...mapActions("user_data", ["get_user_data"])
  }
};
</script>
