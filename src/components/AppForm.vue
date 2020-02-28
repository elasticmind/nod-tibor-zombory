<template>
  <form class="form" @submit.prevent="submit">
    <div
      v-for="inputConfig in $_config"
      :key="inputConfig.id"
      class="labeled-input"
    >
      <label :for="inputConfig.name" class="label">
        <span class="label-text">
          {{ inputConfig.name }}
        </span>
        <input
          v-if="inputConfig.type === 'short-text'"
          class="input"
          type="text"
          :name="inputConfig.name"
          maxlength="10"
          :title="inputConfig.description"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'date'"
          class="input"
          type="date"
          :name="inputConfig.name"
          :title="inputConfig.description"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'email'"
          class="input"
          type="email"
          :name="inputConfig.name"
          :title="inputConfig.description"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'long-text'"
          class="input"
          type="text"
          :name="inputConfig.name"
          maxlength="50"
          :title="inputConfig.description"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <input
          v-if="inputConfig.type === 'phone-number'"
          class="input"
          type="tel"
          :name="inputConfig.name"
          :title="inputConfig.description"
          v-model="$data.form[inputConfig.name]"
          :ref="inputConfig.name"
          @input="checkValidity(inputConfig.name)"
        />
        <select
          v-if="inputConfig.type === 'dropdown'"
          class="select"
          :name="inputConfig.name"
          :title="inputConfig.description"
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
          class="select"
          :name="inputConfig.name"
          multiple
          :title="inputConfig.description"
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
      <span
        v-if="invalidFieldNames.has(inputConfig.name)"
        class="error-message"
      >
        {{ inputConfig.name }} is invalid!
      </span>
    </div>
    <button type="submit" :disabled="!!invalidFieldNames.size" class="submit">
      Submit
    </button>
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
$color-dark: rgb(78, 78, 78);
$color-light: rgb(233, 233, 233);
$color-action: rgb(19, 107, 59);
$color-error: rgb(197, 19, 13);

.form {
}

.labeled-input {
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}

.label-text {
  color: $color-dark;
  display: block;
}

.input,
.select {
  color: $color-dark;
  display: block;
  width: 100%;
}

.submit {
  color: $color-action;
  background-color: transparent;
  font-weight: bold;
  border: 2px solid $color-action;
  border-radius: 5px;
  padding: 10px 20px;
  display: block;
  cursor: pointer;
  margin: auto;
  margin-top: 20px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: $color-action;
    color: $color-light;
  }
}

.error-message {
  color: $color-error;
  font-size: 0.8rem;
}
</style>
