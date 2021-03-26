function Category(id = null, name, desc, productRefs) {
  this._id = id;
  this.category_name = name;
  this.category_description = desc;
  this.category_products = productRefs;
}
module.exports = Category;
