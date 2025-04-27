import User from '../models/User.mjs';
import asyncHandler from '../Middleware/aysnc.mjs';
import ErrorResponse from '../utils/errorRespons.mjs';

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  const token = user.getSignedJwtToken();

  res.status(201).json({ success: true, token });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});
export default { register, login };