import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'




const CustomInput = ({ control, placeholder, type, label, name}) => {
  return (
   <FormField
            control={control}
            name={name}
            render={({ field }) => (
            <FormItem>
                <div className='form-item'>
                    <FormLabel className='form-label'> {label} </FormLabel>
                    <div className=' flex w-full flex-col'>
                        <FormControl> 
                    
                            <Input 
                            placeholder={placeholder}
                            type={type}
                            name={name}
                            {...field}
                            className='form-input'
                            />

                       </FormControl>

                      <FormMessage className='form-message'/>
                </div> 
                    </div>
                  
            </FormItem>
            )}
        />
  )
}

export default CustomInput