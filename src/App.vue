<template>
  <div id="app">
    <app-form @submit="onFormSubmit" @revalidated="revalidated" />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
