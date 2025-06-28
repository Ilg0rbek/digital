const TelegramBot = require('node-telegram-bot-api');
const ProjectUpload = require('../models/upload.project.model');
const config = require("config")

// Initialize bot with better error handling
let bot;
try {
    bot = new TelegramBot(config.get("BOT_TOKEN"), { 
        polling: {
            timeout: 10,
            limit: 100,
            retryTimeout: 5000
        }
    });
} catch (error) {
    console.error('❌ Failed to initialize Telegram bot:', error.message);
    // Create a dummy bot object to prevent crashes
    bot = {
        sendMessage: () => Promise.resolve({ message_id: Date.now() }),
        sendDocument: () => Promise.resolve(),
        sendPhoto: () => Promise.resolve(),
        on: () => {},
        getMe: () => Promise.reject(new Error('Bot not initialized'))
    };
}

// ===== CONFIGURATION =====
// Choose one of these methods:

// Method 1: Send to channel (recommended)
// Get channel ID by forwarding a message from your channel to @userinfobot
const TELEGRAM_CHANNEL_ID = '-1002699669111'; // Replace with your channel ID (negative number)

// Method 2: Send to your personal chat
// const TELEGRAM_CHAT_ID = '123456789'; // Replace with your chat ID from @userinfobot

// ===== END CONFIGURATION =====

// Store pending approvals
const pendingApprovals = new Map();

// Send project approval request to admin
const sendProjectApprovalRequest = async (projectUpload) => {
    try {
        // Always populate submittedBy
        let populated = await ProjectUpload.findById(projectUpload._id)
            .populate('submittedBy', 'firstName lastName email');
        if (populated) projectUpload = populated;
        console.log('🔄 Sending Telegram notification for project:', projectUpload._id);
        
        // Build file links
        let fileLinks = '';
        if (projectUpload.projectFiles.length > 0) {
            fileLinks = '\n📁 *Loyiha fayllari:*\n';
            projectUpload.projectFiles.forEach((file, index) => {
                const fileName = file.split('/').pop(); // Get full filename from path
                const fileUrl = `${config.get('BASE_URI')}/${file}`;
                fileLinks += `${index + 1}. [${fileName}](${fileUrl})\n`;
            });
        }

        // Build image links
        let imageLinks = '';
        if (projectUpload.images.length > 0) {
            imageLinks = '\n🖼️ *Loyiha rasmlari:*\n';
            projectUpload.images.forEach((image, index) => {
                const imageName = image.split('/').pop(); // Get full filename from path
                const imageUrl = `${config.get('BASE_URI')}/${image}`;
                imageLinks += `${index + 1}. [${imageName}](${imageUrl})\n`;
            });
        }
        
        // Sender info
        let sender = 'Noma\'lum';
        if (projectUpload.submittedBy) {
            if (projectUpload.submittedBy.firstName || projectUpload.submittedBy.lastName) {
                sender = `${projectUpload.submittedBy.firstName || ''} ${projectUpload.submittedBy.lastName || ''}`.trim();
            } else if (projectUpload.submittedBy.email) {
                sender = projectUpload.submittedBy.email;
            }
        }

        const message = `
🆕 Yangi loyiha yuklandi!

📝 *Loyiha nomi:* ${projectUpload.projectName}
📄 *Tavsif:* ${projectUpload.description}
👤 *Yuboruvchi:* ${sender}
📨 *Email:* ${projectUpload.submittedBy.email}
📅 *Sana:* ${new Date(projectUpload.submittedAt).toLocaleString('uz-UZ')}

${projectUpload.images.length > 0 ? `🖼️ Rasmlar soni: ${projectUpload.images.length} ta` : ''}
${projectUpload.projectFiles.length > 0 ? `📁 Fayllar soni: ${projectUpload.projectFiles.length} ta` : ''}

${fileLinks}
${imageLinks}

Loyihani tasdiqlash yoki rad etish uchun quyidagi tugmalardan birini bosing:
        `;

        const inlineKeyboard = {
            inline_keyboard: [
                [
                    { text: '✅ Tasdiqlash', callback_data: `approve_${projectUpload._id}` },
                    { text: '❌ Rad etish', callback_data: `reject_${projectUpload._id}` }
                ]
            ]
        };

        let result;

        // Try to send to configured destination
        if (TELEGRAM_CHANNEL_ID) {
            try {
                result = await bot.sendMessage(TELEGRAM_CHANNEL_ID, message, {
                    reply_markup: inlineKeyboard,
                    parse_mode: 'Markdown',
                    disable_web_page_preview: true
                });
                console.log('✅ Message sent to channel successfully');

                // Send project files as documents
                for (const file of projectUpload.projectFiles) {
                    const fileUrl = `${config.get('BASE_URI')}/${file}`;
                    try {
                        await bot.sendDocument(TELEGRAM_CHANNEL_ID, fileUrl, {
                            caption: 'Loyiha fayli',
                        });
                    } catch (err) {
                        console.error('❌ Failed to send document:', fileUrl, err.message);
                    }
                }

                // Send images as photos
                for (const image of projectUpload.images) {
                    const imageUrl = `${config.get('BASE_URI')}/${image}`;
                    try {
                        await bot.sendPhoto(TELEGRAM_CHANNEL_ID, imageUrl, {
                            caption: 'Loyiha rasmi',
                        });
                    } catch (err) {
                        console.error('❌ Failed to send photo:', imageUrl, err.message);
                    }
                }

            } catch (channelError) {
                console.error('❌ Failed to send to channel:', channelError.message);
                console.log('📨 === FALLBACK: MESSAGE LOGGED TO CONSOLE ===');
                console.log(message);
                console.log('📨 === END MESSAGE ===');
                result = { message_id: Date.now() };
            }
        } else if (typeof TELEGRAM_CHAT_ID !== 'undefined') {
            try {
                result = await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
                    reply_markup: inlineKeyboard,
                    parse_mode: 'Markdown',
                    disable_web_page_preview: true
                });
                console.log('✅ Message sent to chat successfully');
            } catch (chatError) {
                console.error('❌ Failed to send to chat:', chatError.message);
                console.log('📨 === FALLBACK: MESSAGE LOGGED TO CONSOLE ===');
                console.log(message);
                console.log('📨 === END MESSAGE ===');
                result = { message_id: Date.now() };
            }
        } else {
            // Fallback: just log to console
            console.log('📨 === TELEGRAM MESSAGE (FOR TESTING) ===');
            console.log(message);
            console.log('📨 === END MESSAGE ===');
            result = { message_id: Date.now() };
            console.log('✅ Message logged successfully (testing mode)');
        }

        // Store the approval request
        pendingApprovals.set(projectUpload._id.toString(), {
            messageId: result.message_id,
            projectUpload: projectUpload
        });

        return result;
    } catch (error) {
        console.error('❌ Error sending approval request:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            response: error.response?.data
        });
        throw error;
    }
};

