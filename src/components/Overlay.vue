<template>
    <v-overlay :value="authenticating || loading_questionaries_request">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('auth', ['authenticating']),
        ...mapState('questionaries', ['loading_questionaries_request'])
    }
}
</script>