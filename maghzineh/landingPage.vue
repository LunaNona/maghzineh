<template>
    <div style="background-color:white; overflow:hidden;">
        <div class="body-back">

        </div>
        <div class="pa-4 d-flex flex-column justify-center">
            <h2 class="mx-16 mb-6 text-center">لورم ایپسوم متن ساختگی با تولید سادگی </h2>
            <template v-for="i in 4" >
                <p class="ma-0 mb-1 font-weight-bold">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </p>
                <p class="mb-7">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد .</p>
            </template>
            <img alt="dashboard screenshot" class="my-10" src="/temp/dashboard-dd525c696fb8181b6e1bcdb884cfa3a5.png" style="transform: scale(1.5);">
            <h2 class="mx-2 mt-10 mb-6 text-center">لورم ایپسوم متن ساختگی با تولید سادگی </h2>
            <p class="text-h7 text-center ltr mx-2">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
            <v-btn
            color="primary"
            dark
            class="mb-2 mx-auto rounded-pill"
            outlined
            width="80%"
            to="/signup/signup"
          >
            بیشتر
          </v-btn>
          <img alt="game screenshot" class="my-10" src="/temp/dashboard-dd525c696fb8181b6e1bcdb884cfa3a5.png" style="transform: scale(1.5);">
        </div>
        <v-divider></v-divider>
        <footer class="d-flex flex-column align-center justify-center">
            <div class="my-8 d-flex flex-column justify-center align-center">
                <h2 class="my-2">مغزینه</h2>
                <h3 class="font-weight-light mb-1">شروع کنید!</h3>
                <h3 class="font-weight-light mb-1">وارد شدن</h3>
                <h3 class="font-weight-light mb-1">امتحان بازی ها</h3>
                <h3 class="font-weight-light mb-1">علم ما</h3>
                <h3 class="font-weight-light mb-1">بازی های ما</h3>
            </div>
            
            <div class="my-8 d-flex flex-column justify-center align-center">
                <h2 class="my-2">آزمایشگاه مغز</h2>
                <h3 class="font-weight-light mb-1">درباره ما</h3>
                <h3 class="font-weight-light mb-1">ارتباط با ما</h3>
                <h3 class="font-weight-light mb-1">سابقه ما</h3>
                <h3 class="font-weight-light mb-1">وبلاگ</h3>

            </div>
            <p class="mx-12 text-center">تمامی حقوق این صفحات متعلق به مغزینه می باشد و هرگونه استفاده و کپی برداری منع قانونی دارد.</p>
        </footer>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
    layout: 'clean',
})
export default class LandingPage extends Vue {

}
</script>

<style>
.body-back{
    height: 73vh;
    background: url("static/Images/landingBack.png");
    background-size: contain;
    background-repeat: no-repeat;
}

</style>