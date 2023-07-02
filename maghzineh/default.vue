<template>
  <div id="app">
    <v-app id="inspire">
      <TheHeader />
      <TheSidebar />
      <v-main>
        <v-container fluid style="height: 100%">
          <nuxt />
        </v-container>
      </v-main>
      <Snackbar />
      <!--<TheFooter />-->
    </v-app>
  </div>
</template>

<!---start GOFTINO code--->
<script type="text/javascript">
!function(){var i="rp5zUG",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();
</script>
<!---end GOFTINO code--->
<script>
import TheSidebar from '~/components/containers/sidebar/TheSidebar'
import TheHeader from '~/components/containers/TheHeader'
import Snackbar from '~/components/containers/Snackbar'
export default {
  name: 'TheContainer',
  components: { Snackbar, TheHeader, TheSidebar },
}
</script>

<style scoped>
#main-container {
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>

