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
- Stripe Payments

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

**GET /api/themes/list**
- Returns list of all themes with lock status based on user's premium status:
```javascript
{
  themes: [
    { id: 'classic', name: 'Classic', isPremium: false, isLocked: false },
    { id: 'animals', name: 'Animals', isPremium: true, isLocked: true }, // locked if user not premium
    { id: 'food', name: 'Food', isPremium: true, isLocked: true },
    { id: 'anime', name: 'Anime', isPremium: true, isLocked: true },
    { id: 'logos', name: 'Logos', isPremium: true, isLocked: true }
  ]
}
```

**GET /api/themes/premium** (Protected + Premium Required)
- Requires: user.isPremium === true
- Returns premium themes if user is premium
- Returns 403 if user is not premium

### Payment Routes (Stripe)

**POST /api/payment/checkout** (Protected)
- Creates Stripe Checkout Session
- Product: "Unlock All Themes"
- Price: Configurable (e.g., $4.99)
- success_url: `http://localhost:5173/success`
- cancel_url: `http://localhost:5173/cancel`
- Returns: `{ url: <stripe_checkout_url> }`

**POST /api/payment/webhook**
- Stripe webhook endpoint (raw body required for signature verification)
- Listens for `checkout.session.completed` event
- On success: Sets `user.isPremium = true` in database
- IMPORTANT: Use `express.raw({ type: 'application/json' })` middleware for this route only

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
    stripe.js         # Stripe client initialization
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
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID=price_your_stripe_price_id
CLIENT_URL=http://localhost:5173
```

### Key Implementation Notes

1. **Stripe Webhook Raw Body**: The webhook route MUST use raw body parser:
```javascript
app.post('/api/payment/webhook', 
  express.raw({ type: 'application/json' }), 
  paymentController.handleWebhook
);
```

2. **CORS Configuration**: Enable CORS for frontend origin:
```javascript
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
```

3. **Stripe Checkout Session**: Include customer_email from user:
```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',
  customer_email: req.user.email,
  line_items: [{
    price: process.env.STRIPE_PRICE_ID,
    quantity: 1,
  }],
  success_url: `${process.env.CLIENT_URL}/success`,
  cancel_url: `${process.env.CLIENT_URL}/cancel`,
  metadata: { userId: req.user._id.toString() }
});
```

4. **Webhook User Lookup**: Use metadata to find user:
```javascript
const userId = session.metadata.userId;
await User.findByIdAndUpdate(userId, { isPremium: true });
```

### Testing Webhooks Locally

Use Stripe CLI to test webhooks:

```bash
# Install Stripe CLI (if not installed)
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5000/api/payment/webhook

# Copy the webhook signing secret (whsec_...) to your .env file

# In another terminal, trigger a test event
stripe trigger checkout.session.completed
```

### How to Run

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file from `.env.example`

3. Start MongoDB (if running locally)

4. Start the server:
```bash
npm run dev
```

5. Server runs on `http://localhost:5000`

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
