const sections = ['mphys-project', 'research-assistant', 'urss'];

function showSection(targetId) {
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = (id === targetId) ? 'block' : 'none';
    }
  });
}

window.onload = () => {
  showSection('mphys-project');

  document.querySelectorAll('.experience-titles button').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      showSection(target);
    });
  });
};