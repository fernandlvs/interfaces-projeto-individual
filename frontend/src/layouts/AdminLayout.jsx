import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}