"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CalculatorType, EntityOffer } from "../lib/definitions";
import { useState } from "react";
import { requestLoan } from "../lib/loanRequestRepository";
import Swal from "sweetalert2";
import ListaOfertas from "./listaOfertas";

export default function Calculadora({
  calculatorType,
}: {
  calculatorType: CalculatorType;
}) {
  const getLoanLimits = (): [string, string, string] => {
    //devuelve [máxima cantidad a solicitar, minima, maximo plazo en meses]
    switch (calculatorType) {
      case CalculatorType.Loan:
        return ["80000", "500", "92"];
      case CalculatorType.Mortgage:
        return ["100000", "10000", "480"];
      default:
        return ["100000", "500", "92"];
    }
  };
  const [maxQuantityLoan, minQuantityLoan, maxPaymentTerms] = getLoanLimits();

  const [offersList, setOffersList] = useState<EntityOffer[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    loan_quantity: minQuantityLoan || "",
    monthly_salary: "",
    payment_terms: "",
  });

  const handleAction = async (formData: FormData) => {
    setFormValues({
      name: formData.get("name")?.toString() || "",
      lastname: formData.get("lastname")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      loan_quantity: formData.get("loan_quantity")?.toString() || "",
      monthly_salary: formData.get("monthly_salary")?.toString() || "",
      payment_terms: formData.get("payment_terms")?.toString() || "",
    });
    await requestLoan(formData)
      .then((res) => {
        if (res?.errors) throw new Error(JSON.stringify(res.errors));
        if (res?.status !== 201 )
          throw new Error(
            "Fallo al realizar la solicitud. Pruebe de nuevo más tarde."
          );
          if (!res?.offers || res.offers.length === 0)
            throw new Error(
              "No se han encontrado ofertas para su solicitud. Pruebe de nuevo más tarde."
            );
        setOffersList(res.offers);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>):void => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <section
        title={`Calculadora de ${calculatorType}`}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full justify-center items-center border rounded-lg"
      >
        <div className="grid grid-cols-1 gap-1 h-full justify-center content-center bg-stone-100 border-r p-5">
          <h1 className="text-4xl text-center md:text-start font-bold text-indigo-700">
            Compara los mejores préstamos
          </h1>
          <h2 className="text-md text-center md:text-start font-bold font-italic text-gray-500">
            Calculadora de {calculatorType}
          </h2>
        </div>
        <form
          className="grid grid-cols-3 gap-6 m-5"
          action={handleAction}
        >
          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Jorge"
              value={formValues.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Apellidos
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formValues.lastname || ""}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="García Pérez"
              required
            />
          </div>
          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Número de teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone || ""}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="666666666"
              pattern="[0-9]{9}"
              required
            />
          </div>
          <div className="col-span-3 md:col-span-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email || ""}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="jorge.garcia@prestalo.com"
              required
            />
          </div>
          <div className="col-span-3 md:col-span-2">
            <label
              htmlFor="sliderImporte"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Importe a financiar
            </label>
            <input
              id="sliderImporte"
              name="loan_quantity"
              type="range"
              value={formValues.loan_quantity || ""}
              min={minQuantityLoan}
              max={maxQuantityLoan}
              onChange={handleChange}
              step="100"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
          <div className="col-span-3 md:col-span-1 mt-5">
            <input
              type="number"
              id="loan_quantity"
              name="loan_quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="10000 €"
              pattern="[0-9]"
              value={formValues.loan_quantity || ""}
              min={minQuantityLoan}
              max={maxQuantityLoan}
              onChange={handleChange}
              step="100"
              required
            />
          </div>
          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <label
              htmlFor="monthly_salary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ingresos mensuales
            </label>
            <input
              type="number"
              id="monthly_salary"
              name="monthly_salary"
              value={formValues.monthly_salary || ""}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1500 €"
              pattern="[0-9]"
              min="1"
              max="99999"
              required
            />
          </div>
          <div className="col-span-3 md:col-span-1 lg:col-end-3">
            <label
              htmlFor="payment_terms"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Plazos
              {parseInt(maxPaymentTerms) >= 120 ? "(años)" : "(meses)"}
            </label>
            <select
              id="payment_terms"
              name="payment_terms"
              value={formValues.payment_terms || ""}
              onChange={handleChangeSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Seleccione un plazo</option>
              {[
                ...Array(
                  parseInt(maxPaymentTerms) >= 120
                    ? parseInt(maxPaymentTerms) / 12
                    : parseInt(maxPaymentTerms)
                ),
              ].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="col-start-1 w-full">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buscar
              <FontAwesomeIcon icon={faMagnifyingGlass} className="ms-2" />
            </button>
          </div>
        </form>
      </section>
      <div className="flex justify-center items-center">
        {offersList && offersList.length > 0 ? (
          <ListaOfertas offersList={offersList} />
        ) : null}
      </div>
    </motion.div>
  );
}
