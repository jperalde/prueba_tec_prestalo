import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='flex flex-col md:w-1/2 md:border-r-4 md:border-r-custom-500'>
        <h2 className='text-3xl font-bold text-center'>Error</h2>
        <h1 className="bg-[url('/fondo_clinica.webp')] bg-[size:130%] text-5xl md:text-[15rem] font-black text-center bg-clip-text text-transparent animate-slowpan">
          404
        </h1>
      </div>
      <div className='flex flex-col md:w-1/2 ml-7'>
        <h2 className='text-3xl font-bold'>Not Found</h2>
        <p className='text-xl'>No se ha encontrado la página</p>
        <Link href="/" className='text-lg underline underline-offset-4 hover:text-custom-500 hover:underline-custom-500'>Volver a la página principal</Link>
      </div>
    </div>
  )
}