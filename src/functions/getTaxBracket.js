export default async function getTaxBracket({kommun, year}) {
   const url = process.env.REACT_APP_SKATTESATS_API
    const params = new URLSearchParams()
       params.append("kommun",kommun)
    params.append("år",year)
    params.append("_limit","100")
    params.append("_offset","0")


    return await fetch(url + params).then(resp => resp.json()).then(resp => resp.results[0]["summa, exkl. kyrkoavgift"])
  }
  