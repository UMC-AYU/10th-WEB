export const PUSHSTATE_EVENT = "pushstate";

export const getCurrentPath = () => {
  return window.location.pathname;
};

export const navigateTo = (to: string) => {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event(PUSHSTATE_EVENT));
};
