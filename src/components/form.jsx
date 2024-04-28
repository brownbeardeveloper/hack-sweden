import React, { useState } from 'react';
import getDeductionSum from "../functions/getDeductionSum";
import ReligiousList from "./ReligousList";
import getTaxBrackets from "../functions/getTaxBrackets";

export default function FormComponent() {
    const [taxBrackets, setTaxBrackets] = useState([]);
    const [year, setYear] = useState(2023);
    const [city, setCity] = useState('MALMÖ');
    const [grossSalary, setGrossSalary] = useState(0);
    const [taxDeduction, setTaxDeduction] = useState(0);
    const [kyrkoAvgift, setKyrkoAvgift] = useState(false);
    const [trossamfund, setTrossamfund] = useState();
    const religiousPlaces = taxBrackets ? taxBrackets.map((bracket) => bracket["församling"]) : ""
    const [taxBracket] = trossamfund ? taxBrackets.filter(bracket => bracket["församling"] === trossamfund) : [taxBrackets[0]];
    // based on : https://malmo.se/Om-Malmo-stad/Malmo-stads-budget/Sa-anvands-dina-skattepengar.html
    const netSalary = taxBracket ? grossSalary - taxDeduction : 0
    const communalTax = taxBracket ? {
        education: Math.round(taxDeduction * (taxBracket["kommunal-skatt"] / 100) * 0.46),
        elderCare: Math.round(taxDeduction * (taxBracket["kommunal-skatt"] / 100) * 0.26),
        socialCare: Math.round(taxDeduction * (taxBracket["kommunal-skatt"] / 100) * 0.15),
        culture: Math.round(taxDeduction * (taxBracket["kommunal-skatt"] / 100) * 0.06),
        infrastructureAndFirstResponse: Math.round(taxDeduction * (taxBracket["kommunal-skatt"] / 100) * 0.05),
        other: Math.round(taxDeduction * (taxBracket["kommunal-skatt"] / 100) * 0.02)
    } : {}

    async function handleOnGrossPayChange(event) {
        setGrossSalary(event.target.value)

        const tax = kyrkoAvgift ? Math.round(taxBracket["summa, inkl. kyrkoavgift"]) : Math.round(taxBracket["summa, exkl. kyrkoavgift"]);
        setTaxDeduction(await getDeductionSum({
            table: tax,
            year: year,
            income: event.target.value
        }))
    }

    async function handleCityChange(event) {
        setCity(event.target.value)
        setTaxBrackets(await getTaxBrackets({ kommun: event.target.value, year: year }))
    }
    async function handleReligiousPlaceChange(event) {
        setTrossamfund(event.target.value)
    }


    return (
        <div className=''>
            <div className='flex flex-row justify-center items-center'>
                <form
                    className='flex flex-col justify-center items-start bg-linear-gradient rounded-lg p-8 border border-slate-400'>

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
                        <label className='mx-1' htmlFor="grossSalaryInput">Bruttolön</label>
                        <input
                            type="number"
                            id="grossSalaryInput"
                            min="0"
                            value={grossSalary}
                            onChange={event => handleOnGrossPayChange(event)}
                        />
                    </div>
                </form>
            </div>

            <div className='m-10'>

                {taxBracket &&
                    <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                        <h1 className="text-xl font-bold mb-4">{taxDeduction} reduction each month</h1>
                        <p>skattetabell: {Math.round(kyrkoAvgift ? taxBracket["summa, inkl. kyrkoavgift"] : taxBracket["summa, exkl. kyrkoavgift"])}</p>
                        <p>Kommunal skatt: {Math.round(taxDeduction * (taxBracket["kommunal-skatt"] / 100))}</p>
                        <ul className="list-disc pl-4 mb-4">
                            <li>Förskola, grundskola och gymnasieskola: {communalTax.education}</li>
                            <li>Äldreomsorg och funktionsstöd: {communalTax.elderCare}</li>
                            <li>Individ- och familjeomsorg: {communalTax.socialCare}</li>
                            <li>Kultur- och fritidsverksamhet: {communalTax.culture}</li>
                            <li>Gata, park och räddningstjänst: {communalTax.infrastructureAndFirstResponse}</li>
                            <li>Övrig verksamhet: {communalTax.other}</li>
                        </ul>
                        <p>Total: {communalTax.education + communalTax.elderCare + communalTax.socialCare + communalTax.culture + communalTax.infrastructureAndFirstResponse + communalTax.other}</p>
                        <p>Landstingsskatt: {Math.round(taxDeduction * (taxBracket["landstings-skatt"] / 100))}</p>
                        <p>Begravnings avgift: {Math.round(taxDeduction * (taxBracket["begravnings-avgift"] / 100))}</p>
                        <p>Kyrkoavgift: {Math.round(kyrkoAvgift ? taxDeduction * (taxBracket["kyrkoavgift"] / 100) : 0)}</p>
                        <p>Nettolön: {netSalary}</p>
                    </div>
                }
            </div>
        </div>
    );
}
