<template>
    <v-snackbar
        v-model="alert"
        top
        :color="alert_type"
        class="headline"
    >   
        <v-icon v-if="alert_type == 'error' || alert_type == 'warning'" class="mr-2">fas fa-exclamation-triangle</v-icon>
        <v-icon v-else class="mr-2">fas fa-check-circle</v-icon>
        {{this.message}}

        <template v-slot:action="{ attrs }">
            <v-spacer></v-spacer>
            <v-btn
                color="white"
                icon
                v-bind="attrs"
                @click="alert = false"
            >
                <v-icon small>fa fa-times</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data: () => ({
        alert: false,
        message: '',
        alert_type: '',
    }),
    computed: {
        ...mapState('questionaries', ['questionaries_request_error', 'questionaries_request_error_message', 'questionary_added']),
    },
    watch: {
        questionaries_request_error(){
            if(this.questionaries_request_error){
                this.alert_type = 'error'
                this.message = this.questionaries_request_error_message
                this.alert = true
            }
        },
        questionary_added(){
            if(this.questionary_added){
                this.alert_type = 'success'
                this.message = 'O questionário foi cadastrado com sucesso'
                this.alert = true
            }
        }
    }
}
</script>