import { CalculatorType } from "@/app/lib/definitions";
import Calculadora from "../calculadora";
export default function Page() {
    return (
        <main className="w-full h-fit">
            <Calculadora calculatorType={CalculatorType.Loan}/>
        </main>
    );
}