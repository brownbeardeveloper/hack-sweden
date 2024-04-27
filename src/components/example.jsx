import React, { useEffect, useState } from 'react';
import getData from '../functions/getData';

export default function ExampleComponent() {
  const [data, setData] = useState(false);

  useEffect(() => {

    getData({kommun:"MALMÖ"}).then((data) => {
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
    </div>
  );
}