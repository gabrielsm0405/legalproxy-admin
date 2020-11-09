<template>
    <v-container fluid>
        <v-card flat>
            <v-col sm="6" cols="12">
                <v-row justify="start" class="ml-5">
                    <h1>Lista de Prepostos</h1>
                </v-row>
                <v-divider></v-divider>
            </v-col>
            <SearchFilter type='proxy'></SearchFilter>

            <Table type="proxy" :demonstrating="false"></Table>
        </v-card>
    </v-container>
</template>

<script>
import SearchFilter from '../components/SearchFilter'
import Table from '../components/Table'

export default {
    components: {
        SearchFilter,
        Table
    }
}
</script>