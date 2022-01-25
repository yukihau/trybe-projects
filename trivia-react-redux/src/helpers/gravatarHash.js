import md5 from 'crypto-js/md5';

export default function URL(email) {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
}
