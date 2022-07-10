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
  const $externalResults = ref<Record<string, string[]>>({})
  const v$ = useVuelidate(validationsArgs, state, { $externalResults })

  const errors = ref<ErrorRecords>({})

  const setErrors = () => {
    const errorRecords: ErrorRecords = {}
    v$.value.$errors.forEach((err) => {
      const errs = errorRecords[err.$property] ? errorRecords[err.$property] : []
      errorRecords[err.$property] = [...errs, err]
    })

    // externalResultsでキーが不明なもの
    for (const key of Object.keys($externalResults.value).filter((k) => !errorRecords[k])) {
      const errs = $externalResults.value[key]
      errorRecords[key] = errs.map((err, index) => {
        return {
          $propertyPath: key,
          $property: key,
          $validator: '$externalResults',
          $message: err,
          $params: {},
          $pending: false,
          $response: null,
          $uid: `${key}-externalResult-${index}`,
        }
      })
    }

    errors.value = errorRecords
    console.log(errors.value)
  }

  const reset = () => {
    errors.value = {}
  }

  const validate = () => {
    reset()
    v$.value.$validate()
    setErrors()
  }

  const setExternalResults = (value: Record<string, string[]>) => {
    $externalResults.value = value
    setErrors()
  }

  return {
    v$,
    $externalResults,
    validate,
    errors: computed(() => errors.value),
    reset,
    setExternalResults,
  }
}
