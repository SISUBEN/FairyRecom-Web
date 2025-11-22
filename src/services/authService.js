// 从环境变量获取 API 地址，如果没有设置则默认回退到 localhost
const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function login(username, password) {
  const payload = { username: username, password: btoa(password) };

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // 尝试解析后端返回的错误信息
      const errorData = await response.json().catch(() => ({}));
      console.error(errorData.detail)
      throw new Error(errorData.detail || "连接被拒绝 / Connection Refused");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("fs-auth-token");
}

export async function register(username, password, email) {
  const payload = { 
    username, 
    password: btoa(password),
    email 
  };

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "注册失败 / Registration Failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}
