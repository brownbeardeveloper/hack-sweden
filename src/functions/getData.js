export default async function getData({kommun, year}) {
   const url = new URL(process.env.REACT_APP_SKATTESATS_API)
    const params = new URLSearchParams()

    params.append("kommun", kommun)
    params.append("år", year)
    params.append("_limit","100")
    params.append("_offset","0")

    return await fetch(url + params).then(resp => resp.json())
  }
  