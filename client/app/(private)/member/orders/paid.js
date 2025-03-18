export default function Paid({ data }) {
  const renderHtml = () => {
    if (!data || !Array.isArray(data)) {
      console.log("數據無效或為空");
      return <p>No data available</p>;
    }

    // 遍歷數據，並添加條件渲染
    return data.map(
      (item) =>
        item.status === "Paid" && (
          <div
            className="flex items-center justify-between py-3"
            key={item._id}
          >
            {/* 顯示課程類型 */}
            <div className="text-sm font-medium text-gray-600">
              {item.classData.code} -
              <span className="text-sm text-gray-800">
                {" "}
                {item.classData.style}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* 顯示課程價格 */}
              <span className="text-sm text-gray-800">HK${item.price}</span>

              {/* 刪除按鈕 */}
              <button
                variant="secondary"
                size="sm"
                className="h-8 rounded-full bg-gray-500 px-4 text-xs font-medium text-white hover:bg-gray-600 flex items-center justify-center"
                onClick={() => handleDelete(item._id)} // 對應刪除邏輯
              >
                <span className="material-icons">delete</span>
              </button>
            </div>
          </div>
        )
    );
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Pending Payment
      </h2>
      <div className="border-t border-gray-200 pt-4">{renderHtml()}</div>
    </div>
  );
}
