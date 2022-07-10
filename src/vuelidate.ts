import { useVuelidate } from '@vuelidate/core'
import type { ValidationArgs, ErrorObject } from '@vuelidate/core'
import { ref, computed } from 'vue'
import type { Ref } from 'vue-demi'

type ToRefs<T> = { [K in keyof T]: Ref<T[K]> }
type ErrorRecords = Record<string, ErrorObject[]>

export function useCustomVuelidate<
  T extends { [key in keyof Vargs]: unknown },
  Vargs extends ValidationArgs = ValidationArgs,
>(validationsArgs: Ref<Vargs> | Vargs, state: T | Ref<T> | ToRefs<T>) {
  const $externalResults = ref({})
  const v$ = useVuelidate(validationsArgs, state, { $externalResults })

  const errors = ref<ErrorRecords>({})

  const validate = () => {
    errors.value = {}

    v$.value.$validate()

    const errorRecords: ErrorRecords = {}
    v$.value.$errors.forEach((err) => {
      const errs = errorRecords[err.$property] ? errorRecords[err.$property] : []
      errorRecords[err.$property] = [...errs, err]
    })
    errors.value = errorRecords
  }

  const reset = () => {
    errors.value = {}
  }

  return {
    v$,
    $externalResults,
    validate,
    errors: computed(() => errors.value),
    reset,
  }
}
