// import { logger } from "@/lib/logger";
// import { URL_AUTH } from "@/lib/url";
// import { useCallback, useEffect, useState } from "react";

// type CookieR = {
//   create_new_session_cookie: Boolean;
//   session_cookie_name: String;
//   user_id: String;
// };

// export function useAuth(): [String | null] {
//   const [userId, SetUserId] = useState<String | null>(null);

//   const try_connect = useCallback(async () => {
//     if (!userId) {
//       try {
//         const response = await fetch(URL_AUTH, {
//           method: "GET",
//           credentials: "include",
//         });

//         logger("DEBUG", "response", response);
//         if (!response.ok) {
//           throw new Error(
//             `An error has occured: ${response.status} - ${response.statusText}`,
//           );
//         }

//         const data: CookieR = await response.json();
//         const userId = data.user_id;
//         SetUserId(userId);
//       } catch (err) {
//         if (userId) {
//           SetUserId(null);
//         }
//         console.error(err);
//       }
//     }
//   }, [userId]);

//   useEffect(() => {
//     try_connect().catch(console.error);
//   }, [try_connect]);

//   return [userId];
// }
export const version = "0.0";
