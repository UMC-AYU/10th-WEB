export const getCurrentPath = () => {
  return window.location.pathname;
};

export const navigateTo = (to: string) => {
  window.history.pushState(null, "", to);

  window.dispatchEvent(new PopStateEvent("popstate"));
};