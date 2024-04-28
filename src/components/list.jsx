export default function ListComponent({ information }) {

    return (
        <>
            {information && (
                <>
                    <p>list</p>
                    <ul>
                        <li>Skatt: {information.taxPercentage}%</li>
                        <li>Skattetabell: {information.taxTable}</li>
                        <li>Kommunal skatt: {information.localTax}</li>
                        <li>Landstingsskatt: {information.countyTax}</li>
                        <li>Begravningsavgift: {information.funeralFee}</li>
                        <li>Kyrkoavgift: {information.churchFee}</li>
                        <li>Totalt: {information.total}</li>
                        <li>Nettolön: {information.netSalary}</li>
                    </ul>
                </>
            )}

        </>
    );
}
