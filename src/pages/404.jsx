import picture from '../styles/404.png'

export default function Error() {
    return (
        <main className="flex justify-center items-center min-h-screen">
        <img src={picture} alt="404" />
        <h1>Oj, sidan kunde inte hittas</h1>
        <p>Den länken du följde kanske är trasig eller så har sidan tagits bort.</p>
    </main>
    );
}