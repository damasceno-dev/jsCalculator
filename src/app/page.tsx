'use client'
import React, {MouseEvent, useState } from "react"


export default function Home() {
  const Operations = ['+', '-', '/', '*']
  const [expression, setExpression] = useState('0');

  var splitOp = /(\*|\+|\-|\/)/
  const numbersArray = expression.split(splitOp);
  const lastValue = numbersArray[numbersArray.length -1]
  console.log(numbersArray)
  console.log(lastValue)
  function handleExpression(event : MouseEvent<HTMLElement>) {
    setExpression(prev => prev + (event.target as Element).id)
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
    console.log(lastValue.includes('.'))
    if (lastValue.includes('.')) {
      return;
    } else {
      setExpression(prev => prev + (event.target as Element).id)
    }
  }


  return (
    <main className="flex items-center justify-center h-screen bg-slate-800 text-white select-none">
      <div className='w-80 bg-slate-500 border border-white'>
        <div className='min-h-[2.5rem] break-all w-full bg-slate-600 flex place-content-end place-items-center pr-1 text-2xl'>{expression}</div>
        <div className='h-7 w-full bg-slate-700'></div>
        <div id="grid-container" className="grid grid-cols-4 gap-[1px]">

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
          <button className="bg-black p-5" onClick={handleDecimalPoint} id='.'>.</button>
          
        </div>
      </div>
    </main>
  )

}

interface ButtonProps {
  style: string;
}

function Button({style} : ButtonProps) {
  let styleToReturn = 'p-5 ' + style;
  return (
    <button></button>
  )
}
