import React, { useEffect, useState } from 'react';
import getData from '../functions/getData';

export default function ExampleComponent() {
  const [data, setData] = useState(false);
  const apiUrl = "https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99"

  useEffect(() => {

    getData(apiUrl).then((data) => {
        console.log(data); 
      });
      

  }, [data]);

  return (
    <div className='flex flex-row justify-center items-center'>
      <p>trying to fetch data...</p>
      <button className='m-2 p-2 bg-slate-200 border border-slate-600 pointer rounded' 
      onClick={() => setData(!data)} >
        btn
        </button>
    </div>
  );
}