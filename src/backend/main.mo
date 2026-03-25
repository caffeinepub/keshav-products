import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type CurrencyCents = Nat;

  type ProductId = Nat;

  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : CurrencyCents;
    category : Text;
    isFeatured : Bool;
    isOnSale : Bool;
    rating : Float;
    reviewCount : Nat;
  };

  type CartItem = {
    productId : ProductId;
    quantity : Nat;
  };

  type Cart = {
    id : Nat;
    items : [CartItem];
  };

  var nextCartId = 1;
  var nextProductId = 9;

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  module Cart {
    public func compare(cart1 : Cart, cart2 : Cart) : Order.Order {
      let idOrder = Nat.compare(cart1.id, cart2.id);
      switch (idOrder) {
        case (#equal) { Int.compare(cart1.items.size(), cart2.items.size()) };
        case (order) { order };
      };
    };
  };

  module CartItem {
    public func compare(cartItem1 : CartItem, cartItem2 : CartItem) : Order.Order {
      Int.compare(cartItem1.productId, cartItem2.productId);
    };
  };

  let products = Map.empty<ProductId, Product>();
  let carts = Map.empty<Principal, Cart>();

  public shared ({ caller }) func addProduct(product : Product) : async ProductId {
    let productId = nextProductId;
    nextProductId += 1;
    let newProduct : Product = {
      product with
      id = productId;
      reviewCount = 0;
      rating = 0.0;
    };
    products.add(productId, newProduct);
    productId;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isFeatured });
  };

  public query ({ caller }) func getOnSaleProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isOnSale });
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public shared ({ caller }) func addToCart(productId : ProductId, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be at least 1") };

    if (not products.containsKey(productId)) { Runtime.trap("Product with id " # productId.toText() # " does not exist") };

    let existingCart = switch (carts.get(caller)) {
      case (?cart) { cart };
      case (null) {
        let newCart = { id = nextCartId; items = [] };
        nextCartId += 1;
        newCart;
      };
    };

    switch (carts.get(caller)) {
      case (null) {
        let newCart = {
          id = nextCartId;
          items = [{
            productId;
            quantity;
          }];
        };
        nextCartId += 1;
        carts.add(caller, newCart);
      };
      case (?cart) {
        var found = false;
        for (cartItem in cart.items.values()) {
          if (cartItem.productId == productId) {
            found := true;
          };
        };
        if (found) {
          let newItems = cart.items.map(func(i) { if (i.productId == productId) { { productId = i.productId; quantity = i.quantity + quantity } } else { i } });
          let newCart = {
            id = cart.id;
            items = newItems;
          };
          carts.add(caller, newCart);
        } else {
          let updatedItems = cart.items.concat([{
            productId;
            quantity;
          }]);
          let newCart = {
            id = cart.id;
            items = updatedItems;
          };
          carts.add(caller, newCart);
        };
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : ProductId) : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        let newItems = cart.items.filter(
          func(item) {
            item.productId != productId;
          }
        );
        let newCart = {
          id = cart.id;
          items = newItems;
        };
        carts.add(caller, newCart);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public query ({ caller }) func getCart() : async Cart {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func placeOrder() : async CurrencyCents {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        var total : CurrencyCents = 0;
        for (item in cart.items.values()) {
          let product = switch (products.get(item.productId)) {
            case (null) { Runtime.trap("Product not found") };
            case (?product) { product };
          };
          total += product.price * item.quantity;
        };
        carts.remove(caller);
        total;
      };
    };
  };

  func initialize() {
    let sampleProducts : [Product] = [
      {
        id = 1;
        name = "T-shirt";
        description = "A white T-shirt";
        price = 1000;
        category = "Clothing";
        isFeatured = true;
        isOnSale = false;
        rating = 5.0;
        reviewCount = 10;
      },
      {
        id = 2;
        name = "Jeans";
        description = "A pair of blue jeans";
        price = 2000;
        category = "Clothing";
        isFeatured = false;
        isOnSale = true;
        rating = 4.5;
        reviewCount = 8;
      },
      {
        id = 3;
        name = "Socks";
        description = "A pair of black socks";
        price = 500;
        category = "Clothing";
        isFeatured = false;
        isOnSale = false;
        rating = 3.5;
        reviewCount = 1;
      },
      {
        id = 4;
        name = "Sneakers";
        description = "A pair of white sneakers";
        price = 4000;
        category = "Clothing";
        isFeatured = true;
        isOnSale = true;
        rating = 4.9;
        reviewCount = 3;
      },
      {
        id = 5;
        name = "Gold necklace";
        description = "A gold necklace";
        price = 6000;
        category = "Jewelry";
        isFeatured = false;
        isOnSale = false;
        rating = 5.0;
        reviewCount = 6;
      },
      {
        id = 6;
        name = "Ring";
        description = "A gold ring";
        price = 3000;
        category = "Jewelry";
        isFeatured = true;
        isOnSale = false;
        rating = 4.8;
        reviewCount = 25;
      },
      {
        id = 7;
        name = "Silver necklace";
        description = "A silver necklace";
        price = 2000;
        category = "Jewelry";
        isFeatured = false;
        isOnSale = false;
        rating = 4.1;
        reviewCount = 15;
      },
      {
        id = 8;
        name = "Ruby earrings";
        description = "A pair of gold earrings with rubies";
        price = 10000;
        category = "Jewelry";
        isFeatured = true;
        isOnSale = true;
        rating = 5.0;
        reviewCount = 3;
      },
    ];
    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };
  };
  initialize();
};
