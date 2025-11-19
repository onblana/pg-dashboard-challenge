import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section>
      <h1 className="mb-10">페이지를 찾을 수 없습니다.</h1>
      <p className="mb-10">주소를 다시 확인하거나 홈 화면으로 이동하세요.</p>
      <button onClick={() => navigate("/")} className="bg-indigo-100">홈 화면으로 가기</button>
    </section>
  )
}

export default NotFound