<template>
    <div>
        <div class="container px-0 mb-4" >
            <div class="row" style="height: 60px;margin-top: -30px;">
                
            <form class="form-inline w-100 jobs-input-control  justify-content-center">
                    <div class="form-group mb-2 col-5 px-0">
                        <label for="jobquery" class="sr-only">Filter by title, companies, expertise</label>
                        <input type="text" class="form-control w-100" id="jobquery" placeholder="Filter by title, companies, expertise...">
                    </div>
                    <div class="form-group mb-2" style="z-index:1;">
                        <label for="locationFilter" class="sr-only">Filter by location</label>
                        <input type="text" class="form-control" id="locationFilter" placeholder="Filter by location...">
                    </div>
                    <div class="form-group mb-2 job-type-filter px-3" style="z-index:1; background-color: white">
                        <label for="typeFilter" class="sr-only">Full Time Only</label>
                        <input type="checkbox" id="typeFilter" class="mr-3">
                        <label for="typeFilter" class="mr-3">Full Time Only</label>
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-3 my-4 mx-2 p-3 card" v-for="(value) in jobData.data" :key="value.id" >
                    <img class="img-card-top" :src="value.company_logo" alt="">
                    <span> 5h ago. {{value.type}} </span>
                    <p> {{value.title}} </p>
                    <p class="pb-4"> {{value.company}} </p> 
                    <p class="location">{{value.location}}</p>
                </div>
            </div>
        </div>


        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'JobsScreen',
    props:{

    },
    created(){
        this.getJobs();
    },
    data(){
        return {
            jobData:[]
        }
    },
    methods:{
        getJobs() {
            let baseUrl = "https://ntl-func.netlify.app/.netlify/functions/jobs"
            axios.get(baseUrl, {
            }).then(response=>{
                console.log(response);
                this.jobData = response;
            })
        }
    },
}
</script>

<style scoped>
    .card{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        width: 100%;
    }
    .location{
        color: blue;
        position: absolute;
        bottom: 5px;
        margin-bottom: 0px;
    }
    .img-card-top{
        position: absolute;
        top: -30px;
        left: 50%;
        height: 45px;
        margin-left: -40%;
    }
    .job-type-filter{
        border: 1px solid black;
        padding: 0px;
        height: calc(1.5em + .75rem + 2px);
        box-shadow: 0px 2px 10px -5px;
        border-top: 0px !important;
        border-bottom: 0px !important;
        border-color: rgb(206, 212, 218);
    }
    .jobs-input-control >>> *:not(.btn){
        height: 100%;
    }
    .form-control {
        border-top: 0px !important;
        border-bottom: 0px !important;
        box-shadow: 0px 2px 10px -5px;
        border-radius: 0% !important;
    }

</style>