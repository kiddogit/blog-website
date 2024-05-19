import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { registerUser } from '../services/auth.service';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

const formSchema = Yup.object().shape({
  fullName:Yup.string().required('Full Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter your valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Please must be at least 3 characters long')
    .max(18, 'Password must be at most 18 characters long'),
})

const RegisterPage = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn:values => registerUser(values),
    onSuccess: () => {
     navigate('/login')
    },
    onError: error => {
      if(isAxiosError(error)){
       toast.error(error.response.data.message)
      }
    },
  })

  const { handleChange, handleBlur, values, errors, handleSubmit, touched } = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: async values => {
      await mutation.mutateAsync(values)
    },
  })

  return (
    <div className='h-screen w-full flex items-center justify-center'>
    <div className='flex flex-col'>
      <h1 className='text-4xl text-center font-[800] font-merri'>Join us</h1>

        <form className='mt-11 w-[400px]' onSubmit={handleSubmit}>
          <div className='flex flex-col mb-4'>
            <input 
              type='text' 
              placeholder='Your full name'
              className='input'
              name='fullName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
            />
            {
              errors.fullName && touched.fullName && 
              <p className='ml-4 text-red-500 mt-1'>{errors.fullName}</p>
            }
            <input type='email' placeholder='Your email' className='input' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
            {
              errors.email && touched.email && 
              <p className='ml-4 text-red-500 mt-1'>{errors.email}</p>
            }
            <input 
              type='password' 
              placeholder='Your password'
              className='input' 
              name='password' 
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
             {
              errors.password && touched.password && 
              <p className='ml-4 text-red-500 mt-1'>{errors.password}</p>
            }
          </div>

          <button type='submit' className='btn'>Register</button>
        </form>

        <p className='mt-5 text-right pr-5'>
        Already a member?{''}
        <Link to='/login' className='text-[#121212] underline'>
          Login
        </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage;
