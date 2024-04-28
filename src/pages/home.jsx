import ExampleComponent from '../components/example.jsx';
import FormComponent from '../components/form.jsx';
import ListComponent from '../components/list.jsx';
import React, { useState } from 'react';

export default function Home() {
  const [taxInfoBrackets, setTaxInfoBrackets] = useState([]);

  return (
  <>
    <ExampleComponent />
    <FormComponent taxInfoBrackets={taxInfoBrackets} setTaxBrackets={setTaxInfoBrackets} />
    <ListComponent taxInfoBrackets={taxInfoBrackets} />
  </>
  );
}