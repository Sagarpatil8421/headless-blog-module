'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        toast.success('Message sent successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        
        formik.resetForm();
      } catch (error) {
        toast.error('Something went wrong. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          {...formik.getFieldProps('name')}
          className={`w-full px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formik.touched.name && formik.errors.name
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          aria-invalid={formik.touched.name && Boolean(formik.errors.name)}
          aria-describedby={formik.touched.name && formik.errors.name ? 'name-error' : undefined}
        />
        {formik.touched.name && formik.errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-500">
            {formik.errors.name}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...formik.getFieldProps('email')}
          className={`w-full px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formik.touched.email && formik.errors.email
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          aria-invalid={formik.touched.email && Boolean(formik.errors.email)}
          aria-describedby={formik.touched.email && formik.errors.email ? 'email-error' : undefined}
        />
        {formik.touched.email && formik.errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-500">
            {formik.errors.email}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !formik.isValid}
        className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${
          isSubmitting || !formik.isValid
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
