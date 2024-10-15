class DataManager {
  constructor() {
    if (!DataManager.instance) {
      this.users = [];
      this.categories = []
      this.cartItems = []
      this.favoriteItems = [] 
      this.currentUser = null
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

  // Current User
  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }


  //Categories
  getCategories() {
    return this.categories
  }

  setCategories(categories) {
    this.categories = categories //[{"id": "<userID>", "items": [[Object]]}]
  }

  //Cart
  getCartItems() {
    return this.cartItems
  }

  pushCartItem(item) {
    this.cartItems.push(item)
  }

  setCartItems(items) {
    this.cartItems = items
  }

  //Favorite
  getFavoriteItems() {
    return this.favoriteItems
  }

  pushFavoriteItem(item) {
    this.favoriteItems.push(item)
  }

  setFavoriteItems(items) {
    this.favoriteItems = items
  }


}


export default DataManager;