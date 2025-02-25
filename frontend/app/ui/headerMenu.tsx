import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function HeaderMenu() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          href="/"
          className="flex items-center px-3 py-2 text-gray-200 hover:text-white"
        >
          <FontAwesomeIcon icon={faHome} className="fill-current h-5 w-5" />
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="/calculadora-prestamos"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
          >
            Calculadora de prestamos
          </a>
          <a
            href="https://github.com/jperalde/prueba_tec_prestalo"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
