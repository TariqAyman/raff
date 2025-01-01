exports.requirePermission = (permissionNeeded) => {
    return (req, res, next) => {
        const user = req.user;
        if (user?.permissions?.has(permissionNeeded)) {
            return next();
        }
        return res.status(403).json({ error: 'Forbidden' });
    };
};
