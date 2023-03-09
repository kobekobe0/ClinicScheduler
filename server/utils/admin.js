export const isAdmin = async (userId) =>
  JSON.parse(process.env.ADMIN_USERS)?.admins?.includes(userId || "null");
