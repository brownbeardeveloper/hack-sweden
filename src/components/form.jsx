import React, {useState} from 'react';
import getTaxBracket from "../functions/getTaxBracket";
import getDeductionPercentage from "../functions/getDeductionPercentage";

export default function FormComponent() {
    const [taxBracket, setTaxBracket] = useState({});
    const [year, setYear] = useState(2023);
    const [city, setCity] = useState('MALMÖ');
    const [grossSalary, setGrossSalary] = useState(0);
    const [taxDeduction, setTaxDeduction] = useState(0);
    const [kyrkoAvgift, setKyrkoAvgift] = useState(false);
    const netSalary = grossSalary - (grossSalary/100 * taxDeduction)
    const [taxPercentage, setTaxPercentage] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Nettolön:", netSalary);
        console.log("Kommunalskatt i procent:", taxPercentage);
    }


    return (
        <div className='flex flex-row justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>

                <label htmlFor={"medlemITrossamfund"}>Medlem i Trossamfund?</label>
                <input id={"medlemITrossamfund"} type={"checkbox"} value={kyrkoAvgift}
                       onChange={event => setKyrkoAvgift(event.target.checked)}/>
                <label htmlFor={"stad"}>Stad</label>
                <select id={"stad"}>
                    <option selected={true}>Malmö</option>
                </select>
                <label htmlFor={"stad"}>Trossamfund</label>
                <select id={"trossamfund"}>

                </select>

                <label htmlFor={"year"}>År:</label>
                <input id={"year"} type="number" onChange={event => setYear(event.target.value)} min="2000" max="2023"
                       step="1"/>
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
                            setTaxBracket(
                                await getTaxBracket({kommun: city, year: year}))
                            setTaxDeduction(await getDeductionPercentage({
                                table: Math.round(kyrkoAvgift ? taxBracket.totalSkattInklusiveKyrkoavgift : taxBracket.totalSkattExklusiveKyrkoavgift),
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
            <div>
                <h1>{taxDeduction}% reduction each month</h1>
                <p>skattetabell: {Math.round(kyrkoAvgift? taxBracket.totalSkattInklusiveKyrkoavgift: taxBracket.totalSkattExklusiveKyrkoavgift)}</p>
                <p>Kommunal skatt: {taxBracket.kommunalSkatt}</p>
                <p>Landstingsskatt: {taxBracket.landstingsSkatt}</p>
                <p>Begravnings avgift: {taxBracket.begravningsAvgift}</p>
                <p>Kyrkoavgift: {kyrkoAvgift ? taxBracket.kyrkoAvgift : 0}</p>
                <p>Totalt: {kyrkoAvgift ? taxBracket.totalSkattInklusiveKyrkoavgift : taxBracket.totalSkattExklusiveKyrkoavgift}</p>
                <p>Nettolön: {netSalary}</p>
            </div>
        </div>
    );
}
