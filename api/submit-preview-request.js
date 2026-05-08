const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function buildClaudePrompt({ companyName, businessType, businessDescription, designStyle, colorPreference, tone, inspiration, targetAudience, keyFeatures }) {
  return `You are a senior product designer and front end engineer who specialises in clean, premium, intentional UI. Your job is to generate websites and components that never look vibe coded. Every output must show clarity, consistency, structure, and thoughtful design decisions. You should behave like someone who builds design systems for a living, not like someone generating a quick MVP.

Begin every project by establishing a strict spacing rhythm. Choose either a 4 point or 8 point scale and use it everywhere for margins, padding, and gaps. Never introduce random spacing values. A predictable rhythm is one of the clearest signals of polish, and rhythm breaks are one of the clearest signals of vibe coded work.

Typography must also follow a clear system. Select a single heading font and a single body font. Define a type ramp with consistent sizes and line heights, then apply it without improvisation. Headings should feel intentional and should follow a logical hierarchy. Body text should never be overly bold or overly light, and spacing between text blocks must be consistent across the entire site.

Color choices should always feel disciplined. Choose a small palette and stick to it. Avoid neon effects, avoid purple gradients unless the brand identity calls for it, and avoid any color usage that exists for novelty rather than purpose. Every accent should reinforce hierarchy, not distract from it. High contrast and readability is mandatory.

All components must come from a consistent design language. Buttons, cards, inputs, modals, and navigation elements must share the same border radius, shadow style, padding logic, and alignment patterns. Mixing styles or radiuses immediately creates a vibe coded feeling. Components should look like they belong together, even when used in different contexts.

Interactions and animations must be subtle and tied to user intent. Hover effects should never distort the layout or jump aggressively. Animation timing must feel natural. Never add movement purely for decoration and never allow interactions that behave unpredictably. Every interactive element must function properly. Buttons must respond. Tabs must switch. Accordions must open and close. Carousels must actually slide.

Layout should follow a proper grid. Content must align cleanly and consistently. Nothing should drift. Nothing should visually wobble. Sections should have breathing room. Containers should have predictable widths. Do not stack elements randomly or overuse centered content. Everything should feel balanced and structured.

Loading and async behaviour must be handled with care. Every interaction that triggers a delay should have a loading state. Buttons should visually shift into a loading indicator. Data heavy areas should use skeletons. Content should not appear suddenly with no transition. A site that feels alive and responsive always reads as more premium.

Copy must be specific and grounded. Avoid generic hero lines like "build your dreams" or "launch faster." Speak clearly about what the product does and why it matters. Never rely on filler phrases. Testimonials must feel real. Footer text must be correct and professional. The tone should be confident but not exaggerated.

Technical fundamentals must be complete. Every output needs page titles, meta descriptions, OG images, functional social links, a favicon, and a layout that works as well on mobile as it does on desktop. Do not generate placeholders or half working links. Do not leave test text in the final layout. Ensure every element is usable and accessible.

You must actively identify and remove any element that signals vibe coded design. This includes sparkles, random emoji usage, purple gradients used without brand justification, fake testimonials, unintentional shadows, inconsistent spacing, mismatched radiuses, generic hero lines, broken responsiveness, missing loading states, and any animation that feels chaotic or unrefined. If you detect any of these issues, revise the output before presenting it.

The final result should feel like something shipped by a mature product team. It should demonstrate intention in every choice, clarity in every layout, and a calm, confident design voice. Nothing should feel rushed. Nothing should feel improvised. Your role is to guarantee a premium standard at all times.

---

Now build a complete, fully coded single-page website using only HTML, CSS, and vanilla JavaScript (no frameworks, no external dependencies except Google Fonts) for the following client.

---

BUSINESS INFORMATION
Company Name: ${companyName}
Industry: ${businessType}
About: ${businessDescription}

---

DESIGN DIRECTION
Style: ${designStyle}
Primary Color Family: ${colorPreference}
Brand Tone: ${tone}
Inspiration: ${inspiration || 'Clean, structured, and professional — let the content speak'}

---

TARGET AUDIENCE
${targetAudience || 'General audience seeking these services'}

---

KEY FEATURES TO INCLUDE
${keyFeatures}

---

EXECUTION REQUIREMENTS

1. SPACING SYSTEM
   - Use an 8pt spacing scale throughout (8, 16, 24, 32, 48, 64, 96px)
   - Never use arbitrary values like 13px, 22px, or 37px
   - All section padding, card padding, and component gaps must come from this scale

2. COLOR SYSTEM
   - Build a full, disciplined palette around "${colorPreference}":
     - One rich dark primary (headers, CTAs, nav background)
     - One lighter mid-tone (hover states, secondary elements)
     - One pale tint (section backgrounds, subtle fills)
     - One warm neutral base (page background)
     - One accent (highlights, icons, active states only — use sparingly)
   - Define every color as a CSS custom property in :root
   - Never use a color that isn't in the defined palette

3. TYPOGRAPHY
   - Two Google Fonts only: one serif for headings, one geometric sans for body
   - Define a full type ramp in :root (--text-xs through --text-5xl)
   - All font sizes use clamp() for fluid scaling
   - Consistent line-heights: 1.1–1.2 for headings, 1.6–1.7 for body
   - Font weights: 700 for primary headings, 600 for sub-headings, 400 for body, 300 for captions

4. COMPONENT CONSISTENCY
   - Every button, card, input, and badge uses the same border-radius
   - Every card uses the same shadow style (one shadow definition, applied consistently)
   - Every section uses the same container max-width and horizontal padding
   - No component should look like it came from a different design system

5. LAYOUT & SECTIONS — build in this order:
   - Fixed nav: logo left, links center, CTA right — blur backdrop, border on scroll
   - Hero: strong specific headline for ${companyName}, subhead, primary CTA, supporting visual
   - Services / What We Do: 3 cards, each with an icon, title, and 2-sentence description
   - How It Works: 3–4 numbered steps in a horizontal or alternating layout
   - Social proof / Testimonials: 2–3 realistic quotes with name, title, and company
   - ${keyFeatures} — dedicate a full section to each major feature requested
   - Final CTA section: bold headline, one-line subhead, single action button
   - Footer: logo, nav links, copyright — clean and minimal

6. COPY STANDARDS
   - Hero headline must name what ${companyName} actually does — no generic taglines
   - Every CTA button label must describe the action (not just "Get Started")
   - Testimonials must name realistic people with realistic titles and companies
   - All copy must speak directly to: ${targetAudience || 'the target audience'}
   - Tone throughout: ${tone}

7. INTERACTIONS
   - Scroll-triggered fade-up reveals via IntersectionObserver (0.6s ease, 20px offset)
   - Hover states on all cards and buttons: subtle transform + color shift, no layout jump
   - Nav background opacity transitions on scroll (transparent → solid)
   - All transitions: 0.2s ease or 0.3s ease — nothing faster, nothing slower
   - Mobile hamburger menu with smooth open/close animation

8. TECHNICAL COMPLETENESS
   - <title> and <meta description> specific to ${companyName}
   - Viewport meta tag
   - Open Graph tags (og:title, og:description, og:type)
   - Inline SVG favicon in the <head>
   - Semantic HTML5 throughout (nav, main, section, article, footer)
   - ARIA labels on all interactive elements
   - Fully responsive — tested breakpoints at 375px, 768px, 1280px
   - No placeholder text, no lorem ipsum, no broken links

9. QUALITY CHECK — before finishing, verify:
   - Every spacing value is on the 8pt scale
   - Every color comes from the defined palette
   - Every component shares the same border-radius and shadow
   - No generic copy remains anywhere in the page
   - Every button and interactive element functions correctly
   - Mobile layout is clean and nothing overflows

---

Deliver the complete, copy-paste-ready HTML file. No explanations, no markdown code blocks — just the raw HTML starting with <!DOCTYPE html>.`;
}

const emailTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #2a2a2a; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 0 auto; background: #fdfdfb; }
    .header { background: linear-gradient(135deg, #2e4a3e 0%, #3d6354 100%); padding: 40px 20px; text-align: center; }
    .logo { font-size: 24px; font-weight: bold; color: #fdfdfb; margin-bottom: 10px; }
    .header-subtitle { color: rgba(253,253,251,0.8); font-size: 14px; }
    .content { padding: 40px 30px; }
    .section-title { font-size: 18px; font-weight: 600; color: #2e4a3e; margin-bottom: 15px; border-bottom: 2px solid #e8f0ed; padding-bottom: 10px; }
    .info-row { display: flex; margin-bottom: 12px; }
    .info-label { font-weight: 500; color: #2e4a3e; min-width: 150px; }
    .info-value { color: #708090; flex: 1; }
    .info-box { background: #f5f3ef; padding: 15px; border-radius: 4px; margin-top: 8px; border-left: 3px solid #c8a96e; }
    .footer { background: #1a2820; color: rgba(253,253,251,0.7); padding: 30px; text-align: center; font-size: 12px; }
    .footer a { color: #c8a96e; text-decoration: none; }
    .divider { border: none; border-top: 1px solid #e8f0ed; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">Trike Media</div>
      <div class="header-subtitle">New Preview Request</div>
    </div>
    <div class="content">${content}</div>
    <div class="footer">
      <p style="margin:0 0 10px 0;"><strong>Trike Media</strong> — Digital Presence for Small Business</p>
      <p style="margin:0;">Elyria, Ohio</p>
      <p style="margin:10px 0 0 0;"><a href="mailto:sales@trikemedia.com">sales@trikemedia.com</a></p>
    </div>
  </div>
</body>
</html>`;

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const {
      companyName, businessType, businessDescription, email, phone, website,
      designStyle, colorPreference, tone, keyFeatures, targetAudience, inspiration
    } = req.body;

    if (!companyName || !businessType || !businessDescription || !email || !designStyle || !colorPreference || !tone || !keyFeatures) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const ownerContent = `
      <div style="margin-bottom:30px;">
        <div class="section-title">📋 Business Information</div>
        <div class="info-row"><div class="info-label">Company</div><div class="info-value">${escapeHtml(companyName)}</div></div>
        <div class="info-row"><div class="info-label">Business Type</div><div class="info-value">${escapeHtml(businessType)}</div></div>
        <div class="info-row"><div class="info-label">Email</div><div class="info-value"><a href="mailto:${escapeHtml(email)}" style="color:#2e4a3e;">${escapeHtml(email)}</a></div></div>
        <div class="info-row"><div class="info-label">Phone</div><div class="info-value">${escapeHtml(phone || 'Not provided')}</div></div>
        ${website ? `<div class="info-row"><div class="info-label">Website</div><div class="info-value"><a href="${escapeHtml(website)}" style="color:#2e4a3e;">${escapeHtml(website)}</a></div></div>` : ''}
        <div class="info-box">${escapeHtml(businessDescription)}</div>
      </div>
      <div style="margin-bottom:30px;">
        <div class="section-title">🎨 Design Preferences</div>
        <div class="info-row"><div class="info-label">Design Style</div><div class="info-value"><strong>${escapeHtml(designStyle)}</strong></div></div>
        <div class="info-row"><div class="info-label">Primary Color</div><div class="info-value"><strong>${escapeHtml(colorPreference)}</strong></div></div>
        <div class="info-row"><div class="info-label">Brand Tone</div><div class="info-value"><strong>${escapeHtml(tone)}</strong></div></div>
        <div style="margin-top:15px;"><div style="font-weight:500;color:#2e4a3e;margin-bottom:8px;">Key Features</div><div class="info-box">${escapeHtml(keyFeatures).replace(/\n/g, '<br>')}</div></div>
        ${targetAudience ? `<div style="margin-top:15px;"><div style="font-weight:500;color:#2e4a3e;margin-bottom:8px;">Target Audience</div><div class="info-box">${escapeHtml(targetAudience).replace(/\n/g, '<br>')}</div></div>` : ''}
        ${inspiration ? `<div style="margin-top:15px;"><div style="font-weight:500;color:#2e4a3e;margin-bottom:8px;">Design Inspiration</div><div class="info-box">${escapeHtml(inspiration).replace(/\n/g, '<br>')}</div></div>` : ''}
      </div>
      <hr class="divider">
      <div style="text-align:center;color:#708090;font-size:12px;"><p>Received: ${new Date().toLocaleString()}</p></div>`;

    const claudePrompt = buildClaudePrompt({ companyName, businessType, businessDescription, designStyle, colorPreference, tone, inspiration, targetAudience, keyFeatures });

    const promptContent = `
      <div style="margin-bottom:30px;">
        <div class="section-title">🤖 Ready-to-Use Claude Prompt</div>
        <p style="color:#708090;font-size:14px;margin-bottom:15px;">Copy everything inside the box and paste it directly into Claude.</p>
        <div style="background:#1a2820;border-radius:6px;padding:24px;font-family:'Courier New',monospace;font-size:12px;color:#a8c5b8;line-height:1.8;white-space:pre-wrap;word-break:break-word;">${escapeHtml(claudePrompt)}</div>
      </div>`;

    const customerContent = `
      <div>
        <p style="font-size:16px;color:#2a2a2a;margin-bottom:20px;">Hi ${escapeHtml(companyName.split(' ')[0])},</p>
        <p style="color:#708090;line-height:1.6;margin-bottom:15px;">Thanks for reaching out! We've received your preview request and our team is excited to get started.</p>
        <div style="background:#e8f0ed;border-left:4px solid #2e4a3e;padding:20px;border-radius:4px;margin:25px 0;">
          <div style="color:#2e4a3e;font-weight:600;margin-bottom:8px;">What's Next?</div>
          <p style="color:#2e4a3e;margin:0;line-height:1.6;">We'll build a custom website preview based on your design preferences. You'll receive a live link <strong>within 48 hours</strong>.</p>
        </div>
        <div style="background:#f5f3ef;padding:20px;border-radius:4px;margin:20px 0;">
          <div style="color:#2e4a3e;font-weight:600;margin-bottom:15px;">Your Preview Details:</div>
          <div style="font-size:14px;color:#708090;line-height:1.8;">
            <strong>${escapeHtml(companyName)}</strong><br>
            ${escapeHtml(businessType)}<br>
            Style: ${escapeHtml(designStyle)}<br>
            Color: ${escapeHtml(colorPreference)}
          </div>
        </div>
        <p style="color:#708090;margin-top:25px;">Best,<br><strong>The Trike Media Team</strong></p>
      </div>`;

    await Promise.all([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL,
        subject: `New Preview Request: ${companyName}`,
        html: emailTemplate(ownerContent)
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL,
        subject: `Claude Prompt Ready: ${companyName}`,
        html: emailTemplate(promptContent)
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'We Received Your Preview Request',
        html: emailTemplate(customerContent)
      })
    ]);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error processing request. Please try again.' });
  }
};
