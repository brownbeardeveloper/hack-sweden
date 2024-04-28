export default function Contact() {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="text-center p-20 max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 mb-10">Kontakt</h1>

                <form action="https://formsubmit.co/xekipewu@mailgolem.com" method="POST">
                    <input type="text" name="name" required />
                    <input type="email" name="email" required />
                    <button type="submit">Send</button>
                </form>
            </div>
        </main>
    );
}