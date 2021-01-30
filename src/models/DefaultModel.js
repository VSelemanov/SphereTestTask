import { GraphQLNonNull, GraphQLObjectType } from 'graphql';

export default class DefaultModel {
  constructor(keyValues) {
    Object.assign(this, keyValues);
  }

  static schema = {};

  static getAllowedFields() {
    return Object.entries(this.schema).reduce((acc, [key, { type, allowNull = true }]) => {
      const preparedType = allowNull ? type : new GraphQLNonNull(type);
      acc[key] = { type: preparedType };
      return acc;
    }, {});
  }

  static buildType(args = {}) {
    return new GraphQLObjectType({
      name: this.name,
      fields: () => this.getAllowedFields(),
      ...args,
    });
  }
}
