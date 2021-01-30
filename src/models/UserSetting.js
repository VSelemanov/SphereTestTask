import { GraphQLString } from 'graphql';
import DefaultModel from './DefaultModel';
import RedisService from '../services/RedisService';

const redis = new RedisService();

export default class UserSetting extends DefaultModel {
  static schema = {
    userId: {
      type: GraphQLString,
      allowNull: false,
    },
    key: {
      type: GraphQLString,
      allowNull: false,
    },
    value: {
      type: GraphQLString,
    },
  }

  static async findOne({ userId, key }) {
    const value = await redis.get(`${userId}:${key}`);
    return new UserSetting({ userId, key, value });
  }

  static async upsert({ userId, key, value }) {
    await redis.set(`${userId}:${key}`, value);
    return new UserSetting({ userId, key, value });
  }

  static async remove({ userId, key }) {
    await redis.del(`${userId}:${key}`);
    return new UserSetting({ userId, key, value: null });
  }

  static async getAllKeys({ userId }) {
    const userTemplate = `${userId}:`;
    const keys = await redis.keys(`${userTemplate}*`);
    return keys.map((key) => key.replace(userTemplate, ''));
  }
}
