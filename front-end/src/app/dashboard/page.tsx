import Image from "next/image"
import Link from "next/link"

const Dashboard = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-10  md:mt-[300px]">
            <Image src='/logo-bankme-large.png' alt="logo-bankme" width={250} height={250} />
            <h1 className="text-2xl font-normal tracking-wider mt-10">Bem-vindo ao Dashboard &#128522;</h1>
            <div className="md:space-x-4 my-10 flex md:flex-row md:space-y-0 flex-col space-y-4">
                <Link href={`/dashboard/payable/create`} className="bg-indigo-600 px-3 py-1.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 rounded-md text-center">Criar pagável</Link>
                <Link href={`/dashboard/assignor/create`} className="bg-indigo-600 px-3 py-1.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 rounded-md text-center">Criar cedente</Link>
                <Link href={`/dashboard/payable/list`} className="bg-indigo-600 px-3 py-1.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 rounded-md text-center">Lista de pagáveis</Link>
            </div>
        </div>
    )
}

export default Dashboard