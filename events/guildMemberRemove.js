// events/guildMemberRemove.js
module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        const channel = member.guild.systemChannel;
        if (channel) {
            channel.send(`ลาก่อนนะคะ ${member.user.username} 🌸 ขอให้โชคดีค่ะ 💐`);
        }
    }
};
