import React, { useEffect, useState } from 'react';
import getTaxBracket from '../functions/getTaxBracket';
import getDeductionPercentage from "../functions/getDeductionPercentage";

export default function ExampleComponent() {
  const [data, setData] = useState(false);

  useEffect(() => {

    getTaxBracket({kommun:"MALMÖ", year: "2023"}).then((data) => {
        console.log(data); 
      });
      

  }, [data]);

  return (
    <div className='flex flex-row justify-center items-center'>
      <p>trying to fetch data...</p>
      <button className='button' 
      onClick={() => setData(!data)} >
        btn
        </button>
        <button className={'button'} type={"button"} onClick={() => getDeductionPercentage({table:"32",year:"2023",income:30000})}>deduction</button>
    </div>
  );
}