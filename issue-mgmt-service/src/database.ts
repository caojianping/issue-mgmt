/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from 'config';
import { Console } from './logger';

class Database {
  public static connect() {
    (<any>mongoose).Promise = bluebird;
    const uri = config.get<string>('services.mongodb');
    console.log('uri:', uri);
    return mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => Console.info('Connected to MongoDB!'))
      .catch((err) => Console.info(`MongoDB connection error: ${err}`));
  }
}

export default Database;
