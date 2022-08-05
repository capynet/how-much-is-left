<script setup lang="ts">
import { ref } from "vue";
import IncomesService from "@/services/IncomesService";

const incomeAmount = ref();
const origin = ref("ueExempt");

const submit = function () {
  IncomesService.create({ amount: incomeAmount.value, origin: origin.value });
};
</script>

<template>
  <form @submit.prevent="submit">
    <div class="form-item">
      <label>
        <p>Amount</p>
        <input
          type="number"
          id="income-amount"
          name="income-amount"
          v-model.number="incomeAmount"
          required
        />
        €
      </label>
    </div>

    <fieldset class="form-item">
      <legend>Origin</legend>
      <div class="form-item">
        <input type="radio" id="spain" value="spain" v-model="origin" />
        <label for="spain">Spain</label>
      </div>

      <div class="form-item">
        <input type="radio" id="ue-exempt" value="ueExempt" v-model="origin" />
        <label for="ue-exempt">UE exempt</label>
      </div>
    </fieldset>

    <div class="brief form-item">
      <p><strong>Amount: </strong>{{ incomeAmount }}</p>
      <p><strong>Origin: </strong>{{ origin }}</p>
    </div>

    <input type="submit" />
  </form>
</template>

<style scoped lang="scss">
.brief {
  background: #369;
  color: white;
  padding: 10px;
}
</style>
