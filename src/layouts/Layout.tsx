import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
        <div className="overflow-hidden">
            <header className="bg-slate-800">
             <div className="mx-auto max-w-6xl px-4 py-6 sm:px-10 sm:py-10">
                    <h1 className="text-lg sm:text-2xl font-extrabold text-white wrap-break-word">Administrador de Productos</h1>
                </div>
            </header>
                     <main className="mt-6 sm:mt-10 mx-auto max-w-6xl px-4 sm:px-10 py-6 sm:py-10 bg-white shadow">
                <Outlet />
            </main>
        </div>
        </>
    )
}
