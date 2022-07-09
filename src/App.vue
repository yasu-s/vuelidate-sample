<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const state = reactive({
  name: 'Goto',
})

const rules = {
  name: { required },
}

const v$ = useVuelidate(rules, state, { $lazy: true, $autoDirty: false })

function validate() {
  v$.value.$validate()
}

function resetValidate() {
  v$.value.$reset()
}

function clear() {
  state.name = ''
  v$.value.$reset()
}
</script>

<template>
  <div>
    <form>
      <div>
        Name: <input v-model="state.name" type="text" />
        <div v-for="error of v$.name.$errors" class="error-msg" :ke="error.$uid">
          {{ error.$message }}
        </div>
      </div>
    </form>
    <div>
      <button @click="validate()">validate</button>
      <button @click="resetValidate()">validate reset</button>
      <button @click="clear()">clear</button>
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
