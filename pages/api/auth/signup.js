import User from '../../../models/User'
import db from '../../../utils/DB'
import bcryptjs from 'bcryptjs'

async function handle(req, res) {
  if (req.method !== 'POST') {
    return
  }
  const { name, email, password } = req.body
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 3
  ) {
    res.status(422).json({
      message: 'Validation error',
    })
    return
  }

  await db.connect()

  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    res.status(422).json({ message: '사용자가 이미 존재합니다!' })
    await db.disconnect()
    return
  }
  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  })

  const user = await newUser.save()
  await db.disconnect()
  res.status(201).send({
    message: '사용자 등록!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
}

export default handle
