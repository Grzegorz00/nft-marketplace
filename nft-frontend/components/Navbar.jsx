import Link from 'next/link'

export default function Navbar(){
    return(
<nav class="relative
    w-full
    flex flex-wrap
    items-center
    justify-between
    py-4
    bg-gray-100
    shadow-lg
    navbar navbar-expand-lg navbar-light">
        <div class="">
            <div class="space-x-3 px-3 font-mono text-xl">
                <Link
                    href="/"
                    class="text-dark-400 text-pink-500 hover:text-indigo-500">
                    Home
                    </Link>
                <Link 
                    href="create-nft" 
                    class="text-dark-400 text-pink-500 hover:text-indigo-500">
                    Create Nft
                </Link>
            </div>
        </div>
    </nav>
    )
}