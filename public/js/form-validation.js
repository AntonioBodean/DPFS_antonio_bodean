(() => {
    const form = document.querySelector('[data-validation]');
    if (!form) return;

    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const field = name => form.elements.namedItem(name);

    function showError(input, message) {
        if (!input) return false;
        input.classList.add('form-field__error');
        input.setAttribute('aria-invalid', 'true');
        let error = input.parentElement.querySelector(`[data-client-error="${input.name}"]`);
        if (!error) {
            error = document.createElement('small');
            error.className = 'form-field__error';
            error.dataset.clientError = input.name;
            error.setAttribute('role', 'alert');
            input.insertAdjacentElement('afterend', error);
        }
        error.textContent = message;
        return false;
    }

    function clearError(input) {
        if (!input) return;
        input.classList.remove('form-field__error');
        input.removeAttribute('aria-invalid');
        input.parentElement.querySelector(`[data-client-error="${input.name}"]`)?.remove();
        input.parentElement.querySelectorAll('small.form-field__error').forEach(error => error.remove());
    }

    function imageIsValid(input, required) {
        if (!input.files.length) {
            return required ? showError(input, 'Seleccioná una imagen JPG, JPEG, PNG o GIF.') : true;
        }
        const extension = input.files[0].name.split('.').pop().toLowerCase();
        return allowedImageExtensions.includes(extension)
            ? true
            : showError(input, 'La imagen debe ser JPG, JPEG, PNG o GIF.');
    }

    const rules = {
        register: {
            firstName: input => input.value.trim().length >= 2 || showError(input, 'El nombre debe contener al menos 2 caracteres.'),
            lastName: input => input.value.trim().length >= 2 || showError(input, 'El apellido debe contener al menos 2 caracteres.'),
            email: input => emailPattern.test(input.value.trim()) || showError(input, 'Ingresá un correo electrónico válido.'),
            roleId: input => !input || Boolean(input.value) || showError(input, 'Seleccioná un tipo de cuenta.'),
            image: input => imageIsValid(input, true),
            password: input => input.value.length >= 8 || showError(input, 'La contraseña debe contener al menos 8 caracteres.'),
            confirmPassword: input => input.value === field('password').value || showError(input, 'Las contraseñas no coinciden.'),
            terms: input => !input || input.checked || showError(input, 'Debés aceptar los términos y condiciones.')
        },
        login: {
            email: input => emailPattern.test(input.value.trim()) || showError(input, 'Ingresá un correo electrónico válido.'),
            password: input => Boolean(input.value) || showError(input, 'La contraseña es obligatoria.')
        },
        'user-edit': {
            firstName: input => input.value.trim().length >= 2 || showError(input, 'El nombre debe contener al menos 2 caracteres.'),
            lastName: input => input.value.trim().length >= 2 || showError(input, 'El apellido debe contener al menos 2 caracteres.'),
            email: input => emailPattern.test(input.value.trim()) || showError(input, 'Ingresá un correo electrónico válido.'),
            roleId: input => Boolean(input.value) || showError(input, 'Seleccioná un tipo de cuenta.'),
            image: input => imageIsValid(input, false),
            password: input => (!input.value || input.value.length >= 8) || showError(input, 'La contraseña debe contener al menos 8 caracteres.'),
            confirmPassword: input => input.value === field('password').value || showError(input, 'Las contraseñas no coinciden.')
        },
        product: {
            name: input => input.value.trim().length >= 5 || showError(input, 'El nombre debe contener al menos 5 caracteres.'),
            description: input => input.value.trim().length >= 20 || showError(input, 'La descripción debe contener al menos 20 caracteres.'),
            image: input => imageIsValid(input, form.dataset.imageRequired === 'true'),
            categoryId: input => Boolean(input.value) || showError(input, 'Seleccioná una categoría.'),
            brand: input => Boolean(input.value.trim()) || showError(input, 'La marca es obligatoria.'),
            price: input => (input.value !== '' && Number(input.value) >= 0) || showError(input, 'El precio debe ser mayor o igual a cero.'),
            stock: input => (input.value !== '' && Number.isInteger(Number(input.value)) && Number(input.value) >= 0) || showError(input, 'El stock debe ser un entero mayor o igual a cero.')
        }
    };

    const formRules = rules[form.dataset.validation];
    if (!formRules) return;

    function validate(name) {
        const input = field(name);
        if (!input) return true;
        clearError(input);
        return formRules[name](input);
    }

    Object.keys(formRules).forEach(name => {
        const input = field(name);
        if (!input) return;
        const eventName = input.type === 'file' || input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(eventName, () => validate(name));
        input.addEventListener('blur', () => validate(name));
    });

    form.addEventListener('submit', event => {
        const invalidFields = Object.keys(formRules).filter(name => !validate(name));
        if (invalidFields.length) {
            event.preventDefault();
            field(invalidFields[0])?.focus();
        }
    });
})();
