import { promisify } from 'util';
import redis from 'redis';

const METHODS = ['get', 'set', 'del', 'keys'];

export default class RedisService {
  #client = null;

  constructor() {
    this.#client = redis.createClient(process.env.REDIS_URL);
    this.#client.on('error', (error) => {
      console.error(error.message);
    });
    /* Промисифицируем нужные нам методы, используя нативный util */
    METHODS.forEach((method) => {
      this[`${method}Async`] = promisify(this.#client[method]).bind(this.#client);
    });
  }

  get(query) {
    return this.getAsync(query);
  }

  del(query) {
    return this.delAsync(query);
  }

  set(query, data, expiresIn) {
    const params = [query, data];
    if (expiresIn) {
      params.push('EX', expiresIn);
    }
    return this.setAsync(...params);
  }

  keys(query) {
    return this.keysAsync(query);
  }
}
