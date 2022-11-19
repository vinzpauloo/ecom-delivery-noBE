export const getDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString().replace(/\//g, " | ");
};

export const getTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
