export const formatValueToDecimal = (value) => {
  return (value / 100).toFixed(2)
}
export const formatValueToInteger = (value) => {
  return value * 100
}
export const passwordMatchCheck = (verificationPassword, password, setError, textError) => {
  if (password !== verificationPassword) {
    setError(textError)
    return
  } else {
    setError('')
  }
}
