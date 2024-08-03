import Realm from 'realm';

class Todo extends Realm.Object<Todo> {
  _id!: Realm.BSON.ObjectID;
  title!: string;
  isCompleted!: boolean;
  description?: string;

  static schema = {
    name: 'Todo',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      isCompleted: 'bool',
      description: 'string?',
    },
  };
}

export default Todo;
