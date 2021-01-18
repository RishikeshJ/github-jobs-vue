<template>
  <div class="container">
    <!-- job title section -->
    <div class="row justify-content-center mb-5">
      <div class="col-md-10">
        <div class="row job-title-card p-3">
          <div class="col-md-3">
            <img class="image-size img-thumbnail" :src="jobDetails.company_logo ? jobDetails.company_logo : require('../assets/envelope.png')" />
          </div>
          <div class="col-md-6 my-auto">
            <h3>{{ jobDetails.company }}</h3>
            <p> {{ jobDetails.company_url }}</p>
          </div>
          <div class="col-md-3 my-auto">
            <button type="button" class="btn btn-primary">Company Site</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Job details & requirements section -->
    <div class="row justify-content-center mt-5">
      <div class="col-md-10">
        <div class="row job-details-card">
          <div class="col-md-12 p-5 rendered-html-style">
            <p> {{getRelativeTime(jobDetails.created_at)}} • {{ jobDetails.type }}</p>
            <h3>{{ jobDetails.title }}</h3>
            <p>{{ jobDetails.location }}</p>
            <div v-html="jobDetails.description"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- How to Apply Section -->
    <div class="row justify-content-center mt-5 mb-5">
        <div class="col-md-10">
            <div class="row how-to-apply-card mb-5">
                <div class="col-md-12 p-5">
                    <h3 id="test-apply-section"> How to Apply </h3>
                    <div style="overflow-wrap:break-word;" class="how-to-apply-url" v-html="jobDetails.how_to_apply">
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
export default {
  name:"JobDetails",
  created() {
    this.getJobDetails(this.$route.query.id);
  },
  methods: {
    // getJobDetails(id) : this method gets specific job details with respect to its id, this method talks to the backend api
    getJobDetails(id) {
      let baseUrl = "https://ntl-func.netlify.app/.netlify/functions/jobs";
      axios
        .get(baseUrl, {
          params: {
            id: id,
          },
        })
        .then((response) => {
          this.jobDetails = response.data;
        });
    },
    // getRelativeTime(time) : allows us to measure the time elapsed since the created-date
    getRelativeTime(time){
        dayjs.extend(relativeTime);
        return dayjs().to(dayjs(time));
    }
  },
  data() {
    return {
      jobDetails: [],
    };
  },
};
</script>

<style scoped>
.image-size{
    max-width: 50%;
}
.job-title-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin-top: -60px;
}
.job-details-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.how-to-apply-card {
    border-radius: 5px;
    background-image: linear-gradient(#5865E0,#8793f8);
    color: white;
}
.how-to-apply-url>>>a{
    color: white;
    text-decoration: underline;
}


</style>