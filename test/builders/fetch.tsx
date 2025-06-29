export const fetchResponseOk = (body: object) =>
  ({
    ok: true,
    json: () => Promise.resolve(body),
  } as Response);

export const fetchResponseError = () => ({ ok: false } as Response);
