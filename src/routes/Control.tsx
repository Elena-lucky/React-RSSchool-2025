import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../validation/validationSchema';
import { InputComponent } from '../components/formComponents/InputComponent';
import { FormData } from '../utils/types';
import '../styles/Forms.css';

export function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form data is valid:', data);
  };

  return (
    <div className="form-wrapper">
      <p className="title">Controlled form</p>
      <p className="message">Please fill in these fields.</p>
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
                {...register('gender')}
              />{' '}
              Men
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                value="female"
                {...register('gender')}
              />{' '}
              Women
            </label>
          </label>
          {errors.gender && (
            <span className="error">{errors.gender.message}</span>
          )}

          <label htmlFor="terms">
            <input type="checkbox" id="terms" {...register('terms')} /> I accept
            Terms and Conditions agreement.
          </label>
          {errors.terms && (
            <span className="error">{errors.terms.message}</span>
          )}

          <label htmlFor="img">Download your foto</label>
          <input
            type="file"
            id="picture"
            {...register('img')}
            accept="image/jpeg, image/png"
          />
          {errors.img && <span className="error">{errors.img.message}</span>}

          <label htmlFor="country">
            <select className="input" id="country" {...register('country')}>
              <option value="">Select the country</option>
              <option value="Belarus">Belarus</option>
              <option value="Ukraine">Ukraine</option>
              <option value="Italy">Italy</option>
            </select>
          </label>
          {errors.country && (
            <span className="error">{errors.country.message}</span>
          )}

          <button
            className="submit"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
