import { CalculatorType } from "@/app/lib/definitions";
import Calculadora from "../calculadora";
export default function Page() {
    return (
        <main className="w-fit h-screen my-8 mx-2">
            <Calculadora calculatorType={CalculatorType.Loan}/>
        </main>
    );
}