function isValidEmail(email) {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);
}
function errorMessage(message, parentElement) {
  const errTxt = document.createElement('p');
  errTxt.innerText = message;
  errTxt.style.color = 'red';
  parentElement.appendChild(errTxt);
  setTimeout(() => {
    errTxt.remove();
  }, 4000);
}
async function submitForm(endpoint, form) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: form.login?.value,
      email: form.email.value,
      password: form.password.value,
    }),
  });
  return response;
}

const { regForm, logForm } = document.forms;

regForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (isValidEmail(e.target.email.value)) {
    const response = await submitForm('/login/registration', e.target);
    if (response.status === 200) {
      window.location.href = '/login';
    } else if (response.status === 401) {
      errorMessage(
        'Адрес электронной почты уже занят',
        regForm,
      );
    }
  } else {
    errorMessage(
      'Не верный формат электронной почты.',
      regForm,
    );
  }
});
logForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (isValidEmail(e.target.email.value)) {
    const response = await submitForm('/login', e.target);
    if (response.status === 200) {
      window.location.href = '/';
    } else {
      errorMessage(
        'Неправильный адрес электронной почты или пароль',
        logForm,
      );
    }
  } else {
    errorMessage(
      'Введите правильный формат электронной почты.',
      logForm,
    );
  }
});

