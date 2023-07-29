'use client'
import React, {MouseEvent, useState } from "react"

interface calcItem {
   id: string;
   operation: string;
   execution: (event: MouseEvent<HTMLElement>) => void;
   style?: string;
}

type calcArray = calcItem[]

export default function Home() {
     
  const calcItems : calcArray = [
    {id: 'clear', operation: 'AC', execution: handleClear},
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
    {id: 'equals', operation: '=', execution: handleCalculation, style: 'row-span-2'},

    {id: 'zero', operation: '0', execution: handleExpression, style: 'col-span-2'},
    {id: 'decimal', operation: '.', execution: handleDecimalPoint}]


  const Operations = ['+', '-', '/', '*']
  const MinusOperations = ['+-', '--', '/-', '*-']
  const [expression, setExpression] = useState('0');

  // const splitOp = /(\*|\+|\-|\/)/;
  const splitOp = /(\*-|\+-|\--|\/-|\*|\+|\-|\/)/;
  const numbersArray = expression.split(splitOp);
  const lastElement = numbersArray[numbersArray.length -1];
  const lastValue = lastElement === '' ? numbersArray[numbersArray.length -2] : lastElement;

  function handleExpression(event : MouseEvent<HTMLElement>) {

    let nextValue = (event.target as Element).innerHTML;
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
    setExpression('0')
  }

  function handleOperation(event : MouseEvent<HTMLElement>) {

    let newExpression = expression;
    let nextOperator = (event.target as Element).innerHTML;
    let lastCharacter = expression.charAt(expression.length -1);
    let anteLastCharacter = expression.charAt(expression.length -2);
    let lastTwoCharacters = expression.substring(expression.length -2);
    console.log(anteLastCharacter)
    console.log(lastTwoCharacters)
    if (Operations.includes(lastCharacter)) { 
      if( nextOperator !== '-') {
        if (!MinusOperations.includes(lastCharacter + nextOperator) && Operations.includes(anteLastCharacter)) {
          newExpression = expression.slice(0,-2) //cases like 8+-* => the * operator must replace + and -. 
                                                 //but in cases like 8** => the * operator can't replace both, thats why we check the ante last character to not be a number
        } else {
          newExpression = expression.slice(0,-1) // 8** falls here, and we dont allow the next * to be entered
        }
      } else if (MinusOperations.includes(lastTwoCharacters)) {
        newExpression = expression.slice(0,-1); //cases like 8+- falls here, and we dont allow another minus '-' to be entered
      }
      setExpression(newExpression + nextOperator);
    } else { //first time setting and operation falls heere
      setExpression(prev => prev + nextOperator);
    }
  }

  function handleDecimalPoint(event : MouseEvent<HTMLElement>) {
    if (lastValue === '') {
      let valueToAdd = '0.'
      setExpression(prev => prev + valueToAdd);
      return;
    }
    if (lastValue.includes('.')) {
      return;
    } else {
      setExpression(prev => prev + (event.target as Element).innerHTML)
    }
  }

  function handleDeletion() {
    let newExpression = expression.slice(0,-1);
    if (newExpression === '') {
      newExpression = '0';
    }
    setExpression(newExpression)
  }

  function handleCalculation() {

    let totalResult = numbersArray;
    console.log(numbersArray)
    if (parseInt(lastValue) === NaN) {
      totalResult.pop();
    }

    let operations = totalResult.filter(value =>MinusOperations.includes(value) || Operations.includes(value))
    console.log(operations)
    operations.map(op => {
      if (op === '/' || op === '*' || op === '*-' || op === '/-') {
        let nextOperation = totalResult.indexOf(op);
        let firstValue = Number(totalResult[nextOperation - 1]);
        let secondValue = Number(totalResult[nextOperation + 1]);
        let parcialResult = DoOperation(op, firstValue, secondValue)

        totalResult.splice(nextOperation - 1, 3, parcialResult.toString())
      } 
    })

    operations = totalResult.filter(value =>MinusOperations.includes(value) || Operations.includes(value))
    operations.map(op => {
      if (op === '+' || op === '-'|| op === '+-' || op === '--') {
        let nextOperation = totalResult.indexOf(op);
        let firstValue = Number(totalResult[nextOperation - 1]);
        let secondValue = Number(totalResult[nextOperation + 1]);
        let parcialResult = DoOperation(op, firstValue, secondValue)

        totalResult.splice(nextOperation - 1, 3, parcialResult.toString())
      }
    })

    if (totalResult.length > 1) {
      throw new Error("Calculation failed");
    }

    setExpression(totalResult[0])

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
    <main className="flex items-center justify-center h-screen bg-slate-800 text-white select-none">
      <div className='w-80 bg-slate-500 border border-white'>
        <div id='display' className='min-h-[2.5rem] break-all text-right w-full bg-slate-600 flex place-content-end place-items-center pr-1 text-2xl'>{expression}</div>
        <div className='h-7 w-full text-right bg-slate-700 pr-1'>{lastValue}</div>
        <div id="grid-container" className="grid grid-cols-4 gap-[1px]">

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
  const styleToReturn = 'p-5 ' + style + ' ' + background;
  const textRender = children?.toString();
  return (
    <button className={styleToReturn} onClick={execution} id={id}>
      {children}
    </button>
  )
}
