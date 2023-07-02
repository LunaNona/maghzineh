<template>
  <div class="loading">
    <h3 class="text-center">{{titleText}}</h3>
    <div class="containerr" v-if=(isCompetition)>
        <v-card class='timer'>
          <v-card-title class="titlee">ثانیه</v-card-title>
          {{timer.seconds}}
        </v-card>
        <v-card class='timer'>
           <v-card-title class="titlee">دقیقه</v-card-title>
          {{timer.minutes}}
        </v-card>
        <v-card class='timer' v-if="timer.days>0||timer.hours>0">
           <v-card-title class="titlee">ساعت</v-card-title>
           {{timer.hours}}
        </v-card>
        <v-card class='timer' v-if="timer.days>0">
           <v-card-title class="titlee">روز</v-card-title>
           {{timer.days}}
        </v-card>
    </div>
    <lottie
      :width="200"
      :height="200"
      :options="lottieOptions"
      @animCreated="handleAnimation"
    />
    <span class="text-center">می‌توانید با انجام بازی‌ها از
      <v-btn class="primary" small :to="'/task/introduction?pack='+pack" >این قسمت</v-btn>
      برای مسابقه آماده شوید.</span>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {CompetitionService} from "@/services";
import {Task} from "@/models";
import {authStore, taskStore} from "@/utils/store-accessor";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/static/animation/88282-rocket.json";

@Component({
  components: {
    lottie,
  },
})
export default class CompetitionWaitingPage extends Vue {
  loading: boolean = true ;
  anim:null = null;
  isCompetition : boolean = false;
  timerInterval: number|undefined;
  timer ={
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  handleAnimation (anim) {
    this.anim = anim;
  }
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: (animationData as any).default },
    };
  }
  polling: NodeJS.Timeout|undefined;
  created () {

    taskStore.init();
    this.setOnline();
    this.pollData();
    this.timerInterval = setInterval(this.settingTime,1000) as any

  }

  settingTime(){
    if(this.isCompetition) {
      this.timer.seconds--
      if (this.timer.seconds == -1) {
        this.timer.minutes--;
        this.timer.seconds = 59;
      }
      if (this.timer.minutes == -1) {
        this.timer.hours--;
        this.timer.minutes = 59;
      }
      if (this.timer.hours == -1) {
        this.timer.days--;
        this.timer.hours = 23;
      }
      if (this.timer.days == -1) {
        this.timer.days = 0 , this.timer.minutes = 0 , this.timer.seconds = 0 , this.timer.hours = 0;
        this.pollData();
      }
    }
  }
  beforeDestroy () {
    if (this.polling) {
      clearTimeout(this.polling)
      clearInterval(this.timerInterval)
    }
  }
  get pack(){
    if(this.isShadUser)
      return "putaman";
    else
      return "maghzineh";
  }
  get isShadUser(){
    return authStore.isShadUser();
  }
  pollData () {
      new CompetitionService().getMyCompetition().then((userAssignment) => {
        // console.log(userAssignment)
        if(userAssignment) {

          var task = this.getTask(userAssignment.assignment.taskId) as Task
          if(!task)
            this.pollData()
          this.$store.dispatch("alert/success", 'رقابت اغاز شد')
          this.$router.push('/player/unity19?type=maghzineh&task='+task.name+'&id='+ userAssignment.id+'&return=/competition/results?id='+userAssignment.competitionId);

        }else{
          //Get not started competition
          if(!this.isCompetition)
            new CompetitionService().getUnStartedCompetition().then((competition) =>{
              console.log(competition);
              if(competition){
                this.isCompetition=true;
                //set timer
                this.setTimer(competition.startDate)
              }
            this.loading=false;
          });
          //after a wile repeat this function
          this.polling = setTimeout(()=>{
            this.pollData();
          }, 3000)
        }
    })
  }
  setOnline(){
    new CompetitionService().setUserOnline();
  }
  getTask(taskId: number) {
    return taskStore.list.find((item) => item.id == taskId)
  }
  get titleText(){
    return this.loading?'در حال دریافت اطلاعات...':this.isCompetition?'زمان باقیمانده تا شروع رقابت':'شما رقابت فعالی ندارید'
  }

  private setTimer(startDate) {
    console.log(startDate)
    var timeDistance = Date.parse(startDate)-Date.now();
    this.timer.days = Math.floor(timeDistance/ (1000 * 3600 * 24));
    timeDistance -= this.timer.days*(1000 * 3600 * 24);
    this.timer.hours = Math.floor(timeDistance/(1000 * 3600));
    timeDistance -= this.timer.hours*(1000 * 3600);
    this.timer.minutes = Math.floor(timeDistance/(1000*60));
    timeDistance -= this.timer.minutes*(1000*60);
    this.timer.seconds = Math.ceil(timeDistance/1000);
  }
}
</script>
<style>
  .loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(1.4) translate(-35% , -35%);
  }
  .timer {
  text-align: center;
  display: inline-block;
  border-radius: 3px;
  margin: 0 1vw;
  }
  .titlee{
    color: white;
    text-align: center;
    justify-content: center;
    padding: 1vh 0;
    width: 4vw;
    min-width: 45px;
    background-color: rgb(96, 73, 179);
    /* background-color: rgb(70, 151, 175); */
    /* background-color: rgb(80, 28, 114); */
    background-color: rgb(255, 128, 9);
    font-size: 1rem;
    margin-bottom: 1.5vh;
  }
  .containerr{
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    font-size: 24px;
  }
</style>
