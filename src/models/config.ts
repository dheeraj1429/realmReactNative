import Realm from 'realm';
import Todo from './Todo';

export const realmConfig = {
  schema: [Todo],
  schemaVersion: 1,
};

class RealmDb {
  private static instance: Realm;

  constructor() {}

  static async getInstance(): Promise<Realm> {
    if (!RealmDb.instance) {
      RealmDb.instance = await Realm.open(realmConfig);
    }
    return this.instance;
  }

  static async addTodo(title: string, description?: string): Promise<void> {
    const instance = await RealmDb.getInstance();
    instance.write(() => {
      instance.create<Todo>('Todo', {
        _id: new Realm.BSON.ObjectID(),
        title,
        description,
        isCompleted: false,
      });
    });
  }

  static async toggleTodoCompleted(_id: Realm.BSON.ObjectID) {
    const instance = await RealmDb.getInstance();
    instance.write(() => {
      const todo = instance.objectForPrimaryKey<Todo>('Todo', _id);
      console.log(todo);
    });
  }

  static async getTodoList<T>() {
    const instance = await RealmDb.getInstance();
    return instance.objects<T>('Todo');
  }

  static close() {
    if (RealmDb.instance) {
      RealmDb.instance.close();
    }
  }
}

export default RealmDb;
