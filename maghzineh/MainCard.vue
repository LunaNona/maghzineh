<template>
  <v-card height="100%" class="ma-2 mr-5 mt-0 pt-0 rounded-xl">
    <v-row dense class="fill-height flex-column main-card-flex">
      <v-col class="flex-grow-0 mb-0 pb-0">
        <v-card-title class="pb-0">
          <slot name="title"></slot>
        </v-card-title>
      </v-col>
      <v-col class="flex-grow-0">
        <slot name="menu"></slot>
      </v-col>
      <v-col class="ma-0 pb-0" style="padding-bottom: 0px !important;">
        <div class="main-card-body pt-0 pr-1">
          <slot></slot>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class MainCard extends Vue {}
</script>

<style lang="scss">
.main-card-flex {
  flex-wrap: nowrap;
}
.main-card-body {
  height: 68vh !important;
  overflow: auto !important;
}
</style>
