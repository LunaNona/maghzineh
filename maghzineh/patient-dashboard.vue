<template>
  <div>
    <template >
      
      <v-row class="mt-0" >
        <v-col cols="12" sm="12" md="4" lg="4" xl="4">
          <info-card icon="fa fa-video-camera" name="جلسه آنلاین" unit="" :value="videoSession"></info-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4">
          <info-card  icon="fas fa-rocket" name="پیشرفت در برنامه" :unit="'از '+daysNum+' روز'" :value="doneDays"></info-card>
        </v-col>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4">
          <info-card v-i icon="fas fa-calendar" name="برنامه امروز من" unit="فعالیت" :value="todayProgram"></info-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"> 

          <v-card class="mb-1" min-height="100px">
            <v-card-title class="darken-4 white--text ma-0 pa-2 background-color" style="background-color: #a52a2a">
            <v-icon class="white--text ml-4">fa-calendar</v-icon>
               برنامه امروز من 
            <v-tooltip top max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                           class="mx-1 mr-auto"
                           fab
                           dark
                           x-small
                           color="primary"
                           v-bind="attrs"
                           v-on="on">
                      <v-icon dark>fas fa-info</v-icon>
                    </v-btn>
    
                  </template>
    
                  <span>در این قسمت برنامه امروز شما نشان داده شده است.</span>
    
                </v-tooltip>
            </v-card-title>
            <v-progress-linear
              indeterminate
              color="green"
              v-if="!loaded"
            ></v-progress-linear>
            <v-tabs
              v-model="tab"
              align-with-title
              >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              
              <v-tab
                class="grey lighten-2 rounded-tl-lg ma-1"
                v-for="daySched in dayScheds"
                :key="daySched"
              >
                {{ daySched.title }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="daySched in dayScheds"
                :key="daySched"
              >
              <div style="min-height:150px">

              <v-sheet>
                <v-slide-group
                multiple
                show-arrows
                >
                  <v-slide-item 
                  v-if="daySched.isAssessment"
                  v-for="item in assessment.dayAssessmentDetails"
                  :key="item"
                  >
                      <v-col v-if="!item.doneRepeat" cols="4" sm="4" md="1" lg="1" xl="1" class="text-center">
                        <div
                          light
                          class="main-card elevation-0 transparent text-center d-block elevation-8 align-center"
                        >
                            <br>
                            <v-btn
                              class="game-btn primary pa-3"
                              fab
                              dark
                              height="3.7vw"
                              width="3.7vw"
                              @click="playAssessGame(item.assignment,item.assignment.taskId)"
                            >
                              <v-img :src="'/logos/'+getTask(item.assignment.taskId).name+'.png'"
                                     width="3vw"
                                     height="3vw"
                                     class="image-btn"
                              />
                            </v-btn>
                          <br/>
                              <div
                                class="text-h7 flex-grow-1 text-center absolute bottom grey--text ">
                                {{ getTaskName(item.assignment.taskId) }}
                              </div>
                          <br>
                          </div>
      
                      </v-col>
                  </v-slide-item>
                  <v-slide-item
                  v-if="daySched.detail[0].assessmentId && !daySched.isAssessment"
                  v-for="item in daySched.detail"
                  :key="item"
                  >
                      <v-col v-if="!item.doneRepeat" cols="4" sm="4" md="1" lg="1" xl="1" class="text-center">
                        <div
                          light
                          class="main-card elevation-0 transparent text-center d-block elevation-8 align-center"
                        >
                            <br>
                            <v-btn
                              class="game-btn primary pa-3"
                              fab
                              dark
                              height="3.7vw"
                              width="3.7vw"
                              @click="playGame(item)"
                            >
                              <v-img :src="'/logos/'+getTask(item.assessment.dayAssessmentDetails[0].assignment.taskId).name+'.png'"
                                     width="3vw"
                                     height="3vw"
                                     class="image-btn"
                              />
                            </v-btn>
                          <br/>
                              <div
                                class="text-h7 flex-grow-1 text-center absolute bottom grey--text ">
                                {{ getTaskName(item.assessment.dayAssessmentDetails[0].assignment.taskId) }}
                              </div>
                          <br>
                          </div>
      
                      </v-col>
                  </v-slide-item>
                  <v-slide-item
                  v-if="!daySched.detail[0].assessmentId && !daySched.isAssessment"
                  v-for="item in daySched.detail"
                  :key="item"
                  >
                      <!-- <v-col cols="1" sm="1" md="1" lg="1" xl="1" class="text-center ma-0"> -->
                        <div
                          light
                          class="main-card elevation-0 transparent text-center d-block elevation-8 align-center mx-3"
                        >
                            <br>
                            <v-btn
                              :class="item.doneRepeat?'disabled-btn grey':'game-btn primary pa-3'"
                              fab
                              :disabled="false"
                              dark
                              height="5.7vh"
                              width="5.7vh"
                              @click="playGame(item[0])"
                            >
                              <v-img :src="'/logos/'+getTask(item.assignment.taskId).name+'.png'"
                                     width="5vh"
                                     height="5vh"
                                     class="image-btn"
                              />
                            </v-btn>
                          <br/>
                              <div
                                class="text-h7 flex-grow-1 text-center absolute bottom grey--text ">
                                {{ getTaskName(item.assignment.taskId) }}
                              </div>
                          <br>
                          </div>
      
                      <!-- </v-col> -->
                  </v-slide-item>
                </v-slide-group>
                
              
              </v-sheet>
              <v-overlay
                :absolute="true"
                v-model="falseBool"
              >
              <div class="d-flex flex-column pt-5">
  
                  <h3>شما بسته برنامه ها را فعال ندارید. برای فعال شدن برنامه من این بسته را خریداری کنید.</h3>
                  <v-btn
                  class=" my-2 mx-auto"
                  color="primary"
                  @click="$refs.schedPack.showDialog=true;"
                  >
                  خریداری بسته
                </v-btn>
  
              </div>
              </v-overlay>

              </div>
              </v-tab-item>
            </v-tabs-items>

          </v-card>
        </v-col>
      </v-row>
      <v-row class="progress-chart">
        <v-col cols="12"  lg="6" xl="6" >
          <my-status-window ></my-status-window>
                <v-card :v-if="profile"
            elevation="6"
            class="rounded-b-lg mt-2 overflow-hidden info-card"
            >
            <v-row class="pt-2 pr-4 pb-2">
              <v-col
                class="text-center col-12 mt-auto"
                tag="v-card-text"
              >
                <v-row class="mt-auto">
                  <v-col
                    class="text-right mr-4 mb-2"
                    tag="strong"
                    cols="5"
                  >
                    سن:
                  </v-col>
                  <v-col>{{ age }} سال</v-col>
                </v-row>
                <v-row>
                  <v-col
                    class="text-right"
                    tag="strong"
                    cols="5"
                  >
                    مرکز آموزشی:
                  </v-col>
                  <v-col>
                    <a
                      href=''
                      target="_blank"
                    >{{ school }}</a>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    class="text-right mr-4 mb-2"
                    tag="strong"
                    cols="5"
                  >
                    تلفن:
                  </v-col>
                  <v-col>{{ phoneNumber }}</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card >
        </v-col>
        <v-col cols="12"  lg="6" xl="6">
          <level-progress-window></level-progress-window>
        </v-col>
      </v-row>
  
    </template>

    <BuyPackageDialog ref="schedPack" Id=8 accessDenied=1></BuyPackageDialog>
  </div>
  </template>
  
  <script lang="ts">
  import {Vue, Component,Watch} from "nuxt-property-decorator";
  import InfoCard from "~/components/dashboard/components/info-card.vue";
  import {profileStore} from "~/utils/store-accessor";
  import {VideoCallService} from "~/services/videoCall";
  import {authStore, taskStore} from "~/utils/store-accessor";
  import {AssignmentService, ScheduleService, CompetitionService , CampaignService} from "~/services";
  import {TodaySchedule, UserAssignment,Task,CompetitionDetailResults} from "~/models";
  import VideoCall from "~/pages/videocall/videoCall.vue";
  import VideoCallWindow from "~/components/dashboard/components/video-call-window.vue";
  import LevelProgressWindow from "~/components/dashboard/components/level-progress-window.vue";
  import moment from "moment-jalaali";
  import MyStatusWindow from "~/components/dashboard/components/my-status-window.vue";
  import {ProductService} from "~/services/sopping";
  import * as animationData from "~/static/animation/88282-rocket.json";
  import lottie from "vue-lottie/src/lottie.vue";
  import BuyPackageDialog from "~/components/dialogs/buyPackageDialog.vue";
  import {TodayAssessment} from "~/models/assessmnet";
import {AssessmentService} from "~/services/assessment";
import BuyPlanDialog from "../dialogs/buyPlanDialog.vue";
import TherapistDashboard from "./therapist-dashboard.vue";
   
  @Component({
    components: {MyStatusWindow, VideoCall, InfoCard, VideoCallWindow, LevelProgressWindow, lottie}
  })
  export default class PatientDashboard extends Vue{
    headers: any = [
      { text: "رتبه", value: "rank" },
      { text: "نام", value: "userName" , align: 'center', cellClass: 'ltr'},
      { text: "امتیاز", value: "score" ,align: 'center'},
    ];
    $refs !:{
      packageDialog : BuyPackageDialog
      schedPack : BuyPackageDialog
    }
    dayScheds:any =[];
    tab=0;
    falseBool = false;
    nowOn: number = 0;
    purchased: Array<boolean> = [false,false,false,false];
    tasks: Array<number> = [21,22,23,65]
    campaigns: any = []
    details: CompetitionDetailResults[]|undefined=[];
    loaded:boolean=false;
    videoSession: string ='';
    selectedCompetition: number = 0;
    competitions: any= [];
    doneDays: number=0;
    daysNum:number=0;
    todayProgram:string='';
    campLoaded: boolean = false;
    loading: boolean = true ;
    anim:null = null;
    startedCompetetion : boolean = false;
    isCompetition : boolean = false;
    timerInterval: number|undefined;
    timer ={
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    handleAnimation1 (anim) {
      this.anim = anim;
    }
    data() {
      return {
        anim: null,
        lottieOptions1: { animationData: (animationData as any).default },
      };
    }

    polling: NodeJS.Timeout|undefined;
    notifications=[
      {
        img:'/posters/Poster Hero putaman.png',
        text:""
      }
    ]
    schedule: any[]=[]
    showBuyPackage:boolean=false;
    assessment: TodayAssessment={
      id:0,
      dayAssessmentDetails:[],
      caption:'',
      description: '',
    }
    mounted() {
      profileStore.init()
      taskStore.init();
      new VideoCallService().getSchedule().then((videoCalls)=> {
        if (videoCalls && videoCalls.length > 0) {
          let v = videoCalls.pop()
          this.videoSession = moment(v?.startDate).format('jYYYY/jMM/jDD ساعت HH:mm')
        }
        else{
          this.videoSession="شما جلسه فعالی ندارید"
        }
      })
        new ScheduleService().getTodaySchedule().then((schedule)=>{
          if(schedule) {
            this.todayProgram = schedule.dayScheduleDetails.length.toString()
            this.doneDays = schedule.nowDay
            this.daysNum = schedule.daysNum
            this.schedule.push(schedule);
            this.dayScheds.push({title: schedule.caption,detail:this.arrangeTasks(schedule.dayScheduleDetails),isAssessment:false})
          }
          else {
              this.todayProgram='بدون برنامه'
          }
          this.loaded=true;
        })
      new AssessmentService().getTodayAssessment().then((assess)=>{
        this.assessment = assess
        if(assess){
          this.dayScheds.push({title:"ارزیابی "+this.assessment.caption,detail:this.assessment.dayAssessmentDetails,isAssessment:true})
          this.schedule.push(assess)
        }
        
      })
      new ProductService().hasUserProduct(8).then((has)=>
      {
        if(has)
          this.showBuyPackage=false;
        else
          this.showBuyPackage=true;
      }
      )


      new ScheduleService().getBought().then((res)=>{
        if(res[0].productId){
          this.showBuyPackage=false;
          for(let sched in res){
            this.dayScheds.push({title:res[sched].todaySchedule.caption,detail:this.arrangeTasks(res[sched].todaySchedule.dayScheduleDetails),isAssessment:false})
            this.schedule.push(res[sched].todaySchedule)
          }
        }
      })
    }



    
    arrangeTasks(itemToArrange){
      let arrangedItems = [[itemToArrange[0]]]
      let hasLastItemPushed = false;
      for(let i = 1; i<itemToArrange.length; i++){
        hasLastItemPushed = false;
        for(let taskGroup of arrangedItems)
          if(taskGroup[0].assignment.taskId == itemToArrange[i].assignment.taskId){
            taskGroup.push(itemToArrange[i])
            hasLastItemPushed = true;
          }
        if(hasLastItemPushed == false)  
          arrangedItems.push([itemToArrange[i]]);
      }
      console.log(arrangedItems)
      return(itemToArrange);
    }


  
    get id() {
      return (authStore.decodedToken?.id as unknown) as string
    }  

    get profile(){
      return profileStore.profile;
    }
    get age(){
      return this.profile?.age;
    }
    get school(){
      return this.profile?.school;
    }
    get phoneNumber(){
      return this.profile?.phoneNumber;
    }
  
    @Watch('tab')
    onValueChange() {
      new ProductService().hasUserProduct(8).then((has)=>{
          if(this.tab == this.todayTab)
            if(has)
              this.showBuyPackage = false;
            else
              this.showBuyPackage = true;
          else  
            this.showBuyPackage = false;
        })
    }

    get todayTab(){
      for (let i  in this.dayScheds)
        if(this.dayScheds[i].title == "برنامه درمانگر")
          return i;
      else
        return -1;
    }
    get wallet(){
      return this.profile?.wallet;
    }
    getTaskName(taskId: number) {
      return taskStore.list.find((item) => item.id == taskId)?.faName
    }

  
    getTask(taskId: number) {
      return taskStore.list.find((item) => item.id == taskId)
    }
  
    playAssessGame(assignment, taskId: number){
      let userAssignment= {
        userId: authStore.decodedToken?.id,
        assignment: assignment,
        userScheduleId: this.schedule[this.tab].id,
        userAssessmentId: this.assessment.id
      }
      new AssignmentService().insertUserAssignment(userAssignment as UserAssignment).then((ua) => {
        var task =this.getTask(taskId) as Task
        this.$router.push('/player/'+task.player+'?type=maghzineh&return='+window.location.pathname+'&task='+task.name+'&id='+ua.id);
      })
    }
    playGame(item){
      let userAssignment= {
        userId: authStore.decodedToken?.id,
        assignment: item.assessment?(item.assessment.dayAssessmentDetails[0].assignment):item.assignment,
        userScheduleId: this.schedule[this.tab].id,
        scheduleDetailId: item.id,
      }
      let assignm = item.assessment?(item.assessment.dayAssessmentDetails[0].assignment):item.assignment
      new AssignmentService().insertUserAssignment(userAssignment as UserAssignment).then((ua) => {
        var task =this.getTask(assignm.taskId) as Task
        this.$router.push('/player/'+task.player+'?type=maghzineh&return='+window.location.pathname+'&task='+task.name+'&id='+ua.id);
      })
    }
  }
  </script>
  
  <style scoped>
  .progress-chart {
    height: 500px;
  }
  .info-card{
    height: 110px;
  }
  .zingchart-vue-0-license-text{
    display: none;
  }
  .game-btn:hover{
    width:4.5vw !important;
    height:4.5vw !important;
  }
  .right-btn{
    position: absolute;
    margin: 10px;
    bottom: 0px;
    left: 0px;
  }
  
  .left-btn{
    position: absolute;
    margin: 10px;
    bottom: 0px;
    right: 0px;
  }
  .timer {
  text-align: center;
  display: inline-block;
  border-radius: 3px;
  margin: 0 0.5vw;
  }
  .titlee{
    color: white;
    text-align: center;
    justify-content: center;
    padding: 1vh 0;
    width: 2vw;
    min-width: 45px;
    background-color: rgb(96, 73, 179);
    background-color: rgb(255, 128, 9);
    font-size: 0.9rem;
  }
  .containerr{
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    font-size: 16px;
  }
  
  .loading1{
    padding-right: 3vw;
    display: flex;
    justify-content: start;
    align-items: center;
    align-self: center;
    width: 100%;
  }
  .invisible{
    visibility: hidden;
  }
  .kaj{
    width: 10px;
    height: 120px;
    transform: rotate(-60deg);
  }
  .kaj2{
    width: 10px;
    height: 120px;
    transform: rotate(60deg);
  }
  .shift-to-right{
    position: relative;
    right: -90px;
  }
  
  .shift-to-left{
    position: relative;
    right: 90px;
    
  }

  .disabled-btn{
    pointer-events: none;
  }
  </style>
  