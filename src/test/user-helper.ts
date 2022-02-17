import {generateJWT} from '../utils/jwt-helper';
import {getConfig} from '../../config/config';
import User from '../modules/user/user.model';
export const ValidUserForSigningUp = {
  'email': 'reluttr@grecc.me',
  'password': 'P@ssw0rd',
  'passwordConfirmation': 'P@ssw0rd',
};

export const VerifiedUser = {
  _id: '6207a63a19fabbe6b9cacccc',
  email: 'lenadzyubanova@sirkelmail.com',
  password: 'P@ssw0rd',
  isVerified: true,
};

export const UnauthorizedUser = {
  _id: '620ab538e33700e1bfd1fc7b',
  email: 'gawif96971@diolang.com',
  password: 'P@ssw0rd',
  isVerified: true,
};

export const NotVerifiedUser = {
  _id: '62066c4ca352a5a5edb71a93',
  email: 'najadi4089@petloca.com',
  password: '123456',
  isVerified: false,
};

export const VerifiedUserToken = generateJWT({userId: VerifiedUser._id, email: VerifiedUser.email, isVerified: true}, getConfig().JWT_KEY);
export const UnauthorizedUserToken = generateJWT({userId: UnauthorizedUser._id, email: UnauthorizedUser.email, isVerified: true}, getConfig().JWT_KEY);

export async function initializeUsersForTesting() {
  await User.create(VerifiedUser);
  await User.create(NotVerifiedUser);
  await User.create(UnauthorizedUser);
}
