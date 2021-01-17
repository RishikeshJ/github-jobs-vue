<template>
    <div class="container">
        <JobsScreen/>
    </div>
</template>

<script>
import JobsScreen from './JobsScreen.vue';

export default {
    name: 'HomeScreen',
    components:{
        JobsScreen
    },
    props:{

    }
}
</script>

<style scoped>
    .header-style {
        position: relative;
        width: 100%;
        height:200px;
        background-image: linear-gradient(#5865E0,#1c2685);
        border-bottom-left-radius: 120px 90px;
    }
    h2 {
        color: white;
    }
    
</style>