import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import UserSetting from './models/UserSetting';

const UserSettingType = UserSetting.buildType();

/* Запросы на получение данных */
const QueryRootType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    setting: {
      type: UserSettingType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => UserSetting.findOne(args),
    },

    keys: {
      type: new GraphQLList(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return UserSetting.getAllKeys(args);
      },
    },
  }),
});

/* Изменение данных */
const MutationRootType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    upsert: {
      type: UserSettingType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return UserSetting.upsert(args);
      },
    },

    remove: {
      type: UserSettingType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return UserSetting.remove(args);
      },
    },
  }),
});

const AppSchema = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType,
});

export default AppSchema;
