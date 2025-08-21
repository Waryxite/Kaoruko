// index.js (ส่วนบนสุดก่อนสร้าง Client)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const responses = require('./responses');

// ---------- Keep-Alive / Health ----------
const app = express();
app.disable('x-powered-by');

// ตอบ 200 เร็ว ๆ สำหรับทั้ง GET และ HEAD (UptimeRobot บางทีส่ง HEAD)
app.get('/', (req, res) => res.status(200).send('OK'));
app.head('/', (req, res) => res.status(200).end());

// เผื่ออยากแยก health endpoint ชัด ๆ
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 3000; // Render จะใส่ PORT มาให้เอง
app.listen(PORT, () => console.log(`Keep-alive server on :${PORT}`));

// สร้าง Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();

// โหลดคำสั่งจาก commands/basic
const commandsPath = path.join(__dirname, 'commands/basic');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
        }
    }
}

// โหลด Event จาก events
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client, responses));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, responses));
        }
    }
}

// ล็อกอิน
client.login(process.env.TOKEN)
    .then(() => console.log("กำลังเชื่อมต่อกับ Discord... 🌸"))
    .catch(err => console.error("❌ ไม่สามารถเชื่อมต่อ Discord ได้ กรุณาตรวจสอบ TOKEN ในไฟล์ .env\n", err));

