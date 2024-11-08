// src/app/directmessage/[dmSpecificUser]/page.tsx

import DmSpecificUser from './DmSpecificUser';

export default async function Page(props: { params: { dmSpecificUser: string } }) {
 
  return <DmSpecificUser {...props}  />;
}
