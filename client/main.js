/**
 * Business Management Suite - Test Application Client
 */

// Use relative URLs since client is served from the same server
const API_BASE_URL = '';

// DOM elements
const healthStatus = document.getElementById('health-status');
const healthTimestamp = document.getElementById('health-timestamp');
const pingButton = document.getElementById('ping-button');
const pingCount = document.getElementById('ping-count');
const lastPingId = document.getElementById('last-ping-id');
const lastPingTime = document.getElementById('last-ping-time');
const statusMessage = document.getElementById('status-message');

/**
 * Show status message to user
 */
function showMessage(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = isError ? 'status-message error' : 'status-message success';
  
  setTimeout(() => {
    statusMessage.className = 'status-message hidden';
  }, 3000);
}

/**
 * Format timestamp to readable format
 */
function formatTimestamp(timestamp) {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Check health status
 */
async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    healthStatus.textContent = data.status.toUpperCase();
    healthStatus.className = data.status === 'ok' ? 'value status-ok' : 'value status-error';
    healthTimestamp.textContent = formatTimestamp(data.timestamp);
  } catch (error) {
    console.error('Health check failed:', error);
    healthStatus.textContent = 'ERROR';
    healthStatus.className = 'value status-error';
    healthTimestamp.textContent = 'Connection failed';
  }
}

/**
 * Get ping statistics
 */
async function getPingStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/ping`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    pingCount.textContent = data.count;
    
    if (data.lastPing) {
      lastPingId.textContent = data.lastPing.id;
      lastPingTime.textContent = formatTimestamp(data.lastPing.timestamp);
    } else {
      lastPingId.textContent = '-';
      lastPingTime.textContent = '-';
    }
  } catch (error) {
    console.error('Error getting ping stats:', error);
    showMessage('Failed to load ping statistics', true);
  }
}

/**
 * Send a test ping
 */
async function sendPing() {
  try {
    pingButton.disabled = true;
    pingButton.textContent = 'Sending...';
    
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    showMessage(`Ping sent successfully! ID: ${data.id}`);
    
    // Refresh stats
    await getPingStats();
  } catch (error) {
    console.error('Error sending ping:', error);
    showMessage('Failed to send ping', true);
  } finally {
    pingButton.disabled = false;
    pingButton.textContent = 'Send Test Ping';
  }
}

/**
 * Initialize application
 */
async function init() {
  console.log('Initializing Business Management Suite Test Application...');
  
  // Load initial data
  await checkHealth();
  await getPingStats();
  
  // Set up event listeners
  pingButton.addEventListener('click', sendPing);
  
  // Refresh health status every 10 seconds
  setInterval(checkHealth, 10000);
  
  console.log('Application ready!');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
