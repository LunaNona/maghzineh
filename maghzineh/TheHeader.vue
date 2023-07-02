<template>
  <v-app-bar
    class="d-print-none"
    app
    color="transparent"
    dark
    elevation="0"
    clipped-right
  >
    <v-app-bar-nav-icon @click="navIconClicked" />
    <img src='/maghzinehIcon.PNG' height="100%" class="logow" />
    <v-toolbar-title v-if="isScreenBig">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <span>سلام {{Username}}</span>&nbsp&nbsp
          <v-menu
            open-on-hover
            transition="slide-y-transition"
            bottom
            content-class="elevation-0"
            close-delay="300"
            offset-y
            class="nima"
            auto
          >
            <template v-slot:activator="{ on, attrs }">
              <v-hover 
                v-slot="{ hover }"
                close-delay="400"
              >
                <v-btn
                  color="primary"
                  min-width="35"
                  height="35"
                  class="rounded-circle ml-2 pa-0"
                  v-bind="attrs"
                  v-on="on"
                >
                <v-scroll-y-transition>
                  <v-icon v-if="hover" small>fa-caret-down</v-icon>
                </v-scroll-y-transition>
                <v-scroll-y-reverse-transition>
                  <v-icon v-if="!hover" small>fa-user</v-icon>
                </v-scroll-y-reverse-transition>
                </v-btn>
              </v-hover>
            </template>

            <v-list class="pa-0 ma-0 mt-1 nima">
              <v-list-item
                class="pa-0 mr-4 nima"
                v-for="item in items"
                :key="item.name"
              >
               <v-tooltip bottom> 
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    color="primary"
                    :min-width="$vuetify.breakpoint.xs?80:39"
                    :height="$vuetify.breakpoint.xs?40:35"
                    :class="$vuetify.breakpoint.xs?'ma-0 mb-1 pa-0':'rounded-circle mb-1 ma-0 pa-0'"
                    v-bind="attrs"
                    v-on="on"
                    :to="item.ref"
                  >
                  <span class="mx-1" v-if="$vuetify.breakpoint.xs">{{item.name}}</span>
                  <v-icon small>{{item.icon}}</v-icon>
                  </v-btn>
                </template>
                  <span>{{item.name}}</span>
               </v-tooltip>
              </v-list-item>
            </v-list>
          </v-menu>
    
    <span v-if="isShadUser">{{walletCharge}} مغزو </span>
    <v-btn
      v-if="isShadUser"
      fab
      small
      class="primary mx-2"
      min-width="30"
      to="/wallet/view"
    >
    <v-icon>
      fa-wallet
    </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue , Component} from 'nuxt-property-decorator'
import {menuStore, authStore, profileStore} from '@/store'
import nuxtConfig from '~/nuxt.config';
import { profile } from 'console';
@Component
export default class TheHeader extends Vue {
  windowWidth = 0
  title: string = 'پرتال مدیریت تمرینات شناختی'
  UserName: string=''
  items = [
    {name: 'پروفایل' , icon: 'fa-user' , ref:'/user/profile/'},
    {name: 'سبد خرید' , icon: 'fa-shopping-cart' , ref:'/shopping/cart/view'},
    {name: 'خروج' , icon: 'fa-sign-out' , ref:'/logout'}
  ]
  get isScreenBig(){
    if(this.$vuetify.breakpoint.width>nuxtConfig.screenWidth) return true
    else return false
  }
  get Username(){
    if(profileStore.profile)
      return profileStore.profile.firstName
  }
  mounted() {
    profileStore.init()
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    if (authStore.decodedToken?.rol == 'Patient') {
      this.title = 'تمرینات شناختی'
    }
  }
  get id(){
    return authStore.decodedToken?.id;
  }
  get walletCharge(){
    return profileStore.profile?.wallet as number;
  }
  get isSidebarTemporary() {
    return this.windowWidth < 960;
  }

  get isShadUser(){
      return authStore.isShadUser();
  }

  navIconClicked() {
    if (this.isSidebarTemporary) {
      if (!menuStore.isSidebarVisible && menuStore.isSidebarMini) {
        menuStore.toggleSidebarMini()
      }
      menuStore.toggleSidebarVisible()
    } else {
      menuStore.toggleSidebarMini()
    }
  }
}
</script>
<style scoped>
.logow{
  margin: 10px;
}
.nima{
  background-color: #43ff6400;
  position: relative;
  left: 8px;
}
</style>
