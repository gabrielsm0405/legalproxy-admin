<template>
    <v-container fluid>
        <v-card flat>
            <!-- Título -->
            <v-col sm="6" cols="12">
                <v-row justify="start" class="ml-5">
                    <h1>Locais de Audiências</h1>
                </v-row>
                <v-divider></v-divider>
            </v-col>

            <v-row class="ma-0">
                <v-col cols="6">
                    <v-card class="scroll" height="500">
                        <v-col sm="3" cols="12">
                            <v-row justify="start" class="ml-5">
                                <h5>Esferas</h5>
                            </v-row>
                            <v-divider></v-divider>
                        </v-col>

                        <Table type="esferas" :demonstrating="false"></Table>
                    </v-card>
                </v-col>

                <v-col cols="6">
                    <v-card class="scroll" height="500">
                        <v-col sm="3" cols="12">
                            <v-row justify="start" class="ml-5">
                                <h5>Tribunais</h5>
                            </v-row>
                            <v-divider></v-divider>
                        </v-col>

                        <Table type="tribunais" :demonstrating="false"></Table>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="ma-0">
                <v-col cols="6">
                    <v-card class="scroll" height="500">
                        <v-col sm="3" cols="12">
                            <v-row justify="start" class="ml-5">
                                <h5>Comarcas</h5>
                            </v-row>
                            <v-divider></v-divider>
                        </v-col>

                        <Table type="comarcas" :demonstrating="false"></Table>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card class="scroll" height="500">
                        <v-col sm="3" cols="12">
                            <v-row justify="start" class="ml-5">
                                <h5>Foros</h5>
                            </v-row>
                            <v-divider></v-divider>
                        </v-col>

                        <Table type="foros" :demonstrating="false"></Table>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="ma-0">
                <v-card class="scroll" height="500" width="100%">
                    <v-col sm="3" cols="12">
                        <v-row justify="start" class="ml-5">
                            <h5>Varas</h5>
                        </v-row>
                        <v-divider></v-divider>
                    </v-col>

                    <Table type="varas" :demonstrating="false"></Table>
                </v-card>
            </v-row>
        </v-card>
    </v-container>
</template>

<style>
.scroll {
  overflow-y: auto;
}
</style>

<script>
import Table from '../components/Table'

export default {
    components: {
        Table
    }
}
</script>