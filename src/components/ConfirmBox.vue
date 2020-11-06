<template>
    <v-card>
        <v-card-title>{{title}}</v-card-title>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="$emit('yes')">SIM</v-btn>
            <v-btn text color="red" @click="$emit('cancel')">CANCELAR</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>