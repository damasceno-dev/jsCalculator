'use client'
import React, {MouseEvent, useState } from "react"

interface calcItem {
   id: string;
   operation: string;
   execution: (event: MouseEvent<HTMLElement>) => void;
   style?: string;
   background?: string;
}

type calcArray = calcItem[]

export default function Home() {
     
  const calcItems : calcArray = [
    {id: 'clear', operation: 'AC', execution: handleClear, background:'bg-sky-950' },
    {id: 'divide', operation: '/', execution: handleOperation},
    {id: 'multiply', operation: '*', execution: handleOperation},
    {id: 'delete', operation: '<', execution: handleDeletion},

    {id: 'seven', operation: '7', execution: handleExpression},
    {id: 'eight', operation: '8', execution: handleExpression},
    {id: 'nine', operation: '9', execution: handleExpression},
    {id: 'subtract', operation: '-', execution: handleOperation},

    {id: 'four', operation: '4', execution: handleExpression},
    {id: 'five', operation: '5', execution: handleExpression},
    {id: 'six', operation: '6', execution: handleExpression},
    {id: 'add', operation: '+', execution: handleOperation},

    {id: 'one', operation: '1', execution: handleExpression},
    {id: 'two', operation: '2', execution: handleExpression},
    {id: 'three', operation: '3', execution: handleExpression},
    {id: 'equals', operation: '=', execution: handleCalculation, style: 'row-span-2', background: 'bg-sky-900'},

    {id: 'zero', operation: '0', execution: handleExpression, style: 'col-span-2'},
    {id: 'decimal', operation: '.', execution: handleDecimalPoint}]


  const Operations = ['+', '-', '/', '*']
  const MinusOperations = ['+-', '--', '/-', '*-']
  const [expression, setExpression] = useState('0');
  // const splitOp = /(\*|\+|\-|\/)/;
  const splitOp = /(\*-|\+-|\--|\/-|\*|(?<=.?\d)\+|(?<=.?\d)\-|\/)/;
  // (?<=.+\d)\+ => to split cases with exponencial number
  //e.g: 1.23e+23 => its not going to split because we have to have a digit preceeding the plus sign 
  //(?<=) regex lookbehind
  const numbersArray = expression.split(splitOp);
  
  const lastElement = numbersArray[numbersArray.length -1];
  let lastValue = lastElement === '' ? numbersArray[numbersArray.length -2] : lastElement;
  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const [maxLimitMessage, setMaxLimitMessage] = useState('');
  const [finishedSendingMessage, setFinishedSendingMessage] = useState(true);
  const maxDigitLimit = 30;

  function verifyMaxDigitLimit() {     
    if (finishedSendingMessage) {

      setFinishedSendingMessage(false) //avoid bug when button is clicked multiple times fast
      setMaxLimitReached(true)
      setMaxLimitMessage('MAX DIGIT LIMIT HAS BEEN REACHED')

      setTimeout(() => {
        setMaxLimitMessage(lastValue)
        setFinishedSendingMessage(true)
      }, 1000);
    }
  }

  function verifyInfinityOrNaN(event : MouseEvent<HTMLElement>) {
    
    let nextValue = (event.target as Element).innerHTML;
    if (lastValue === 'Infinity' || lastValue === 'NaN') {
      Operations.includes(nextValue) ? 
      setExpression('0') :
      setExpression('')
    }
  }

  function handleExpression(event : MouseEvent<HTMLElement>) {
    
    verifyInfinityOrNaN(event)

    let nextValue = (event.target as Element).innerHTML;

    if (lastValue.length +1 > maxDigitLimit) {
      verifyMaxDigitLimit()
      return;
    } else {
      setMaxLimitReached(false)
    }

    if (lastValue === '0' && nextValue === '0') {
      return;
    } else if (lastValue === '0' && nextValue !== '0') {
      let newExpression = expression.slice(0,-1);
      setExpression(newExpression + nextValue);
    } else {
      setExpression(prev => prev + nextValue)
    }
    
  }

  function handleClear() {
    setExpression('0');
    setMaxLimitReached(false)
  }

  function handleOperation(event : MouseEvent<HTMLElement>) {

    verifyInfinityOrNaN(event)

    let newExpression = expression;
    let nextOperator = (event.target as Element).innerHTML;
    let lastCharacter = expression.charAt(expression.length -1);
    let antePenultimate = expression.charAt(expression.length -2);
    let lastTwoCharacters = expression.substring(expression.length -2);

    if (Operations.includes(lastCharacter)) { 
      if( nextOperator !== '-') {
        if (!MinusOperations.includes(lastCharacter + nextOperator) && Operations.includes(antePenultimate)) {
          newExpression = expression.slice(0,-2) //cases like 8+-* => the * operator must replace + and -. 
                                                 //but in cases like 8** => the * operator can't replace both, thats why we check the antepenultimate character to not be a number
        } else {
          newExpression = expression.slice(0,-1) // 8** falls here, and we dont allow the next * to be entered
        }
      } else if (MinusOperations.includes(lastTwoCharacters)) {
        newExpression = expression.slice(0,-1); //cases like 8+- falls here, and we dont allow another minus '-' to be entered
      }
      setExpression(newExpression + nextOperator);
    } else { //first time setting and operation falls here
      setExpression(prev => prev + nextOperator);
    }
    
  }

  function handleDecimalPoint(event : MouseEvent<HTMLElement>) {
    
    if (lastValue.length +1 > maxDigitLimit - 1) {
      //when using decimals, we need at least 2 free digits
      verifyMaxDigitLimit()
      return;
    } else {
      setMaxLimitReached(false)
    }

    if (lastValue.includes('.')) {
      return;
    } else {
      setExpression(prev => prev + (event.target as Element).innerHTML)
    }

    if (lastValue === '') {
      let valueToAdd = '0.'
      setExpression(prev => prev + valueToAdd);
      return;
    }
    
  }

  function handleDeletion() {
    setMaxLimitReached(false)
    
    let newExpression = expression.slice(0,-1);
    if (lastValue.includes('e') || lastValue.includes('Infinit') || 
        lastValue.includes('Na') ) {
      newExpression= '0';
    }
    if (newExpression === '') {
      newExpression = '0';
    }
    setExpression(newExpression)
  }

  function handleCalculation() {

    let totalResult = numbersArray.slice(); 
    if (parseInt(lastValue) === NaN) {
      totalResult.pop();
    }

    let multiplyAndDivisionOperations = totalResult.filter(value =>MinusOperations.includes(value) || Operations.includes(value))
    multiplyAndDivisionOperations.map(op => {
      if (op === '/' || op === '*' || op === '*-' || op === '/-') {
        totalResult = ResolveOperation(op, totalResult)
        
      } 
    })

    let sumAndSubstractOperations = totalResult.filter(value =>MinusOperations.includes(value) || Operations.includes(value))
    sumAndSubstractOperations.map(op => {
      
      if (op === '+' || op === '-'|| op === '+-' || op === '--') {
        totalResult = ResolveOperation(op, totalResult)
      }
    })
    
    if (totalResult.length > 1) {
      throw new Error("Calculation failed");
    }

    
    lastValue = totalResult[0];
    
    setExpression(totalResult[0])
  }

  function ResolveOperation(operation:string, expressionArray: string[]) : string[] {

    let nextOperation = expressionArray.indexOf(operation); 
    let firstValue = Number(expressionArray[nextOperation - 1]); 
    let secondValue = Number(expressionArray[nextOperation + 1]);  

    let parcialResult = DoOperation(operation, firstValue, secondValue); 

    expressionArray.splice(nextOperation - 1, 3, parcialResult.toString())

    return expressionArray
  }

  function DoOperation(op: string, firstValue: number, secondValue: number) : number {
    switch (op) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;        
      case '/':
        return firstValue / secondValue;        
      case '+-':
        return firstValue - secondValue;
      case '--':
        return firstValue + secondValue;
      case '*-':
        return firstValue *- secondValue;        
      case '/-':
        return firstValue /- secondValue;        
      default:
        throw new Error("Operation " + op + "is not defined.");
    }
  }

  return (
    <main className="flex items-center justify-center h-screen bg-slate-800 text-white">
      <div className='w-80 bg-slate-500 border border-white'>
        <div id='display' className='min-h-[2.5rem] break-all text-right w-full bg-slate-600 flex place-content-end place-items-center pr-1 text-2xl'>{expression}</div>
        <div className='h-7 w-full text-right bg-slate-700 pr-1'>
          {maxLimitReached ? maxLimitMessage : lastValue}
        </div>
        <div id="grid-container" className="grid grid-cols-4 gap-[0.8px] select-none">

          {calcItems.map(calculatorItem => <CalcButton key={calculatorItem.id} {...calculatorItem}>
                                            {calculatorItem.operation}
                                           </CalcButton>)}
          
        </div>
      </div>
    </main>
  )

}

interface ButtonProps {
  id: string;
  style?: string;
  background?: string;
  children: React.ReactNode;
  execution: (event : MouseEvent<HTMLElement>) => void;
}

function CalcButton({id, style, background = 'bg-black', children, execution} : ButtonProps) {
  const styleToReturn = 'p-5 text-slate-400 hover:text-white border-none hover:outline hover:outline-1 hover:outline-white' +
                        ' ' + 'hover:transition-all duration-300' + ' ' +
                        style + ' ' + background;
  return (
    <button className={styleToReturn} onClick={execution} id={id}>
      {children}
    </button>
  )
}
