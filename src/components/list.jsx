import React, { useState } from 'react';
import getDeductionPercentage from "../functions/getDeductionPercentage";
import ReligiousList from "./ReligousList";
import getTaxBrackets from "../functions/getTaxBrackets";

export default function List({ taxBracket }) {

    return (
        <>
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
        </>
    );
}