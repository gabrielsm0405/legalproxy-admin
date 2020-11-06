<template>
    <v-overlay :value="authenticating">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('auth', ['authenticating'])
    }
}
</script>