const KEY = "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";

const agents = [
  {
    name: "🔬 Phân tích",
    sys: "Phân tích logic, ngắn gọn 4 câu"
  },
  {
    name: "⚠️ Phản biện",
    sys: "Chỉ ra rủi ro, phản biện mạnh"
  },
  {
    name: "💡 Sáng tạo",
    sys: "Đưa ý tưởng mới"
  }
];

async function ask(sys, topic) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: topic }
      ]
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}

async function go() {
  const topic = document.getElementById("topic").value;
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  for (let a of agents) {
    const res = await ask(a.sys, topic);

    const div = document.createElement("div");
    div.className = "msg";
    div.innerHTML = `<b>${a.name}</b><br>${res}`;

    feed.appendChild(div);
  }
}
