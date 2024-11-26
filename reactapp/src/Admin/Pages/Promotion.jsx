import { DisplayDate, ParseDateTime } from "/src/Scripts/Utility"
import React, { Component } from "react"
import PleaseWait from "/src/Shared/PleaseWait"

export default class APromotion extends Component {
  static displayName = APromotion.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, promotion: [], pId: "", pTitle: "", pDateStart: new Date().toLocaleDateString('en-CA'), pDateEnd: new Date().toLocaleDateString('en-CA') }
  }

  componentDidMount() {
    this.populatePromotionDetail()
  }

  renderTable(promotions) {
    return (
      <>
        {
          promotions.map(p => 
            <tr key={p.id}>
              <td className="align-middle">{p.id}</td>
              <td className="align-middle">{p.title}</td>
              <td className="align-middle">{DisplayDate(p.dateStart)}</td>
              <td className="align-middle">{DisplayDate(p.dateEnd)}</td>
              <td className="align-middle">                
                <a href={`/admin/chuong-trinh-giam-gia/${p.id}`}>
                  <i className="bi bi-eye"></i>
                </a>
                <i className="bi bi-gear" onClick={() => this.setState({ pId: p.id, pTitle: p.title, pDateStart: DisplayDate(p.dateStart), pDateEnd: DisplayDate(p.dateEnd) }, () => console.log(this.state))}></i>
                <i className={`bi bi-${p.isActive ? "lock" : "unlock"}`} onClick={() => deletePromotion(p.id, p.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  render() {
    return this.state.loading ? <PleaseWait /> : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">CHƯƠNG TRÌNH GIẢM GIÁ</h1>
        <hr />

        <div className="row">
          <div className="col-3">            
            <input type="text" value={this.state.pId} className="form-control" readOnly placeholder="Mã chương trình" />
            <input type="text" onChange={(e) => this.setState({pTitle: e.target.value})} value={this.state.pTitle} className="form-control mt-3" placeholder="Tên chương trình" />
            <input type="date" className="form-control mt-3" onChange={e => this.setState({ pDateStart: e.target.value })} value={this.state.pDateStart} />
            <input type="date" className="form-control mt-3" onChange={e => this.setState({ pDateEnd: e.target.value })} value={this.state.pDateEnd} />
            <input type="submit" value="Lưu" onClick={e => this.saveNewPromotion(e)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelPromotion()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <div className="d-flex">
              <input type="search" className="form-control" placeholder="Nhập tên chương trình giảm giá cần tìm..." />
              <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
            </div>            

            <table className="table table-striped table-hover pointer table-bordered mt-3">
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Tiêu đề</th>
                  <th className="text-center">Ngày bắt đầu</th>
                  <th className="text-center">Ngày kết thúc</th>
                  <th className="w-120px"></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.promotion)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

  async saveNewPromotion(e) {
    e.preventDefault();
    this.state.pId === "" ? this.addPromotion() : this.updatePromotion();
  }

  async addPromotion() {
    if (confirm("Bạn có muốn thêm chương trình khuyến mãi này?")) {
      console.log(this.state);

      const response = await fetch("/api/promotion/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.pTitle,
          dateStart: this.state.pDateStart,
          dateEnd: this.state.pDateEnd
        })
      })

      if (response.ok) { alert("Thêm chương trình khuyến mãi thành công"); location.reload(); }
      else alert("Đã có lỗi xảy ra, thêm chương trình khuyến mãi thất bại");
    }
  }

  async updatePromotion() {
    if (confirm("Bạn có muốn cập nhật chương trình khuyến mãi này?")) {
      const response = await fetch("/api/promotion/update", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.pId,
          title: this.state.pTitle,
          dateStart: this.state.pDateStart,
          dateEnd: this.state.pDateEnd
        })
      })

      if (response.ok) { alert("Cập nhật chương trình khuyến mãi thành công"); location.reload(); }
      else alert("Đã có lỗi xảy ra, cập nhật chương trình khuyến mãi thất bại");
    }
  }

  async populatePromotionDetail() {    
    fetch("/api/promotion/get").then(response => response.json()).then(data => this.setState({loading: false, promotion: data}));
  }
}

async function deletePromotion(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} chương trình giảm giá này?`)) {
    const url = isActive ? `/api/promotion/lock?id=${id}` : `/api/promotion/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Chương trình khuyến mãi đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Chương trình khuyến mãi đã ${action} thất bại.`)
  }
}