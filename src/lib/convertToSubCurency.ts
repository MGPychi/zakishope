export const convertToSubCurrency = (amount: number,factor:number) => {
  return Math.round(amount*factor)
}