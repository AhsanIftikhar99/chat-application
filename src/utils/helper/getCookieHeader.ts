// src/utils/getCookieHeader.ts

import { cookies as nextCookies } from 'next/headers';

export async function getCookieHeader() {
  const allCookies = (await nextCookies()).getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  return allCookies
}
