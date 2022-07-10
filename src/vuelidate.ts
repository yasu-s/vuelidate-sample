import { useVuelidate } from '@vuelidate/core'
import type { ValidationArgs } from '@vuelidate/core'
import { ref } from 'vue'
import type { Ref } from 'vue-demi'

type ToRefs<T> = { [K in keyof T]: Ref<T[K]> }

export function useCustomVuelidate<
  T extends { [key in keyof Vargs]: unknown },
  Vargs extends ValidationArgs = ValidationArgs,
>(validationsArgs: Ref<Vargs> | Vargs, state: T | Ref<T> | ToRefs<T>) {
  const $externalResults = ref({})
  const v$ = useVuelidate(validationsArgs, state, { $externalResults })

  return {
    v$,
    $externalResults,
  }
}
