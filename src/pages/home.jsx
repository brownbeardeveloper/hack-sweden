import FormComponent from '../components/form.jsx';
import ListComponent from '../components/list.jsx';
import React, { useState } from 'react';

export default function Home() {
  const [information, setInformation] = useState([]);

  return (
  <>
    <FormComponent setInformation={setInformation} />
  </>
  );
}