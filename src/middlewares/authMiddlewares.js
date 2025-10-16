const isAuthorOrAdmin = (req, res, next) => {
  if (req.user.role === "ADMIN" || req.user.role === "AUTHOR") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
};

module.exports = { isAuthorOrAdmin, isAdmin };
