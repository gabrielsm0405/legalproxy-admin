<template>
  <v-btn absolute top icon right small color="primary" @click="$emit('close')" :style="{zIndex:5}">
    <v-icon>fa fa-times</v-icon>
  </v-btn>
</template>