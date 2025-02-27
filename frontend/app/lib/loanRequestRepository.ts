"use server";
import { FormSchemaSolicitorUserData as FormSchema } from "./definitions";
import { LoanResponse } from "./definitions";
import { SolicitorUserData, EntityOffer } from "./definitions";
import crypto from "crypto";
import axios from "axios";

export async function requestLoan(formData: FormData): Promise<LoanResponse> {
  try {
    console.log(formData);
    // Validate form data
    const validatedFields = FormSchema.safeParse({
      id_request: crypto.randomUUID(),
      nombre: formData.get("name"),
      apellidos: formData.get("lastname"),
      email: formData.get("email"),
      //phone: formData.get("phone"),
      cantidad: formData.get("loan_quantity"),
      ingresos: formData.get("monthly_salary"),
      plazos: formData.get("payment_terms"),
    });
    console.log(validatedFields);
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      const prevState: LoanResponse = {
        errors: validatedFields.error.flatten().fieldErrors,
      };
      return prevState;
    }

    // Prepare data for insertion into the database
    const loanQuantityRequest: SolicitorUserData = {
      id_request: validatedFields.data.id_request,
      nombre: validatedFields.data.nombre,
      apellidos: validatedFields.data.apellidos,
      email: validatedFields.data.email,
      cantidad: parseInt(validatedFields.data.cantidad),
      ingresos: parseInt(validatedFields.data.ingresos),
      plazos: parseInt(validatedFields.data.plazos),
    };
    console.log(loanQuantityRequest);
    // Call the API to get the loan offers
    const baseUrl = process.env.API_URL || "http://backend-docker";
    const apiPort = process.env.API_PORT || "3000";
    /*const apiUser = process.env.API_USER || "admin";
    const apiPass = process.env.API_PASS || "admin";*/
    console.log(`${baseUrl}:${apiPort}/solicitar-prestamo`);
    const response = await axios.post(
      `${baseUrl}:${apiPort}/solicitar-prestamo`,
      loanQuantityRequest,
      {
        transformResponse: [
          function (data: string) {
            console.log(data);
            let parsedData;
            try {
              parsedData = JSON.parse(data);
            } catch (error) {
              console.error("Error parsing response data:", error);
              parsedData = [];
            }
            let entityOffers: EntityOffer[] = [];
            try {
              if (Array.isArray(parsedData)) {
                entityOffers = parsedData.map((offer: string) => {
                  return JSON.parse(offer);
                });
              }
            } catch (error) {
              console.error("Error parsing response data:", error);
            }
            console.log(entityOffers);
            return entityOffers;
          },
        ],
      }
    );

    console.log(response.status);
    console.log(response.data);
    const loanResponse: LoanResponse = {
      status: response.status,
      offers: response.data,
    };
    return loanResponse;
  } catch (ex) {
    console.log(ex);
    return {
      errors: {},
      status: 400,
    };
  }
}
