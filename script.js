const KEY = "11/30 610
sk-or-v1-e2b1025d4c74b8aed50ad72e652a6ab3";

const agents = [
  {
    name: "🔬 Phân tích",
    sys: "Bạn là nhà phân tích. Trả lời logic, rõ ràng, 4-6 câu."
  },
  {
    name: "⚠️ Phản biện",
    sys: "Bạn là người phản biện. Chỉ ra rủi ro, mặt trái, hạn chế."
  },
  {
    name: "💡 Sáng tạo",
    sys: "Bạn là người sáng tạo. Đưa ra ý tưởng mới, giải pháp khác biệt."
  }
];

// ========================
// UI helper
// ========================
function addMessage(title, content) {
  const feed = document.getElementById("feed");

  const div = document.createElement("div");
  div.className = "msg";

  div.innerHTML = `
    <b>${title}</b><br/>
    <div>${content}</div>
  `;

  feed.appendChild(div);
}

// ========================
// CALL OPENROUTER (IMPORTANT)
// ========================
async function askAI(system, user) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    });

    const text = await res.text();

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);

    if (!res.ok) {
      return "❌ API lỗi: " + text;
    }

    const data = JSON.parse(text);

    return data.choices?.[0]?.message?.content || "❌ Không có dữ liệu";

  } catch (err) {
    console.log("ERROR:", err);
    return "❌ Lỗi hệ thống: " + err.message;
  }
}
          
  

// ========================
// MAIN FUNCTION
// ========================
async function go() {
  const topic = document.getElementById("topic").value;

  if (!topic) {
    alert("Nhập chủ đề trước!");
    return;
  }

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  addMessage("📌 Chủ đề", topic);

  for (let agent of agents) {
    addMessage(agent.name, "⏳ Đang xử lý...");

    const response = await askAI(agent.sys, topic);

    addMessage(agent.name, response);
  }
}
