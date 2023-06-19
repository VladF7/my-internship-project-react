import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Textarea from '@mui/joy/Textarea'
import { Rating, Typography } from '@mui/material'
import MyBigButton from '../../Buttons/BigButton/MyBigButton'
import StarIcon from '@mui/icons-material/Star'

const addFeedbackFormSchema = z.object({
  comment: z.string().max(256, { message: 'String must contain at most 256 characters' }),
  rating: z
    .number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating is required'
    })
    .int()
    .positive()
})

const AddFeedbackForm = ({ onSubmit, goBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(addFeedbackFormSchema),
    defaultValues: {
      rating: null,
      comment: ''
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='fieldWrapper'>
        <label className='formLabel'>Enter order comment</label>
        <Controller
          name='comment'
          control={control}
          render={({ field: { value, onChange } }) => (
            <Textarea
              sx={{
                fontFamily: 'inherit',
                fontSize: '14px',
                mb: '20px'
              }}
              variant='outlined'
              placeholder='Enter comment...'
              maxRows={5}
              minRows={5}
              onChange={(e) => onChange(e.target.value.trim())}
              endDecorator={
                <Typography level='body1' sx={{ ml: 'auto', fontSize: '14px' }}>
                  {value.length}/256
                </Typography>
              }
            />
          )}
        />
        {errors?.comment?.message && (
          <div className='formRequiredField'>{errors?.comment?.message}</div>
        )}
      </div>
      <div className='fieldWrapper'>
        <label className='formLabel'>Set rating</label>
        <Controller
          name='rating'
          control={control}
          render={({ field: { value, onChange } }) => (
            <Rating
              sx={{ color: 'lightsalmon' }}
              size='large'
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue)
              }}
              emptyIcon={<StarIcon sx={{ color: 'rgb(255,255,255, 0.7)' }} fontSize='inherit' />}
            />
          )}
        />
        {errors?.rating?.message && (
          <div className='formRequiredField'>{errors?.rating?.message}</div>
        )}
      </div>

      <div className='buttonBoxWrapper'>
        <div className='buttonBox' onClick={(e) => goBack(e)}>
          <MyBigButton className='backBigButton'>Cancel</MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton>Send feedback</MyBigButton>
        </div>
      </div>
    </form>
  )
}

export default AddFeedbackForm
