<template>
  <v-app id="ClinicLoginPage">
    <v-main>
      <v-card class="body-back fill-height">
        <v-card-title>
          <v-img src="maghzinehIcon.png" max-width="60" max-height="60"></v-img>
        <h3 class="text-h3 ml-md-3 font-weight-bold" style="color: #646161">مغزینه</h3>
        </v-card-title>
        <v-tabs v-model="selectedTab"
              :mobile-breakpoint="2"
              backgroundColor="transparent"
                class="mr-0 tab-slider"
            >

              <v-tabs-slider  color="yellow"></v-tabs-slider>

              <v-tab :key="0">
                ورود
              </v-tab>
              <v-tab :key="1">
                درباره ما
              </v-tab>
              <v-tab :key="2">
                محصولات
              </v-tab>
              <v-tab :key="3">
                ارتباط با ما
              </v-tab>
            </v-tabs>


        <v-tabs-items v-model="selectedTab">
          <v-tab-item :key="0"
          class="transparent ">
            <v-row align="center" justify="center" class="fill-height">
              <v-col cols="12" sm="8" md="4">
                <v-card  class="elevation-12 rounded-xl flat card-back ma-4">
                  <v-form @submit.prevent="onSubmit">
                    <v-toolbar class="rounded-t-xl transparent" flat>
                      <v-toolbar-title class="">فرم ورود</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <div v-if="!isLoggingIn || loggingFailed">
                      <v-card-text>
                        <v-text-field
                          v-model="userName"
                          label="نام کاربری/شماره تلفن"
                          name="login"
                          prepend-icon="fa-user"
                          type="text"
                          :error="loggingFailed"
                        />

                        <v-text-field
                          id="password"
                          v-model="password"
                          label="رمز عبور"
                          name="password"
                          prepend-icon="fa-lock"
                          type="password"
                          :error-messages="errorMessage"
                          :error="loggingFailed"
                        />

                        <v-checkbox v-model="rememberMe" label="مرا به خاطر بسپار" />
                      </v-card-text>
                      <v-card-actions>
                        <a
                          :disabled="loggingIn"
                          href="/signup/forgotten"
                        >
                          رمز عبور را فراموش کرده اید؟
                        </a>
                        <v-spacer />
                        <v-btn
                          color="primary"
                          :disabled="loggingIn"
                          dark
                          class="mb-2"
                          to="/signup/signup"
                        >
                          ثبت نام
                        </v-btn>
                        <v-btn
                          type="submit"
                          :disabled="loggingIn"
                          color="primary"
                          class="ml-3 mb-2"
                          dark
                        >
                          ورود
                        </v-btn>

                      </v-card-actions>
                    </div>
                    <div class="justify-center text-center">
                      <v-progress-circular
                        :size="60"
                        :width="8"
                        color="primary"
                        v-if="isLoggingIn && !loggingFailed"
                        class="ma-auto mb-8 mt-8"
                        indeterminate
                      ></v-progress-circular>
                    </div>
                  </v-form>
                </v-card>

              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item :key="1"
                      class="transparent mt-4">
            <v-row align="center" justify="center" class="fill-width">
              <v-col cols="12" sm="8" md="4"  >
            <v-card  class="elevation-24 rounded-xl flat primary white--text pa-10 text-justify ma-4"  >
              شرکت دانش‌بنیان و دانشگاهی فناوران‌شناختی پارس از سال ۱۳۹۲، با همکاری جمعی از متخصصان علوم‌اعصاب‌شناختی، روان‌شناسی‌ شناختی، کامپیوتر، هوش‌مصنوعی و مدل‌سازی فعالیت خود را در قالب تحقیقات در تاثیرگذاری بازیهای شناختی شروع کرد. از سال ۱۳۹۹ این شرکت بصورت جدی وارد بازار مدارس و کلینیکهای توانبخشی گردید. برای اطلاع بیشتر از این محصولات به بخش محصولات شرکت مراجعه نمایید.
            </v-card>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item :key="2"
              class="transparent mt-4">
              <v-row align="center" justify="center" class="fill-height">
                <v-col :cols="viewport">
                  <v-card class="elevation-24 rounded-xl flat card-back pa-5 pt-1 fade-enter text-justify ma-4">
                    <v-card-text class="py-0">
                      <v-timeline
                        align-top
                        :dense="$vuetify.breakpoint.smAndDown"
                      >
                        <v-timeline-item
                          v-for="item in products"
                          :key="item"
                        >
                          <template v-slot:icon>
                            <v-avatar>
                              <img src="maghzinehIcon.png">
                            </v-avatar>
                          </template>
                          <v-card
                            dark
                          >
                            <v-card-title class="primary text-h6">{{ item.name }}</v-card-title>
                            <v-card-text class="white text--primary">
                              {{item.description}}
                            </v-card-text>
                          </v-card>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
          </v-tab-item>
          <v-tab-item :key="3"
                      class="transparent mt-4">
            <v-row align="center" justify="center" class="fill-height">
              <v-col cols="12" sm="8" md="5"  >
                <v-card  class="elevation-24 rounded-xl flat card-back primary--text pa-10 text-justify fade-enter ma-4"   >
                  <v-icon color="primary" class="ml-5">fas fa-location</v-icon>
                  تهران، خیابان کارگر شمالی، خیابان ۱۶(فرشی مقدم)، پارک علم و فناوری دانشگاه تهران، ساختمان شماره ۲، طبقه دوم، واحد ۳۰۵
                  <br><br>
                  <v-icon color="primary" class="ml-3">fa fa-phone</v-icon>
                  تلفن : ۸۶۰۹۳۷۵۱ - ۰۹۰۳۰۶۲۲۸۰۴
                  <br><br>
                  <v-icon color="primary" class="ml-5">fa-brands fa-whatsapp</v-icon>
                  شماره واتساپ : ۰۹۰۳۰۶۲۲۸۰۴
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {authStore, profileStore} from '@/store'

