<template>
  <div id="app">
    <app-form class="form" @submit="onFormSubmit" @revalidated="revalidated" />
    <progress :value="allCount - invalidCount" :max="allCount" />
  </div>
</template>

<script>
import AppForm from "./components/AppForm";
import formatAsCSV from "./util/csvFormatter";
import saveToFile from "./util/saveToFile";

export default {
  components: {
    AppForm
  },
  data() {
    return {
      invalidCount: 0,
      allCount: 0,
      cumulatedSubmissions: ""
    };
  },
  methods: {
    onFormSubmit(values) {
      this.cumulatedSubmissions += formatAsCSV(values);
      saveToFile(this.cumulatedSubmissions);
    },
    revalidated(event) {
      this.invalidCount = event.invalidCount;
      this.allCount = event.allCount;
    }
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #eaeaea;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 80%;
  max-width: 800px;
  padding: 20px;
  margin: auto;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 960px) {
  #app {
    width: 100%;
  }
}

progress {
  display: block;
  width: 60%;
  margin: auto;
  margin-top: 20px;
}
</style>
