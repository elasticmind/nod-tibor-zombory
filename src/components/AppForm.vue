<template>
  <form @submit.prevent="submit">
    <div v-for="inputConfig in $_config" :key="inputConfig.id">
      <label :for="inputConfig.name">
        {{ inputConfig.name }}
        <input
          v-if="inputConfig.type === 'short-text'"
          type="text"
          :name="inputConfig.name"
          maxlength="10"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'date'"
          type="date"
          :name="inputConfig.name"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'email'"
          type="email"
          :name="inputConfig.name"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'long-text'"
          type="text"
          :name="inputConfig.name"
          maxlength="50"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'phone-number'"
          type="tel"
          :name="inputConfig.name"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <select
          v-if="inputConfig.type === 'dropdown'"
          :name="inputConfig.name"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        >
          <option
            v-for="option in inputConfig.options"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <select
          v-if="inputConfig.type === 'multi-select'"
          :name="inputConfig.name"
          multiple
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        >
          <option
            v-for="option in inputConfig.options"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </label>
    </div>
    <button type="submit" :disabled="!!invalidFieldNames.size">Submit</button>
  </form>
</template>

<script>
import database from "../assets/database.json";

export default {
  props: {
    config: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const accumulatedData = {};
    accumulatedData.form = {};
    accumulatedData.invalidFieldNames = new Set();

    for (const inputConfig of database) {
      accumulatedData.invalidFieldNames.add(inputConfig.name);

      if (
        inputConfig.type === "dropdown" ||
        inputConfig.type === "multi-select"
      ) {
        accumulatedData.form[inputConfig.name] = [];
      } else {
        accumulatedData.form[inputConfig.name] = "";
      }
    }

    return accumulatedData;
  },
  beforeCreate() {
    this.$_config = database;
  },
  methods: {
    checkValidity(refName) {
      if (this.$refs[refName][0].validity.valid) {
        this.invalidFieldNames.delete(refName);
      } else {
        this.invalidFieldNames.add(refName);
      }
      this.emitRevalidated();
    },
    submit() {
      this.$emit("submit", this.$data.form);
      Object.keys(this.$data.form).forEach(key => {
        this.$data.invalidFieldNames.add(key);
        if (typeof this.$data.form[key] === "string") {
          this.$data.form[key] = "";
        } else {
          this.$data.form[key] = [];
        }
        this.emitRevalidated();
      });
    },
    emitRevalidated() {
      this.$emit("revalidated", {
        invalidCount: this.invalidFieldNames.size,
        allCount: database.length
      });
    }
  }
};
</script>

<style scoped lang="scss">
input:invalid {
  border: 2px solid red;
}
</style>
