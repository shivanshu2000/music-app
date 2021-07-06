import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `${ctx.field} is a required field.`,
          min: `${ctx.field} is too short.`,
          max: `${ctx.field} is too long.`,
          alpha_spaces: `${ctx.field} may only contain alhabetic characters and spaces.`,
          email: 'Please provide a valid email.',
          min_value: `${ctx.field} value is too low.`,
          max_value: `${ctx.field} value is too high.`,
          excluded: `You are not allowed to use this value for ${ctx.field}`,
          country_excluded: `We're not current accepting registration from ${ctx.field}`,
          passwords_mismatch: 'The passwords do not match.',
          tos: 'You must accept the Terms of Service',
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `${ctx.field} is invalid`;

        return message;
      },
    });
  },
};
