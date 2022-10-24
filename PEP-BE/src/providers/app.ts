import Database from './database';
import Express from './server';

class App {
  public loadDatabase(): void {
    Database.init();
  }
  // Load your Server
  public loadServer(): void {
    Express.init();
  }
}

export default new App();
