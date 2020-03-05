import './styles.css'

export const checkFormValidity = formElement => formElement.checkValidity()

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export const confirm = formElement => formElement.checkValidity(true)
export const Alert = formElement => formElement.checkValidity()

export const toStringFormValues = values => {
  const match = matchString => value => value.field === matchString
  const IOF = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const NUMBER_OF_INSTALLMENTS = values.find(match('installments')).value / 1000
  const VEHICLE_LOAN_AMOUNT = values.find(match('loan-amount')).value

  return `OUTPUT\n${values
    .map(value => `${value.field} --> ${value.value}`)
    .join('\n')}`.concat(
    `\nTotal ${(IOF + INTEREST_RATE + NUMBER_OF_INSTALLMENTS + 1) * VEHICLE_LOAN_AMOUNT}`
  )
}

export function Send (values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit (formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
}

export function Help (element) {
  element.addEventListener('click', function (event) {
    alert('Can you help me?')
    setTimeout(function () {
      alert('Yes, sure')
    }, 10000)
  })
}

export function handleChangeRangeVehicleUnderWarranty (
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  const MIN_VALUE = 5000.0
  const MAX_VALUE = 3000000.00

  warrantyRangeElement.addEventListener('change', function (event) {
    vehicleWarrantyElement.value = Math.round(Number(event.target.value) * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
  })

  if (document.getElementById('collateral').selected === 'home') {
    document.getElementById('min-collateral').innerHTML = 80000.0
    document.getElementById('max-collateral').innerHTML = 4500000.0
  }
}

export function handleChangeVehicleLoanAmount (
  loanAmountRangeElement,
  loanAmountElement
) {
  const MIN_VALUE = 3000.0
  const MAX_VALUE = 100000.0

  loanAmountRangeElement.addEventListener('change', function (event) {
    loanAmountElement.value = Math.round(Number(event.target.value) * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
  })
  if (document.getElementById('collateral').selected === 'home') {
    document.getElementById('min-loan').innerHTML = 50000.0
    document.getElementById('max-loan').innerHTML = 100000000.0
  }
}

export default class CreditasChallenge {
  static initialize () {
    this.registerEvents()
  }

  static registerEvents () {
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
