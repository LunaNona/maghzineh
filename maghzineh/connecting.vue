<template>
    <div class="d-flex flex-column align-center justify-center" style='height:100%'>
        <h1 class="white--text ma-0" style="font-size:3rem; position:relative; top:7rem;">درحال اتصال</h1>
        <lottie
        class="ma-0"
        :width="250"
        :height="250"
        :options="lottieOptions"
        @animCreated="handleAnimation"
      />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {authStore, profileStore} from '@/store'
import * as animationData from "static/animation/99680-3-dots-loading.json";
import lottie from "vue-lottie/src/lottie.vue";
import {AuthService} from "~/services";
import {ShadAuthResponse} from "models/auth/shadAuthResponse"
@Component({
  components: {lottie},
  layout:"clean"
})
export default class ConnectingPage extends Vue {
  anim:null = null;
  response:ShadAuthResponse= {
    success:false,
    loginResponse:{
      authToken:'',
      username:'',
      rememberMe:false,
      expiresIn: 0
    },
  }
  get token(){
    return (this.$route.query.token as unknown) as string
  }
  get redirectTo() {
    return (this.$route.query.to as string) || '/'
  }
  created() {
    console.log("hi")
    authStore.shadLogin(this.token).then((res) => {
      console.log("res" , res);
      if (res){
        this.$router.push(this.redirectTo)
      }
      else
        this.$router.push("/signup/signupNew?token="+this.token);
    })
  }
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: (animationData as any).default },
    };
  }
  handleAnimation (anim) {
    this.anim = anim;
  }
}
</script>