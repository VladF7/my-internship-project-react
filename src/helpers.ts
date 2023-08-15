export const formatValueToDecimal = (value: number | string) => {
  return +(+value / 100).toFixed(2)
}
export const formatValueToInteger = (value: string | number) => {
  return +(Number(value) * 100).toFixed()
}
export const passwordMatchCheck = (
  verificationPassword: string,
  password: string,
  setError: (value: string) => void,
  textError: string
): void => {
  if (password !== verificationPassword) {
    setError(textError)
    return
  } else {
    setError('')
  }
}
