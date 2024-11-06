// src/app/directmessage/[dmSpecificUser]/page.tsx

import DmSpecificUser from './DmSpecificUser';
import { getCookieHeader } from '@/utils/helper/getCookieHeader';

export default async function Page(props: { params: { dmSpecificUser: string } }) {
  const cookieHeader = await getCookieHeader(); // Call the utility function

  return <DmSpecificUser {...props} cookies={cookieHeader} />;
}
