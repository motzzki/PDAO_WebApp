const useProduction = true; // Change to false to use localhost

export const host = useProduction
  ? "https://api.pdao-web.online"
  : "http://localhost:8018";
