<img src="https://www.creditas.com.br/static/images/logo-creditas-color-8367919c2a.svg" width="400">

# Frontend Challenge - Creditas

This is a challenge designed to measure the candidate's expertise.
We would like to clarify that we don't expect everyone to be able to finish the whole challenge, since it has been designed to cover several degrees of expertise, from junior to senior.
Nevertheless, we expect anyone interested in becoming a tripulante in Creditas to give it a try.

In this challenge,cd we focus both on code design and design patterns in JavaScript. The goal is to assess your experience in writing **code that is easy to maintain, loosely coupled and highly cohesive**.

At Creditas we always work giving constructive feedback, therefore we will always dedicate the outmost attention to every solution submitted; contacting you back with the positive aspects of your submission and what could be improved. Just for that it is worth trying! :)

## The challenge

You have to improve the loan simulator implemented in this project.

Both the interface as well as the styles are provided. The challenges include refactoring the code and implementing new functionalities (listed below).

Feel free to componetize whatever you think should be componetized. Our only request is that you use only pure JavaScript, our beloved Vanilla. Do you accept the challenge?

This is the simulator current state:

<img style="display: block; margin: 0 auto;" src="./layout_en.png">


### Expected functionalities

The application must allow the user to choose the asset to be used as collateral:
***"Auto"*** or ***"Home"*** (the default option is ***"Auto"*** ).

It should also follow the calculation rules bellow:

- Financial Transaction Tax (FTT): 6.38%
- Interest Rate: 2.34%
- Maximum loan amount (maximum amount the user can borrow) 80% of the collateral's value. This means that when you change the collateral value, **the maximum for the loan amount slider should be recalculated too**

*Total payable calculation*

```javascript
const totalPayable = ((FTT / 100) + (interestRate / 100) + (numberOfInstallments / 1000) + 1) * loanAmount
```

*Monthly installment calculation*

```javascript
const monthlyInstallment = totalPayable / numberOfInstallments
```

## Challenges to achieve

### CSS
* **Refactor to make maintainance easier** 

Currently, the project's CSS file has too many styles, making readability difficult. We expect you to organize styles, isolating them in order to make them more readable and easier to maintain.

### HTML / JS
* **Add new collateral type _"Home"_** (with its calculation rules) 
* **Refactor the old code (and arrange the new one) to make maintainance easier** 

Currently, Creditas offers two products: home equity loan and auto equity loan. This project implements the *"auto equity"* option only, **you must implement the *"home equity"* option**.
By changing the collateral in the `select` element, the user must see the amount and installment options corresponding to the asset chosen. That is, when selecting either _"Home"_ or _"Auto"_, you must show the correspondent values for each option on the form fields and on the slider.
Please find the corresponding values below:

**Auto**
- Minimum loan amount: R$ 3.000,00;
- Maximum loan amount: R$ 100.000,00;
- Number of installments: 24 / 36 / 48 months
- Collateral minimum value: R$ 5.000,00;
- Collateral maximum value: R$ 3.000.000,00;

**Home**
- Minimum loan amount: R$ 30.000,00;
- Maximum loan amount: R$ 4.500.000,00;
- Number of installments: 120 / 180 / 240 months
- Collateral minimum value: R$ 50.000,00;
- Collateral maximum value: R$ 100.000.000,00;

Finally, you must update the monthly payment value whenever any input changes.

### Layout
The template requires some minor css changes in order to be displayed as proposed in the references provided. Feel free to use any property you feel like to achieve so.

Desktop version:
![Desktop version](./desktop-layout.png)

Mobile version:
![Mobile version](./mobile-layout.png)

### Display the help text

To display the help text, we provide two endpoints on localhost:4000 ( for more details you can check server.js file ):
- 'api/question' which responses is 
```
{ text: 'Question: Can you help me?' }
```
- 'api/answer' which response is 
```
{ text: 'Answer: Yes sure.' }
```

When the user clicks the help link, we need to display an alert with the following text:

*Question: Can you help me?.</br>Answer: Yes, sure*

You will have to consider the following:
- Each endpoint takes 10 seconds to respond, so it will be desirable to avoid the user to wait for this 10 seconds every time the help link is clicked. 
- The requests can return a 500 http status, in this case you will have to display the message error provided in the response

## Development

### Prerequisites

You will need to install on your machine:
- [NodeJs](https://nodejs.org/en/) in order to run the application.
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) in order to clone the repository containing this challenge and submit the pull request with your solution.

### Configuration to run the environment

By executing the following lines of code in your terminal you will be able to:
- Clone the repository containing this challenge.
- Install the necessary dependencies to run the application.
- Run the application.

```shell
git clone https://github.com/Creditas/frontend-challenge-vlc.git
cd frontend/
npm install
npm start
```

If everything is correct, you should be able to access the following URL: [http://localhost:4000/](http://localhost:4000/).

### Dependencies

This project uses some libraries to assist us with tests and running the application. Those are: 
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)
- [Eslint)[https://eslint.org/]

## Tests

To run the tests you must execute the following command:

```shell
npm test
```

## Delivering the challenge

- Please fork our repository to your GitHub account.
- Once you are happy with your solution, upload it and grant access to **@Creditas/valencia-frontend**.
- We will download your code, thoroughly go through it and come back with feedback within a few days.
- In the meantime, please give us your sincere (no sugar coating!) [opinion](https://docs.google.com/forms/d/e/1FAIpQLSdwjudz38JMtMYf3rFBrMHX3XMy2J5oBLPnjBGD1QKvOM2SGg/viewform) on the challenge.
We would like you to send it **even if you didn't finish the challenge**. Here at Creditas, constructive feedbacks are part of our culture.

Thanks for your time and interest in joining us!!
