export interface RadioOption<TValue extends string = string> {
  value: TValue
  label?: string
  description?: string
}
