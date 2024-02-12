// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getToken } from "../../../../utils/auth";

// export const useRedirectIfTokenExists = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       router.push("/");
//     }
//   }, []);
// };