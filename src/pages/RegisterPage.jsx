import { useFormik } from 'formik';

const RegisterPage = () => {
  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    onSubmit: async values => {
      console.log(values);
    },
  })

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold font-merri'>Create an account</h1>

      <form className='mt-10 w-[400px]'>
        <input type='text' className='w-full p-2 bg-white border outline-none' />
      </form>
    </div>
  )
}

export default RegisterPage;
