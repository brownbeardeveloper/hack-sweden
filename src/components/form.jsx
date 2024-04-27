import React, { useState } from 'react';

export default function FormComponent() {
    const [netSalary, setNetSalary] = useState('');
    const [percentageTax, setPercentageTax] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Nettolön:", netSalary);
        console.log("Kommunalskatt i procent:", percentageTax);
    }

    return (
        <div className='flex flex-row justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                <div className='m-2'>
                    <label htmlFor="netSalaryInput">Nettolön </label>
                    <input
                        type="number"
                        id="netSalaryInput"
                        min="0"
                        value={netSalary}
                        onChange={(e) => setNetSalary(e.target.value)}
                    />

                </div>
                <div className='m-2'>
                    <label htmlFor="percentageTaxInput">Kommunalskatt i procent </label>
                    <input
                        type="number"
                        id="percentageTaxInput"
                        min="28"
                        max="36"
                        step="0.01"
                        placeholder="30.00%"
                        value={percentageTax}
                        onChange={(e) => setPercentageTax(e.target.value)}
                    />

                </div>
                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
}
