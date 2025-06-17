export const setCookie = (name: string, value: string, days = 7) => {
   const expires = new Date(Date.now() + days * 864e5).toUTCString();
   document.cookie = `${name}=${value}; path=/; expires=${expires}`;
};

export const deleteCookie = (name: string) => {
   document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
