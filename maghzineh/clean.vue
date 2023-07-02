<template>
  <div id="app">
    <v-app id="inspire">
      <nuxt />

    </v-app>
  </div>
</template>

<style>
.widget-icon{
  border-radius: 0 !important;
}
</style>
<!---start GOFTINO code--->
<script type="text/javascript">
  
  !function(){ 
    if(window.location.pathname!="/playGame"){

      var i="rp5zUG",a=window,d=document;
      function g(){
        var g = d.createElement("script"),
            s="https://www.goftino.com/widget/"+i,
            l=localStorage.getItem("goftino_"+i);g.async=!0,
            g.src=l?s+"?o="+l:s;
            
            d.getElementsByTagName("head")[0].appendChild(g);
      }
      "complete"===d.readyState ? g() : a.attachEvent ? a.attachEvent("onload",g) : a.addEventListener("load",g,!1);
    }
  }();
</script>
<!---end GOFTINO code--->