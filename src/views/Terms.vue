<template>
    <v-container fluid>
        <v-card flat>
            <!-- Título -->
            <v-col sm="6" cols="12">
                <v-row justify="start" class="ml-5">
                    <h1>Termos</h1>
                </v-row>
                <v-divider></v-divider>
            </v-col>

            <v-row class="ml-1 mr-1">
                <v-col cols="6">
                    <TermList :terms="user_terms" title="Termos do cliente"></TermList>
                </v-col>
                <v-col cols="6">
                    <TermList :terms="user_terms" title="Termos do preposto"></TermList>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import TermList from '../components/TermsList'

export default {
    data: () => ({
        user_terms: [
            {
                name: 'Termo 1',
                author: 'Gabriel Marques',
                content: '...',
                selected: true
            },
            {
                name: 'Termo 2',
                author: 'Gabriel Marques',
                content: '...',
                selected: false
            }
        ],
        proxy_terms: [
            {
                name: 'Termo 1',
                author: 'Gabriel Marques',
                content: '...',
                selected: true
            },
            {
                name: 'Termo 2',
                author: 'Gabriel Marques',
                content: '...',
                selected: false
            }
        ],
    }),
    components: {
        TermList
    }
}
</script>