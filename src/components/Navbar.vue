<template>
  <v-card tile>
    <v-toolbar short color="primary" dark >
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-spacer></v-spacer>

      <v-btn @click="sair" icon>
        <v-icon color="white">fa fa-sign-out-alt</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer temporary class="mt-14" fixed v-model="drawer">
      <v-list nav>
        <v-list-item link @click="dashboard">
          <v-list-item-icon>
            <v-icon>fa fa-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="client_list">
          <v-list-item-icon>
            <v-icon>fa fa-users</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Lista de Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="proxy_list">
          <v-list-item-icon>
            <v-icon>fa fa-gavel</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Lista de Prepostos</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="company_list">
          <v-list-item-icon>
            <v-icon>fa fa-building</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Lista de Empresas</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="hearing_list">
          <v-list-item-icon>
            <v-icon>fa fa-balance-scale</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Lista de Audiências</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="terms">
          <v-list-item-icon>
            <v-icon>fa fa-handshake</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Termos</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="questionnaires">
          <v-list-item-icon>
            <v-icon>fa fa-question</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Questionários</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="hearings_locations">
          <v-list-item-icon>
            <v-icon>fa fa-map-marker-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Locais de audiências</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  methods: {
    dashboard(){
      if (this.$router.currentRoute.name != "Dashboard") {
        this.$router.push({ name: "Dashboard" });
      }
    },
    questionnaires(){
      if (this.$router.currentRoute.name != "Questionaries") {
        this.$router.push({ name: "Questionaries" });
      }
    },
    client_list(){
      if (this.$router.currentRoute.name != "ClientList") {
        this.$router.push({ name: "ClientList" });
      }
    },
    company_list(){
      if (this.$router.currentRoute.name != "CompanyList") {
        this.$router.push({ name: "CompanyList" });
      }
    },
    hearing_list(){
      if (this.$router.currentRoute.name != "HearingList") {
        this.$router.push({ name: "HearingList" });
      }
    },
    proxy_list(){
      if (this.$router.currentRoute.name != "ProxyList") {
        this.$router.push({ name: "ProxyList" });
      }
    },
    terms(){
      if (this.$router.currentRoute.name != "Terms") {
        this.$router.push({ name: "Terms" });
      }
    },
    hearings_locations(){
      if (this.$router.currentRoute.name != "HearingsLocations") {
        this.$router.push({ name: "HearingsLocations" });
      }
    },
    sair() {
      this.$router.push({ path: "/signout" });
    }
  },
};
</script>