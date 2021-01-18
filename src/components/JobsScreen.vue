<template>
  <div>
    <div class="d-flex justify-content-center" v-if="isLoading">
      <div class="spinner-border spinner-pos" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="container px-0 mb-4">
      <div class="row" style="max-height: 60px; margin-top: -30px">
        <form
          class="form-inline w-100 jobs-input-control justify-content-lg-center">
          <div class="form-group mb-2 col-lg-5 col-12 px-0 form-control w-100">
            <div class="row w-100 mx-0">
              <div class="col-1 px-0 pt-1 d-lg-flex d-none">
                <img
                  src="../assets/magnifying-glass.svg"
                  class="d-md-flex d-none ml-2"
                  style="height: 35px; width: 30px"/>
              </div>
              <div class="col-lg-11 px-lg-0 d-flex col-12">
                <label for="jobquery" class="sr-only"
                  >Filter by title, companies, expertise</label>
                <input
                  v-model="description"
                  type="text"
                  name="jobquery"
                  class="w-100 px-lg-5 no-padding"
                  style="border: 0"
                  id="jobquery"
                  placeholder="Filter by title, companies, expertise..."/>
                <button
                  class="btn-sm btn-outline-primary d-lg-none float-right"
                  type="button"
                  ref="search"
                  id="search"
                  @click="onSearch()"
                  :disabled="validatorError">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div class="form-control mb-2 col-3 px-0 d-lg-block d-none">
            <label for="locationFilter" class="sr-only"
              >Filter by location</label
            >
            <input
              v-model="location"
              style="border: 0px"
              type="text"
              class="px-5"
              id="locationFilter"
              placeholder="Filter by location..."
            />
            <img src="../assets/map-pin.svg" class="icon-2" />
          </div>
          <div
            class="form-group mb-2 job-type-filter d-lg-flex d-none px-3"
            style="z-index: 1"
          >
            <label for="typeFilter" id="checkbox-fulltime" class="sr-only">Full Time Only</label>
            <input
              v-model="isFullTime"
              type="checkbox"
              id="typeFilter"
              class="mr-3"
              :disabled="validateParams"
            />
            <label
              for="typeFilter"
              class="mr-3 label-text"
              style="font-weight: bold"
              >Full Time Only</label
            >
            <button
              type="button"
              ref="search"
              id="search"
              @click="onSearch()"
              class="btn btn-primary"
              :disabled="validatorError"
            >
              Search
            </button>
          </div>
        </form>
        <div class="container" v-if="this.validatorError">
          <p class="ml-5" id="validation-msg" style="font-style: italic;"> * Only queries with alphabets are allowed </p>
        </div>
      </div>
    </div>
    <div class="container pt-4" v-if="!isLoading">
      <div
        class="row"
        :class="
          jobData.data && jobData.data.length < 3
            ? 'justify-content-start pl-3 ml-2'
            : 'justify-content-around'
        "
      >
        <div
          class="col-md-3 my-4 mx-2 p-3 card"
          v-for="(value, index) in jobData.data"
          :key="index"
          @click="onGetDetails(value.id)"
        >
          <img
            class="img-card-top img-thumbnail"
            :src="
              value.company_logo
                ? value.company_logo
                : require('../assets/envelope.png')
            "
            alt=""
          />
          <span class="pb-3" id="type-test">
            {{ getRelativeTime(value.created_at) }} • {{ value.type }}
          </span>
          <p style="font-weight: bold" class="card-title">{{ value.title }}</p>
          <p class="pb-4">{{ value.company }}</p>
          <p class="location">{{ value.location }}</p>
        </div>
        <div
          v-if="jobData.data && jobData.data.length % 50 === 0"
          @click="onLoadMore()"
          class="col-md-3 my-4 mx-2 p-3 card load-more-card"
        >
          <div style="padding: 26%">
            Load More
            <span
              v-if="loadMoreData"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-if="loadMoreData" class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default {
  name: "JobsScreen",
  props: [],
  created() {
    this.getCurrentLocation();
  },
  data() {
    return {
      jobData: [],
      description: "",
      location: "",
      isFullTime: true,
      page: 0,
      isLoading: false,
      loadMoreData: false,
      lat: "",
      long: "",
      validatorError:false,
    };
  },
  computed: {
    validateParams() {
      var hasNumber = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
      if(hasNumber.test(this.description) || hasNumber.test(this.location)){
        console.log(this.validatorError);
        this.validatorError = true;
      } else {
        this.validatorError = false;
      }
      if (this.description.length > 0 || this.location.length > 0) {return false;}
      else {return true;}


    },
  },
  methods: {
    getJobs() {
      this.loadMoreData ? "" : (this.isLoading = true);
      let baseUrl = "https://ntl-func.netlify.app/.netlify/functions/jobs";
      axios
        .get(baseUrl, {
          params: {
            description: this.description,
            location: this.location,
            isFullTime: this.isFullTime,
            page: this.page,
            lat: this.lat,
            long: this.long,
          },
        })
        .then((response) => {
          if (
            this.jobData.data &&
            this.jobData.data.length > 0 &&
            this.loadMoreData
          ) {
            console.log("length of jobData waS: ", this.jobData.data.length);
            response.data.forEach((data) => {
              this.jobData.data.push(data);
            });
            console.log("length of jobData is now: ", this.jobData.data.length);
          } else {
            this.jobData = response;
          }
        })
        .finally(() => {
          this.isLoading = false;
          this.loadMoreData = false;
        });
    },
    getCurrentLocation() {
      this.isLoading = true;
      if (navigator.geolocation) {
        let that = this;
        that.getJobs();
        navigator.geolocation.getCurrentPosition(
          function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            that.lat = lat;
            that.long = lng;
            that.getJobs();
          },
          function (error) {
            if (error) {
              that.getJobs();
            }
          }
        );
      } else {
        this.getJobs();
      }
    },
    onGetDetails(id) {
      this.$router.push({ path: "/job-details", query: { id: id } });
    },
    getRelativeTime(time) {
      dayjs.extend(relativeTime);
      return dayjs().to(dayjs(time));
    },
    onLoadMore() {
      this.loadMoreData = true;
      this.page++;
      this.getJobs();
    },
    onSearch() {
      this.page = 0;
      this.getJobs();
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  cursor: pointer;
}
.load-more-card {
  background-image: linear-gradient(#5865e0, #1c2685);
  color: white;
}
.location {
  color: #5865e0;
  position: absolute;
  bottom: 5px;
  margin-bottom: 0px;
}
.img-card-top {
  position: absolute;
  top: -30px;
  left: 50%;
  height: 45px;
  width: 45px;
  margin-left: -40%;
}
.job-type-filter {
  padding: 0px;
  height: calc(1.5em + 0.75rem + 2px);
  box-shadow: 0px 2px 10px -5px;
  border-top: 0px !important;
  border-color: rgb(206, 212, 218);
}
.jobs-input-control >>> *:not(.btn) {
  height: 100%;
}
.form-control {
  border-top: 0px !important;
  /* border-bottom: 0px !important; */
  box-shadow: 0px 2px 10px -5px;
  border-radius: 0% !important;
}
.spinner-pos{
   position: fixed;
  left: 45vw;
  top: 50vh;
  z-index: 1000;
  height: 80px;
  width: 80px;
}
.icon {
  position: absolute;
  left: 0px;
  padding: 10px 12px;
  pointer-events: none;
  width: 10%;
}
.icon-2 {
  position: absolute;
  left: 0px;
  padding: 10px 12px;
  pointer-events: none;
  width: 20%;
}
</style>