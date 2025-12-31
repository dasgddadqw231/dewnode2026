import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-445cb580/health", (c) => {
  return c.json({ status: "ok" });
});

// Send email verification Magic Link via Supabase Auth
app.post("/make-server-445cb580/send-magic-link", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email || !email.includes('@')) {
      return c.json({ error: "Invalid email address" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    console.log('Sending Magic Link to:', email);

    // Send Magic Link via Supabase Auth
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'https://dew-ode.com/cart-verify',
      }
    });

    if (error) {
      console.error("Supabase Magic Link send error:", {
        message: error.message,
        status: error.status,
        name: error.name
      });
      return c.json({ 
        error: "Failed to send verification link",
        details: error.message 
      }, 500);
    }

    console.log('Magic Link sent successfully to:', email);

    return c.json({ 
      success: true,
      message: "Verification link sent to email" 
    });
  } catch (error) {
    console.error("Send Magic Link error:", error);
    return c.json({ 
      error: "Failed to send verification link",
      details: String(error)
    }, 500);
  }
});

// Verify Magic Link token
app.post("/make-server-445cb580/verify-magic-link", async (c) => {
  try {
    const { access_token } = await c.req.json();
    
    if (!access_token) {
      return c.json({ error: "Access token is required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Verify the access token
    const { data: { user }, error } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      console.error("Magic Link verify error:", error);
      return c.json({ 
        error: "Invalid or expired verification link"
      }, 400);
    }

    console.log('Magic Link verified successfully for:', user.email);

    return c.json({ 
      success: true,
      email: user.email,
      message: "Email verified successfully"
    });
  } catch (error) {
    console.error("Verify Magic Link error:", error);
    return c.json({ error: "Failed to verify link" }, 500);
  }
});

// Create order
app.post("/make-server-445cb580/orders", async (c) => {
  try {
    const orderData = await c.req.json();
    
    // Save order to KV store
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await kv.set(orderId, {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });

    // Update product stock
    for (const item of orderData.items) {
      const productKey = `product_${item.productId}`;
      const product = await kv.get(productKey);
      if (product) {
        const newStock = product.stock - item.quantity;
        await kv.set(productKey, {
          ...product,
          stock: newStock,
          isSoldOut: newStock <= 0
        });
      }
    }

    return c.json({ 
      success: true,
      orderId,
      message: "Order created successfully" 
    });
  } catch (error) {
    console.error("Create order error:", error);
    return c.json({ error: "Failed to create order" }, 500);
  }
});

Deno.serve(app.fetch);