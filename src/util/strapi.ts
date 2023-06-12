export async function strapiFetchAll(
  contentType: string,
  params: Record<string, string> | null = null
) {
  const url =
    `https://strapi.joinemm.dev/api/${contentType}` +
    (params ? '?' + new URLSearchParams(params) : '');
  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.data.map((entry) => {
        return {
          ...entry.attributes,
          id: entry.id,
        };
      });
    });
}
