import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '@/services/auth.service';    // Absolute path //
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ADD_USER } from '@/store/features/userSlice';

const formSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter your valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Please must be at least 3 characters long')
    .max(18, 'Password must be at most 18 characters long'),
})

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn:values => loginUser(values),
    onSuccess: data => {
      toast.success('User has successfully logged in')
     dispatch(ADD_USER(data.user))
     localStorage.setItem('access-token', data.accessToken)
     navigate('/')
    },
    onError: error => {
      if(isAxiosError(error)){
       toast.error(error.response.data.message)
      }
    },
  })

  const { handleChange, handleBlur, values, errors, handleSubmit, touched } = useFormik({
    initialValues: {
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
      <h1 className='text-4xl text-center font-[800] font-merri'>Welcome Back!</h1>

        <form className='mt-11 w-[400px]' onSubmit={handleSubmit}>
          <div className='flex flex-col mb-4'>
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

          <button type='submit' className='btn'>Login</button>
        </form>

        <p className='mt-5 text-right pr-5'>
          Don&apos;t have an account?{''}
        <Link to='/register' className='text-[#121212] underline'>
          Register
        </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage;
