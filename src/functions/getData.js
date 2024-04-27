export default async function getData({kommun}) {
   const url = process.env.REACT_APP_SKATTESATS_API
       url.searchParams.append("kommun",kommun)
    url.searchParams.append("_limit","100")
    url.searchParams.append("_offset","0")

    return await fetch(url).then(resp => resp.json())
  }
  