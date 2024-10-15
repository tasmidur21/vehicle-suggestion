const {Schema} = require("mongoose");
const httpContext = require("express-http-context");
const softDeletePlugin = function softDeletePlugin(schema, options) {
    // Add 'deleted' and 'deletedAt' fields to the schema
    schema.add({
        deletedAt: {type: Date, required: false, default: null}                    // Timestamp of deletion
    });

    if (options && options?.index) {
        schema.index({deletedAt: 1});
    }

    if (options && options?.deletedBy) {
        schema.add({
            deletedBy: {
                type: Schema.Types.ObjectId,    // ObjectId to store the ID
                ref: options?.deletedByRef || 'User',     // Dynamic reference to the model (default: 'User')
                required: false,
                default: null
            }
        });
    }

    // Pre-remove hook to prevent actual deletion
    schema.pre('remove', function (next) {
        this.softDelete(next); // Call softDelete instead of remove
    });

    const req = httpContext.get('req');
    // Instance method for soft deleting a document
    schema.methods.softDelete = function () {
        this.deletedAt = new Date(); // Set the deletion timestamp
        this.deletedBy = req?.user?.id ?? null; // Set the deletedBy field
        return this.save();          // Save the document
    };

    // Static method for soft deleting a document by its ID
    schema.statics.softDeleteById = async function (id) {
        return this.findByIdAndUpdate(id, {
            deletedAt: new Date(),
            deletedBy: req?.user?.id ?? null
        }, {new: true});  // Return the updated document
    };

    // Static method to find deleted documents with a non-null deletedAt
    schema.statics.findDeleted = function (query = {}) {
        return this.find({
            ...query,
            deletedAt: {$ne: null} // Ensure the deletedAt field is not null
        }); // Only return documents that are deleted and have a non-null deletedAt
    };

    // Static method to find deleted and documents
    schema.statics.findWithDeleted = function (query = {}) {
        return this.find({
            ...query,
            $or: [
                {deletedAt: {$ne: null}}, // Only return documents that are deleted
                {deletedAt: null} // Optionally return documents that are not deleted
            ]
        });
    };

    // Static method to restore a soft-deleted document
    schema.statics.restore = async function (id) {
        const doc = await this.findById(id);
        if (doc) {
            doc.deletedAt = null; // Clear the deletedAt field
            doc.deletedBy = null; // Clear the deletedBy field
            return doc.save();
        }
        throw new Error('Document not found');
    };

    // Pre 'find' middleware to automatically exclude soft-deleted documents from queries
    schema.pre('find', function () {
        const query = Object.keys(this.getQuery()).length > 0 ? this.getQuery() : {deletedAt: null}
        this.setQuery(query);
    });

    schema.pre('findOne', function () {
        this.where({deletedAt: null}); // Apply filter for findOne queries
    });

    schema.pre('findOneAndUpdate', function () {
        this.where({deletedAt: null}); // Prevent updating deleted docs
    });

    schema.pre('countDocuments', function () {
        this.where({deletedAt: null}); // Prevent counting deleted docs
    });
};

module.exports = softDeletePlugin;
