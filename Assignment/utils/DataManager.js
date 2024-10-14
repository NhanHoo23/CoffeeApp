class DataManager {
  constructor() {
    if (!DataManager.instance) {
      this.users = [];
      this.categories = []
      DataManager.instance = this;
    }
    return DataManager.instance;
  }

  static shared = new DataManager();

  // Getters and Setters User
  setUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }

  pushUser(user) {
    this.users.push(user);
  }

  updateUser(user) {
    const index = this.users.findIndex(u => u._id === user._id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(user) {  
    this.users = this.users.filter(u => u._id !== user._id);
  }


  //Categories
  getCategories() {
    return this.categories
  }

  setCategories(categories) {
    this.categories = categories
  }


}


export default DataManager;