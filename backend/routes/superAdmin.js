import bcrypt from 'bcrypt';

router.post('/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const allowedRoles = ['SUPER_ADMIN'];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || 'SUPER_ADMIN',
      isVerified: true,
    });

    res.status(201).json({ message: 'User created', userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});