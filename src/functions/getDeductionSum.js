export default async function getDeductionSum({table, year, income}){
    const url = process.env.REACT_APP_SKATTEAVDRAG_API
    const params = new URLSearchParams()
    params.append("år", year)
    params.append("tabellnr", table)
    params.append("antal dgr", "30B")
    params.append("_limit","500")
    params.append("_offset","0")
    const resp = await fetch(url + params).then(resp => resp.json())
    return resp.results.filter(e => e["inkomst fr.o.m."] <= Number(income) && e["inkomst t.o.m."] >= Number(income)).map(e => e["kolumn 1"])





}