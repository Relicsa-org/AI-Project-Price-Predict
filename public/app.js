document.addEventListener('DOMContentLoaded', async () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('send-btn');
    const estimateTemplate = document.getElementById('estimate-card-template');

    let conversationHistory = [];
    let detectedLocation = 'india';

    // Auto-detect location on load
    try {
        const ipRes = await fetch('https://ipapi.co/json/');
        if (ipRes.ok) {
            const ipData = await ipRes.json();
            const countryCode = ipData.country_code;

            if (['US', 'GB', 'CA'].includes(countryCode)) detectedLocation = 'us_uk';
            else if (['DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'CH'].includes(countryCode)) detectedLocation = 'europe';
            else if (['AE', 'SA', 'QA', 'KW'].includes(countryCode)) detectedLocation = 'middle_east';
            else if (['AU', 'NZ'].includes(countryCode)) detectedLocation = 'australia';
            else if (['SG', 'MY', 'ID', 'TH', 'VN', 'PH'].includes(countryCode)) detectedLocation = 'southeast_asia';
            else if (countryCode === 'IN') detectedLocation = 'india';
            else detectedLocation = 'us_uk'; // Standard safe fallback
            console.log(`Auto-detected location: ${countryCode} -> mapped to ${detectedLocation}`);
        }
    } catch(err) {
        console.warn('Failed to auto-detect IP, falling back to default', err);
    }

    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const appendMessage = (role, text, options = []) => {
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${role === 'user' ? 'user-bubble' : 'model-bubble'}`;
        
        const header = document.createElement('div');
        header.className = 'bubble-header';
        header.innerHTML = role === 'user' ? '<i class="fa-solid fa-user"></i> You' : '<i class="fa-solid fa-robot"></i> Relicsa AI';
        
        const content = document.createElement('div');
        content.className = 'bubble-content';
        
        if (role === 'model' && typeof marked !== 'undefined') {
            content.innerHTML = marked.parse(text);
        } else {
            content.textContent = text;
        }

        bubble.appendChild(header);
        bubble.appendChild(content);
        
        if (options && options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            options.forEach(opt => {
                const chip = document.createElement('div');
                chip.className = 'option-chip';
                chip.textContent = opt;
                chip.onclick = () => {
                    chatInput.value = opt;
                    chatForm.dispatchEvent(new Event('submit'));
                };
                optionsContainer.appendChild(chip);
            });
            bubble.appendChild(optionsContainer);
        }

        chatMessages.appendChild(bubble);
        scrollToBottom();
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatMessages.appendChild(indicator);
        scrollToBottom();
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    };

    const renderEstimateCard = (data) => {
        const clone = estimateTemplate.content.cloneNode(true);
        const cardNode = clone.querySelector('.estimate-bubble');

        const isIndia = detectedLocation === 'india';
        const currencySymbol = isIndia ? '₹' : '$';
        const totalAmount = isIndia ? data.estimate.totalCostINR : data.estimate.totalCostUSD;

        // Populate Card Data
        cardNode.querySelector('.stat-label').textContent = isIndia ? 'Total Cost (INR)' : 'Total Cost (USD)';
        cardNode.querySelector('.total-inr').textContent = `${currencySymbol}${Math.round(totalAmount).toLocaleString(isIndia ? 'en-IN' : 'en-US')}`;
        cardNode.querySelector('.timeline').textContent = `${data.estimate.timelineWeeks} Weeks`;
        
        const monthlyMaintAmount = isIndia ? data.estimate.monthlyMaintenanceCostINR : data.estimate.monthlyMaintenanceCostUSD;
        const maintEl = cardNode.querySelector('.maint-cost');
        if (maintEl) {
            maintEl.textContent = `${currencySymbol}${Math.round(monthlyMaintAmount).toLocaleString(isIndia ? 'en-IN' : 'en-US')}/mo`;
        }

        cardNode.querySelector('.ai-summary-text').textContent = data.summary || 'Summary generated via Chat functions.';

        const iconEl = cardNode.querySelector('.fa-indian-rupee-sign');
        if (!isIndia && iconEl) {
            iconEl.classList.remove('fa-indian-rupee-sign', 'text-orange');
            iconEl.classList.add('fa-dollar-sign', 'text-green');
        }

        const breakdownBody = cardNode.querySelector('.breakdown-body');
        data.estimate.breakdown.forEach(item => {
            const tr = document.createElement('tr');
            // item.cost is base INR without margin. Convert to USD dynamically using standard 83.5 exchange if not India
            const itemCost = isIndia ? item.cost : (item.cost / 83.5);

            tr.innerHTML = `
                <td><strong>${item.skill}</strong></td>
                <td>${item.hours} hrs</td>
                <td>${currencySymbol}${Math.round(itemCost).toLocaleString(isIndia ? 'en-IN' : 'en-US')}</td>
            `;
            breakdownBody.appendChild(tr);
        });

        chatMessages.appendChild(cardNode);
        scrollToBottom();
    };

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Append User message
        appendMessage('user', text);
        conversationHistory.push({ role: 'user', text });
        chatInput.value = '';

        // 2. Show Loading state
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.5';
        showTypingIndicator();

        try {
            // 3. Call APi endpoint
            const response = await fetch('/api/pricing/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: conversationHistory,
                    location: detectedLocation
                })
            });

            const result = await response.json();
            removeTypingIndicator();

            if (!result.success) {
                throw new Error(result.message || 'Failed to chat with AI');
            }

            // 4. Handle Result Output
            if (result.type === 'text') {
                appendMessage('model', result.text, result.options || []);
                conversationHistory.push({ role: 'model', text: result.text });
            } else if (result.type === 'estimate') {
                // The AI successfully called the Custom Tool and calculated the price!
                appendMessage('model', "I have gathered enough information! Based on your requirements, here is the official architecture estimate:");
                renderEstimateCard(result.data);
                
                const estDetails = result.data.estimate;
                let breakdownStr = estDetails.breakdown.map(b => `${b.skill}: ${b.hours}hrs`).join(', ');
                const aiContextMsg = `I have just provided the user with an official estimate. Summary: ${result.data.summary}. Breakdown: ${breakdownStr}. Total estimated hours: ${estDetails.totalHours}. The user is now seeing this pricing card. Do not re-calculate unless requirements change drastically.`;
                
                conversationHistory.push({ role: 'model', text: aiContextMsg });
            }

        } catch (error) {
            removeTypingIndicator();
            appendMessage('model', "Sorry, I encountered an error. Please try again or check the backend logs.");
            console.error(error);
        } finally {
            sendBtn.disabled = false;
            sendBtn.style.opacity = '1';
            chatInput.focus();
        }
    });
});
