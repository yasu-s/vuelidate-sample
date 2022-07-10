<script setup lang="ts">
import { reactive } from 'vue'
import { useCustomVuelidate } from './vuelidate'
import { required } from '@vuelidate/validators'

const state = reactive({
  firstName: 'Bob',
  lastName: 'Goto',
})

const rules = {
  firstName: { required },
  lastName: { required },
}

const { v$, $externalResults, errors, validate: valid, reset } = useCustomVuelidate(rules, state)

function validate() {
  valid()
}

function resetValidate() {
  reset()
}

function clear() {
  state.firstName = ''
  state.lastName = ''
  v$.value.$clearExternalResults()
  reset()
}

function addError() {
  $externalResults.value = { firstName: ['error1'] }
}
</script>

<template>
  <div>
    <form>
      <div>
        firstName: <input v-model="state.firstName" type="text" />
        <div v-for="error of errors.firstName" class="error-msg" :ke="error.$uid">
          {{ error.$message }}
        </div>
      </div>
      <div>
        lastName: <input v-model="state.lastName" type="text" />
        <div v-for="error of errors.lastName" class="error-msg" :ke="error.$uid">
          {{ error.$message }}
        </div>
      </div>
    </form>
    <div>
      <button @click="validate()">validate</button>
      <button @click="resetValidate()">validate reset</button>
      <button @click="clear()">clear</button>
      <button @click="addError()">addError</button>
    </div>
  </div>
</template>

<style>
#app {
  padding: 2rem;
  font-weight: normal;
}

.error-msg {
  color: red;
}
</style>
