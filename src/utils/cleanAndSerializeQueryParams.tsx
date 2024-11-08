export const cleanAndSerializeQueryParams = (
  obj: Record<string, any>
): string => {
  const cleanedParams = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value != null && value !== "") {
      cleanedParams.append(key, String(value));
    }
  });

  return cleanedParams.toString();
};
