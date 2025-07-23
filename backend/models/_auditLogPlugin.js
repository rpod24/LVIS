module.exports = function auditLogPlugin(schema) {
  schema.pre('save', function (next) {
    if (!this.isNew) {
      console.log(`[AUDIT] Modified ${this.constructor.modelName} - ${this._id}`);
    }
    next();
  });

  schema.pre('remove', function (next) {
    console.log(`[AUDIT] Removed ${this.constructor.modelName} - ${this._id}`);
    next();
  });
};