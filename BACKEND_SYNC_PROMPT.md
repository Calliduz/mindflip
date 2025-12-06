# Backend Sync Prompt for MindFlip Memory Card Game

Use this prompt to generate the backend that matches the frontend API expectations.

---

## PROMPT:

Build me a complete MERN backend for my "Memory Card Game With Paywall Themes" React app.

### Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- **PayMongo** Payments (Philippines payment gateway)

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed with bcrypt),
  isPremium: Boolean (default: false),
  createdAt: Date (default: Date.now)
}
```

### Auth Routes

**POST /api/auth/register**
- Body: `{ email, password }`
- Creates new user with hashed password
- Returns: `{ token, user: { email, isPremium } }`

**POST /api/auth/login**
- Body: `{ email, password }`
- Validates credentials
- Returns: `{ token, user: { email, isPremium } }`

**GET /api/user/me** (Protected)
- Requires: Bearer token in Authorization header
- Returns: `{ email, isPremium }`

### Theme Routes

- Requires: user.isPremium === true
- Returns premium themes if user is premium
- Returns 403 if user is not premium

### Payment Routes (PayMongo)

**POST /api/payment/checkout** (Protected)
- Creates PayMongo Checkout Session
- Product: "Unlock All Themes"
- Price: Configurable (e.g., ₱249.00)
- success_url: `http://localhost:5173/success`
- cancel_url: `http://localhost:5173/cancel`
- Returns: `{ url: <paymongo_checkout_url> }`

**POST /api/payment/webhook**
- PayMongo webhook endpoint
- Listens for `checkout_session.payment.paid` event
- On success: Sets `user.isPremium = true` in database
- Verify webhook signature using `Paymongo-Signature` header

### Middleware

**authMiddleware**
- Extracts JWT from `Authorization: Bearer <token>` header
- Verifies token and attaches user to `req.user`
- Returns 401 if invalid

**requirePremium**
- Checks if `req.user.isPremium === true`
- Returns 403 if not premium

### Project Structure
```
/server
  /config
    paymongo.js       # PayMongo client initialization
  /controllers
    authController.js
    themeController.js
    paymentController.js
  /middleware
    authMiddleware.js
    requirePremium.js
  /models
    User.js
  /routes
    authRoutes.js
    themeRoutes.js
    paymentRoutes.js
  server.js
  .env.example
```

### Environment Variables (.env.example)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindflip
JWT_SECRET=your_jwt_secret_key_here
PAYMONGO_SECRET_KEY=sk_test_your_paymongo_secret_key
PAYMONGO_WEBHOOK_SECRET=whsec_your_webhook_secret
PAYMONGO_PRICE_AMOUNT=24900  # Amount in centavos (₱249.00)
CLIENT_URL=http://localhost:5173
```

### Key Implementation Notes

1. **PayMongo API Base URL**: `https://api.paymongo.com/v1`

2. **Creating Checkout Session**:
```javascript
const axios = require('axios');

const createCheckoutSession = async (userId, userEmail) => {
  const response = await axios.post(
    'https://api.paymongo.com/v1/checkout_sessions',
    {
      data: {
        attributes: {
          billing: { email: userEmail },
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          description: 'Unlock All Premium Themes - MindFlip',
          line_items: [{
            currency: 'PHP',
            amount: parseInt(process.env.PAYMONGO_PRICE_AMOUNT), // in centavos
            name: 'Premium Themes Bundle',
            quantity: 1,
          }],
          payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'card'],
          success_url: `${process.env.CLIENT_URL}/success`,
          cancel_url: `${process.env.CLIENT_URL}/cancel`,
          metadata: { userId: userId }
        }
      }
    },
    {
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
        'Content-Type': 'application/json',
      }
    }
  );
  
  return response.data.data.attributes.checkout_url;
};
```

3. **Webhook Handler**:
```javascript
const handleWebhook = async (req, res) => {
  const signature = req.headers['paymongo-signature'];
  // Verify signature (see PayMongo docs)
  
  const event = req.body.data;
  
  if (event.attributes.type === 'checkout_session.payment.paid') {
    const checkoutSession = event.attributes.data;
    const userId = checkoutSession.attributes.metadata.userId;
    
    await User.findByIdAndUpdate(userId, { isPremium: true });
  }
  
  res.status(200).json({ received: true });
};
```

4. **CORS Configuration**: Enable CORS for frontend origin:
```javascript
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
```

5. **PayMongo Payment Methods Available**:
   - GCash
   - GrabPay
   - Maya (formerly PayMaya)
   - Credit/Debit Cards

### Testing Webhooks Locally

Use ngrok to expose your local server:

```bash
# Install ngrok (if not installed)
# Download from https://ngrok.com/download

# Start your server
npm run dev

# In another terminal, expose port 5000
ngrok http 5000

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Add webhook endpoint in PayMongo Dashboard:
# https://abc123.ngrok.io/api/payment/webhook

# Select events: checkout_session.payment.paid
```

### How to Run

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file from `.env.example`

3. Get PayMongo API keys from: https://dashboard.paymongo.com/developers

4. Start MongoDB (if running locally)

5. Start the server:
```bash
npm run dev
```

6. Server runs on `http://localhost:5000`

### Frontend Connection

The React frontend (running on port 5173) uses a Vite proxy to forward API requests:

```javascript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

All frontend API calls use `/api/*` paths which are automatically proxied to the backend.

---

**Provide all backend code fully written, no placeholders.**
