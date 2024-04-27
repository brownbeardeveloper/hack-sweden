export default async function getTaxBracket({kommun, year}) {
   const url = process.env.REACT_APP_SKATTESATS_API
    const params = new URLSearchParams()
       params.append("kommun",kommun)
    params.append("år",year)
    params.append("_limit","100")
    params.append("_offset","0")


    return await fetch(url + params).then(resp => resp.json()).then(resp => {
        return {
            kommunalSkatt: resp.results[0]["kommunal-skatt"],
            landstingsSkatt: resp.results[0]["landstings-skatt"],
            begravningsAvgift: resp.results[0]["begravnings-avgift"],
            kyrkoAvgift: resp.results[0]["kyrkoavgift"],
            totalSkattExklusiveKyrkoavgift: resp.results[0]["summa, exkl. kyrkoavgift"],
            totalSkattInklusiveKyrkoavgift: resp.results[0]["summa, inkl. kyrkoavgift"]
        }})
  }
  