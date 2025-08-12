// clear-commands.js
require('dotenv').config();
const { REST, Routes } = require('discord.js');

(async () => {
  try {
    const token = process.env.TOKEN;
    const appId = process.env.APP_ID;
    const guildId = process.env.GUILD_ID; // ไม่ใส่ = เคลียร์เฉพาะ global

    if (!token || !appId) {
      console.error('กรุณาใส่ TOKEN และ APP_ID ใน .env ให้ครบค่ะ');
      process.exit(1);
    }

    const rest = new REST({ version: '10' }).setToken(token);

    if (guildId) {
      // ล้างคำสั่งแบบ Guild (เฉพาะเซิร์ฟเวอร์นี้)
      await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: [] });
      console.log(`✅ ล้างคำสั่งสแลชทั้งหมดของกิลด์ ${guildId} แล้วค่ะ`);
    } else {
      // ล้างคำสั่ง Global (ทั้งแอป)
      await rest.put(Routes.applicationCommands(appId), { body: [] });
      console.log('✅ ล้างคำสั่งสแลชแบบ Global ทั้งหมดแล้วค่ะ');
    }
  } catch (err) {
    console.error('❌ เคลียร์คำสั่งไม่สำเร็จ:', err);
  }
})();
