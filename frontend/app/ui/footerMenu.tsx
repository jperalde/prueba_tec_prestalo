export default function FooterMenu() {
  return (
    <footer className="bg-gray-500 text-white text-center w-full py-4">
      <div className="grid-cols-1 md:flex justify-center items-center gap-3">
        <a
          href=""
          className="block lg:inline-block text-gray-200 hover:text-white"
        >
          Calculadora de prestamos
        </a>
        <a
          href="https://github.com/jperalde/prueba_tec_prestalo"
          className="block lg:inline-block text-gray-200 hover:text-white"
        >
          GitHub
        </a>
        <p className="block lg:inline-block text-gray-200 hover:text-white">© 2025 Calculadora de prestamos</p>
      </div>
    </footer>
  );
}
