const mongoose = require('mongoose');
require('./role.model');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        // Roles: reference to Role model
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            }
        ]
    },
    { timestamps: true }
);

/**
 * Pre-save hook to hash password if it's new or modified.
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Helper method to compare passwords
userSchema.methods.comparePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
