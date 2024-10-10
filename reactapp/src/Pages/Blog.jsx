import BlogBlock from "/src/Components/BlogBlock";
import sampleThumbnail from "/src/img/sample_thumbnail.jpg"

export default function Blog() {
  const desc = "Bóng chuyền là một môn thể thao đồng đội đầy hứng khởi, nhưng cũng như các môn thể thao khác, tai nạn là điều không tránh khỏi. Đây là 5 tip để giảm thiểu tai nạn khi chơi bóng chuyền.";
  return (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">TIN TỨC</h1>
      <hr />

      <BlogBlock img={sampleThumbnail} title="Một số tips chơi bóng chuyền" smallDesc={desc} author="Tuấn Sang" date="26/09/2024" />
      <BlogBlock img={sampleThumbnail} title="Một số tips chơi bóng chuyền" smallDesc={desc} author="Tuấn Sang" date="26/09/2024" />
      <BlogBlock img={sampleThumbnail} title="Một số tips chơi bóng chuyền" smallDesc={desc} author="Tuấn Sang" date="26/09/2024" />
      <BlogBlock img={sampleThumbnail} title="Một số tips chơi bóng chuyền" smallDesc={desc} author="Tuấn Sang" date="26/09/2024" />
    </main>
  )
}