@Component({
  layout: 'clean',
})
export default class LoginPage extends Vue {
  userName: string = ''
  password: string = ''
  rememberMe: boolean = false
  submitted: boolean = false
  isLoggingIn: boolean=false
  selectedTab: number=0
  isCompetition: boolean=false;
  viewport: number=12;
  products=[
    { id: 0,
      name: 'توجه و تمرکز',
      description: 'مغزینه توجه و تمرکز، دربردارنده تمرینات مغزی است که عمدتاً با هدف بهبود و تقویت مولفه‌های مختلف توجه مانند توجه پایدار، انتخابی، تقسیم‌شده و فراخنای توجه طراحی شده‌است.',
      price : ''
      },
    { id: 1,
      name: 'حافظه',
      description: 'مغزینه حافظه، دربردارنده تمرینات مغزی است که عمدتاً با هدف بهبود و تقویت ذخیره اطلاعات ، و به یادآوری آنها در فواصل زمانی کوتاه مدت و بلند مدت طراحی شده‌است.',
      price : ''
      },
    { id: 2,
      name: 'حل مسئله',
      description: 'مغزینه توجه و تمرکز، دربردارنده تمرینات مغزی است که عمدتاً با هدف بهبود و تقویت توانایی حل مسئله و مولفه مهم آن یعنی استدلال منطقی طراحی شده‌است.',
      price : ''
      },
    ]


  created() {
    authStore.silentLogout()
    if(window.location.href.includes('asayesh'))
      this.$router.push('/asayesh/login')
    else if(window.location.href.includes('competition'))
      this.isCompetition = true;
    if(this.$vuetify.breakpoint.width < 600 )
      this.viewport = 12;
    else 
      this.viewport = 8;
  }

  get loggingIn() {
    return authStore.status.loggingIn
  }

  get loggingFailed() {
    return authStore.status.loggingFailed
  }

  get errorMessage() {
    if (this.loggingFailed) return 'نام کاربری یا رمز عبور صحیح نیست.'
    return null
  }

  get redirectTo() {
    return (this.$route.query.to as string) || '/'
  }

  onSubmit() {
    const { userName, password } = this
    if (userName && password) {
      this.isLoggingIn=true
      authStore.login({ userName: userName, password }).then((res) => {
        if (res) this.$router.push(this.redirectTo)
      }).catch(()=>{
        this.isLoggingIn=false;
        }
      )
    }
  }
}
</script>

<style>
.logo{
  display: flex;
}
.logo h1{
  margin: 10px auto;
}
.logo img{
  height: 20vh;
}
.body-back{
  background: url("static/Images/background.png");
  background-size: cover;
}
.v-tabs-items{
  background-color: transparent !important;
  height: 100%;
}
.v-tab{
  font-weight: bold;
  font-size: small;
}
.card-back{
  background: #ffffffd9 !important;
}
.header-card{
  background: rgba(224, 224, 224, 0.65);
}
@media (max-width:500px) {
  .tab-slider{
    background-color: #d2d2d27a !important;
  }
}

</style>
