/* eslint-disable no-undef */
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
  const MAX_VALUE = 3000000.0

  warrantyRangeElement.addEventListener('change', function (event) {
    vehicleWarrantyElement.value = Math.floor(Number(event.target.value) * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
  })
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
}

// FIX: Values are nor rendering the event when the option it's selected. ReactDOM.render
// Try to apply required in one of the options to understand the behaviour
// FIX: The range MAX_VALUE is not riching to the limit.
export function handleChangeOption (
  warrantyRangeElement,
  vehicleWarrantyElement,
  loanAmountRangeElement,
  loanAmountElement
) {
  const MIN_VALUE_WARRANTY = 50000.0
  const MAX_VALUE_WARRANTY = 1000000000.0

  const MIN_VALUE_LOAN = 30000.0
  const MAX_VALUE_LOAN = 4500000.0

  let valueOption = document.getElementById('collateral').value

  if (valueOption === 'home') {
    warrantyRangeElement.addEventListener('change', function (event) {
      vehicleWarrantyElement.value = Math.floor(Number(event.target.value) * (MAX_VALUE_WARRANTY - MIN_VALUE_WARRANTY + 1)) + MIN_VALUE_WARRANTY
    })

    loanAmountRangeElement.addEventListener('change', function (event) {
      loanAmountElement.value = Math.round(Number(event.target.value) * (MAX_VALUE_LOAN - MIN_VALUE_LOAN + 1)) + MIN_VALUE_LOAN
    })

    document.getElementById('min-collateral').innerHTML = 50000.0
    document.getElementById('max-collateral').innerHTML = 1000000000.0
    document.getElementById('min-loan').innerHTML = 30000.0
    document.getElementById('max-loan').innerHTML = 4500000.0
  }
  // alert('Initial screen values: ' + valueOption)
}

// FIX: Needs to be fixed.
export function handleInstallment (
  monthlyInstallmentElement,
  totalPayable
) {
  const FTT = 6.38
  const interestRate = 2.34
  const loanAmount = 80

  let numberOfInstallments = document.getElementById('installments').value

  monthlyInstallmentElement.addEventListener('change', function (event) {
    totalPayable = ((FTT / 100) + (interestRate / 100) + (numberOfInstallments / 1000) + 1) * loanAmount
    monthlyInstallment = totalPayable / numberOfInstallments
  })
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

    handleChangeOption(
      document.getElementById('collateral-value-range'),
      document.getElementById('collateral-value'),

      document.getElementById('loan-amount-range'),
      document.getElementById('loan-amount')
    )

    handleInstallment(
      document.getElementById('"monthlyInstallment'),
      document.getElementById('totalPayable')
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
