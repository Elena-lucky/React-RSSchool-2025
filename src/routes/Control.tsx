import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../validation/validationSchema';
import { InputComponent } from '../components/formComponents/InputComponent';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { submitForm } from '../store/formSlice';
import { countries } from '../store/countriesStore';
import { FormData } from '../utils/types';
import '../styles/Forms.css';

export function ControlledForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(submitForm(data));
    navigate('/');
  };

  return (
    <div className="form-wrapper">
      <p className="title">Controlled form</p>
      <p className="message">All fields are required.</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <InputComponent
            id="name"
            label="Name"
            type="text"
            {...register('name')}
            placeholder=""
          />
          {errors.name && <span className="error">{errors.name.message}</span>}

          <InputComponent
            id="age"
            label="Age"
            type="number"
            {...register('age', { valueAsNumber: true })}
            placeholder=""
            min={0}
          />
          {errors.age && <span className="error">{errors.age.message}</span>}

          <InputComponent
            id="email"
            label="Email"
            type="email"
            {...register('email')}
            placeholder=""
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <InputComponent
            id="password"
            label="Password"
            type="password"
            {...register('password')}
            placeholder=""
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <InputComponent
            id="confirmPassword"
            label="Confirm password"
            type="password"
            {...register('confirmPassword')}
            placeholder=""
            required
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}

          <label>
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                value="male"
                required
                {...register('gender')}
              />{' '}
              Men
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                value="female"
                required
                {...register('gender')}
              />{' '}
              Women
            </label>
          </label>
          {errors.gender && (
            <span className="error">{errors.gender.message}</span>
          )}

          <label htmlFor="terms">
            <input type="checkbox" id="terms" required {...register('terms')} />{' '}
            I accept Terms and Conditions agreement.
          </label>
          {errors.terms && (
            <span className="error">{errors.terms.message}</span>
          )}

          <label htmlFor="img">Download your foto</label>
          <input
            type="file"
            id="img"
            required
            accept="image/jpeg, image/png"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setValue('img', file, { shouldValidate: true });
              }
            }}
          />
          {errors.img && <span className="error">{errors.img.message}</span>}

          <label htmlFor="country">
            <input
              className="input"
              list="countries"
              id="country"
              {...register('country')}
              placeholder="Select or type a country"
            />
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </label>
          {errors.country && (
            <span className="error">{errors.country.message}</span>
          )}

          <button className="submit" type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
