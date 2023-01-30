import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

const runAnimation = () => new Promise(resolve => setTimeout(resolve, 2000));

async function displayWelcomeMessage() {
  const animation = chalkAnimation.rainbow('Welcome to Currency Converter:');
  await runAnimation();
  animation.stop();
}

displayWelcomeMessage();

const conversion = {
  PKR: { USD: 0.0077, GBP: 0.0049, PKR: 1 },
  USD: { GBP: 1.21, PKR: 220.79, USD: 1 },
  GBP: { PKR: 240.50, USD: 0.83, GBP: 1 },
};

interface UserInput {
  fromCurrency: 'PKR' | 'USD' | 'GBP';
  toCurrency: 'PKR' | 'USD' | 'GBP';
  amount: number;
}

const getUserInput = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'fromCurrency',
      type: 'list',
      choices: ['PKR', 'USD', 'GBP'],
      message: 'Select Your Currency:\n',
    },
    {
      name: 'toCurrency',
      type: 'list',
      choices: ['PKR', 'USD', 'GBP'],
      message: 'Select Your Convert Currency:\n',
    },
    {
      name: 'amount',
      type: 'number',
      message: 'Enter Your Amount:\n',
      validate: answer => (isNaN(answer) ? 'Please Enter A Number' : true),
    },
  ]);

  return answers as UserInput;
};

const userInput = await getUserInput();
const { fromCurrency, toCurrency, amount } = userInput;

if (fromCurrency && toCurrency && amount) {
  const result = conversion[fromCurrency][toCurrency] * amount;
  console.log(chalk.cyan(`Your Conversion From ${fromCurrency} To ${toCurrency} Is ${result}`));
} else {
  console.log(chalk.red('Invalid Inputs'));
}

