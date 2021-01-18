<template>
  <div>
    <!-- v if implementation for the loading spinner - dependency on the isLoading variable -->
    <div class="d-flex justify-content-center" v-if="isLoading">
      <div class="spinner-border spinner-pos" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <!-- form controls for entering description, location and type for job search -->
    <div class="container px-0 mb-4">
      <div class="row" style="max-height: 60px; margin-top: -30px">
        <form
          class="form-inline w-100 jobs-input-control justify-content-lg-center"
        >
          <div class="form-group mb-2 col-lg-5 col-12 px-0 form-control w-100">
            <div class="row w-100 mx-0">
              <div class="col-1 px-0 pt-1 d-lg-flex d-none">
                <img
                  src="../assets/magnifying-glass.svg"
                  class="d-md-flex d-none ml-2"
                  style="width: 30px"
                />
              </div>
              <div class="col-lg-11 px-lg-0 d-flex col-12">
                <label for="jobquery" class="sr-only">
                  Filter by title, companies, expertise</label
                >
                <input
                  v-model="description"
                  type="text"
                  name="jobquery"
                  class="w-100 px-lg-5 no-padding"
                  style="border: 0"
                  id="jobquery"
                  placeholder="Filter by title, companies, expertise..."
                  :change="validateParams"
                  maxlength="31"
                />
                <button
                  class="btn-sm btn-outline-primary d-lg-none float-right"
                  type="button"
                  ref="search"
                  id="searchResponsive"
                  @click="onSearch()"
                  :disabled="validatorError"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div class="form-control mb-2 col-3 px-0 d-lg-block d-none">
            <div class="row no-gutters">
              <div class="col-2">
                <img src="../assets/map-pin.svg" class="icon-2 ml-2" />
              </div>
              <div class="col-10">
                <label for="locationFilter" class="sr-only">
                  Filter by location</label
                >
                <input
                  v-model="location"
                  style="border: 0px"
                  type="text"
                  class="px-2"
                  id="locationFilter"
                  placeholder="Filter by location..."
                  :change="validateParams"
                  maxlength="31"
                />
              </div>
            </div>
          </div>
          <div
            class="form-group mb-2 job-type-filter d-lg-flex d-none px-3"
            style="z-index: 1"
          >
            <label for="typeFilter" id="checkbox-fulltime" class="sr-only">
              Full Time Only</label
            >
            <input
              v-model="isFullTime"
              type="checkbox"
              id="typeFilter"
              class="mr-3"
              data-toggle="tooltip"
              data-placement="top"
            />
            <label
              for="typeFilter"
              class="mr-3 label-text"
              style="font-weight: bold"
              data-toggle="tooltip"
              data-placement="top"
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
        <!-- validation message with v if condition on validateError variable - checks if string has any numeric or special chars -->
        <div class="container" v-if="this.validatorError">
          <p class="ml-5" id="validation-msg" style="font-style: italic">
            * Text should be less than 30 characters and must not contain special characters
          </p>
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
          id="type-test"
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
          <span class="pb-3" >
            {{ getRelativeTime(value.created_at) }} • {{ value.type }}
          </span>
          <p style="font-weight: bold" class="card-title">{{ value.title }}</p>
          <p class="pb-4">{{ value.company }}</p>
          <p class="location">{{ value.location }}</p>
        </div>
        <div
          v-if="
            jobData.data &&
            jobData.data.length % 50 === 0 &&
            jobData.data.length > 49
          "
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
    <div class="container px-5 no-jobs-card" v-if="jobData.data && jobData.data.length === 0">
      No jobs that match the search criteria exist, please refine your search and try again.
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
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
  watch: {
    isFullTime(val) {
      if (val) {
        let filteredJobData = [];
        filteredJobData.data = [];

        if (this.jobData.data && this.jobData.data.length > 0) {
          this.jobData.data.forEach((job) => {
            if (job.type === "Full Time") {
              filteredJobData.data.push(job);
            }
          });
          this.jobData.data = { ...filteredJobData.data };
        } else {
          this.getJobs();
        }
      } else {
        this.getJobs();
      }
    },
  },
  data() {
    return {
      jobData: [],
      description: "",
      location: "",
      isFullTime: false,
      page: 0,
      isLoading: false,
      loadMoreData: false,
      lat: "",
      long: "",
      validatorError: false,
    };
  },
  computed: {
    // validateParams() : this method allows us to restrict the user from entering numeric or special characters in the input controls
    validateParams() {
      var hasSpecialChar = /[^A-Za-z0-9]/;

      if (hasSpecialChar.test(this.description) 
      || hasSpecialChar.test(this.location) 
      || this.description.length > 30 
      || this.location.length > 30) {
        this.validatorError = true;
      } else {
        this.validatorError = false;
      }
    },
  },
  methods: {
    // getJobs() : this method interacts with the backend functions to get the response with respect to the parameters
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
            response.data.forEach((data) => {
              this.jobData.data.push(data);
            });
          } else {
            this.jobData = response;
          }
        })
        .finally(() => {
          this.isLoading = false;
          this.loadMoreData = false;
        });
    },
    // getCurrentLocation() : this function accesses the geolocation and sets the data variables
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
    // onGetDetails(id) : this method takes the id of a selected job card and passes it to job-details component
    onGetDetails(id) {
      this.$router.push({ path: "/job-details", query: { id: id } });
    },
    // getRelativeTime(time) : allows us to measure the time elapsed since the created-date
    getRelativeTime(time) {
      dayjs.extend(relativeTime);
      return dayjs().to(dayjs(time));
    },
    // onLoadMore() : this method allows us to leverage the paginated data provided by the github jobs api
    onLoadMore() {
      this.loadMoreData = true;
      this.page++;
      this.getJobs();
    },
    // onSearch() : allows us to make a search request on the form submission click
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

#locationFilter:focus,
#jobquery:focus {
  border: 0px !important;
  outline: none !important;
}

.icon {
  position: absolute;
  left: 0px;
  padding: 10px 12px;
  pointer-events: none;
  width: 10%;
}
.icon-2 {
  width: 30px;
}


</style>