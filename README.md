
🎧 Moodtify

Moodtify é um gerador de playlists personalizadas com inteligência artificial, integrado à API do Spotify. A partir de uma simples descrição de humor, o app cria automaticamente uma seleção musical feita sob medida para o momento e adiciona diretamente na conta do usuário.

---

🚀 Funcionalidades

- 🧠 Geração de playlists com base em descrições como “chuvoso e introspectivo” ou “energia pra treino”
- 🎧 Integração com o Spotify via OAuth 2.0
- 🤖 Uso da OpenAI (GPT-3.5) para interpretar o mood e sugerir estilos musicais
- 📜 Histórico local das playlists criadas (em breve: salvamento em banco)
- 🎨 UI responsiva e moderna com Tailwind CSS + shadcn/ui

---

🛠️ Tecnologias Utilizadas

- Next.js (App Router)
- Spotify Web API
- Auth.js
- OpenAI API
- Tailwind CSS + shadcn/ui
- Zustand
- Vercel para deploy

---

🧪 Como rodar localmente

git clone https://github.com/guilhermealmeidaa/moodtify.git
cd moodtify
npm install

# Crie um .env.local com as chaves de API do Spotify e OpenAI
npm run dev

---

📄 Licença

Este projeto está licenciado sob a MIT License.

---

✨ Inspiração

Moodtify nasceu da ideia de unir música, contexto emocional e tecnologia — transformando qualquer sentimento em som. 🎶
