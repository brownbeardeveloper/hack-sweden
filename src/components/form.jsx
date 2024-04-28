import React, { useState } from 'react';
import getDeductionPercentage from "../functions/getDeductionPercentage";
import ReligiousList from "./ReligousList";
import getTaxBrackets from "../functions/getTaxBrackets";

export default function FormComponent() {
    const [taxBrackets, setTaxBrackets] = useState([]);
    const [year, setYear] = useState(2023);
    const [city, setCity] = useState('MALMÖ');
    const [grossSalary, setGrossSalary] = useState(0);
    const [taxDeduction, setTaxDeduction] = useState(0);
    const [kyrkoAvgift, setKyrkoAvgift] = useState(false);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [trossamfund, setTrossamfund] = useState();
    const religiousPlaces = taxBrackets ? taxBrackets.map((bracket) => bracket["församling"]) : ""
    const netSalary = grossSalary - (grossSalary / 100 * taxDeduction)
    const [taxBracket] = trossamfund ? taxBrackets.filter(bracket => bracket["församling"] === trossamfund) : [taxBrackets[0]];

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Nettolön:", netSalary);
        console.log("Kommunalskatt i procent:", taxPercentage);
    }
    async function handleCityChange(event) {
        setCity(event.target.value)
        setTaxBrackets(await getTaxBrackets({ kommun: event.target.value, year: year }))
    }
    async function handleReligiousPlaceChange(event) {
        setTrossamfund(event.target.value)
    }


    return (
        <div className='flex flex-row justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start bg-linear-gradient rounded p-8 border border-slate-400'>

                <div className='flex flex-row mr-2 my-1'>
                    <label className="mx-1" htmlFor={"medlemITrossamfund"}>Medlem i Trossamfund?</label>
                    <input className="mx-1" id={"medlemITrossamfund"} type={"checkbox"} value={kyrkoAvgift}
                        onChange={event => setKyrkoAvgift(event.target.checked)} />
                </div>

                <div className='flex flex-row mr-2 my-1'>
                    <label className="mx-1" htmlFor={"stad"}>Stad</label>
                    <select className="mx-1" onChange={event => handleCityChange(event)} id={"stad"}>
                        <option value={"MALMÖ"} selected={true}>Malmö</option>
                        <option value={"LANDSKRONA"}>Landskrona</option>
                    </select>
                </div>


                {kyrkoAvgift &&
                    <div className='flex flex-row mr-2 my-1'>
                        <label className="mx-1" htmlFor={"stad"}>Trossamfund
                            <select id={"trossamfund"}
                                onChange={event => handleReligiousPlaceChange(event)}>
                                <ReligiousList places={religiousPlaces} />
                            </select>
                        </label>
                    </div>
                }

                <div className='flex flex-row mr-2 my-1'>
                    <label className="mx-1" htmlFor={"year"}>År:</label>
                    <input className="mx-1" value={year} id={"year"} type="number" onChange={event => setYear(event.target.value)} min="2000" max="2023"
                        step="1" />
                </div>

                <div className='flex flex-row mr-2 my-1'>
                    <label className="mr-2 my-1" htmlFor="netSalaryInput">Nettolön </label>
                    <input
                        type="number"
                        id="netSalaryInput"
                        min="0"
                        value={netSalary}
                    />
                </div>

                <div className='flex flex-row mr-2 my-1'>
                    <label htmlFor="grossSalaryInput">Bruttolön</label>
                    <input
                        type="number"
                        id="grossSalaryInput"
                        min="0"
                        value={grossSalary}
                        onChange={async (e) => {
                            setGrossSalary(e.target.value)
                            setTaxDeduction(await getDeductionPercentage({
                                table: Math.round(kyrkoAvgift ? taxBracket["summa, inkl. kyrkoavgift"] : taxBrackets["summa, exkl. kyrkoavgift"]),
                                year: year,
                                income: e.target.value
                            }))
                        }}
                    />
                </div>

                <div className='flex flex-row mr-2 my-1'>
                    <label className="mx-1" htmlFor="percentageTaxInput">Kommunalskatt i procent </label>
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

                <button type="submit" className='button'>Beräkna</button>
            </form>

            {taxBracket &&
                <div>
                    <h1>{taxDeduction}% reduction each month</h1>
                    <p>skattetabell: {Math.round(kyrkoAvgift ? taxBracket["summa, inkl. kyrkoavgift"] : taxBracket["summa, exkl. kyrkoavgift"])}</p>
                    <p>Kommunal skatt: {taxBracket["kommunal-skatt"]}</p>
                    <p>Landstingsskatt: {taxBracket["landstings-skatt"]}</p>
                    <p>Begravnings avgift: {taxBracket["begravnings-avgift"]}</p>
                    <p>Kyrkoavgift: {kyrkoAvgift ? taxBracket["kyrkoavgift"] : 0}</p>
                    <p>Totalt: {kyrkoAvgift ? taxBracket["summa, inkl. kyrkoavgift"] : taxBracket["summa, exkl. kyrkoavgift"]}</p>
                    <p>Nettolön: {netSalary}</p>
                </div>
            }
        </div>
    );
}
