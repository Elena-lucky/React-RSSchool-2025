import { useRef, useState } from 'react';
import { z } from 'zod';
import { formSchema } from '../validation/validationSchema';
import { FormData } from '../utils/types';
import { InputComponent } from '../components/formComponents/InputComponent';
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
  const countryRef = useRef<HTMLSelectElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      img: imgRef.current?.files?.[0] || null,
      country: countryRef.current?.value || '',
    };

    try {
      formSchema.parse(formData);
      setErrors({});
      console.log('Form data is valid:', formData);
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
    }
  };

  return (
    <div className="form-wrapper">
      <p className="title">Uncontrolled form </p>
      <p className="message">Please fill in these fields. </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex">
          <InputComponent
            id="name"
            label="Name"
            type="text"
            ref={nameRef}
            placeholder=""
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <InputComponent
            id="age"
            label="Age"
            type="number"
            ref={ageRef}
            placeholder=""
            min={1}
            required
          />
          {errors.age && <span className="error">{errors.age}</span>}

          <InputComponent
            id="email"
            label="Email"
            type="email"
            ref={emailRef}
            placeholder=""
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <InputComponent
            id="password"
            label="Password"
            type="password"
            ref={passwordRef}
            placeholder=""
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <InputComponent
            id="confirmPassword"
            label="Confirm password"
            type="password"
            ref={confirmPasswordRef}
            placeholder=""
            required
          />
          {errors.confirmPassword && (
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
          {errors.gender && <span className="error">{errors.gender}</span>}

          <label htmlFor="terms">
            <input type="checkbox" id="terms" ref={termsRef} required /> I
            accept Terms and Conditions agreement.
          </label>
          {errors.terms && <span className="error">{errors.terms}</span>}

          <label htmlFor="img">Download your foto</label>
          <input
            type="file"
            id="picture"
            ref={imgRef}
            accept="image/jpeg, image/png"
          />
          {errors.img && <span className="error">{errors.img}</span>}

          <label htmlFor="country">
            <select className="input" id="country" ref={countryRef} required>
              <option value="">Select the country</option>
              <option value="Belarus">Belarus</option>
              <option value="Ukraine">Ukraine</option>
              <option value="Italy">Italy</option>
            </select>
          </label>

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
