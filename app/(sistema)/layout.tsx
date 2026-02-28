import Footer from "../components/Footer";
import Header from "../components/Header";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
    return (

        <div className="flex min-h-screen w-full">

            {/* <Sidebar /> */}

            {/* Div que agrupa Header, Main e Footer. 
            'flex-1' para ocupar a largura restante.
            'flex-col' para empilhar os elementos verticalmente.
        */}
            <div className="flex flex-col flex-1 w-full">

                <Header />

                {/* O segredo: 'flex-1' faz o <main> crescer o máximo possível,
              empurrando o <footer> para o final da página.
          */}
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                <Footer />

            </div>
        </div>
    );
}