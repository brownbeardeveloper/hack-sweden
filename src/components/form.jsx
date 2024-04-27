import React, { useState } from 'react';
import getTaxBracket from "../functions/getTaxBracket";
import getDeductionPercentage from "../functions/getDeductionPercentage";

export default function FormComponent() {
    //const [netSalary, setNetSalary] = useState(0);
    const [grossSalary, setGrossSalary] = useState(0);
    const [taxDeduction, setTaxDeduction] = useState(0);
    const netSalary = grossSalary - (grossSalary/100 * taxDeduction)
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
                <select>
                    <option selected={true}>Malmö</option>
                </select>
                <input type="number" onChange={event => setYear(event.target.value)} min="2000" max="2023" step="1"/>
                <div className='m-2'>
                    <label htmlFor="netSalaryInput">Nettolön </label>
                    <input
                        type="number"
                        id="netSalaryInput"
                        min="0"
                        value={netSalary}
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
                            setTaxDeduction(await getDeductionPercentage({
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
            <h1>{taxDeduction}% reduction each month</h1>
        </div>
    );
}
