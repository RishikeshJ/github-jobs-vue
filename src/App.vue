<template>
  <div id="app" class="container-fluid header-style">
    <div class="container" style="height: 200px">
      <header>
        <div class="row pt-5 pl-4">
          <div class="col-md-auto col-12 mr-auto">
            <h2 style="cursor:pointer" @click="navigateToHome()">devjobs</h2>
          </div>
          <div class="col-md-auto col-12 mt-md-0 mt-2">
            <div class="float-end">
              <div class="theme-switch-wrapper">
                <label class="theme-switch" for="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    v-model="enableDarkMode"
                    :change="toggleDarkMode()"
                  />
                  <div class="slider round"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      enableDarkMode: false,
    };
  },
  methods: {
    navigateToHome() {
      this.$router.push('/');
    },
    toggleDarkMode() {
      if (this.enableDarkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    },
  },
};
</script>

<style >
h2 {
  color: white;
}
</style>
