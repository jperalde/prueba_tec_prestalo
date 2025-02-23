"use server";
import {FormSchemaSolicitorUserData as FormSchema} from "./definitions";
import { LoanResponse } from "./definitions";
import { SolicitorUserData, EntityOffer } from "./definitions";
import crypto from "crypto";
import axios from "axios";

export async function requestLoan(formData: FormData) {
  try {
    console.log(formData);
    // Validate form data
    const validatedFields = FormSchema.safeParse({
      request_id: crypto.randomUUID(),
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      loan_quantity: formData.get("loan_quantity"),
      monthly_salary: formData.get("monthly_salary"),
      payment_terms: formData.get("payment_terms"),
    });
    console.log(validatedFields);
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      const prevState: LoanResponse = {
        errors: validatedFields.error.flatten().fieldErrors
      };
      return prevState;
    }

    // Prepare data for insertion into the database
    const loanQuantityRequest: SolicitorUserData = validatedFields.data;
console.log(loanQuantityRequest);
    // Call the API to get the loan offers
    const baseUrl = process.env.BASE_URL || "";
    const apiPort = process.env.API_PORT || "";
    const apiUser = process.env.API_USER || "";
    const apiPass = process.env.API_PASS || "";

    axios
      .get(`${baseUrl}:${apiPort}/prestamos`, {
        params: loanQuantityRequest,
        transformResponse: [
          function (data) {
            const entityOffers: EntityOffer[] = JSON.parse(data);
            return entityOffers;
          },
        ],
        auth: {
          username: apiUser,
          password: apiPass,
        },
      })
      .then((response) => {
        console.log(response);
        const loanResponse: LoanResponse = {
            status: response.status,
            offers: response.data
          };
          return loanResponse;
      });
  } catch (ex) {
    console.log(ex);
    return{
      errors: {},
      status: 400,
    };
  }
}
