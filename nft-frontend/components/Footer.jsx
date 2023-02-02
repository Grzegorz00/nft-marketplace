export default function Footer(){
    return(
        <footer className="p-6 bg-gray-100 shadow-inner w-full mt-10 bottom-0 realtive">
            <div className="flex space-x-64">
                <div className="flex items-center space-x-6">
                    <div className="text-3xl font-custom text-transparent gradient bg-clip-text">
                        <p>Designed by</p>
                    </div>
                    <div className="grid text-indigo-900 font-bold">
                        <p>Piotr Sadolewski</p>
                        <p>Grzegorz Święcicki</p>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="text-3xl font-custom text-transparent gradient bg-clip-text">
                        <p>Contact us</p>
                    </div>
                    <div className="grid text-indigo-900 font-bold">
                        <p>piotr.sadolewski00@gmail.com</p>
                        <p>grzegorz.swiecicki00@gmail.com</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}