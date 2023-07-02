<template>
  <v-app id="ErrorPage">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title
                  >{{ error.statusCode }} - {{ message }}</v-toolbar-title
                >
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <h3>{{ description }}</h3>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'clean',
  props: ['error'],
  computed: {
    message() {
      if (this.error.statusCode === 404) {
        return 'اوپس! اشتباه اومدیم!'
      }
      if (this.error.statusCode === 500) {
        return 'اوه! اوه! باز به مشکل خوردیم!'
      }
      return ''
    },
    description() {
      if (this.error.statusCode === 404) {
        return 'صفحه‌ای که دنبالش می‌گردی نیست!'
      }
      if (this.error.statusCode === 500) {
        return 'پس از بارگذاری مجدد صفحه اگه بازم مشکل بود به ما خبر بده!'
      }
      return ''
    },
  },
}
</script>
