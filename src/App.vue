<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const state = reactive({
  firstName: 'Bob',
  lastName: 'Goto',
  age: 20 as number | null,
})

const rules = {
  firstName: { required },
  lastName: { required },
  age: { required },
}

const v$ = useVuelidate(rules, state)

function validate() {
  v$.value.$validate()
}

function resetValidate() {
  v$.value.$reset()
}

function clear() {
  state.firstName = ''
  state.lastName = ''
  state.age = null
  v$.value.$reset()
}
</script>

<template>
  <div>
    <form>
      <div>
        firstName: <input v-model="state.firstName" type="text" />
        <div v-for="error of v$.firstName.$errors" class="error-msg" :ke="error.$uid">
          {{ error.$message }}
        </div>
      </div>
      <div>
        lastName: <input v-model="state.lastName" type="text" />
        <div v-for="error of v$.lastName.$errors" class="error-msg" :ke="error.$uid">
          {{ error.$message }}
        </div>
      </div>
      <div>
        age: <input v-model="state.age" type="number" />
        <div v-for="error of v$.age.$errors" class="error-msg" :ke="error.$uid">
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
