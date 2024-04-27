export default async function getReligousPlace({kommun, year}) {
    const url = process.env.REACT_APP_SKATTESATS_API
    const params = new URLSearchParams()
    params.append("kommun", kommun)
    params.append("år", year)
    params.append("_limit", "100")
    params.append("_offset", "0")


    const result = fetch(url + params)
        .then(resp => resp.json())
        .then(resp => resp.results.map(e => e["församling"]))
    console.log(result)
    return await result;

}