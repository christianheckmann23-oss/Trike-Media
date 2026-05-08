# Trike Media Website - Setup Instructions

## Form & Email Setup

The website now includes a preview request form that collects company information and sends email notifications.

### Steps to Get Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Email Configuration**

   The form uses Gmail's SMTP to send emails. You need to:

   a. Create a `.env` file in the project root (copy from `.env.example`):
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   OWNER_EMAIL=chris@trikemedia.io
   PORT=3000
   ```

   b. Get your Gmail App Password:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security" in the left menu
   - Enable "2-Step Verification" if not already enabled
   - Search for "App passwords"
   - Select Mail and Windows Computer (or your device)
   - Google will generate a 16-character password
   - Copy this into `EMAIL_PASSWORD` in your `.env` file

3. **Start the Server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

### How It Works

- When users click "See Your Free Preview", "Get Started", or "Request Your Free Preview", a modal form opens
- They fill in their company information (name, business type, description, email, phone, website)
- On submit:
  - You receive an email with all their details
  - They receive a confirmation email saying we'll deliver a preview within 48 hours
  - The form closes and shows a success message

### Form Fields

- **Company Name** (required)
- **Business Type** (required) - Landscaping, HVAC, Dining, Professional Services, E-commerce, Consulting, Other
- **Business Description** (required) - What makes them unique
- **Email** (required) - For both contacting them and sending confirmation
- **Phone** (optional)
- **Current Website** (optional)

### Email Templates

The system sends two emails:
1. **To You**: Full details of the inquiry
2. **To Customer**: Confirmation that their request was received and preview will arrive in 48 hours

You can customize these email templates in `server.js` by editing the `ownerMailOptions` and `customerMailOptions` objects.

### Deployment Notes

- For production, use a proper email service like SendGrid, Mailgun, or AWS SES
- Store sensitive environment variables in your hosting platform's settings
- Never commit `.env` files to version control
