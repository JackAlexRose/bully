export default (userTag: string) => {
  const userTagRegex = /^<@\d+>$/;
  return userTagRegex.test(userTag);
};
