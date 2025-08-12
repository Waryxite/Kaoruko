// events/ready.js
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`ออนไลน์แล้วค่ะ 💐 ล็อกอินเป็น ${client.user.tag}`);

        // รายการประโยคพูดน่ารัก ๆ
        const activities = [
            { name: 'อยากกินเค้กจัง 🍰', type: ActivityType.Playing },
            { name: 'ง่วงแล้วล่ะ 💤', type: ActivityType.Playing },
            { name: 'วันนี้อากาศดีจัง 🌤️', type: ActivityType.Playing },
            { name: 'อยากออกไปเดินเล่น 🏞️', type: ActivityType.Playing },
            { name: 'ชงชาให้คุณอยู่ ☕', type: ActivityType.Playing },
            { name: 'ฟังเพลงเพลิน ๆ 🎶', type: ActivityType.Playing },
            { name: 'อยากกอดคุณจัง 🤗', type: ActivityType.Playing },
            { name: 'ขอขนมหน่อยน้า 🍪', type: ActivityType.Playing },
            { name: 'หัวใจเต้นแรงเพราะคุณ 💓', type: ActivityType.Playing },
            { name: 'อยากไปเที่ยวทะเล 🏖️', type: ActivityType.Playing },
            { name: 'รอคุณทักอยู่นะ 💌', type: ActivityType.Playing },
            { name: 'เขียนไดอารี่วันนี้ 📖', type: ActivityType.Playing },
            { name: 'อยากดูหนังด้วยกัน 🎬', type: ActivityType.Playing },
            { name: 'เก็บดอกไม้มาให้คุณ 🌸', type: ActivityType.Playing },
            { name: 'วันนี้สดใสเพราะคุณ ☀️', type: ActivityType.Playing },
            { name: 'อยากลองทำคุกกี้ 🍪', type: ActivityType.Playing },
            { name: 'กำลังคิดถึงคุณ 💭', type: ActivityType.Playing },
            { name: 'อยากฟังเสียงคุณจัง 📞', type: ActivityType.Playing },
            { name: 'กำลังฝันกลางวัน 🌙', type: ActivityType.Playing },
            { name: 'อยากนั่งดูพระอาทิตย์ตก 🌇', type: ActivityType.Playing }
        ];

        let index = 0;

        const updateStatus = () => {
            client.user.setPresence({
                activities: [activities[index]],
                status: 'online'
            });

            index = (index + 1) % activities.length;
        };

        updateStatus();
        setInterval(updateStatus, 15000); // เปลี่ยนทุก 15 วิ
    }
};
