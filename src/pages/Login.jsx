import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/Config'
import { useDispatch } from 'react-redux'
import { clearUserName, getUserName } from '../redux/UserSlice'
import { toast } from 'react-toastify'
import { collection, setDoc } from 'firebase/firestore'
import { BsLayoutSplit } from 'react-icons/bs'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("email required"),
        password: Yup.string().required("password required"),
    })

    const handleLogin = async(values, {isSubmitting})=>{
        const { email, password} = values

        try {
             const result = await signInWithEmailAndPassword(auth, email, password)
             const getUser = result.user
             const displayName = getUser.displayName
             dispatch(getUserName(displayName));
            
             toast.success("Login Sucessfull");
            navigate("/") 
        } catch (error){
            // alert(error.message) 
            toast.error("Failed to Login or Sign Up" || error)
        }finally{
            isSubmitting(false)
        }
    }

  return (
    <div className='max-w-sm mx-auto mt-10 p-4 border'>
        <h2 className='text-3xl text-blue-500 mb-4'>Login</h2>
        <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        >
            <Form>
        <div className='mb-4'>
            <label className='block text-gray-700'>Email:</label>
            <Field type="email" id="email" name="email" className="border p-2 w-full " />
            <ErrorMessage name='email' component="p" className='text-red-500' />
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700'>Password:</label>
            <Field type="password" id="password" name="password" className="border p-2 w-full " />
            <ErrorMessage name='password' component="p" className='text-red-500' />
        </div>
        <button type='submit' className='bg-black text-white px-2 py-1 rounded mb-4'>Login</button>
        </Form>
        </Formik>
        <p>Don't have an account <Link to="/signin" className='text-red-700'>Sign Up</Link></p> 

    </div>
  )
}

export default Login