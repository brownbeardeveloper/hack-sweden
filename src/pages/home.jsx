import ExampleComponent from '../components/example.jsx';
import FormComponent from '../components/form.jsx';
import ListComponent from '../components/list.jsx';
import React, { useState } from 'react';

export default function Home() {
  const [information, setInformation] = useState([]);

  return (
  <>
    <ExampleComponent />
    <FormComponent information={information} setInformation={setInformation} />
    <ListComponent information={information} />
  </>
  );
}