import React, { useState } from 'react';
import getTaxBracket from "../functions/getTaxBracket";
import getDeductionPercentage from "../functions/getDeductionPercentage";

export default function FormComponent() {
    const [netSalary, setNetSalary] = useState('');
    const [grossSalary, setGrossSalary] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [year, setYear] = useState(2023);
    const [city, setCity] = useState('MALMÖ');

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Nettolön:", netSalary);
        console.log("Kommunalskatt i procent:", taxPercentage);
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
                    <label htmlFor="grossSalaryInput">Bruttolön</label>
                    <input
                        type="number"
                        id="grossSalaryInput"
                        min="0"
                        value={grossSalary}
                        onChange={async (e) => {
                            setGrossSalary(e.target.value)
                            setTaxPercentage(
                                await getTaxBracket({kommun: city, year: year}))
                            console.log(await getDeductionPercentage({
                                table: Math.floor(taxPercentage),
                                year: year,
                                income: e.target.value
                            }))
                        }}
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
                        value={taxPercentage}
                        onChange={(e) => setTaxPercentage(e.target.value)}
                    />

                </div>
                <button type="submit" className='button'>Submit</button>
            </form>
            <h1>{taxPercentage}</h1>
        </div>
    );
}
