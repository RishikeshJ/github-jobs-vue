<template>
    <div>
        <div class="container px-0 mb-4" >
            <div class="row" style="height: 60px;margin-top: -30px;">
            <form class="form-inline w-100 jobs-input-control justify-content-center">
                    <div class="form-group mb-2 col-5 px-0">
                        <label for="jobquery" class="sr-only">Filter by title, companies, expertise</label>
                        <input v-model="description" type="text" class="form-control w-100 px-5" id="jobquery" placeholder="Filter by title, companies, expertise...">
                        <img src="../assets/magnifying-glass.svg" class="Icon"/>
                    </div>
                     <div class="form-group mb-2 col-3 px-0">
                        <label for="locationFilter" class="sr-only">Filter by location</label>
                        <input v-model="location" type="text" class="form-control px-5" id="locationFilter" placeholder="Filter by location...">
                        <img src="../assets/map-pin.svg" class="Icon2"/>
                    </div>
                    <div class="form-group mb-2 job-type-filter px-3" style="z-index:1; background-color: white">
                        <label for="typeFilter" class="sr-only">Full Time Only</label>
                        <input v-model="isFullTime" type="checkbox" id="typeFilter" class="mr-3">
                        <label for="typeFilter" class="mr-3" style="font-weight: bold">Full Time Only</label>
                        <button type="button" @click="getJobs()" class="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-around">
                <div class="col-md-3 my-4 mx-2 p-3 card" v-for="(value) in jobData.data" :key="value.id" @click="onGetDetails(value.id)" >
                    <img class="img-card-top img-responsive" :src="value.company_logo" alt="">
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
        this.getCurrentLocation();
    },
    data(){
        return {
            jobData:[],
            description:'',
            location:'',
            isFullTime:false,
            page:0
        }
    },
    methods:{
        getJobs() {
            let baseUrl = "https://ntl-func.netlify.app/.netlify/functions/jobs"
            axios.get(baseUrl, 
            { 
                params: 
                    { 
                        description: this.description, 
                        location: this.location, 
                        isFullTime: this.isFullTime,
                        page: this.page 
                    }
            }).then(response=>{
                console.log(response);
                this.jobData = response;
            })
        },
        getCurrentLocation(){
            var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
            };

            function success(pos) {
            var crd = pos.coords;
            console.log(pos);
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            }

            function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(success, error, options);
        },
        onGetDetails(id){
            this.$router.push({path: '/job-details', query: { id: id }})
        }
    },
}
</script>

<style scoped>
    .card{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        width: 100%;
        cursor: pointer;
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

    .Icon {
        position: absolute;
        left: 0px;
        padding: 10px 12px;
        pointer-events: none;
        width: 10%;
    }
    .Icon2 {
        position: absolute;
        left: 0px;
        padding: 10px 12px;
        pointer-events: none;
        width: 20%;
    }
</style>