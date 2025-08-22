export const fbqCustom = (
  event: string,
  options: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", event, options);
  }
};
