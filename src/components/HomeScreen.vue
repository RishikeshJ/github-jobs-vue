<template>
    <div class="container-fluid">
        <div class="row">
            <header>
                <div class="col-md-12">
                    <h4> devjobs </h4>
                </div>
            </header>
        </div>
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
    header {
        position: relative;
        height: 200px;
        width: 100%;
        background-image: linear-gradient(#5865E0,#1c2685);
        border-bottom-left-radius: 120px 90px;
    }
    h4 {
        color: white;
    }
    
</style>