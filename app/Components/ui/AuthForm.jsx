'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { AuthformSchema } from '@/lib/utils'
import { signIn, signUp } from '@/lib/actions/userActions'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'

 


const AuthForm = ({type}) => {

    const router = useRouter()
    
    const [user, setUser] = useState();

    const [isLoading, setIsLoading] = useState(false)

    const formSchema = AuthformSchema(type)

      // 1. Define your form.
  const form = useForm({ 
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      if(type === 'sign-up') {
        const newUser = await signUp(data);

        setUser(newUser)
      };

      

      if(type === 'sign-in') {


        const response = await signIn({
          email: data.email,
          password: data.password
        })

        if (response) router.push('/');

      }
    } catch (error) {
      console.error('Error', error)
    } finally {
      setIsLoading(false);
    }

    
  }

  return (
    <section className='auth-form'>
        <header className=' flex flex-col gap-5 sm:gap-8'>
            <Link href='/' className='flex items-center  cursor-pointer gap-2'>
                <Image 
                src='/icons/logo.svg'
                width={34}
                height={34}
                alt='Banking app logo'
                className=' size-[24px] max-xl:size-14'
                />

                <h1 className='text-24 font-bold font-ibm-plex-serif text-amber-900'>
                    Transact
                </h1>
              </Link>

            <div className=' flex flex-col gap-1 md:gap-3'>
                <h1 className=' text-24 lg:text-36 font-semibold text-gray-900 '>
                    {
                        user != null ? 'Link Account' : type === "sign-in" ? "Sign-In" : "Sign-Up"
                    }

                    <p className='text-12 font-normal text-gray-600 mt-2'>
                        {
                            user
                            ? "Link Your Account To Get Started"
                            :"Please Enter Your Details"
                        }
                    </p>
                </h1>
            </div>

            {  user 
                ? (
                    <div>
                      Plaid Links
                    </div>
                )
                : (
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=' flex flex-col gap-4'>
                    

                      {
                        type === 'sign-in' ? (

                          <div className=' flex flex-col gap-4'>

                            <CustomInput
                              control = {form.control}
                              label = "Email"
                              type = "email"
                              placeholder= "Enter your email"
                              name='email'
                            />

                            <CustomInput
                              control = {form.control} 
                              label = "Password"
                              type = "password"
                              placeholder= "Password"
                              name='password'
                            />
                          </div>
                        ) : (

                            <div className=' flex flex-col gap-4'>
                                <div className=' flex gap-4'>
                                  <CustomInput
                                    control = {form.control} 
                                    label = "Firstname"
                                    type = "text"
                                    placeholder= "Firstname"
                                    name="firstname"
                                  />

                                  <CustomInput
                                    control = {form.control} 
                                    label = "Lastname"
                                    type = "text"
                                    placeholder= "Lastname"
                                    name='lastname'
                                  />
                                </div>

                                <CustomInput
                                  control = {form.control} 
                                  label = "Address"
                                  type = "text"
                                  placeholder= "Enter your specific address"
                                  name='address1'
                                />

                                <CustomInput
                                  control = {form.control} 
                                  label = "City"
                                  type = "text"
                                  placeholder= "Enter your city"
                                  name='city'
                                />

                                <div className=' flex gap-4'> 
                                  <CustomInput
                                    control = {form.control} 
                                    label = "State"
                                    type = "text"
                                    placeholder= "NY"
                                    name='state'
                                  />

                                  <CustomInput
                                    control = {form.control} 
                                    label = "Postal Code"
                                    type = "number"
                                    placeholder= "11101"
                                    name='postalCode'
                                  />
                                </div>

                                <div className=' flex gap-4'>
                                  <CustomInput
                                    control = {form.control} 
                                    label = "DOB"
                                    type = "date"
                                    placeholder= "Date of Birth"
                                    name='dateOfBirth'
                                  />

                                  <CustomInput
                                    control = {form.control} 
                                    label = "SSN"
                                    type = "ssn"
                                    placeholder= "123123"
                                    name='ssn'
                                  />
                                </div>

                                <CustomInput
                                  control = {form.control} 
                                  label = "Email"
                                  type = "email"
                                  placeholder= "Enter your email"
                                  name='email'
                                />

                                <CustomInput
                                  control = {form.control} 
                                  label = "Password"
                                  type = "password"
                                  placeholder= "Enter your password"
                                  name='password'
                                />
                            </div>
                        )
                      }

                        <Button type="submit" className='form-btn' disabled = {isLoading}>
                          {
                            isLoading ? (
                              <div className=' flex gap-3'>
                                <Loader2 className='animate-spin' size={20} /> 
                                Loading...
                              </div>
                               
                            ) : type === "sign-in" ? "Sign-in" : "Sign-up"
                          }
                        </Button>

                      </form>
                

                      {
                        type === 'sign-in' 
                        ? (
                          <div className='flex gap-3'>
                              <p className=' text-14 font-semibold'> Don&lsquo;t have an account? </p>
                              <Link href='/sign-up' className=' text-14 underline text-amber-900 font-bold'>
                                  Sign-up
                              </Link>
                          </div>
                        ) 
                        : (
                          <div className=' flex gap-3'>
                              <p className='text-14 font-semibold'> Have an account?: </p>
                              <Link href='/sign-in' className='text-14 underline text-amber-900 font-bold'>
                                  Log-in
                              </Link>
                          </div>
                        ) 
                      }
                  </Form>
                )
            }
        </header>
    </section>
  )
}

AuthForm.propTypes = {
  type: PropTypes.string
}

export default AuthForm