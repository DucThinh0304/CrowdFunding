import "./newCampaign.css";

export default function NewCampaign() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm dự án mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Hình ảnh</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Người tạo dự án</label>
          <input type="text" placeholder="Nguyễn Văn A" />
        </div>
        <div className="addProductItem">
          <label>Tên dự án</label>
          <input type="text" placeholder="Sách ABC" />
        </div>
        <div className="addProductItem">
          <label>Tag</label>
          <input type="text" placeholder="Nổi bật, sách" />
        </div>
        <div className="addProductItem">
          <label>Số tiền gọi ủng hộ</label>
          <input type="text" placeholder="500.000.000 đ" />
        </div>
        <div className="addProductItem">
          <label>Ngày kết thúc</label>
          <input type="date" />
        </div>

        <div className="addProductItem">
          <label>Mức ủng hộ</label>
          <input type="text" placeholder="50000, 100000, 200000" />
        </div>
        <div className="addProductItem">
          <label>Chi tiết dự án</label>
          <textarea
            type="text"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Có</option>
            <option value="no">Không</option>
          </select>
        </div>
        <button className="addProductButton">Tạo dự án mới</button>
      </form>
    </div>
  );
}
