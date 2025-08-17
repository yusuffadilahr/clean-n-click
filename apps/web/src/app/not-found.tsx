import Image from "next/image";

export default function NotFound() {
    return (
        <main className="w-full h-screen flex justify-center items-center px-4 lg:px-32">
            <section className="w-full max-w-5xl h-full flex flex-col md:flex-row justify-center items-center relative rounded-lg overflow-hidden">

                {/* Gambar */}
                <div className="w-full md:w-1/2 h-64 md:h-auto flex-shrink-0">
                    <Image
                        src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
                        alt="404 Error"
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Teks */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500">
                        404 <span className="font-normal text-gray-700">Page Not Found!</span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700">
                        Oops! It seems like the page you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-500">
                        The link might be broken, or the page may have been removed. Please check the URL or return to the homepage.
                    </p>
                </div>

            </section>
        </main>
    );
}
