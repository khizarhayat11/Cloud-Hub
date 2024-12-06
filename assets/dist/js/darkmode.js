function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
 /* Dark Mode Toggle
  -------------------------------------------------- */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
  /* Dark Mode Toggle Icon
  -------------------------------------------------- */
    const icon = darkModeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
  
  /* Dark Mode Toggle Icon
  -------------------------------------------------- */
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      darkModeToggle.querySelector('i').className = 'bi bi-sun-fill';
    }
  } else if (prefersDarkScheme.matches) {
    /* Dark Mode Toggle Icon
  -------------------------------------------------- */
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.querySelector('i').className = 'bi bi-sun-fill';
  }
  
  /* Dark Mode Toggle Event Listener
  -------------------------------------------------- */
  darkModeToggle.addEventListener('click', toggleTheme);
  
  /* Dark Mode System Theme Changes
  -------------------------------------------------- */
  prefersDarkScheme.addListener((e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      darkModeToggle.querySelector('i').className = e.matches ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  });
}

/* Dark Mode Initialization on DOMContentLoaded event API
  -------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', initDarkMode); 