import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/login",
    error: "/error",
  },
})
export const config = { matcher: ["/dashboard", '/user'] }