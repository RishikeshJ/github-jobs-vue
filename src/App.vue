<template>
     <div id="app" class="container-fluid header-style" :class="(mode === true) ? 'dark' : 'light'">
        <div class="container" style="height:200px;">
        <!-- <button @click="switchMode(mode)">switch</button> -->
        <div class="row pt-5 pl-4">
            <header>
                <div class="col-md-4">
                    <h2> devjobs </h2>
                </div>
            </header>
        </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
import '../src/assets/css/light.css'
// import '../src/assets/css/dark.css'

export default {
    data(){
        return{
            mode : true
        }
    },
    methods:{
        switchMode(currentMode){
            this.mode = !currentMode;
            console.log(this.mode)
            var element = document.createElement("link");
            if(this.mode){
                console.log(document.getElementsByTagName("link"))
                console.log(element);
                element.setAttribute("rel", "stylesheet");
                element.setAttribute("type", "text/css");
                element.setAttribute("href", "../src/assets/css/light.css");
                element.setAttribute("id",'light');
                document.getElementsByTagName("head")[0].appendChild(element);
            } else {
                console.log(element);
                element.setAttribute("rel", "stylesheet");
                element.setAttribute("type", "text/css");
                element.setAttribute("href", "../src/assets/css/dark.css");
                element.setAttribute("id",'dark');
                document.getElementsByTagName("head")[0].appendChild(element);


                let allStyles = document.getElementsByTagName("link")
                    allStyles.forEach(style=> {
                    console.log(style.href)
                })
            }
        },
    }
}
</script>

<style >

h2 {
    color: white;
}



</style>
