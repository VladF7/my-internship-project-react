import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import { useEffect } from 'react'
import '../ReactHookForms.css'
import { useNavigate } from 'react-router-dom'
import CitiesSelect from '../../React-select/React-select'
import citiesAPI from '../../../api/citiesAPI'

const editMasterSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Required field' })
    .min(3, { message: 'Name must be be 3 or more characters long' }),
  cities: z
    .array(z.object({ value: z.number().int().positive(), label: z.string().nonempty() }))
    .nonempty({ message: 'Required field' })
})

const EditMasterForm = ({ formFields, onSubmit, loader, inProcess }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(editMasterSchema)
  })

  useEffect(() => {
    reset({
      name: formFields.name,
      cities: formFields.cities
    })
  }, [])

  const navigate = useNavigate()

  const goBack = (event) => {
    event.preventDefault()
    navigate('/admin/masters')
  }
  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = await cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options
  }
  const submit = (formData) => {
    const name = formData.name
    const cities = formData.cities.map((city) => city.value)
    return onSubmit({ name, cities })
  }

  return (
    <form className='formWrapper' onSubmit={handleSubmit(submit)}>
      <div className='fieldWrapper'>
        <label className='formLabel'>Edit master name</label>
        <input
          className={errors?.name?.message ? 'formInput' + ' ' + 'formErrorField' : 'formInput'}
          {...register('name')}
          placeholder='Must not be less than 3 characters'
        ></input>
        {errors?.name?.message && <div className='formRequiredField'>{errors?.name?.message}</div>}
      </div>

      <div className='fieldWrapper'>
        <label className='formLabel'>Edit master cities</label>
        <Controller
          name='cities'
          control={control}
          render={({ field }) => (
            <CitiesSelect {...field} loadOptions={loadOptions} error={!!errors?.cities} />
          )}
        />
        {errors?.cities?.message && (
          <div className='formRequiredField'>{errors?.cities?.message}</div>
        )}
      </div>

      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
            Cancel
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton disabled={inProcess}>{(inProcess && loader) || 'Edit master'}</MyBigButton>
        </div>
      </div>
    </form>
  )
}

export default EditMasterForm
