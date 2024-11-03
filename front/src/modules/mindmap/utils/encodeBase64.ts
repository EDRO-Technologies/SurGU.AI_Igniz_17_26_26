export const encodeBase64 = (input: string) => {
  const utf8Encoder = new TextEncoder();
  const encoded = utf8Encoder.encode(input);
  return btoa(String.fromCharCode(...encoded));
};
