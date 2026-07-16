// Language selection for the values page. Runs synchronously in <head> so the
// redirect happens before first paint. English is the default; pt* browsers
// are sent to the Portuguese version unless a manual choice was made.
(() => {
  const KEY = 'lang-choice';
  const isPortuguesePage = document.documentElement.lang.toLowerCase().startsWith('pt');

  const param = new URLSearchParams(location.search).get('lang');
  const forced = param === 'en' || param === 'pt' ? param : null;

  let choice = forced;
  try {
    if (forced) {
      sessionStorage.setItem(KEY, forced);
      history.replaceState(null, '', location.pathname);
    } else {
      choice = sessionStorage.getItem(KEY);
    }
  } catch {
    // Storage unavailable — fall back to the browser language below.
  }

  // The Portuguese page never auto-redirects: reaching it is already a choice
  // (toggle link or shared URL), and crawlers must be able to index it.
  if (isPortuguesePage) return;

  // Only the primary language decides: en users with pt as a secondary
  // language stay on the default English version.
  const primary = navigator.languages?.[0] || navigator.language || 'en';
  const wantsPortuguese = choice ? choice === 'pt' : /^pt(-|$)/i.test(primary);

  if (wantsPortuguese) {
    location.replace('valores.html');
  }
})();
