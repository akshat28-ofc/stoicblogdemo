document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle (Original - unchanged)
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
    
    // Update icon based on initial theme
    if (currentTheme === 'light') {
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Search Toggle (Original - unchanged)
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    
    searchButton.addEventListener('click', function() {
        searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
    });
    
    // Voice Search (Original - unchanged)
    const voiceSearch = document.getElementById('voice-search');
    const voiceIndicator = document.getElementById('voice-indicator');
    
    voiceSearch.addEventListener('click', function() {
        voiceIndicator.classList.add('active');
        
        // Simulate voice recognition
        setTimeout(() => {
            voiceIndicator.classList.remove('active');
            searchBar.style.display = 'block';
            searchBar.querySelector('input').value = "latest news about artificial intelligence";
        }, 3000);
    });
    
    // Navigation (Original - unchanged)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main > section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
            });
            
            if (sectionId === 'home') {
                document.getElementById('home').classList.add('active-section');
                document.getElementById('home').classList.remove('hidden-section');
            } else {
                document.getElementById(sectionId).classList.add('active-section');
                document.getElementById(sectionId).classList.remove('hidden-section');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Audio Player (Original - unchanged)
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const closePlayerBtn = document.getElementById('close-player');
    const audioSummaries = document.querySelectorAll('.audio-summary');
    
    audioSummaries.forEach(summary => {
        summary.addEventListener('click', function() {
            const card = this.closest('.news-card');
            const title = card.querySelector('h3').textContent;
            const source = card.querySelector('.source-name').textContent;
            
            audioPlayer.querySelector('#player-title').textContent = title;
            audioPlayer.querySelector('#player-source').textContent = source;
            audioPlayer.style.display = 'block';
            
            // Simulate audio playback
            let isPlaying = false;
            playPauseBtn.addEventListener('click', function() {
                isPlaying = !isPlaying;
                const icon = playPauseBtn.querySelector('i');
                icon.classList.toggle('fa-play');
                icon.classList.toggle('fa-pause');
                
                if (isPlaying) {
                    // Simulate progress
                    let progress = 0;
                    const interval = setInterval(() => {
                        if (progress >= 100) {
                            clearInterval(interval);
                            isPlaying = false;
                            icon.classList.toggle('fa-play');
                            icon.classList.toggle('fa-pause');
                        } else {
                            progress += 0.5;
                            document.querySelector('.progress-bar').style.setProperty('--progress', `${progress}%`);
                        }
                    }, 30);
                }
            });
        });
    });
    
    closePlayerBtn.addEventListener('click', function() {
        audioPlayer.style.display = 'none';
    });
    
    // AR Experience (FIXED VERSION)
    const arButtons = document.querySelectorAll('.ar-toggle');
    const arOverlay = document.getElementById('ar-overlay');
    const closeAR = document.getElementById('close-ar');
    
    arButtons.forEach(button => {
        // Set initial ARIA label
        button.setAttribute('aria-label', 'Open augmented reality view');
        
        button.addEventListener('click', function() {
            const card = this.closest('.news-card');
            const title = card.querySelector('h3').textContent;
            
            // Update ARIA label with specific title
            button.setAttribute('aria-label', `Open AR view for ${title}`);
            
            // In a real app, this would load AR content
            const arContainer = document.getElementById('ar-container');
            arContainer.innerHTML = `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
                    <h3>${title}</h3>
                    <p>AR experience would load here</p>
                    <p>Point your camera at a flat surface to place the 3D model</p>
                </div>
            `;
            
            // ARIA updates for overlay
            arOverlay.setAttribute('aria-hidden', 'false');
            arOverlay.style.display = 'flex';
            
            // Focus management
            arOverlay.focus();
            trapFocus(arOverlay);
        });
    });
    
    closeAR.addEventListener('click', function() {
        arOverlay.setAttribute('aria-hidden', 'true');
        arOverlay.style.display = 'none';
    });
    
    // Focus trap function (for AR overlay)
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
      
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            } else if (e.key === 'Escape') {
                closeAR.click();
            }
        });
    }

    // Map Interaction (Original - unchanged)
    const mapMarkers = document.querySelectorAll('.map-marker');
    const mapStories = document.getElementById('map-stories');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const storyId = this.getAttribute('data-story');
            
            // In a real app, this would fetch stories for the location
            mapStories.innerHTML = `
                <div class="story-item">
                    <h4>${storyId === '1' ? 'US Election Polls Show Tight Race' : storyId === '2' ? 'EU Announces New Climate Targets' : 'Asia Tech Summit Kicks Off in Tokyo'}</h4>
                    <p class="story-source">${storyId === '1' ? 'Politico' : storyId === '2' ? 'BBC News' : 'TechCrunch'} · ${storyId === '1' ? '3 hours ago' : storyId === '2' ? '5 hours ago' : '2 hours ago'}</p>
                </div>
                <div class="story-item">
                    <h4>${storyId === '1' ? 'Debate Intensifies Over Voting Rights' : storyId === '2' ? 'Scientists Praise EU Climate Plan' : 'New AI Chip Unveiled at Summit'}</h4>
                    <p class="story-source">${storyId === '1' ? 'New York Times' : storyId === '2' ? 'Nature' : 'Wired'} · ${storyId === '1' ? '6 hours ago' : storyId === '2' ? '8 hours ago' : '4 hours ago'}</p>
                </div>
                <div class="story-item">
                    <h4>${storyId === '1' ? 'Key States Report Record Early Voting' : storyId === '2' ? 'Activists Demand Faster Action' : 'Regional Tech Partnerships Formed'}</h4>
                    <p class="story-source">${storyId === '1' ? 'CNN' : storyId === '2' ? 'The Guardian' : 'Nikkei Asia'} · ${storyId === '1' ? '9 hours ago' : storyId === '2' ? '10 hours ago' : '6 hours ago'}</p>
                </div>
            `;
        });
    });
    
    // Topic Web Interaction (Original - unchanged)
    const topicNodes = document.querySelectorAll('.topic-node');
    const topicStoryList = document.getElementById('topic-story-list');
    const topicTitle = document.getElementById('topic-title');
    
    topicNodes.forEach(node => {
        node.addEventListener('click', function() {
            const topic = this.querySelector('h4').textContent;
            topicTitle.textContent = topic;
            
            // In a real app, this would fetch stories for the topic
            topicStoryList.innerHTML = `
                <div class="story-item">
                    <h4>${topic === 'Ethics' ? 'AI Ethics Panel Releases New Guidelines' : topic === 'Applications' ? '10 Emerging Applications of AI in Healthcare' : topic === 'Regulation' ? 'Global AI Regulation Roundup: Latest Developments' : 'Breakthrough in Neural Network Efficiency'}</h4>
                    <p class="story-source">${topic === 'Ethics' ? 'Wired' : topic === 'Applications' ? 'MIT Tech Review' : topic === 'Regulation' ? 'Politico' : 'Science Journal'} · ${topic === 'Ethics' ? '4 hours ago' : topic === 'Applications' ? '7 hours ago' : topic === 'Regulation' ? '5 hours ago' : '3 hours ago'}</p>
                </div>
                <div class="story-item">
                    <h4>${topic === 'Ethics' ? 'The Moral Dilemmas of Autonomous Weapons' : topic === 'Applications' ? 'How AI is Revolutionizing Agriculture' : topic === 'Regulation' ? 'Tech Giants Respond to Proposed AI Laws' : 'Researchers Discover New Learning Algorithm'}</h4>
                    <p class="story-source">${topic === 'Ethics' ? 'The Atlantic' : topic === 'Applications' ? 'Forbes' : topic === 'Regulation' ? 'Financial Times' : 'Nature'} · ${topic === 'Ethics' ? '8 hours ago' : topic === 'Applications' ? '10 hours ago' : topic === 'Regulation' ? '6 hours ago' : '4 hours ago'}</p>
                </div>
                <div class="story-item">
                    <h4>${topic === 'Ethics' ? 'Public Trust in AI Systems Declining, Survey Finds' : topic === 'Applications' ? 'AI-Powered Weather Forecasting Shows Promise' : topic === 'Regulation' ? 'EU and US to Align on AI Standards' : 'Open-Source AI Model Surpasses Proprietary Versions'}</h4>
                    <p class="story-source">${topic === 'Ethics' ? 'Pew Research' : topic === 'Applications' ? 'Scientific American' : topic === 'Regulation' ? 'Reuters' : 'TechCrunch'} · ${topic === 'Ethics' ? '12 hours ago' : topic === 'Applications' ? '1 day ago' : topic === 'Regulation' ? '8 hours ago' : '5 hours ago'}</p>
                </div>
            `;
        });
    });
    
    // Chatbot (Original - unchanged)
    const chatbot = document.getElementById('chatbot');
    const openChatbot = document.getElementById('open-chatbot');
    const minimizeChatbot = document.getElementById('minimize-chatbot');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendMessage = document.getElementById('send-message');
    const voiceInput = document.getElementById('voice-input');
    
    openChatbot.addEventListener('click', function() {
        chatbot.classList.add('active');
    });
    
    minimizeChatbot.addEventListener('click', function() {
        chatbot.classList.remove('active');
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbot.classList.remove('active');
    });
    
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    sendMessage.addEventListener('click', function() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                if (message.toLowerCase().includes('latest') && message.toLowerCase().includes('ai')) {
                    addBotMessage("Here are the latest developments in AI:\n1. Google's new Gemini model outperforms humans on creative tasks\n2. EU passes landmark AI regulation act\n3. Researchers develop AI that can predict protein structures with 90% accuracy\nWould you like more details on any of these?");
                } else if (message.toLowerCase().includes('summary') || message.toLowerCase().includes('briefing')) {
                    addBotMessage("Today's top headlines:\n1. Global markets rally as inflation fears ease\n2. Breakthrough in nuclear fusion announced\n3. Major sports league reaches labor agreement\n4. New study reveals benefits of intermittent fasting\n5. Tech giant unveils revolutionary battery technology");
                } else {
                    addBotMessage("I can help you find news on various topics. Try asking about specific subjects like politics, technology, or sports, or ask for today's top headlines.");
                }
            }, 1000);
        }
    });
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
    
    voiceInput.addEventListener('click', function() {
        voiceIndicator.classList.add('active');
        
        // Simulate voice recognition
        setTimeout(() => {
            voiceIndicator.classList.remove('active');
            const questions = [
                "What's the latest in technology?",
                "Summarize today's top headlines",
                "Find me news about climate change",
                "Show me sports updates"
            ];
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            chatbotInput.value = randomQuestion;
            sendMessage.click();
        }, 3000);
    });
    
    // Customization Modal (Original - unchanged)
    const customizeFeed = document.getElementById('customize-feed');
    const customizationModal = document.getElementById('customization-modal');
    const closeModal = document.getElementById('close-modal');
    const resetPreferences = document.getElementById('reset-preferences');
    const savePreferences = document.getElementById('save-preferences');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    customizeFeed.addEventListener('click', function() {
        customizationModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', function() {
        customizationModal.classList.remove('active');
    });
    
    resetPreferences.addEventListener('click', function() {
        // Reset all checkboxes and selects
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.getElementById('tech-interest').checked = true;
        document.getElementById('science-interest').checked = true;
        document.getElementById('health-interest').checked = true;
        document.getElementById('environment-interest').checked = true;
        document.getElementById('breaking-news').checked = true;
        document.getElementById('topic-alerts').checked = true;
        document.getElementById('daily-briefing').checked = true;
        
        document.getElementById('ai-strength').value = 70;
        document.getElementById('layout-density').value = 'normal';
        document.getElementById('frequency-select').value = 'hourly';
    });
    
    savePreferences.addEventListener('click', function() {
        // In a real app, this would save preferences
        customizationModal.classList.remove('active');
        addBotMessage("Your news preferences have been updated. Your feed will now prioritize the topics you selected.");
    });
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Theme Color Picker (Original - unchanged)
    const colorThemes = document.querySelectorAll('.theme-option');
    const accentColor = document.getElementById('accent-color');
    
    colorThemes.forEach(theme => {
        theme.addEventListener('click', function() {
            colorThemes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const themeName = this.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', themeName);
            localStorage.setItem('theme', themeName);
        });
    });
    
    accentColor.addEventListener('input', function() {
        document.documentElement.style.setProperty('--accent-color', this.value);
    });
    
    // Load More Stories (Original - unchanged)
    const loadMoreButton = document.getElementById('load-more-button');
    
    loadMoreButton.addEventListener('click', function() {
        // Simulate loading more stories
        const feedContainer = document.querySelector('.feed-container');
        
        for (let i = 0; i < 3; i++) {
            const categories = ['tech', 'science', 'politics', 'sports'];
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            
            const titles = [
                "New Study Reveals Benefits of Mediterranean Diet",
                "Tech Giant Unveils Revolutionary Battery Technology",
                "Global Summit Addresses Climate Change Concerns",
                "Sports Team Makes Historic Comeback in Finals",
                "Breakthrough in Quantum Computing Announced"
            ];
            
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            
            const sources = ["BBC News", "Reuters", "The Guardian", "TechCrunch", "Nature Journal"];
            const randomSource = sources[Math.floor(Math.random() * sources.length)];
            
            const card = document.createElement('div');
            card.className = `news-card glassmorphism ${randomCategory}`;
            card.innerHTML = `
                <div class="card-header">
                    <span class="category-badge ${randomCategory}">${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)}</span>
                    <div class="card-actions">
                        <button class="card-button save"><i class="far fa-bookmark"></i></button>
                        ${Math.random() > 0.7 ? '<button class="card-button ar-toggle"><i class="fas fa-vr-cardboard"></i></button>' : ''}
                    </div>
                </div>
                <div class="card-content">
                    <h3>${randomTitle}</h3>
                    <p class="summary">This is a simulated news summary about the topic mentioned in the headline. In a real application, this would be fetched from a news API.</p>
                    <div class="card-meta">
                        <div class="source-info">
                            <img src="https://logo.clearbit.com/${randomSource.toLowerCase().replace(/\s/g, '')}.com" alt="${randomSource}" class="source-logo">
                            <span class="source-name">${randomSource}</span>
                            <span class="bias-meter ${['reliable', 'neutral', 'unreliable'][Math.floor(Math.random() * 3)]}">${['Highly Reliable', 'Neutral', 'Unreliable'][Math.floor(Math.random() * 3)]}</span>
                        </div>
                        <span class="time-ago">${Math.floor(Math.random() * 24)} hours ago</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="reactions">
                        <button class="reaction-button"><i class="fas fa-lightbulb"></i> ${Math.floor(Math.random() * 200)}</button>
                        <button class="reaction-button"><i class="fas fa-comment"></i> ${Math.floor(Math.random() * 50)}</button>
                        <button class="reaction-button"><i class="fas fa-share-alt"></i></button>
                    </div>
                    <button class="audio-summary"><i class="fas fa-play"></i> Listen (${Math.floor(Math.random() * 3) + 1} min)</button>
                </div>
            `;
            
            feedContainer.appendChild(card);
        }
        
        // Reattach event listeners to new cards
        document.querySelectorAll('.audio-summary').forEach(summary => {
            summary.addEventListener('click', function() {
                const card = this.closest('.news-card');
                const title = card.querySelector('h3').textContent;
                const source = card.querySelector('.source-name').textContent;
                
                audioPlayer.querySelector('#player-title').textContent = title;
                audioPlayer.querySelector('#player-source').textContent = source;
                audioPlayer.style.display = 'block';
            });
        });
        
        document.querySelectorAll('.ar-toggle').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.news-card');
                const title = card.querySelector('h3').textContent;
                
                const arContainer = document.getElementById('ar-container');
                arContainer.innerHTML = `
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
                        <h3>${title}</h3>
                        <p>AR experience would load here</p>
                        <p>Point your camera at a flat surface to place the 3D model</p>
                    </div>
                `;
                
                arOverlay.style.display = 'flex';
            });
        });
    });
    
    // Listen to Briefing (Original - unchanged)
    const listenButton = document.getElementById('listen-button');
    
    listenButton.addEventListener('click', function() {
        audioPlayer.querySelector('#player-title').textContent = "Daily News Briefing";
        audioPlayer.querySelector('#player-source').textContent = "Nexus News · 5 min listen";
        audioPlayer.style.display = 'block';
    });
    
    // Filter News Feed (Original - unchanged)
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const newsCards = document.querySelectorAll('.news-card');
            
            newsCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Text-only Mode (Original - unchanged)
    const textOnlyToggle = document.getElementById('text-only-toggle');
    
    textOnlyToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('text-only-mode');
        
        if (document.body.classList.contains('text-only-mode')) {
            // In a real app, this would remove images and videos
            addBotMessage("Text-only mode enabled. Images and videos have been disabled to reduce data usage.");
        } else {
            addBotMessage("Text-only mode disabled. All media content has been restored.");
        }
    });
    
    // Offline Mode (Original - unchanged)
    const offlineToggle = document.getElementById('offline-toggle');
    
    offlineToggle.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real PWA, this would trigger service worker caching
        addBotMessage("Offline mode prepares the app to work without an internet connection. In a real application, this would cache content for offline use.");
    });
    
    // Initialize with some bot messages (Original - unchanged)
    setTimeout(() => {
        addBotMessage("Welcome to Nexus News! I'm your AI assistant. How can I help you stay informed today?");
    }, 2000);
    
    setTimeout(() => {
        addBotMessage("Try asking me things like:\n- What's the latest in technology?\n- Show me news about climate change\n- Summarize today's top headlines");
    }, 4000);
});

// Animation trigger function (Original - unchanged)
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;
  
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerPoint) {
            element.classList.add('visible');
        }
    });
}