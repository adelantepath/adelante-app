export default function Home() {
  return (
    <div style={{
      fontFamily: "Inter, sans-serif",
      padding: "40px",
      maxWidth: "1100px",
      margin: "0 auto"
    }}>
      
      {/* Header */}
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        Adelante
      </h1>
      <p style={{ color: "#555", marginBottom: "40px" }}>
        Learn real life before it hits you.
      </p>

      {/* Section Title */}
      <h2 style={{ marginBottom: "20px" }}>
        What do you want to learn?
      </h2>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        
        {[
          { title: "Money", emoji: "💰", desc: "Banking, credit, saving" },
          { title: "Living", emoji: "🏠", desc: "Rent, housing, bills" },
          { title: "Transportation", emoji: "🚗", desc: "License, cars, tickets" },
          { title: "Real Life Systems", emoji: "📄", desc: "Taxes, IRS, documents" },
          { title: "Next Steps", emoji: "🎓", desc: "College, jobs, trade school" }
        ].map((item, index) => (
          <div key={index} style={{
            padding: "20px",
            borderRadius: "16px",
            background: "#f7f7f7",
            cursor: "pointer",
            transition: "0.2s",
            border: "1px solid #eee"
          }}>
            <div style={{ fontSize: "28px" }}>{item.emoji}</div>
            <h3 style={{ margin: "10px 0 5px" }}>{item.title}</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              {item.desc}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}
