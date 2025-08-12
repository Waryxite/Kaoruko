module.exports = {
    name: 'messageCreate',
    execute(message, client, responses) {
        if (!responses) return;
        if (message.author.bot) return;

        const text = message.content.toLowerCase().trim();

        // ตรวจว่าแท็กบอทหรือไม่
        if (message.mentions.has(client.user)) {
            const content = text;

            // ขอความช่วยเหลือ
            if (/ช่วยด้วย|ช่วยหน่อย|ช่วยที|ช่วยหนูด้วย/.test(content)) {
                const reply = responses.helpReplies[Math.floor(Math.random() * responses.helpReplies.length)];
                return message.reply(reply);
            }

            // คำถาม
            if (content.endsWith('?') || /ไหม|หรือเปล่า|หรอ|ใช่หรือไม่|ใช่ไหม/.test(content)) {
                const reply = responses.questionReplies[Math.floor(Math.random() * responses.questionReplies.length)];
                return message.reply(reply);
            }

            // คำชม
            if (/น่ารัก|เก่งจัง|สุดยอด|ดีมาก|สวยจัง|น่ารักจัง/.test(content)) {
                const reply = responses.complimentReplies[Math.floor(Math.random() * responses.complimentReplies.length)];
                return message.reply(reply);
            }

            // ล้อเล่น/ด่า
            if (/บ้า|โง่|แย่|กวน|น่ารำคาญ|ห่วย/.test(content)) {
                const reply = responses.teaseReplies[Math.floor(Math.random() * responses.teaseReplies.length)];
                return message.reply(reply);
            }

            // เศร้า/เสียใจ
            if (/เศร้า|เสียใจ|ร้องไห้|เหงา|ท้อ|หมดกำลังใจ/.test(content)) {
                const reply = responses.sadReplies[Math.floor(Math.random() * responses.sadReplies.length)];
                return message.reply(reply);
            }

            // ดีใจ/ตื่นเต้น
            if (/ดีใจ|เยี่ยม|สุดยอด|ดีมาก|ตื่นเต้น|ว้าว/.test(content)) {
                const reply = responses.happyReplies[Math.floor(Math.random() * responses.happyReplies.length)];
                return message.reply(reply);
            }

            // คุยเล่นทั่วไป
            if (/ทำอะไรอยู่|อยู่ไหน|ว่างไหม|คุยกันไหม|เหงาไหม/.test(content)) {
                const reply = responses.randomChitChatReplies[Math.floor(Math.random() * responses.randomChitChatReplies.length)];
                return message.reply(reply);
            }

            // ถ้าไม่เข้าเงื่อนไขไหนเลย → ถือว่าเป็นบอกเล่า
            const reply = responses.statementReplies[Math.floor(Math.random() * responses.statementReplies.length)];
            return message.reply(reply);
        }

        // โต้ตอบทักทายโดยไม่ต้องแท็ก
        if (text.includes('สวัสดี') || text.includes('hello') || text.includes('hi')) {
            const reply = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
            return message.reply(reply);
        }

        // โต้ตอบปลอบใจแม้ไม่ได้แท็ก
        if (/เศร้า|เสียใจ|ร้องไห้|เหงา|ท้อ|หมดกำลังใจ/.test(text)) {
            const reply = responses.sadReplies[Math.floor(Math.random() * responses.sadReplies.length)];
            return message.reply(reply);
        }
    }
};
