const {Schema} = require("mongoose");
let httpContext = require('express-http-context');
const createdByPlugin = function createdByPlugin(schema,options) {
    // Handle 'save' middleware for new and updated documents

    schema.add({
        createdBy: {
            type: Schema.Types.ObjectId,        // ObjectId for referencing a user or other model
            ref: options?.createdByRef || 'User',         // Dynamic reference, default to 'User'
            required: false,
            default: null
        },
        updatedBy: {
            type: Schema.Types.ObjectId,        // ObjectId for referencing a user or other model
            ref: options?.updatedByRef || 'User',         // Dynamic reference, default to 'User'
            required: false,
            default: null
        }
    });


    schema.pre('save', function (next) {
        const req = httpContext.get('req');
        if (!req || !req.user) return next(); // Gracefully handle missing request/user

        if (this.isNew) {
            this.createdBy = req.user.id; // Set createdBy on new document
        } else {
            this.updatedBy = req.user.id; // Set updatedBy on update
        }
        next();
    });

    // Handle 'findOneAndUpdate', 'findByIdAndUpdate' and similar update queries
    schema.pre('findOneAndUpdate', function (next) {
        const req = httpContext.get('req');
        if (!req || !req.user) return next(); // Gracefully handle missing request/user

        // Set the updatedBy field in the update query
        this.findOneAndUpdate({}, { updatedBy: req.user.id });

        next();
    });
};

module.exports = createdByPlugin;

