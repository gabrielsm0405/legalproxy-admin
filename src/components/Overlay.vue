<template>
    <v-overlay :value="authenticating || loading_questionaries_request || loading_get_user_data">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('auth', ['authenticating']),
        ...mapState('questionaries', ['loading_questionaries_request']),
        ...mapState('user_data', ['loading_get_user_data'])
    }
}
</script>