if (process.env.DB_CONNECT === "postgre") {
 class BookModel {
  constructor(title, price, description) {
   this.title = title;
   this.price = price ? price : 0;
   this.description = description ? description : null;
  }

  GetDataFormat() {
   return {
    title: {
     type: "String",
     required: true
    },
    price: {
     type: "Number"
    },
    description: {
     type: "String",
    },
   };
  }
 }

 module.exports = BookModel;
}
