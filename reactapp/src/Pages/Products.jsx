import ProductGrid from "/src/Components/ProductGrid"
import FilterList from "/src/Components/FilterList"
import "./Products.css"
import React, { Component } from 'react'

const fillArr = [
  {title: "Mức giá", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"]},
  {title: "Thương hiệu", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"]},
  {title: "Size giày", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"]},
  {title: "Size quần áo", details: ["Dưới 500.000đ", "Từ 500.000đ - 1.000.000đ", "Trên 1.000.000đ"]}
]

export default class Products extends Component {
  static displayName = Products.name;

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true }
  }

  componentDidMount() { this.populateProductData() }

  static renderProductPage(products) {
    return (
      <>
        <div className="my-4">
          <FilterList filters={fillArr} />

          <div className="d-flex order-tab justify-content-flex-end mt-3">
            <div>
              <label htmlFor="sort">Số sản phẩm:&nbsp;</label>
              <select name="" id="numPerPage" defaultValue="9">
                <option value="9">9</option>
                <option value="18">18</option>
                <option value="27">27</option>
                <option value="36">36</option>
                <option value="Tất cả">Tất cả</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort">Sắp xếp:&nbsp;</label>
              <select name="" id="sort" defaultValue="Mặc định">
                <option value="Mặc định">Mặc định</option>
                <option value="Từ A-Z">Từ A-Z</option>
                <option value="Từ Z-A">Từ Z-A</option>
                <option value="Giá thấp đến cao">Giá thấp đến cao</option>
                <option value="Giá cao đến thấp">Giá cao đến thấp</option>
              </select>
            </div>

            <div>
              <input type="checkbox" name="" id="only-available" /> Chỉ xem các sản phẩm có hàng
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          { products.map(p => <ProductGrid key={p.product.urlName} urlName={p.product.urlName} image={`/src/img/${p.image.substring(0, p.image.indexOf(",") > -1 ? p.image.indexOf(",") : p.image.length)}`} name={p.product.name} price={p.price} />) }
        </div>

        <div id="page" className="d-flex justify-content-center mt-2">
          <button className="btn btn-danger mx-1">1</button>
          <button className="btn btn-outline-danger mx-1">2</button>
          <button className="btn btn-outline-danger mx-1">3</button>
          <button className="btn btn-outline-danger mx-1">...</button>
          <button className="btn btn-outline-danger mx-1">20</button>
        </div>
      </>
    )
  }

  render() {
    const content = this.state.loading ? <p>Please wait...</p> : Products.renderProductPage(this.state.products);
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">TẤT CẢ SẢN PHẨM</h1>
        <hr />

        {content}
      </main>
    )
  }

  async populateProductData() {
    fetch("/productdetail/All").then(response => response.json()).then(data => {
      this.setState({ products: data, loading: false });
    });
  }
}