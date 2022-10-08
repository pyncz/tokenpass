export interface SelectOption<TValue extends string = string> {
  value: TValue
  label?: string
  description?: string
}
