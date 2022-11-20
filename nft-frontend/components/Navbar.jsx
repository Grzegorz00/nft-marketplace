import Link from 'next/link'

export default function Navbar(){
    return(
<nav className="
    relative
    w-full
    flex flex-wrap
    items-center
    justify-between
    py-4
    bg-gray-100
    shadow-lg
    navbar navbar-expand-lg navbar-light">
        <div className="">
            <div className="space-x-3 px-3 font-mono text-xl">
                <Link
                    href="/"
                    className="text-dark-400 hover:text-pink-500 text-indigo-500">
                    Home
                    </Link>
                <Link 
                    href="create-nft" 
                    className="text-dark-400 hover:text-pink-500 text-indigo-500">
                    Create Nft
                </Link>
            </div>
        </div>
    </nav>
    )
}