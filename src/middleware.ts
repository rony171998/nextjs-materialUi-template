import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
})
export const config = { matcher: ["/dashboard"] }