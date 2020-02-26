import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import AppForm from "@/components/AppForm.vue";

describe("AppForm.vue", () => {
  it("submit button is disabled by default", async () => {
    const wrapper = shallowMount(AppForm, {
      propsData: {
        config: [
          {
            type: "short-text",
            id: 1,
            name: "First Name"
          }
        ]
      }
    });

    expect("disabled" in wrapper.find("button").attributes()).to.be.true;
  });
});
