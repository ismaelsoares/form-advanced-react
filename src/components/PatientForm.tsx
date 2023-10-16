import "../styles/global.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handlePhone } from "../utils/masks";


const createPatientFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome completo é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  birthDate: z.string().datetime(),
  genrer: z
    .enum(["male", "female", "other"]),
  phoneNumber: z
    .string()
    .refine(value => {
      const phoneRegex = /^\(?\d{2}\)?[- ]?\d{5}[- ]?\d{4}$/;
      return phoneRegex.test(value);
    }, "Insira um número de celular válido!"),
  adress: z
    .string()
    .nonempty("O endereço é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
});

type CreatePatientFormData = z.infer<typeof createPatientFormSchema>;

export function PatientForm() {
  const [output, setOutput] = useState('')
  const { register, handleSubmit } = useForm()

  function createPatient(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="h-screen bg-zinc-900 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <form
        onSubmit={handleSubmit(createPatient)}
        className="flex flex-col gap-4 w-full max-w-xs">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register('name')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="birthDate">Data de Nascimento</label>
          <input
            type="date"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register('birthDate')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="gender">Genero</label>

          <select
            className="border-zinc-800 shadow-sm rounded h-10 bg-zinc-800 text-white"
            {...register("gender")}
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Prefiro não informar</option>

          </select>
        </div>


        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber2">Telefone</label>
          <input
            type="tel"
            maxLength={15}
            onKeyUp={handlePhone}
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register('cellphone')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register('address')}
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >Cadastrar
        </button>
      </form>
      <pre>{output}</pre>
    </main >
  );
}