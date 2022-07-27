<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

/** 入力Form */
const state = reactive({
  name: 'Goto',
})

/** バリデーションルール */
const rules = {
  name: { required },
}

/** 外部エラー */
const $externalResults = ref({})

const v$ = useVuelidate(rules, state, { $externalResults })

/** バリデーション */
function validate() {
  v$.value.$validate()
}

/** バリデーションリセット */
function resetValidate() {
  v$.value.$clearExternalResults()
  v$.value.$reset()
}

/** externalResults追加 */
function addExternalResults() {
  $externalResults.value = {
    // keyはstateと同様のものを指定する
    name: ['externalResults error'],
  }
}
</script>

<template>
  <div>
    <form>
      <div>
        name: <input v-model="state.name" type="text" />
        <div v-for="error of v$.name.$errors" class="error-msg" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
    </form>
    <div>
      <button @click="validate()">validate</button>
      <button @click="resetValidate()">validate reset</button>
      <button @click="addExternalResults()">addExternalResults</button>
    </div>
  </div>
</template>

<style>
.error-msg {
  color: red;
}
</style>
