// Auth handling functions
async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const button = document.getElementById('loginButton');
  const spinner = button.querySelector('.spinner-border');
  const buttonText = button.querySelector('.button-text');

  try {
    // Show loading state
    button.disabled = true;
    spinner.classList.remove('d-none');
    buttonText.textContent = 'Kutilmoqda...';

    console.log('Login request sending...');
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Important for cookies
    });

    console.log('Response received:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Kirishda xatolik yuz berdi');
    }

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirect to home page
    window.location.href = '/';
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message || 'Serverga ulanishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
  } finally {
    // Reset button state
    button.disabled = false;
    spinner.classList.add('d-none');
    buttonText.textContent = 'Kirish';
  }
}

async function handleRegister(event) {
  event.preventDefault();
  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const button = document.getElementById('registerButton');
  const spinner = button.querySelector('.spinner-border');
  const buttonText = button.querySelector('.button-text');

  if (password !== confirmPassword) {
    alert('Parollar mos kelmadi');
    return;
  }

  try {
    // Show loading state
    button.disabled = true;
    spinner.classList.remove('d-none');
    buttonText.textContent = 'Kutilmoqda...';

    console.log('Register request sending...');
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
      credentials: 'include' // Important for cookies
    });

    console.log('Response received:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
    }

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirect to home page
    window.location.href = '/';
  } catch (error) {
    console.error('Register error:', error);
    alert(error.message || 'Serverga ulanishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
  } finally {
    // Reset button state
    button.disabled = false;
    spinner.classList.add('d-none');
    buttonText.textContent = 'Ro\'yxatdan o\'tish';
  }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form[action="/auth/login"]');
  const registerForm = document.querySelector('form[action="/auth/register"]');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
}); 