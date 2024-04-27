export default async function getData(url) {

    return await fetch("https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99?kommun=MALM%C3%96&_limit=100&_offset=0").then(resp => resp.json())
  }
  