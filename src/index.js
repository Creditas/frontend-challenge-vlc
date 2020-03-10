import './styles.css'

export const checkFormValidity = formElement => formElement.checkValidity()

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export const toStringFormValues = values => {
  const match = matchString => value => value.field === matchString
  const FTT = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const NUMBER_OF_INSTALLMENTS = values.find(match('installments')).value / 1000
  const VEHICLE_LOAN_AMOUNT = values.find(match('loan-amount')).value

  return `OUTPUT\n${values
    .map(value => `${value.field} --> ${value.value}`)
    .join('\n')}`.concat(
      `\nTotal ${(FTT + INTEREST_RATE + NUMBER_OF_INSTALLMENTS + 1) * VEHICLE_LOAN_AMOUNT}`
    )
}

export function Send(values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit(formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
}

export function Help(element) {
  element.addEventListener('click', function (event) {
    alert('Display here the help text')
  })
}

export function handleChangeRangeVehicleUnderWarranty(
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  const MIN_VALUE = 12000.0
  warrantyRangeElement.addEventListener('change', function (event) {
    vehicleWarrantyElement.value =
      (Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE)
  })
}

export function handleChangeVehicleLoanAmount(
  loanAmountRangeElement,
  loanAmountElement
) {
  const MIN_VALUE = 30000.0
  loanAmountRangeElement.addEventListener('change', function (event) {
    loanAmountElement.value =
      (Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE)
  })
}

export default class CreditasChallenge {
  static initialize() {
    this.registerEvents()
  }

  static registerEvents() {
    Submit(document.querySelector('.form'))
    Help(document.getElementById('help'))

    handleChangeRangeVehicleUnderWarranty(
      document.getElementById('collateral-value-range'),
      document.getElementById('collateral-value')
    )

    handleChangeVehicleLoanAmount(
      document.getElementById('loan-amount-range'),
      document.getElementById('loan-amount')
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
