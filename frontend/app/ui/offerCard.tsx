import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { EntityOffer } from "../lib/definitions";
export default function OfferCard({ offer }: { offer: EntityOffer }) {
  return (
    <div
      key={offer.name}
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {offer.name}
        </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Crédito aprobado: {offer.approved_quantity}&euro;
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Periodo: {offer.payment_terms} meses
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Interes (TAE%): {offer.taxes_percentage}%
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Pago mensual: {offer.monthly_payment}&euro;
      </p>
      <a
        href={offer.offer_url}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Solicitar
        <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
      </a>
    </div>
  );
}
