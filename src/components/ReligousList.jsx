export default function ReligousList({places}) {
    return places.map(place => <option key={place} value={place}>{place}</option>)
}