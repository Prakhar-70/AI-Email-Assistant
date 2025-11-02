console.log("Email writer")

function getEmailContent(){
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        } 
    }
    return '';
}

function findComposeToolbar() {
    const selectors = ['.btC','.aDH', '[roles="toolbar"]', '.gU.Up'];
    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        } 
    }
    return null;
}

function createAIButton(){
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = "8px";
    button.innerHTML = 'AI Reply';
    button.setAttribute('role','button');
    button.setAttribute("data-tooltip", "Generate AI Reply");
    return button;
}


function injectButton() {
  // Remove any existing elements to avoid duplicates
  const existingButton = document.querySelector('.ai-reply-button');
  const existingDropdown = document.querySelector('.tone-selector');
  if (existingButton) existingButton.remove();
  if (existingDropdown) existingDropdown.remove();

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }

  console.log("Toolbar found");

  // 🔹 Create dropdown for tone selection
  const toneDropdown = document.createElement('select');
  toneDropdown.className = 'tone-selector T-I J-J5-Ji aoO v7 T-I-atl L3';
  toneDropdown.style.marginRight = '8px';
  toneDropdown.style.height = '28px';
  toneDropdown.style.borderRadius = '6px';
  toneDropdown.style.padding = '2px 6px';
  toneDropdown.innerHTML = `
    <option value="professional">Professional</option>
    <option value="friendly">Friendly</option>
    <option value="concise">Concise</option>
    <option value="empathetic">Empathetic</option>
    <option value="persuasive">Persuasive</option>
  `;

  // 🔹 Create AI Reply button
  const button = document.createElement('div');
  button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';
  button.textContent = 'AI Reply';
  button.setAttribute('role', 'button');
  button.setAttribute('data-tooltip', 'Generate AI Reply');
  button.style.backgroundColor = '#1a73e8';
  button.style.color = 'white';
  button.style.padding = '0 12px';
  button.style.borderRadius = '6px';
  button.style.cursor = 'pointer';

  // 🔹 When AI Reply is clicked
  button.addEventListener('click', async () => {
    try {
      const tone = toneDropdown.value;
      const emailContent = getEmailContent();
      console.log("Selected tone:", tone);
      console.log("Email content:", emailContent);

      button.textContent = 'Generating...';
      button.style.opacity = '0.7';
      button.disabled = true;

      const response = await fetch(' https://ai-email-assistant-l0g1.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: tone
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Request Failed: ${response.status} - ${errorText}`);
      }

      const generatedReply = await response.text();
      console.log("Generated reply:", generatedReply);

      const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
      if (composeBox) {
        composeBox.focus();
        document.execCommand('insertText', false, generatedReply);
      } else {
        console.error("Compose box not found");
      }

    } catch (error) {
      console.error("Error generating reply:", error);
      alert("Failed to generate reply. Please try again.");
    } finally {
      button.textContent = 'AI Reply';
      button.style.opacity = '1';
      button.disabled = false;
    }
  });

  // 🔹 Add dropdown + button to Gmail toolbar
  toolbar.insertBefore(button, toolbar.firstChild);
  toolbar.insertBefore(toneDropdown, button);
}










const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
       (node.matches('.aDH, .btC, [roles="dialog"]')
        ||  node.querySelector('.aDH, .btC, [roles="dialog"]'))
    );
     if (hasComposeElements){
        console.log("Compose Window Detected")
        setTimeout(injectButton, 500);
     }
   }
});

observer.observe(document.body,{
    childList:true,
    subtree:true 
});

