import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { formSchema } from '../validation/validationSchema';
import { InputComponent } from '../components/formComponents/InputComponent';
import { useDispatch } from 'react-redux';
import { submitForm } from '../store/formSlice';
import { countries } from '../store/countriesStore';
import '../styles/Forms.css';

export function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFormValues = () => ({
    name: nameRef.current?.value || '',
    age: parseInt(ageRef.current?.value || '0', 10),
    email: emailRef.current?.value || '',
    password: passwordRef.current?.value || '',
    confirmPassword: confirmPasswordRef.current?.value || '',
    gender: genderRef.current?.value || '',
    terms: termsRef.current?.checked || false,
    img: imgRef.current?.files?.[0] ?? null,
    country: countryRef.current?.value || '',
  });

  const validateForm = () => {
    const formValues = getFormValues();

    try {
      formSchema.parse(formValues);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errorMessages[err.path[0]] = err.message;
          }
        });
        setErrors(errorMessages);
      }
      return false;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      const formValues = getFormValues();
      dispatch(submitForm(formValues));
      navigate('/');
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="form-wrapper">
      <p className="title">Uncontrolled form </p>
      <p className="message">All fields are required. </p>
      <form className="form" onSubmit={handleSubmit} onChange={validateForm}>
        <div className="flex">
          <InputComponent
            id="name"
            label="Name"
            type="text"
            ref={nameRef}
            placeholder=""
            required
          />
          {isSubmitted && errors.name && (
            <span className="error">{errors.name}</span>
          )}

          <InputComponent
            id="age"
            label="Age"
            type="number"
            ref={ageRef}
            placeholder=""
            min={0}
            required
          />
          {isSubmitted && errors.age && (
            <span className="error">{errors.age}</span>
          )}

          <InputComponent
            id="email"
            label="Email"
            type="email"
            ref={emailRef}
            placeholder=""
            required
          />
          {isSubmitted && errors.email && (
            <span className="error">{errors.email}</span>
          )}

          <InputComponent
            id="password"
            label="Password"
            type="password"
            ref={passwordRef}
            placeholder=""
            required
          />
          {isSubmitted && errors.password && (
            <span className="error">{errors.password}</span>
          )}

          <InputComponent
            id="confirmPassword"
            label="Confirm password"
            type="password"
            ref={confirmPasswordRef}
            placeholder=""
            required
          />
          {isSubmitted && errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          <label>
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                ref={genderRef}
                required
              />{' '}
              Men
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                ref={genderRef}
                required
              />{' '}
              Women
            </label>
          </label>
          {isSubmitted && errors.gender && (
            <span className="error">{errors.gender}</span>
          )}

          <label htmlFor="terms">
            <input type="checkbox" id="terms" ref={termsRef} required /> I
            accept Terms and Conditions agreement.
          </label>
          {isSubmitted && errors.terms && (
            <span className="error">{errors.terms}</span>
          )}

          <label htmlFor="img">Download your foto</label>
          <input
            type="file"
            id="img"
            required
            ref={imgRef}
            accept="image/jpeg, image/png"
          />
          {isSubmitted && errors.img && (
            <span className="error">{errors.img}</span>
          )}

          <label htmlFor="country">
            <input
              className="input"
              ref={countryRef}
              list="countries"
              id="country"
              placeholder="Select or type a country"
              required
            />
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </label>
          {isSubmitted && errors.country && (
            <span className="error">{errors.country}</span>
          )}

          <button
            className="submit"
            type="submit"
            disabled={isSubmitted && hasErrors}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
