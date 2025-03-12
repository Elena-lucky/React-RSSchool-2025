import { useState } from 'react';
import { z } from 'zod';
import { formSchema } from '../validation/validationSchema';
import { InputComponent } from '../components/formComponents/InputComponent';
import '../styles/Forms.css';

export function ControlledForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [terms, setTerms] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const [country, setCountry] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name,
      age: parseInt(age, 10),
      email,
      password,
      confirmPassword,
      gender,
      terms,
      img,
      country,
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
      <p className="title">Controlled form</p>
      <p className="message">Please fill in these fields.</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex">
          <InputComponent
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <InputComponent
            id="age"
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder=""
            min={1}
            required
          />
          {errors.age && <span className="error">{errors.age}</span>}

          <InputComponent
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <InputComponent
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <InputComponent
            id="confirmPassword"
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
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
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                required
              />{' '}
              Women
            </label>
          </label>
          {errors.gender && <span className="error">{errors.gender}</span>}

          <label htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              required
            />{' '}
            I accept Terms and Conditions agreement.
          </label>
          {errors.terms && <span className="error">{errors.terms}</span>}

          <label htmlFor="img">Download your foto</label>
          <input
            type="file"
            id="picture"
            onChange={(e) => setImg(e.target.files?.[0] || null)}
            accept="image/jpeg, image/png"
          />
          {errors.img && <span className="error">{errors.img}</span>}

          <label htmlFor="country">
            <select
              className="input"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
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
