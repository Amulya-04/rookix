import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CategoryRow from "../../components/CategoryRow/CategoryRow";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("name") || "User";


  const filmsData = [
    { id: 1, title: "The Last Bell", category: "Drama", views: 1200 },
    { id: 2, title: "Campus Dreams", category: "College", views: 900 },
    { id: 3, title: "Silent Voice", category: "Drama", views: 1500 },
    { id: 4, title: "Beyond Frames", category: "Documentary", views: 700 },
  ];

  return (
    <div
      style={{
        background:  "#131415",
        color:  "#020617",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <Navbar
        userName={userName}
      />

      <div style={{ paddingTop: "80px", padding: "20px 40px" }}>
        <CategoryRow
          title="🎥 All Films"
          films={filmsData}
          titleColor="#46ddd6"
        />
      </div>

      <Footer />
    </div>
  );
}
