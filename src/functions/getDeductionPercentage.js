export default async function getDeductionPercentage({table, year, income}){
    const url = process.env.REACT_APP_SKATTEAVDRAG_API
    const params = new URLSearchParams()
    params.append("år", year)
    params.append("tabell", table)
    params.append("_limit","100")
    params.append("_offset","0")
    const resp = await fetch(url + params).then(resp => resp.json())
    return resp.results.filter(e => e["ink from"] < Number(income) && e["ink tom"] > Number(income)).map(e => e["%"])





}