import Link from 'next/link'

export default function Navbar(){
    return(
    <nav class="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-3 flex-wrap">
        <div
        class="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation">
            <div class="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto space-x-3">
                <Link
                    href="/"
                    class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-dark-400 items-center justify-center hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
                    bg-pink-500 shadow-lg font-bold mt-4">
                    Home
                    </Link>
                <Link 
                    href="create-nft" 
                    class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-dark-400 items-center justify-center hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
                    bg-pink-500 shadow-lg font-bold mt-4"
                    >
                    Create Nft
                </Link>
            </div>
        </div>
    </nav>
    )
}