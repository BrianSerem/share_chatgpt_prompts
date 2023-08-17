import '@styles/global.css'

export const metadata = {
    title: 'Promptopia',
    description: 'Get and Share cool and functional AI prompts'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='eng'>
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    { children }
                </main>
            </body>
        </html>
    )
}

export default RootLayout;
