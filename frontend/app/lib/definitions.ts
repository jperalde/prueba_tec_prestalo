import { z } from "zod";

export enum CalculatorType {
  Loan = "préstamos",
  Mortgage = "hipotecas",
}

export type SolicitorUserData = {
  id_request: string;
  //nombre del solicitante
  nombre: string;
  //apellidos del solicitante
  apellidos: string;
  //email del solicitante
  email: string;
  //cantidad del prestamo
  cantidad: number;
  //salario neto mensual
  ingresos: number;
  //meses en los que se quiere devolver el pago
  plazos: number;
};

export type EntityOffer = {
  //nombre del banco/entidad
  name: string;
  //cantidad aprovada del prestamo
  approved_quantity: number;
  //meses en los que se puede devolver
  payment_terms: number;
  //intereses tae que se aplicarán
  taxes_percentage: number;
  //costo por mes
  monthly_payment: number;
  //url de redirección para realizar la solicitud
  offer_url: string;
};

export const PhoneRegex = new RegExp(/^[0-9]{9}$/);
export const FormSchemaSolicitorUserData = z.object({
  id_request: z.string(),
  nombre: z
    .string({
      invalid_type_error: "Por favor, indique su nombre.",
    })
    .min(1, {
      message: "Por favor, indique su nombre.",
    }),
    apellidos: z
    .string({
      invalid_type_error: "Por favor, indique sus apellidos.",
    })
    .min(1, {
      message: "Por favor, indique sus apellidos.",
    }),
    email: z
    .string({
      invalid_type_error: "Por favor, indique su correo electrónico.",
    })
    .email({
      message: "Por favor, indique un correo electrónico válido.",
    }),
  /*phone: z
    .string({
      invalid_type_error:
        "Por favor, indique un número de teléfono de contacto.",
    })
    .regex(PhoneRegex, "Número no valido."),*/
    cantidad: z
    .string({
      invalid_type_error: "Por favor, indique el importe que desea financiar.",
    })
    .min(3, {
      message: "Por favor, indique el importe que desea financiar.",
    }),
    ingresos: z
    .string({
      invalid_type_error:
        "Por favor, indique su salario neto mensual (aproximado).",
    })
    .min(1, {
      message: "Por favor, indique su salario neto mensual (aproximado).",
    }),
    plazos: z
    .string({
      invalid_type_error:
        "Por favor, seleccione el número de plazos de devolución.",
    })
    .min(1, {
      message: "Por favor, seleccione el número de plazos de devolución.",
    }),
});

export type LoanResponse = {
  errors?: {
    name?: string[];
    lastname?: string[];
    email?: string[];
    phone?: string[];
    loan_quantity?: string[];
    monthly_salary?: string[];
    payment_terms?: string[];
  };
  status?: number;
  offers?: EntityOffer[];
};
