import OfferCard from "../ui/offerCard";
import { EntityOffer } from "../lib/definitions";
import { motion } from "motion/react";

export default function ListaOfertas({
  offersList,
}: {
  offersList: EntityOffer[];
}) {
  if (!offersList) {
    return (
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-center">No se han recuperado ofertas</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <h1 className="text-3xl font-bold text-center my-6">
        Ofertas pre-aprobadas
      </h1>
      <div
        className="relative flex w-full gap-6 snap-x overflow-x-auto"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <div className="snap-center shrink-0">
          <div className="shrink-0 w-4 sm:w-48"></div>
        </div>
        {offersList.map((oferta, index) => {
          return (
            <OfferCard key={`${index}_${oferta.name}`} offer={oferta}></OfferCard>
          );
        })}
        <div className="snap-center shrink-0">
          <div className="shrink-0 w-4 sm:w-48"></div>
        </div>
      </div>
    </motion.div>
  );
}
