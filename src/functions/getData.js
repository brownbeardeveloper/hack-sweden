export default async function getData(url) {
    return await fetch(process.env.REACT_APP_SKATTESATS_API + "?kommun=MALM%C3%96&_limit=100&_offset=0").then(resp => resp.json())
  }
  