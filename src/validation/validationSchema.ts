import { z } from 'zod';

const nameSchema = z
  .string()
  .min(1, { message: 'Name is required' })
  .refine((value) => /^[A-Z]/.test(value), {
    message: 'First letter must be uppercase',
  });

const ageSchema = z.number().min(0, { message: 'Age cannot be negative' });

const emailSchema = z.string().email({ message: 'Invalid email address' });

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .refine(
    (value) =>
      /[0-9]/.test(value) &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[^A-Za-z0-9]/.test(value),
    {
      message:
        'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character',
    }
  );

const genderSchema = z.string().min(1, { message: 'Gender is required' });

const termsSchema = z
  .boolean()
  .refine((value) => value, { message: 'You must accept the terms' });

const imgSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: 'File size must be less than 5MB',
  })
  .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
    message: 'Only JPEG and PNG images are allowed',
  });

export const formSchema = z
  .object({
    name: nameSchema,
    age: ageSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    gender: genderSchema,
    terms: termsSchema,
    img: imgSchema,
    country: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Passwords do not match',
        code: 'custom',
      });
    }
  });