// Handle callback queries (approve/reject buttons)
bot.on('callback_query', async (callbackQuery) => {
    try {
        const { data, message } = callbackQuery;
        const [action, projectId] = data.split('_');

        console.log(`🔄 Processing ${action} for project: ${projectId}`);

        const projectUpload = await ProjectUpload.findById(projectId)
            .populate('submittedBy', 'firstName lastName email');
       
        if (!projectUpload) {
            await bot.answerCallbackQuery(callbackQuery.id, {
                text: '❌ Loyiha topilmadi!',
                show_alert: true
            });
            return;
        }

        if (action === 'approve') {
            // Approve the project
            projectUpload.status = 'approved';
            projectUpload.isChecked = true;
            await projectUpload.save();

            console.log(`✅ Project ${projectId} approved successfully`);

            // Update the message
            const updatedMessage = `
✅ Loyiha tasdiqlandi!

📝 *Loyiha nomi:* ${projectUpload.projectName}
👤 *Yuboruvchi:* ${projectUpload.submittedBy ? projectUpload.submittedBy.name || 'Noma\'lum' : 'Noma\'lum'}
📅 *Tasdiqlangan:* ${new Date().toLocaleString('uz-UZ')}

Loyiha endi saytda ko'rinadi.
            `;

            try {
                await bot.editMessageText(updatedMessage, {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    parse_mode: 'Markdown'
                });
            } catch (editError) {
                console.log('Could not edit message, but project was approved');
            }

            await bot.answerCallbackQuery(callbackQuery.id, {
                text: '✅ Loyiha muvaffaqiyatli tasdiqlandi!',
                show_alert: true
            });

        } else if (action === 'reject') {
            // Reject the project
            projectUpload.status = 'rejected';
            projectUpload.isChecked = true;
            await projectUpload.save();

            console.log(`❌ Project ${projectId} rejected successfully`);

            // Update the message
            const updatedMessage = `
❌ Loyiha rad etildi!

📝 *Loyiha nomi:* ${projectUpload.projectName}
👤 *Yuboruvchi:* ${projectUpload.submittedBy ? projectUpload.submittedBy.name || 'Noma\'lum' : 'Noma\'lum'}
📅 *Rad etilgan:* ${new Date().toLocaleString('uz-UZ')}

Loyiha saytda ko'rinmaydi.
            `;

            try {
                await bot.editMessageText(updatedMessage, {
                    chat_id: message.chat.id,
                    message_id: message.message_id,
                    parse_mode: 'Markdown'
                });
            } catch (editError) {
                console.log('Could not edit message, but project was rejected');
            }

            await bot.answerCallbackQuery(callbackQuery.id, {
                text: '❌ Loyiha rad etildi!',
                show_alert: true
            });
        }

        // Remove from pending approvals
        pendingApprovals.delete(projectId);

    } catch (error) {
        console.error('Error handling callback query:', error);
        await bot.answerCallbackQuery(callbackQuery.id, {
            text: '❌ Xatolik yuz berdi!',
            show_alert: true
        });
    }
});

// Handle bot errors
bot.on('error', (error) => {
    console.error('❌ Telegram bot error:', error.message);
});

// Handle polling errors
bot.on('polling_error', (error) => {
    if (error.code === 'ETELEGRAM' && error.response?.body?.error_code === 409) {
        console.log('⚠️ Telegram bot polling conflict detected. This is normal if multiple instances are running.');
        console.log('📝 The bot will continue to work for sending messages.');
    } else {
        console.error('❌ Telegram bot polling error:', error.message);
    }
});

// Test bot connection on startup
bot.getMe().then((botInfo) => {
    console.log('✅ Telegram bot connected successfully!');
    console.log('🤖 Bot username:', botInfo.username);
    console.log('🆔 Bot ID:', botInfo.id);
    console.log('');
    console.log('📋 SETUP INSTRUCTIONS:');
    console.log('1. Create a Telegram channel');
    console.log('2. Add your bot as admin to the channel');
    console.log('3. Get channel ID: forward any message from channel to @userinfobot');
    console.log('4. Update TELEGRAM_CHANNEL_ID in this file with the channel ID');
    console.log('   (Channel ID will be a negative number like -1001234567890)');
    console.log('');
}).catch((error) => {
    console.error('❌ Failed to connect to Telegram bot:', error.message);
    console.error('Check your BOT_TOKEN in config/default.json');
    console.log('📝 Bot will continue to work but Telegram notifications will be disabled');
});

module.exports = {
    bot,
    sendProjectApprovalRequest,
    pendingApprovals
}; 