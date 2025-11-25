// src/validators/user.validator.js
import Joi from 'joi';

export const nameField = (required = false) =>
  (required ? Joi.string().required() : Joi.string())
    .min(3)
    .max(50)
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.',
      'string.max': 'El nombre debe tener como máximo 50 caracteres.',
      'string.pattern.base': 'El nombre solo puede contener letras.',
      'any.required': 'El nombre es obligatorio.',
    });

export const surnameField = (required = false) =>
  (required ? Joi.string().required() : Joi.string())
    .min(3)
    .max(50)
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .messages({
      'string.base': 'El apellido debe ser una cadena de texto.',
      'string.min': 'El apellido debe tener al menos 3 caracteres.',
      'string.max': 'El apellido debe tener como máximo 50 caracteres.',
      'string.pattern.base': 'El apellido solo puede contener letras.',
      'any.required': 'El apellido es obligatorio.',
    });

export const emailField = (required = false) =>
  (required ? Joi.string().required() : Joi.string())
    .email()
    .messages({
      'string.email': 'El email no es válido.',
      'any.required': 'El email es obligatorio.',
    });

export const usernameField = (required = false) =>
  (required ? Joi.string().required() : Joi.string())
    .alphanum()
    .min(3)
    .max(16)
    .messages({
      'string.base': 'El nombre de usuario debe ser una cadena de texto.',
      'string.alphanum': 'El nombre de usuario solo puede contener letras y números.',
      'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
      'string.max': 'El nombre de usuario debe tener como máximo 16 caracteres.',
      'any.required': 'El nombre de usuario es obligatorio.',
    });

export const birthdateField = (required = false) =>
  (required ? Joi.date().required() : Joi.date())
    .custom((value, helper) => {
      const age = calculateAge(value);
      if (age < 14) {
        return helper.message('Debes ser mayor o igual a 14 años.');
      }
      return value;
    })
    .messages({
      'any.required': 'La fecha de nacimiento es obligatoria.',
      'date.base': 'La fecha de nacimiento no es válida.',
    });

export const passwordField = (required = false) =>
  (required ? Joi.string().min(6).max(20).required() : Joi.string().min(6).max(20))
    .pattern(/[A-Z]/)
    .pattern(/[0-9]/)
    .messages({
      'string.base': 'La contraseña debe ser una cadena de texto.',
      'string.min': 'La contraseña debe tener al menos 6 caracteres.',
      'string.max': 'La contraseña debe tener como máximo 20 caracteres.',
      'string.pattern.base': 'La contraseña debe contener al menos una letra mayúscula y un número.',
      'any.required': 'La contraseña es obligatoria.',
    });

export const imgField = (required = false) =>
  (required ? Joi.string().uri().required() : Joi.string().uri().optional())
    .messages({
      'string.uri': 'La URL de la imagen no es válida.',
      'any.required': 'La imagen es obligatoria.',
    });
    
const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};

const userDataSchema = Joi.object({
  name: nameField(true),
  surname: surnameField(true),
  email: emailField(true),
  username: usernameField(true),
  birthdate: birthdateField(true),
  password: passwordField(true),
  img: imgField()
});

export { userDataSchema };

const userUpdateSchema = Joi.object({
  name: nameField(true),
  surname: surnameField(true),
  username: usernameField(true),
  birthdate: birthdateField(true)
}).min(1);

export { userUpdateSchema };
