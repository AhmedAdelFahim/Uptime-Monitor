import {VerifiedUser} from './user-helper';
import UrlModel from '../modules/url/url.model';
import {Protocol} from '../modules/url/url.interface';

export const URLToInsert = {
  'name': 'url-1',
  'url': 'google.com',
  'protocol': 'https',
  'tags': ['tag3'],
  'interval': '01m',
  'threshold': 2,
  'httpHeaders': {
    'Content-Type': 'application/json',
  },
  'ignoreSSL': true,
};

export const URLInserted = {
  '_id': '620ab4fce33700e1bfd1fc78',
  'userId': VerifiedUser._id,
  'name': 'url-2',
  'url': 'google.com',
  'protocol': Protocol.HTTPS,
  'tags': ['tag3'],
  'interval': '01m',
  'threshold': 2,
  'httpHeaders': {
    'Content-Type': 'application/json',
  },
  'ignoreSSL': false,
};

export const URLToDeleted = {
  '_id': '620ab4fce33700e1bfd1fc70',
  'userId': VerifiedUser._id,
  'name': 'url-6',
  'url': 'google.com',
  'protocol': Protocol.HTTPS,
  'tags': ['tag3'],
  'interval': '01m',
  'threshold': 2,
  'httpHeaders': {
    'Content-Type': 'application/json',
  },
  'ignoreSSL': false,
};

export const URLToUpdated = {
  _id: '620ab4fce33700e1bfd1fc79',
  data: {
    'name': 'url-3',
    'url': 'facebook.com',
    'protocol': Protocol.HTTPS,
    'tags': ['tag1'],
    'interval': '01m',
    'threshold': 1,
    'httpHeaders': {
      'Content-Type': 'application/json',
    },
    'ignoreSSL': false,
  },
};
export async function getURL(_id:string) {
  return UrlModel.findOne({_id});
}

export async function initializeURLForTesting() {
  await UrlModel.create(URLInserted);
  await UrlModel.create(URLToDeleted);
  await UrlModel.create({...URLToUpdated.data, _id: URLToUpdated._id, userId: VerifiedUser._id});
}
