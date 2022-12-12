import React from 'react'
import Nextauth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '../../../utils/DB'
import User from '../../../models/User'
import bcryptjs from 'bcryptjs'

export default Nextauth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id
      if (user?.isAdmin) token.isAdmin = user.isAdmin
      return token
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin
      return session
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect()
        const user = await User.findOne({
          email: credentials.email,
        })
        await db.disconnect()
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin,
          }
        }
        throw new Error('옳지 않은 이메일 혹은 비밀번호입니다')
      },
    }),
  ],
})
