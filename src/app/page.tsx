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
    {id: 'op-clear', operation: 'AC', execution: handleClear},
    {id: 'op-division', operation: '/', execution: handleOperation},
    {id: 'op-multiplication', operation: '*', execution: handleOperation},
    {id: 'delete', operation: '<', execution: handleDeletion},

    {id: 'number-seven', operation: '7', execution: handleExpression},
    {id: 'number-eigth', operation: '8', execution: handleExpression},
    {id: 'number-nine', operation: '9', execution: handleExpression},
    {id: 'op-substraction', operation: '-', execution: handleOperation},

    {id: 'number-four', operation: '4', execution: handleExpression},
    {id: 'number-five', operation: '5', execution: handleExpression},
    {id: 'number-six', operation: '6', execution: handleExpression},
    {id: 'op-sum', operation: '+', execution: handleOperation},

    {id: 'number-one', operation: '1', execution: handleExpression},
    {id: 'number-two', operation: '2', execution: handleExpression},
    {id: 'number-three', operation: '3', execution: handleExpression},
    {id: 'op-result', operation: '=', execution: handleCalculation, style: 'row-span-2'},

    {id: 'number-zero', operation: '0', execution: handleExpression, style: 'col-span-2'},
    {id: 'decimal-point', operation: '.', execution: handleDecimalPoint}]


  const Operations = ['+', '-', '/', '*']
  const [expression, setExpression] = useState('0');

  const splitOp = /(\*|\+|\-|\/)/;
  const numbersArray = expression.split(splitOp);
  const lastElement = numbersArray[numbersArray.length -1];
  const lastValue = lastElement === '' ? numbersArray[numbersArray.length -2] : lastElement;
  console.log(numbersArray)
  console.log(lastElement)
  console.log(lastValue)
  
  function handleExpression(event : MouseEvent<HTMLElement>) {

    let nextValue = (event.target as Element).id;

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

    let lastCharacter = expression.charAt(expression.length -1);

    if (Operations.includes(lastCharacter)) {
      let newExpression = expression.slice(0,-1);
      setExpression(newExpression + (event.target as Element).id);
    } else {
      setExpression(prev => prev + (event.target as Element).id)
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
      setExpression(prev => prev + (event.target as Element).id)
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
    // if lastvalue != number { pop last value }
    // while array.length > 1 {
    //   handlemultiplyAndDivision: go throught array searching / or *
    //   if it finds it, replace n-1 and n+1 for the result of this calculation 
    //   handleSumAndSubstract: same as above, but for + or -
    // }
    let result = numbersArray;
    if (parseInt(lastValue) == 'NaN') {
      result.pop();
    }
    console.log(result)


  }

  return (
    <main className="flex items-center justify-center h-screen bg-slate-800 text-white select-none">
      <div className='w-80 bg-slate-500 border border-white'>
        <div className='min-h-[2.5rem] break-all text-right w-full bg-slate-600 flex place-content-end place-items-center pr-1 text-2xl'>{expression}</div>
        <div className='h-7 w-full text-right bg-slate-700 pr-1'>{lastValue}</div>
        <div id="grid-container" className="grid grid-cols-4 gap-[1px]">
{/* 
          <button className="bg-black p-5 col-span-2" onClick={handleClear} id='AC'> AC</button>
          <button className="bg-black p-5" onClick={handleOperation} id='/'>/</button>
          <button className="bg-black p-5" onClick={handleOperation} id='*'>*</button>

          <button className="bg-black p-5" onClick={handleExpression} id='7'>7</button>
          <button className="bg-black p-5" onClick={handleExpression} id='8'>8</button>
          <button className="bg-black p-5" onClick={handleExpression} id='9'>9</button>
          <button className="bg-black p-5" onClick={handleOperation} id='-'>-</button>

          <button className="bg-black p-5" onClick={handleExpression} id='4'>4</button>
          <button className="bg-black p-5" onClick={handleExpression} id='5'>5</button>
          <button className="bg-black p-5" onClick={handleExpression} id='6'>6</button>
          <button className="bg-black p-5" onClick={handleOperation} id='+'>+</button>

          <button className="bg-black p-5" onClick={handleExpression} id='1'>1</button>
          <button className="bg-black p-5" onClick={handleExpression} id='2'>2</button>
          <button className="bg-black p-5" onClick={handleExpression} id='3'>3</button>
          <button className="bg-black p-5 row-span-2" onClick={handleOperation} id='='>=</button>

          <button className="bg-black p-5 col-span-2" onClick={handleExpression} id='0'>0</button>
          <button className="bg-black p-5" onClick={handleDecimalPoint} id='.'>.</button> */}



          {calcItems.map(calculatorItem => <CalcButton key={calculatorItem.id} {...calculatorItem}>
                                            {calculatorItem.operation}
                                           </CalcButton>)}

          {/* <CalcButton execution={handleClear}> AC</CalcButton>
          <CalcButton execution={handleOperation}>/</CalcButton>
          <CalcButton execution={handleOperation}>*</CalcButton>
          <CalcButton execution={handleDeletion}>&lt;</CalcButton>

          <CalcButton execution={handleExpression}>7</CalcButton>
          <CalcButton execution={handleExpression}>8</CalcButton>
          <CalcButton execution={handleExpression}>9</CalcButton>
          <CalcButton execution={handleOperation}>-</CalcButton>

          <CalcButton execution={handleExpression}>4</CalcButton>
          <CalcButton execution={handleExpression}>5</CalcButton>
          <CalcButton execution={handleExpression}>6</CalcButton>
          <CalcButton execution={handleOperation}>+</CalcButton>

          <CalcButton execution={handleExpression}>1</CalcButton>
          <CalcButton execution={handleExpression}>2</CalcButton>
          <CalcButton execution={handleExpression}>3</CalcButton>
          <CalcButton execution={handleCalculation} style=" row-span-2" >=</CalcButton>

          <CalcButton execution={handleExpression} style=" col-span-2" >0</CalcButton>
          <CalcButton execution={handleDecimalPoint}>.</CalcButton> */}
          
        </div>
      </div>
    </main>
  )

}

interface ButtonProps {
  style?: string;
  background?: string;
  children: React.ReactNode;
  execution: (event : MouseEvent<HTMLElement>) => void;
}

function CalcButton({style, background = 'bg-black', children, execution} : ButtonProps) {
  const styleToReturn = 'p-5 ' + style + ' ' + background;
  const textRender = children?.toString();
  return (
    <button className={styleToReturn} onClick={execution} id={textRender}>
      {children}
    </button>
  )
}
