<template>
<div class="pa-4 pt-0">
  <div v-if="isAdmin">
    <admin-dashboard ></admin-dashboard>
  </div>
  <div v-if="isTherapist">
    <therapist-dashboard></therapist-dashboard>
  </div>
  <div v-if="isUser">
    <patient-dashboard ></patient-dashboard>
  </div>

</div>
</template>


<script lang="ts">
import {authStore, profileStore} from "~/utils/store-accessor";
import { FcmTokenService } from '~/services';
import { TaskService as Service } from '~/services';
import {Component, Vue} from "nuxt-property-decorator";
import AdminDashboard from "~/components/dashboard/admin-dashboard.vue";
import TherapistDashboard from "~/components/dashboard/therapist-dashboard.vue";
import PatientDashboard from "~/components/dashboard/patient-dashboard.vue";
import { TaskService } from '~/services'

@Component({
  components: { AdminDashboard, TherapistDashboard, PatientDashboard}
})
export default class IndexPage extends Vue {
  text: string = '';
  loaded: boolean=false;
  fcmToken: string = '';
  created() {
    profileStore.init()
    this.loaded=true;
  }

  mounted() {
    this.startListeners();
  }

  async startListeners() {
    console.log('started');
    await this.startOnMessageListeners();
    await this.getFcmToken();
    console.log('Listeners started');
  }

  startOnMessageListeners() {
    this.$fire.messaging.onMessage((payLoad) => {
      console.info('Message recieved. ', payLoad);
    })
  }

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      console.log('Permission result: ', permission === 'granted');
      if (permission === 'granted')
        await this.getFcmToken();
    } catch (e) {
      console.error(e);
    }
  }

  async getFcmToken() {
    try {
      this.fcmToken = await this.$fire.messaging.getToken();
      console.log("TOKEN ID FOR this browser");
      console.log(this.fcmToken);
      await new FcmTokenService().saveFcmToken(this.fcmToken);
    } catch (e) {
      console.error("Error : ", e);
      await this.requestPermission();
    }
  }

  get isAdmin() {
    return authStore.isCenterAdmin() || authStore.isSuperAdmin()
  }
  get isTherapist(){
    return authStore.isTherapist()
  }
  get isUser() {
    return authStore.isUser() || authStore.isShadUser()
  }

}
</script>

<style>
</style>

