// src/app/chatwithuser/[chatWithSpecificUser]/page.tsx

import DmSpecificUser from './DmSpecificUser';

export default async function Page(props: { params: { chatWithSpecificUser: string } }) {
 
  return <DmSpecificUser {...props}  />;
}
