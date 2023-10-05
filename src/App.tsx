import './styles/global.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

/* 
To-do

[ ]Validacção/transformação
[ ] Field Arrays
[ ] Upload de arquivos
[ ] Composition Pattern
*/
//Função para criar um usuario usando Schema(representação de uma estrutura de dados)
const createUserFormSchema = z.object({
  name: z.string()
        .nonempty('O nome é obrigatório')
        .transform(name => {
          return name.trim().split(' ').map(word => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
          }).join(' ')
         }),
  email: z.string()
        .nonempty('O e-mail é obrigatório')
        .email('Formato de e-mail inválido')
        .toLowerCase()
        .refine(email => {
          return email.endsWith('gmail.com')
        }, 'O email precisa ser um gmail'),
  password: z.string()
              .min(6, 'A senha precisa ter no mínimo 6 carateres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>
export function App() {
  const [output, setOutput] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors } } = 
    useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })
  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  //High Order Function
  return (
    <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center'>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className='border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button
          type="submit"
          className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600'
        >Salvar</button>

      </form>
      <pre>{output}</pre>
    </main>
  )
}

